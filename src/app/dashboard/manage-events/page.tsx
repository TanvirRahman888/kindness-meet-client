
import { Suspense } from "react";
import Link from "next/link";

import { CalendarPlus } from "lucide-react";
import ManageEventsLoading from "@/components/dashboard/manage-events/ManageEventsLoading";
import ManageEventsContent from "@/components/dashboard/manage-events/ManageEventsContent";


export default function ManageEventsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Manage Events
          </h1>

          <p className="mt-2 text-sm text-muted">
            View, edit, and manage your community events.
          </p>
        </div>

        <Link
          href="/dashboard/create-event"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <CalendarPlus size={18} />
          Create New Event
        </Link>
      </div>

      {/* Server-rendered Event Data */}
      <Suspense fallback={<ManageEventsLoading />}>
        <ManageEventsContent />
      </Suspense>
    </main>
  );
}
