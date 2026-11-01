
import EventDetailsClient from "./EventDetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailsContent({
  params,
}: Props) {
  const { id } = await params;

  return <EventDetailsClient id={id} />;
}
