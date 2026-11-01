
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";

import DashboardWelcome from "./DashboardWelcome";
import DashboardStats from "./DashboardStats";
import DashboardUpcoming from "./DashboardUpcoming";
import DashboardInsights from "./DashboardInsights";
import DashboardQuickActions from "./DashboardQuickActions";

import type {
  CreatedEvent,
  JoinedEvent,
  DashboardMetrics,
  UpcomingActivity,
  CategoryStat,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function DashboardContent() {
  // Authentication
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  // Fetch real data from Express
  const [createdResponse, joinedResponse] = await Promise.all([
    fetch(`${API_URL}/api/my-events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }),

    fetch(`${API_URL}/api/my-joined-events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }),
  ]);

  if (!createdResponse.ok || !joinedResponse.ok) {
    throw new Error("Failed to fetch dashboard data.");
  }

  const [createdEvents, joinedEvents]: [
    CreatedEvent[],
    JoinedEvent[],
  ] = await Promise.all([
    createdResponse.json(),
    joinedResponse.json(),
  ]);

  // Calculate statistics
  const now = Date.now();

  const upcomingHosted = createdEvents.filter(
    (event) => new Date(event.eventDate).getTime() > now
  );

  const upcomingJoined = joinedEvents.filter(
    (event) => new Date(event.eventDate).getTime() > now
  );

  const metrics: DashboardMetrics = {
    totalCreated: createdEvents.length,
    upcomingHosted: upcomingHosted.length,
    totalJoined: joinedEvents.length,
    upcomingJoined: upcomingJoined.length,
  };

  // Prepare upcoming schedule
  const upcomingActivities: UpcomingActivity[] = [
    ...upcomingHosted.map((event) => ({
      id: event._id,
      title: event.title,
      category: event.category,
      location: event.location,
      eventDate: event.eventDate,
      role: "Organizer" as const,
    })),

    ...upcomingJoined.map((event) => ({
      id: event.eventId,
      title: event.title,
      category: event.category,
      location: event.location,
      eventDate: event.eventDate,
      role: "Volunteer" as const,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    )
    .slice(0, 5);

  // Calculate event category statistics
  const categoryCounts = createdEvents.reduce<
    Record<string, number>
  >((counts, event) => {
    const category = event.category || "Other";

    counts[category] = (counts[category] || 0) + 1;

    return counts;
  }, {});

  const categoryStats: CategoryStat[] = Object.entries(
    categoryCounts
  )
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const upcomingTotal =
    metrics.upcomingHosted + metrics.upcomingJoined;

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <DashboardWelcome
        name={session.user.name || "Volunteer"}
        upcomingCount={upcomingTotal}
      />

      {/* Live Statistics */}
      <DashboardStats metrics={metrics} />

      {/* Upcoming Schedule and Insights */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <DashboardUpcoming events={upcomingActivities} />

        <DashboardInsights
          metrics={metrics}
          categories={categoryStats}
        />
      </div>

      {/* Quick Actions */}
      <DashboardQuickActions />
    </div>
  );
}
