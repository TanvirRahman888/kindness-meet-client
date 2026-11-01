
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Search,
  X,
} from "lucide-react";

import EventCard, {
  type EventItem,
} from "@/components/events/EventCard";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events and categories
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [eventsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/events`, {
            signal: controller.signal,
          }),
          fetch(`${API_URL}/api/categories`, {
            signal: controller.signal,
          }),
        ]);

        if (!eventsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to load events.");
        }

        const [eventsData, categoriesData] = await Promise.all([
          eventsRes.json(),
          categoriesRes.json(),
        ]);

        setEvents(eventsData);
        setCategories(categoriesData);
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to load upcoming events.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  // Live search, category filter, upcoming dates
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();


    return events
      .filter((event) => {
        const categoryMatch =
          selectedCategory === "all" ||
          event.category === selectedCategory;

        const searchMatch = [
          event.title,
          event.description,
          event.location,
          event.category,
          event.creatorName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);

        return categoryMatch && searchMatch;
      })
      .sort(
        (a, b) =>
          new Date(a.eventDate).getTime() -
          new Date(b.eventDate).getTime()
      );
  }, [events, selectedCategory, search]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative flex min-h-92 items-center overflow-hidden sm:min-h-110">

        {/* Hero Image */}
        <Image
          src="/hero/upcoming-events-hero.webp"
          alt="Community volunteers helping people"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#271C1B]/90 via-[#35211F]/65 to-[#35211F]/20" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">

            {/* Small Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              <HeartHandshake size={16} />
              Make a Difference Together
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Events.
              <span className="mt-1 block text-[#FFD9BA]">
                Create Impact.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Find upcoming community events, connect with
              passionate volunteers, and take part in
              meaningful initiatives that make a real difference.
            </p>

            {/* Hero Button */}
            <a
              href="#explore-events"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#B44942] transition hover:bg-[#FFE8D9]"
            >
              Explore Upcoming Events
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section
        id="explore-events"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >

        {/* Section Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <CalendarDays size={17} />
              Upcoming Opportunities
            </div>

            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Find Your Next Event
            </h2>

            <p className="mt-2 text-sm text-muted">
              Explore community events sorted by their upcoming dates.
            </p>
          </div>

          {!loading && !error && (
            <span className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1
                ? "Event Found"
                : "Events Found"}
            </span>
          )}
        </div>

        {/* Category Filter and Search */}
        <div className="mb-8 space-y-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Category Buttons */}
            <div
              aria-label="Filter events by category"
              className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible lg:pb-0"
            >
              {/* All Events */}
              <button
                type="button"
                aria-pressed={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all ${
                  selectedCategory === "all"
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                All Events
              </button>

              {/* Dynamic Categories */}
              {categories.map((category) => {
                const active =
                  selectedCategory === category.name;

                return (
                  <button
                    key={category._id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedCategory(category.name)
                    }
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all ${
                      active
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-surface text-foreground hover:border-accent/40 hover:text-accent"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Small Search Box */}
            <div className="relative w-full shrink-0 sm:w-64">
              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="search"
                aria-label="Search upcoming events"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-9 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
              />

              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(search || selectedCategory !== "all") && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted">
                Showing matching events
                {selectedCategory !== "all" &&
                  ` in ${selectedCategory}`}
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
              >
                <X size={15} />
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="aspect-16/10 animate-pulse bg-brand-peach/30" />

                <div className="space-y-4 p-5">
                  <div className="h-4 w-36 animate-pulse rounded bg-accent/10" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-accent/10" />
                  <div className="h-4 w-full animate-pulse rounded bg-accent/10" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-accent/10" />
                  <div className="mt-6 h-11 animate-pulse rounded-xl bg-accent/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-border bg-surface px-6 py-16 text-center"
          >
            <h3 className="text-lg font-bold text-foreground">
              Unable to Load Events
            </h3>

            <p className="mt-2 text-sm text-muted">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        )}

        {/* No Events */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <CalendarDays size={30} />
            </div>

            <h3 className="text-xl font-bold text-foreground">
              No Events Found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              {events.length === 0
                ? "No upcoming community events are available right now."
                : "No events match your search or selected category."}
            </p>

            {(search || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
