
import { Suspense } from "react";
import Link from "next/link";

import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import JoinedEventsContent from "@/components/dashboard/joined-events/JoinedEventsContent";
import JoinedEventsLoading from "@/components/dashboard/joined-events/JoinedEventsLoading";

export default function JoinedEventsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Joined Events
          </h1>

          <p className="mt-2 text-sm text-muted">
            Track upcoming activities, view event details,
            and manage your participation.
          </p>
        </div>

        {/* Upcoming Events Button */}
        <Link
          href="/upcoming-events"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <CalendarDays size={18} />
          Explore Upcoming Events
          <ArrowRight size={17} />
        </Link>
      </div>

      {/* Server-rendered Joined Events */}
      <Suspense fallback={<JoinedEventsLoading />}>
        <JoinedEventsContent />
      </Suspense>
    </main>
  );
}
