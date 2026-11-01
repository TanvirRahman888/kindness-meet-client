
import Link from "next/link";

import {
  ArrowRight,
  CalendarPlus,
  HeartHandshake,
} from "lucide-react";

export default function HowItWorksCTA() {
  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl bg-linear-to-br from-brand-peach via-brand-butter to-brand-peach p-6 sm:p-9 lg:p-12">

      {/* Decorations */}
      <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-[#B44942]/15" />
      <div className="pointer-events-none absolute -bottom-24 right-24 size-60 rounded-full border border-[#B44942]/15" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Text */}
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-[#B44942]">
            <HeartHandshake size={16} />
            Start Making a Difference
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight text-[#45302F] sm:text-3xl">
            Every Small Act Can Create
            <span className="block text-[#B44942]">
              A Bigger Impact.
            </span>
          </h3>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6F5149] sm:text-base">
            Whether you want to volunteer your time or
            organize a meaningful community initiative,
            KindnessMeet helps you take the first step.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B44942] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#963A35]"
          >
            Explore Events
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/dashboard/create-event"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#B44942]/20 bg-white/85 px-5 py-3 text-sm font-semibold text-[#45302F] transition hover:bg-white"
          >
            <CalendarPlus size={17} />
            Create an Event
          </Link>
        </div>
      </div>
    </div>
  );
}
