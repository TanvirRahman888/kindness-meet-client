
import Link from "next/link";

import {
  ArrowUpRight,
  BookmarkCheck,
  CalendarPlus,
  Compass,
  Settings2,
} from "lucide-react";

const actions = [
  {
    title: "Create Event",
    description: "Start a new community initiative.",
    href: "/dashboard/create-event",
    icon: CalendarPlus,
    color: "bg-[#FFE1D4] text-[#B44942]",
  },
  {
    title: "Manage Events",
    description: "Edit and manage your created events.",
    href: "/dashboard/manage-events",
    icon: Settings2,
    color: "bg-[#FFF1BC] text-[#926100]",
  },
  {
    title: "Joined Events",
    description: "Manage the events you've joined.",
    href: "/dashboard/joined-events",
    icon: BookmarkCheck,
    color: "bg-[#F8DEE8] text-[#9C5576]",
  },
  {
    title: "Explore Events",
    description: "Find a new volunteer opportunity.",
    href: "/upcoming-events",
    icon: Compass,
    color: "bg-[#F5E2CF] text-[#A5633B]",
  },
];

export default function DashboardQuickActions() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-muted">
          Everything you need, just one click away.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
            >
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-foreground">
                  {action.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {action.description}
                </p>
              </div>

              <ArrowUpRight
                size={17}
                className="shrink-0 text-muted transition group-hover:text-accent"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
