
import Link from "next/link";

import {
  ArrowRight,
  CalendarPlus,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

type Props = {
  name: string;
  upcomingCount: number;
};

export default function DashboardWelcome({
  name,
  upcomingCount,
}: Props) {
  const firstName =
    name?.trim().split(/\s+/)[0] || "Volunteer";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-peach via-brand-butter to-brand-peach p-6 sm:p-9 lg:p-10">

      {/* Decoration */}
      <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-[#B44942]/15" />

      <div className="pointer-events-none absolute -bottom-28 right-16 size-64 rounded-full border border-[#B44942]/15" />

      <HeartHandshake
        aria-hidden="true"
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-10 right-2 hidden size-64 rotate-[-14deg] text-[#B44942]/15 lg:block"
      />

      <div className="relative z-10 max-w-2xl">

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B44942]/15 bg-white/70 px-4 py-2 text-xs font-semibold text-[#B44942]">
          <Sparkles size={16} />
          Your KindnessMeet Workspace
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#45302F] sm:text-4xl lg:text-5xl">
          Welcome back, {firstName}!
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6F5149] sm:text-base">
          Every community effort starts with someone who cares.
          Keep organizing, volunteering, and making a difference.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#B44942]/15 bg-white/65 px-4 py-3 text-sm font-medium text-[#45302F]">
          <HeartHandshake size={19} className="text-[#B44942]" />

          {upcomingCount === 0
            ? "Ready to make your next impact?"
            : `You have ${upcomingCount} upcoming ${
                upcomingCount === 1 ? "activity" : "activities"
              }.`}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/dashboard/create-event"
            className="inline-flex items-center gap-2 rounded-xl bg-[#B44942] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#963A35]"
          >
            <CalendarPlus size={18} />
            Create Event
          </Link>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E8C4AE] bg-white/90 px-5 py-3 text-sm font-semibold text-[#45302F] transition hover:bg-white"
          >
            Explore Events
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
