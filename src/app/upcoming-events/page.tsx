
import { Suspense } from "react";

import UpcomingEventsContent from "@/components/events/UpcomingEventsContent";
import UpcomingEventsLoading from "@/components/events/UpcomingEventsLoading";

type Props = {
  searchParams: Promise<{
    category?: string | string[];
    search?: string | string[];
  }>;
};

export default function UpcomingEventsPage({
  searchParams,
}: Props) {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<UpcomingEventsLoading />}>
        <UpcomingEventsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
