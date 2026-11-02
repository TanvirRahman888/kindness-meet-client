
import Link from "next/link";

import {
  ArrowRight,
  CalendarPlus,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-[#B44942] via-[#A9443F] to-[#7C302F] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12">

          {/* Decorative Shapes */}
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 size-72 rounded-full border border-white/15" />

          <div className="pointer-events-none absolute -bottom-36 right-20 -z-10 size-64 rounded-full border border-white/10" />

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">

            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                <Sparkles size={15} />
                Make a Difference
              </span>

              <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Ready to Make Your Community Better?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                Every meaningful change begins with someone
                willing to take the first step. Join a
                community event or create your own initiative
                with KindnessMeet.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 lg:flex-col xl:flex-row">
              <Link
                href="/upcoming-events"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#8B3934] transition hover:bg-[#FFF1E9]"
              >
                <HeartHandshake size={18} />
                Explore Events
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/dashboard/create-event"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                <CalendarPlus size={18} />
                Create an Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
