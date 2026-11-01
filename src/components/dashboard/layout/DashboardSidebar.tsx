
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import {
  dashboardGroups,
  isActiveRoute,
} from "./dashboard-links";

type Props = {
  onNavigate: () => void;
};

export default function DashboardSidebar({
  onNavigate,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">

      {/* Sidebar Branding */}
      <div className="border-b border-border px-5 py-6">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-sm">
            <HeartHandshake size={25} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-extrabold tracking-tight text-foreground">
              KindnessMeet
            </h2>

            <p className="mt-0.5 text-xs text-muted">
              My Workspace
            </p>
          </div>
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex-1 space-y-7 px-3 py-6">

        {dashboardGroups.map((group) => (
          <div key={group.label}>

            {/* Group Title */}
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
              {group.label}
            </p>

            <nav
              aria-label={group.label}
              className="space-y-1"
            >
              {group.links.map((link) => {
                const Icon = link.icon;

                const active = isActiveRoute(
                  pathname,
                  link.href
                );

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={
                      active ? "page" : undefined
                    }
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                      active
                        ? "bg-accent/10 font-semibold text-accent"
                        : "font-medium text-muted hover:bg-accent/5 hover:text-foreground"
                    }`}
                  >
                    {/* Active Indicator */}
                    {active && (
                      <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-accent" />
                    )}

                    {/* Icon */}
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        active
                          ? "bg-accent/10 text-accent"
                          : "bg-background text-muted group-hover:text-accent"
                      }`}
                    >
                      <Icon size={19} />
                    </span>

                    <span className="flex-1">
                      {link.label}
                    </span>

                    {active && (
                      <span className="size-1.5 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="space-y-4 border-t border-border p-4">

        {/* Community Link */}
        <Link
          href="/upcoming-events"
          onClick={onNavigate}
          className="group flex items-center justify-between gap-3 rounded-2xl border border-accent/15 bg-accent/5 p-4 transition hover:border-accent/40 hover:bg-accent/10"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Sparkles size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-foreground">
                Explore Events
              </p>

              <p className="mt-1 text-xs text-muted">
                Make an impact
              </p>
            </div>
          </div>

          <ArrowUpRight
            size={18}
            className="shrink-0 text-accent transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>

        <div className="flex items-center justify-center gap-2 pb-1 text-xs text-muted">
          <HeartHandshake
            size={15}
            className="text-accent"
          />

          Small Acts. Big Impact.
        </div>
      </div>
    </div>
  );
}
