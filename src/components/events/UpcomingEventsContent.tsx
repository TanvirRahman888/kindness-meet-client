
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import EventCard, {
  type EventItem,
} from "@/components/events/EventCard";

type EventCategory = {
  _id: string;
  name: string;
  slug: string;
};

type Props = {
  searchParams: Promise<{
    category?: string | string[];
    search?: string | string[];
  }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Normalize text for case-insensitive comparison
function normalize(value: string) {
  return value.trim().toLowerCase();
}

// Read a single URL query parameter
function getParam(value?: string | string[]) {
  return (Array.isArray(value) ? value[0] : value || "").trim();
}

// Create filter links while preserving search
function buildFilterUrl(category: string, search: string) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (search) {
    params.set("search", search);
  }

  const query = params.toString();

  return query
    ? `/upcoming-events?${query}`
    : "/upcoming-events";
}

export default async function UpcomingEventsContent({
  searchParams,
}: Props) {
  // Read URL parameters on server
  const params = await searchParams;

  const requestedCategory = getParam(params.category);
  const search = getParam(params.search);

  let events: EventItem[] = [];
  let categories: EventCategory[] = [];
  let error = "";

  // Fetch upcoming events and categories
  try {
    if (!API_URL) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is not configured."
      );
    }

    const [eventsResponse, categoriesResponse] =
      await Promise.all([
        fetch(`${API_URL}/api/events`, {
          cache: "no-store",
        }),
        fetch(`${API_URL}/api/categories`, {
          cache: "no-store",
        }),
      ]);

    if (!eventsResponse.ok) {
      throw new Error("Failed to fetch events.");
    }

    if (!categoriesResponse.ok) {
      throw new Error("Failed to fetch categories.");
    }

    [events, categories] = await Promise.all([
      eventsResponse.json(),
      categoriesResponse.json(),
    ]);
  } catch (err) {
    console.error("Upcoming Events Error:", err);

    error = "Unable to load events. Please try again later.";
  }

  // Match category name or slug from URL
  const matchedCategory = categories.find(
    (category) =>
      normalize(category.name) ===
        normalize(requestedCategory) ||
      normalize(category.slug) ===
        normalize(requestedCategory)
  );

  const selectedCategory =
    matchedCategory?.name || requestedCategory;

  const normalizedSelectedCategory =
    normalize(selectedCategory);

  const normalizedSearch = normalize(search);

  // Filter events by category and search
  const filteredEvents = events
    .filter((event) => {
      const eventCategory = normalize(event.category || "");

      const matchesCategory =
        !normalizedSelectedCategory ||
        eventCategory === normalizedSelectedCategory;

      const searchFields = [
        event.title,
        event.description,
        event.location,
        event.category,
        event.creatorName || "",
      ];

      const matchesSearch =
        !normalizedSearch ||
        searchFields.some((field) =>
          normalize(field || "").includes(normalizedSearch)
        );

      return matchesCategory && matchesSearch;
    })
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    );

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-82 items-center overflow-hidden bg-accent sm:min-h-100">
        <Image
          src="/hero/upcoming-events-hero.webp"
          alt="Community volunteers working together"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            <HeartHandshake size={16} />
            Join the Movement
          </span>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Events.
            <span className="block text-brand-peach">
              Create Impact.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            Explore meaningful community events, connect
            with volunteers, and make a positive difference
            in people&apos;s lives.
          </p>

          <Link
            href="/dashboard/create-event"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            Create an Event
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <CalendarDays size={18} />
              Community Opportunities
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Find community initiatives that match your
              interests and join others in making a difference.
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal
                size={18}
                className="text-accent"
              />

              <h3 className="text-sm font-semibold text-foreground">
                Filter by Category
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">

              {/* All Events */}
              <Link
                href={buildFilterUrl("", search)}
                aria-current={
                  !selectedCategory ? "page" : undefined
                }
                className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  !selectedCategory
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-foreground hover:border-accent hover:text-accent"
                }`}
              >
                All Events
              </Link>

              {/* Dynamic Category Links */}
              {categories.map((category) => {
                const active =
                  normalizedSelectedCategory ===
                  normalize(category.name);

                return (
                  <Link
                    key={category._id}
                    href={buildFilterUrl(
                      category.name,
                      search
                    )}
                    aria-current={
                      active ? "page" : undefined
                    }
                    className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                      active
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-surface text-foreground hover:border-accent hover:text-accent"
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search and Result Count */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {error
                  ? "Events unavailable"
                  : `${filteredEvents.length} ${
                      filteredEvents.length === 1
                        ? "Event"
                        : "Events"
                    } Found`}
              </p>

              <p className="mt-1 text-xs text-muted">
                {selectedCategory || "All Categories"}
                {search && ` · Search: ${search}`}
              </p>
            </div>

            {/* Server-side Search Form */}
            <form
              action="/upcoming-events"
              method="GET"
              role="search"
              className="flex w-full max-w-md items-center gap-2"
            >
              {selectedCategory && (
                <input
                  type="hidden"
                  name="category"
                  value={selectedCategory}
                />
              )}

              <div className="relative min-w-0 flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  key={search}
                  type="search"
                  name="search"
                  defaultValue={search}
                  placeholder="Search events..."
                  aria-label="Search events"
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Search
              </button>
            </form>
          </div>

          {/* Active Filter Indicator */}
          {(selectedCategory || search) && !error && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted">
                Active filters:
              </span>

              {selectedCategory && (
                <Link
                  href={buildFilterUrl("", search)}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent"
                >
                  {selectedCategory}
                  <X size={14} />
                </Link>
              )}

              {search && (
                <Link
                  href={buildFilterUrl(selectedCategory, "")}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent"
                >
                  {search}
                  <X size={14} />
                </Link>
              )}

              <Link
                href="/upcoming-events"
                className="text-xs font-semibold text-muted underline underline-offset-4 hover:text-accent"
              >
                Clear All
              </Link>
            </div>
          )}

          {/* Events Grid */}
          {error ? (
            <div
              role="alert"
              className="rounded-2xl border border-border bg-surface p-12 text-center"
            >
              <CalendarDays
                size={36}
                className="mx-auto text-accent"
              />

              <h3 className="mt-4 text-lg font-bold text-foreground">
                Unable to Load Events
              </h3>

              <p className="mt-2 text-sm text-muted">
                {error}
              </p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <CalendarDays size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-foreground">
                No Events Found
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted">
                No upcoming events match your selected
                category or search term.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <X size={17} />
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
