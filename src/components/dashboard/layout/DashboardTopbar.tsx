
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeft,
  CalendarPlus,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { getDashboardTitle } from "./dashboard-links";

type Props = {
  sidebarOpen: boolean;
  onToggleMenu: () => void;
};

export default function DashboardTopbar({
  sidebarOpen,
  onToggleMenu,
}: Props) {
  const pathname = usePathname();

  const currentPage = getDashboardTitle(pathname);

  return (
    <header className="sticky top-18 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="flex min-h-19 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label={
              sidebarOpen
                ? "Close dashboard menu"
                : "Open dashboard menu"
            }
            aria-expanded={sidebarOpen}
            aria-controls="dashboard-mobile-sidebar"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:border-accent/40 hover:text-accent lg:hidden"
          >
            {sidebarOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

          {/* Breadcrumb and Page Title */}
          <div className="min-w-0">

            <nav
              aria-label="Breadcrumb"
              className="hidden items-center gap-2 text-xs text-muted sm:flex"
            >
              <Link
                href="/dashboard"
                className="transition hover:text-accent"
              >
                Dashboard
              </Link>

              <ChevronRight size={14} />

              <span
                aria-current="page"
                className="truncate font-medium text-accent"
              >
                {currentPage}
              </span>
            </nav>

            <h1 className="truncate text-lg font-bold text-foreground sm:mt-1 sm:text-xl">
              {currentPage}
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Home */}
          <Link
            href="/"
            aria-label="Back to homepage"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-muted transition hover:border-accent/40 hover:text-accent sm:size-auto sm:gap-2 sm:px-4 sm:py-2.5"
          >
            <ArrowLeft size={16} />

            <span className="hidden text-sm font-medium sm:inline">
              Home
            </span>
          </Link>

          {/* Create Event */}
          <Link
            href="/dashboard/create-event"
            className="hidden items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:inline-flex"
          >
            <CalendarPlus size={17} />
            New Event
          </Link>
        </div>
      </div>
    </header>
  );
}
