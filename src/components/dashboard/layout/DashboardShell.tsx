
"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

type Props = {
  children: ReactNode;
};

export default function DashboardShell({
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  // Close on Escape and lock background scrolling
  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-[calc(100dvh-72px)] bg-background">

      {/* Desktop Sidebar */}
      <aside
        aria-label="Dashboard sidebar"
        className="sticky top-18 hidden h-[calc(100dvh-72px)] w-72 shrink-0 overflow-y-auto border-r border-border bg-surface lg:block"
      >
        <DashboardSidebar onNavigate={closeSidebar} />
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close dashboard sidebar"
          onClick={closeSidebar}
          className="fixed inset-x-0 bottom-0 top-18 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        id="dashboard-mobile-sidebar"
        aria-label="Dashboard mobile sidebar"
        inert={!sidebarOpen}
        className={`fixed bottom-0 left-0 top-18 z-50 w-[min(300px,88vw)] overflow-y-auto border-r border-border bg-surface shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <DashboardSidebar onNavigate={closeSidebar} />
      </aside>

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Topbar */}
        <DashboardTopbar
          sidebarOpen={sidebarOpen}
          onToggleMenu={toggleSidebar}
        />

        {/* Page Content */}
        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
