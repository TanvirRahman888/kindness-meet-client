
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";

import ManageEventsStats from "./ManageEventsStats";
import ManageEventsTable from "./ManageEventsTable";

import type {
  ManagedEvent,
  EventCategory,
} from "./types";

import { CalendarPlus } from "lucide-react";

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export default async function ManageEventsContent() {
  // Better Auth session
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Better Auth JWT
  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  // Fetch events and categories
  const [eventsResponse, categoriesResponse] =
    await Promise.all([
      fetch(`${API_URL}/api/my-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }),

      fetch(`${API_URL}/api/categories`, {
        cache: "no-store",
      }),
    ]);

  if (!eventsResponse.ok) {
    throw new Error("Failed to fetch your events.");
  }

  const events: ManagedEvent[] =
    await eventsResponse.json();

  const categories: EventCategory[] =
    categoriesResponse.ok
      ? await categoriesResponse.json()
      : [];

  // Event statistics
  const now = Date.now();

  const upcomingCount = events.filter(
    (event) =>
      new Date(event.eventDate).getTime() > now
  ).length;

  const pastCount = events.length - upcomingCount;

  return (
    <div className="space-y-8">

      {/* Statistics */}
      <ManageEventsStats
        total={events.length}
        upcoming={upcomingCount}
        past={pastCount}
      />

      {/* Events */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-foreground">
            My Created Events
          </h2>

          <p className="mt-2 text-sm text-muted">
            All community events created by you.
          </p>
        </div>

        {events.length > 0 ? (
          <ManageEventsTable
            events={events}
            categories={categories}
          />
        ) : (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">

            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <CalendarPlus size={30} />
            </div>

            <h3 className="text-xl font-bold text-foreground">
              No Events Created Yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              You haven't created any community events yet.
              Start by organizing your first event.
            </p>

            <Link
              href="/dashboard/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <CalendarPlus size={18} />
              Create Your First Event
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
