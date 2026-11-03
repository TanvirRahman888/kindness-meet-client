
import { Suspense } from "react";

import EventDetailsContent from "@/components/events/EventDetailsContent";
import EventDetailsLoading from "@/components/events/EventDetailsLoading";

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<EventDetailsLoading />}>
      <EventDetailsContent />
    </Suspense>
  );
}
