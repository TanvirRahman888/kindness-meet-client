
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
} from "lucide-react";

export default function JoinedEventsEmpty() {
  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center shadow-sm">
      <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <HeartHandshake size={32} />
      </div>

      <h3 className="text-xl font-bold text-foreground">
        No Joined Events Yet
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        You have not joined any community events yet.
        Explore upcoming activities and start making
        a positive impact.
      </p>

      <Link
        href="/upcoming-events"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <CalendarDays size={18} />
        Explore Upcoming Events
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
