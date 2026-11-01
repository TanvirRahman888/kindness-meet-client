
import Link from "next/link";

import {
  ArrowRight,
  CalendarPlus,
  CalendarSearch,
  HeartHandshake,
  LayoutDashboard,
  Sparkles,
  UsersRound,
} from "lucide-react";

import WhyKindnessMeetFeature from "./why-kindnessmeet-feature";
import WhyKindnessMeetVisual from "./why-kindnessmeet-visual";

const features = [
  {
    title: "Discover Meaningful Opportunities",
    description:
      "Explore community events by cause and location. Find opportunities that matter to you.",
    icon: CalendarSearch,
    color: "bg-[#FFE1D4] text-[#B44942]",
  },
  {
    title: "Become Part of Something Bigger",
    description:
      "Join events as a volunteer and connect with people who share your passion for helping others.",
    icon: UsersRound,
    color: "bg-[#FFF1BC] text-[#926100]",
  },
  {
    title: "Bring Your Own Ideas to Life",
    description:
      "Create community events, manage details, and invite others to participate.",
    icon: CalendarPlus,
    color: "bg-[#F8DEE8] text-[#9C5576]",
  },
  {
    title: "Everything in One Workspace",
    description:
      "Manage your created and joined events from your personal dashboard.",
    icon: LayoutDashboard,
    color: "bg-[#F5E2CF] text-[#A5633B]",
  },
];

export default function WhyKindnessMeet() {
  return (
    <section
      id="why-kindnessmeet"
      className="relative overflow-hidden border-y border-border bg-surface/30 py-16 sm:py-18 lg:py-20"
    >

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 top-0 size-80 rounded-full bg-brand-peach/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-0 size-80 rounded-full bg-brand-butter/15 blur-3xl" />

      {/* Same Container as Other Homepage Sections */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Two-column Layout */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">

          {/* Left Image */}
          <WhyKindnessMeetVisual />

          {/* Right Content */}
          <div className="min-w-0">

            {/* Section Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
              <Sparkles size={14} />
              Why KindnessMeet
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[40px]">
              Turn good intentions
              <span className="block text-accent">
                into real action.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              KindnessMeet connects community events,
              passionate volunteers, and meaningful causes
              in one simple platform. Discover opportunities,
              organize initiatives, and make a difference together.
            </p>

            {/* Decorative Divider */}
            <div className="my-6 flex items-center gap-2">
              <span className="h-1 w-10 rounded-full bg-accent" />
              <span className="h-1 w-5 rounded-full bg-accent/30" />
              <span className="h-1 w-5 rounded-full bg-accent/10" />
            </div>

            {/* Feature List */}
            <div>
              {features.map((feature) => (
                <WhyKindnessMeetFeature
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={feature.color}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">

              {/* Explore Events */}
              <Link
                href="/upcoming-events"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <HeartHandshake size={17} />

                Explore Events

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* Create Event */}
              <Link
                href="/dashboard/create-event"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
              >
                <CalendarPlus size={17} />

                Create an Event

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
