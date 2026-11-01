
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  HeartHandshake,
  UsersRound,
} from "lucide-react";

import type { DashboardMetrics } from "./types";

export default function DashboardStats({
  metrics,
}: {
  metrics: DashboardMetrics;
}) {
  const stats = [
    {
      label: "Created Events",
      value: metrics.totalCreated,
      description: "Total events organized",
      icon: CalendarDays,
      href: "/dashboard/manage-events",
      color: "bg-[#FFE1D4] text-[#B44942]",
    },
    {
      label: "Upcoming Hosted",
      value: metrics.upcomingHosted,
      description: "Events you're organizing",
      icon: CalendarClock,
      href: "/dashboard/manage-events",
      color: "bg-[#FFF1BC] text-[#926100]",
    },
    {
      label: "Joined Events",
      value: metrics.totalJoined,
      description: "Total events joined",
      icon: HeartHandshake,
      href: "/dashboard/joined-events",
      color: "bg-[#F8DEE8] text-[#9C5576]",
    },
    {
      label: "Upcoming Joined",
      value: metrics.upcomingJoined,
      description: "Events you're attending",
      icon: UsersRound,
      href: "/dashboard/joined-events",
      color: "bg-[#F5E2CF] text-[#A5633B]",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Your Activity at a Glance
        </h2>

        <p className="mt-1 text-sm text-muted">
          Live statistics from your KindnessMeet activities.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={23} />
                </div>

                <ArrowUpRight
                  size={19}
                  className="text-muted transition group-hover:text-accent"
                />
              </div>

              <p className="mt-6 text-sm font-medium text-muted">
                {stat.label}
              </p>

              <p className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-muted">
                {stat.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
