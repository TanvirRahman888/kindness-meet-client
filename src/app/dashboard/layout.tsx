
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
  UserRound,
  CalendarPlus,
  Settings,
  BookmarkCheck,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";


// Dashboard navigation links
const dashboardLinks = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Create Event",
    href: "/dashboard/create-event",
    icon: CalendarPlus,
  },
  {
    label: "Manage Events",
    href: "/dashboard/manage-events",
    icon: Settings,
  },
  {
    label: "Joined Events",
    href: "/dashboard/joined-events",
    icon: BookmarkCheck,
  },
];

// Check active route
function isActiveRoute(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

// Sidebar component
function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex h-full flex-col">

      {/* Sidebar Header */}
      <div className="border-b border-border px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <LayoutDashboard size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">
              Dashboard
            </h2>

            <p className="text-xs text-muted">
              KindnessMeet Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
          My Workspace
        </p>

        <nav
          aria-label="Dashboard navigation"
          className="flex flex-col gap-1.5"
        >
          {dashboardLinks.map((link) => {
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
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                  active
                    ? "bg-accent/10 font-semibold text-accent"
                    : "font-medium text-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                <Icon
                  size={19}
                  className="shrink-0"
                />

                <span>{link.label}</span>

                {active && (
                  <span className="ml-auto size-2 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-border p-4">
        <Link
          href="/upcoming-events"
          onClick={onNavigate}
          className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
        >
          Explore Events
          <ArrowUpRight size={18} />
        </Link>

        <p className="mt-4 text-center text-xs text-muted">
          Small Acts. Big Impact.
        </p>
      </div>
    </div>
  );
}

// Main Dashboard Layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get current page for breadcrumb
  const currentPage = dashboardLinks.find((link) =>
    isActiveRoute(pathname, link.href)
  );

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar on Escape key
  useEffect(() => {
    if (!sidebarOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-[calc(100dvh-72px)] bg-background lg:flex">

      {/* Desktop Sidebar */}
      <aside className="sticky top-[72px] hidden h-[calc(100dvh-72px)] w-64 shrink-0 overflow-y-auto border-r border-border bg-surface lg:block">
        <SidebarContent
          pathname={pathname}
          onNavigate={closeSidebar}
        />
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close dashboard navigation"
          onClick={closeSidebar}
          className="fixed inset-x-0 bottom-0 top-[72px] z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        id="dashboard-mobile-sidebar"
        aria-label="Dashboard sidebar"
        inert={!sidebarOpen}
        className={`fixed bottom-0 left-0 top-[72px] z-40 w-[min(288px,85vw)] overflow-y-auto border-r border-border bg-surface shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <SidebarContent
          pathname={pathname}
          onNavigate={closeSidebar}
        />
      </aside>

      {/* Main Dashboard Area */}
      <div className="min-w-0 flex-1">

        {/* Dashboard Topbar */}
        <div className="sticky top-[72px] z-20 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

            {/* Left Side */}
            <div className="flex min-w-0 items-center gap-3">

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(!sidebarOpen)
                }
                aria-label={
                  sidebarOpen
                    ? "Close dashboard menu"
                    : "Open dashboard menu"
                }
                aria-expanded={sidebarOpen}
                aria-controls="dashboard-mobile-sidebar"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-accent/10 lg:hidden"
              >
                {sidebarOpen ? (
                  <X size={21} />
                ) : (
                  <Menu size={21} />
                )}
              </button>

              {/* Breadcrumb */}
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <Link
                  href="/dashboard"
                  className="hidden text-muted transition-colors hover:text-accent sm:inline"
                >
                  Dashboard
                </Link>

                <span className="hidden text-muted sm:inline">
                  /
                </span>

                <span className="truncate font-semibold text-foreground">
                  {currentPage?.label ?? "Dashboard"}
                </span>
              </div>
            </div>

            {/* Right Side */}
            <Link
              href="/"
              className="shrink-0 text-xs font-medium text-accent transition hover:underline sm:text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Dashboard Page Content */}
        <div className="min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
