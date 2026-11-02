
import {
  BellRing,
  CalendarDays,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import SubscribeForm from "./subscribe-form";

export default function SubscribeSection() {
  return (
    <section
      id="subscribe"
      className="bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Subscribe Container */}
        <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-linear-to-br from-brand-peach/35 via-surface to-brand-butter/30 p-6 sm:p-9 lg:p-12">

          {/* Background Decorations */}
          <div className="pointer-events-none absolute -right-24 -top-28 -z-10 size-80 rounded-full bg-brand-peach/40 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-10 -z-10 size-72 rounded-full bg-brand-butter/40 blur-3xl" />

          {/* Two-column Layout */}
          <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">

            {/* Left Content */}
            <div>

              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
                <Sparkles size={15} />
                Stay in the Loop
              </span>

              {/* Heading */}
              <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
                A Little Kindness,{" "}
                <span className="text-accent">
                  Delivered to Your Inbox.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted sm:text-base">
                Be part of something meaningful. Our planned
                newsletter will bring you community event
                announcements, volunteer opportunities,
                and inspiring updates.
              </p>

              {/* Benefits */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">

                <div className="flex items-center gap-2 text-xs font-semibold text-foreground sm:text-sm">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <CalendarDays size={17} />
                  </span>
                  Community Events
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-foreground sm:text-sm">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <HeartHandshake size={17} />
                  </span>
                  Volunteer Opportunities
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-foreground sm:text-sm">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <BellRing size={17} />
                  </span>
                  Community Updates
                </div>
              </div>
            </div>

            {/* Right Subscribe Form */}
            <SubscribeForm />

          </div>
        </div>
      </div>
    </section>
  );
}
