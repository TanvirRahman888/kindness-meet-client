
import Link from "next/link";

import {
  ArrowRight,
  CalendarPlus,
  HeartHandshake,
} from "lucide-react";

export default function UpcomingEventsEmpty() {
  return (
    <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center shadow-sm">

      <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <HeartHandshake size={38} />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-foreground">
        No Upcoming Events Yet
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
        There are no upcoming community events right now.
        You can be the one to organize the next initiative
        and bring people together.
      </p>

      <Link
        href="/dashboard/create-event"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <CalendarPlus size={18} />
        Create an Event
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
