
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  MapPin,
  HeartHandshake,
  CalendarClock,
} from "lucide-react";

import type { UpcomingActivity } from "./types";

export default function DashboardUpcoming({
  events,
}: {
  events: UpcomingActivity[];
}) {
  return (
    <section className="h-full rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Your Upcoming Schedule
          </h2>

          <p className="mt-1 text-xs text-muted">
            Events you are hosting or attending next.
          </p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <CalendarDays size={21} />
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CalendarDays
            size={36}
            className="mb-4 text-accent/50"
          />

          <h3 className="font-semibold text-foreground">
            No Upcoming Activities
          </h3>

          <p className="mt-2 max-w-xs text-sm text-muted">
            Create an event or join a community initiative
            to start your schedule.
          </p>

          <Link
            href="/upcoming-events"
            className="mt-5 text-sm font-semibold text-accent hover:underline"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {events.map((event) => {
            const date = new Date(event.eventDate);

            const day = date.toLocaleDateString("en-US", {
              day: "2-digit",
              timeZone: "Asia/Dhaka",
            });

            const month = date.toLocaleDateString("en-US", {
              month: "short",
              timeZone: "Asia/Dhaka",
            });

            const time = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              timeZone: "Asia/Dhaka",
            });

            const hosting = event.role === "Organizer";

            return (
              <Link
                key={`${event.role}-${event.id}`}
                href={`/upcoming-events/${event.id}`}
                className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                {/* Date */}
                <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-accent/10">
                  <span className="text-lg font-extrabold text-accent">
                    {day}
                  </span>

                  <span className="text-[10px] font-bold uppercase text-accent">
                    {month}
                  </span>
                </div>

                {/* Event Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-foreground transition group-hover:text-accent">
                    {event.title}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <MapPin size={13} className="shrink-0" />
                    <span className="truncate">
                      {event.location}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {time}
                  </p>
                </div>

                {/* Role */}
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-semibold ${
                    hosting
                      ? "bg-accent/10 text-accent"
                      : "bg-brand-butter/50 text-foreground"
                  }`}
                >
                  {hosting ? (
                    <CalendarClock size={13} />
                  ) : (
                    <HeartHandshake size={13} />
                  )}

                  {hosting ? "Hosting" : "Joined"}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-6 border-t border-border pt-4">
        <Link
          href="/dashboard/joined-events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
        >
          View Joined Events
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
