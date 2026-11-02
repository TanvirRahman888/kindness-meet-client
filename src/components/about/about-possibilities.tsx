
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarPlus,
  CalendarSearch,
  HeartHandshake,
  UsersRound,
} from "lucide-react";

const possibilities = [
  {
    number: "01",
    title: "Discover Community Events",
    description:
      "Explore upcoming events, browse categories, and find meaningful opportunities in your community.",
    icon: CalendarSearch,
    href: "/upcoming-events",
    color: "bg-[#FFE1D4] text-[#B44942]",
  },
  {
    number: "02",
    title: "Join as a Volunteer",
    description:
      "Participate in community initiatives, connect with other volunteers, and track the events you join.",
    icon: UsersRound,
    href: "/upcoming-events",
    color: "bg-[#FFF1BC] text-[#926100]",
  },
  {
    number: "03",
    title: "Organize Your Own Event",
    description:
      "Create social service events, manage event details, and bring people together for a meaningful cause.",
    icon: CalendarPlus,
    href: "/dashboard/create-event",
    color: "bg-[#F8DEE8] text-[#9C5576]",
  },
];

export default function AboutPossibilities() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* Left Introduction */}
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
              <HeartHandshake size={15} />
              Our Platform
            </span>

            <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
              One Platform.{" "}
              <span className="text-accent">
                Many Ways to Help.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted sm:text-base">
              Whether you are looking for an opportunity
              to volunteer or planning your own community
              initiative, KindnessMeet helps you take
              meaningful action.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-accent" />
              <span className="h-1 w-6 rounded-full bg-accent/30" />
              <span className="h-1 w-6 rounded-full bg-accent/10" />
            </div>
          </div>

          {/* Right Feature List */}
          <div className="space-y-4">
            {possibilities.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.number}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md sm:gap-5 sm:p-6"
                >
                  {/* Icon */}
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl sm:size-14 ${item.color}`}
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-accent sm:text-lg">
                        {item.title}
                      </h3>

                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </div>

                    <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
