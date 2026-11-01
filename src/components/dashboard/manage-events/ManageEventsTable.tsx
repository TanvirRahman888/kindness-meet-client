
import Image from "next/image";

import {
  CalendarDays,
  ImageOff,
  MapPin,
} from "lucide-react";

import ManageEventActions from "./ManageEventActions";

import type {
  ManagedEvent,
  EventCategory,
} from "./types";

type Props = {
  events: ManagedEvent[];
  categories: EventCategory[];
};

export default function ManageEventsTable({
  events,
  categories,
}: Props) {
  const now = Date.now();

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-230 text-left text-sm">

          {/* Table Header */}
          <thead className="border-b border-border bg-background">
            <tr className="text-xs font-semibold uppercase tracking-wide text-muted">
              <th scope="col" className="px-5 py-4">
                Event
              </th>

              <th scope="col" className="px-5 py-4">
                Category
              </th>

              <th scope="col" className="px-5 py-4">
                Date
              </th>

              <th scope="col" className="px-5 py-4">
                Location
              </th>

              <th scope="col" className="px-5 py-4">
                Status
              </th>

              <th scope="col" className="px-5 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-border">
            {events.map((event) => {
              const date = new Date(event.eventDate);
              const upcoming = date.getTime() > now;

              const formattedDate = date.toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  timeZone: "Asia/Dhaka",
                }
              );

              return (
                <tr
                  key={event._id}
                  className="transition-colors hover:bg-accent/5"
                >
                  {/* Event Information */}
                  <td className="px-5 py-4">
                    <div className="flex min-w-55 items-center gap-3">

                      {/* Event Image */}
                      <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-accent/10 text-accent">
                        {event.imageUrl ? (
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            width={56}
                            height={56}
                            unoptimized
                            className="size-full object-cover"
                          />
                        ) : (
                          <ImageOff size={23} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-52 truncate font-semibold text-foreground">
                          {event.title}
                        </p>

                        <p className="mt-1 text-xs text-muted">
                          Community Event
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                      {event.category}
                    </span>
                  </td>

                  {/* Event Date */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-foreground">
                      <CalendarDays
                        size={16}
                        className="text-accent"
                      />
                      {formattedDate}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-5 py-4">
                    <div className="flex max-w-48 items-center gap-2 text-muted">
                      <MapPin
                        size={16}
                        className="shrink-0 text-accent"
                      />

                      <span className="truncate">
                        {event.location}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                        upcoming
                          ? "bg-accent/10 text-accent"
                          : "bg-background text-muted"
                      }`}
                    >
                      {upcoming ? "Upcoming" : "Past"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <ManageEventActions
                      event={event}
                      categories={categories}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="border-t border-border px-5 py-4 text-xs text-muted">
        Showing {events.length}{" "}
        {events.length === 1 ? "event" : "events"}
      </div>
    </div>
  );
}
