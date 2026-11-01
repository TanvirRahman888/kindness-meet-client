
export type ManagedEvent = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  eventDate: string;
  imageUrl: string;
  creatorId: string;
  creatorName?: string;
  creatorEmail?: string;
  createdAt: string;
};

export type EventCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type UpdateEventData = Pick<
  ManagedEvent,
  | "title"
  | "description"
  | "category"
  | "location"
  | "eventDate"
  | "imageUrl"
>;
