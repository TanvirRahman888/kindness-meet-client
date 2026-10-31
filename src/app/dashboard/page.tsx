
import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarPlus,
  CalendarDays,
  UserRound,
  Settings,
  BookmarkCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

// Dashboard quick access cards
const dashboardCards = [
  {
    title: "My Profile",
    description:
      "View and update your personal information and profile picture.",
    href: "/dashboard/profile",
    icon: UserRound,
    color: "bg-[#FFE0CF] text-[#B44942]",
  },
  {
    title: "Create Event",
    description:
      "Organize a new community event and bring people together.",
    href: "/dashboard/create-event",
    icon: CalendarPlus,
    color: "bg-[#FFF1BC] text-[#9A6500]",
  },
  {
    title: "Manage Events",
    description:
      "View, edit, and manage the community events you created.",
    href: "/dashboard/manage-events",
    icon: Settings,
    color: "bg-[#F8DEE8] text-[#9C5576]",
  },
  {
    title: "Joined Events",
    description:
      "Track upcoming events you've joined and your participation.",
    href: "/dashboard/joined-events",
    icon: BookmarkCheck,
    color: "bg-[#F5E2CF] text-[#A5633B]",
  },
];

// Dashboard loading skeleton
function DashboardSkeleton() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-8">

        {/* Welcome Banner Skeleton */}
        <div className="space-y-5 rounded-3xl bg-default/50 p-6 sm:p-8 lg:p-10">
          <div className="h-7 w-48 rounded-full bg-accent/10" />

          <div className="h-10 max-w-md rounded-lg bg-accent/10" />

          <div className="h-4 max-w-xl rounded bg-accent/10" />

          <div className="h-4 max-w-sm rounded bg-accent/10" />

          <div className="flex gap-3 pt-2">
            <div className="h-11 w-36 rounded-xl bg-accent/10" />
            <div className="h-11 w-36 rounded-xl bg-accent/10" />
          </div>
        </div>

        {/* Quick Access Skeleton */}
        <section className="space-y-5">
          <div className="h-7 w-44 rounded-lg bg-default/70" />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-56 rounded-2xl border border-border bg-surface p-6"
              >
                <div className="mb-6 size-12 rounded-xl bg-default/70" />
                <div className="mb-3 h-5 w-28 rounded bg-default/70" />
                <div className="mb-2 h-3 w-full rounded bg-default/70" />
                <div className="h-3 w-3/4 rounded bg-default/70" />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Cards Skeleton */}
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="h-60 rounded-2xl border border-border bg-surface p-6">
            <div className="h-6 w-36 rounded bg-default/70" />
            <div className="mt-8 h-4 w-48 rounded bg-default/70" />
            <div className="mt-5 h-4 w-56 rounded bg-default/70" />
          </div>

          <div className="h-60 rounded-2xl border border-border bg-surface p-6">
            <div className="h-6 w-44 rounded bg-default/70" />
            <div className="mt-8 h-4 w-full rounded bg-default/70" />
            <div className="mt-3 h-4 w-3/4 rounded bg-default/70" />
          </div>
        </section>
      </div>
    </main>
  );
}

// Session-dependent dashboard content
async function DashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  const firstName =
    user.name?.trim().split(/\s+/)[0] || "Volunteer";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-brand-peach via-brand-butter to-brand-peach p-6 sm:p-8 lg:p-10">
        <div className="relative z-10 max-w-2xl">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-[#B44942]">
            <Sparkles size={15} />
            Your Community Workspace
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#45302F] sm:text-4xl">
            Welcome back, {firstName}!
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6F5149] sm:text-base">
            Every act of kindness makes a difference.
            Create meaningful events, connect with
            volunteers, and help build a stronger community.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/create-event"
              className="inline-flex items-center gap-2 rounded-xl bg-[#B44942] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#963A35]"
            >
              <CalendarPlus size={18} />
              Create Event
            </Link>

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E8C4AE] bg-white/85 px-5 py-3 text-sm font-semibold text-[#45302F] transition hover:bg-white"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Decorative Icon */}
        <HeartHandshake
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -right-10 size-56 rotate-[-15deg] text-[#B44942]/10 sm:size-72"
          strokeWidth={1}
        />
      </section>

      {/* Quick Access */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Quick Access
          </h2>

          <p className="mt-2 text-sm text-muted">
            Everything you need to manage your KindnessMeet activities.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${card.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-muted transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {card.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {card.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent">
                  View Details
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Account and Community Section */}
      <section className="grid gap-5 lg:grid-cols-2">

        {/* User Information */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                My Account
              </h2>

              <p className="text-xs text-muted">
                Your KindnessMeet profile information
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted">
                Full Name
              </p>

              <p className="mt-1 font-medium text-foreground">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">
                Email Address
              </p>

              <p className="mt-1 break-all font-medium text-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/profile"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Edit Profile
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Community Activity */}
        <div className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <CalendarDays size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Community Activities
              </h2>

              <p className="text-xs text-muted">
                Discover ways to get involved
              </p>
            </div>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-muted">
            Discover upcoming community cleanup drives,
            donation programs, tree plantation events,
            and other volunteering opportunities.
          </p>

          <Link
            href="/upcoming-events"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Browse Upcoming Events
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Bottom Message */}
      <div className="flex items-center justify-center gap-2 pb-4 text-center text-sm text-muted">
        <HeartHandshake size={18} className="text-accent" />
        Small Acts. Big Impact.
      </div>
    </main>
  );
}

// Page component with Suspense boundary
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
