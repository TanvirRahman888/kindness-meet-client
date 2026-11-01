
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";

import JoinedEventsStats from "./JoinedEventsStats";
import JoinedEventsTable from "./JoinedEventsTable";
import JoinedEventsEmpty from "./JoinedEventsEmpty";

import type { JoinedEvent } from "./types";

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export default async function JoinedEventsContent() {
  // Better Auth session
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Get JWT
  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  // Fetch joined events
  const response = await fetch(
    `${API_URL}/api/my-joined-events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch joined events.");
  }

  const events: JoinedEvent[] = await response.json();

  // Statistics
  const now = Date.now();

  const upcomingCount = events.filter(
    (event) =>
      new Date(event.eventDate).getTime() > now
  ).length;

  const pastCount = events.length - upcomingCount;

  return (
    <div className="space-y-8">

      {/* Statistics */}
      <JoinedEventsStats
        total={events.length}
        upcoming={upcomingCount}
        past={pastCount}
      />

      {/* Joined Events Section */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-foreground">
            My Joined Events
          </h2>

          <p className="mt-2 text-sm text-muted">
            View and manage your community event participation.
          </p>
        </div>

        {events.length > 0 ? (
          <JoinedEventsTable events={events} />
        ) : (
          <JoinedEventsEmpty />
        )}
      </section>
    </div>
  );
}
