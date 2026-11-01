
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import EventCard, {
  type EventItem,
} from "@/components/events/EventCard";

import UpcomingEventsEmpty from "./upcoming-events-empty";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getUpcomingEvents(): Promise<EventItem[]> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${API_URL}/api/events`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming events.");
  }

  const events: EventItem[] = await response.json();

  return events.slice(0, 6);
}

export default async function UpcomingEvents() {
  let events: EventItem[] = [];
  let hasError = false;

  try {
    events = await getUpcomingEvents();
  } catch (error) {
    console.error("Upcoming events error:", error);
    hasError = true;
  }

  return (
    <section
      id="upcoming-events"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
              <Sparkles size={15} />
              Make a Difference Today
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
              Discover Upcoming
              <span className="text-accent"> Community Events</span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
              Find meaningful opportunities to help others.
              Explore upcoming community initiatives, connect
              with volunteers, and be part of something bigger.
            </p>
          </div>

          {/* View All Button */}
          <Link
            href="/upcoming-events"
            className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            View All Events

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Events */}
        {hasError ? (
          <div
            role="alert"
            className="rounded-2xl border border-border bg-surface px-6 py-14 text-center"
          >
            <CalendarDays
              size={36}
              className="mx-auto text-accent"
            />

            <h3 className="mt-4 text-lg font-bold text-foreground">
              Unable to Load Events
            </h3>

            <p className="mt-2 text-sm text-muted">
              Please try again later.
            </p>
          </div>
        ) : events.length === 0 ? (
          <UpcomingEventsEmpty />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!hasError && events.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/upcoming-events"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Explore More Events

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
