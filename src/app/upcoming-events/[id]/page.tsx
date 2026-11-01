
import { Suspense } from "react";

import EventDetailsContent from "@/components/events/EventDetailsContent";
import EventDetailsLoading from "@/components/events/EventDetailsLoading";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EventDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<EventDetailsLoading />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
}
