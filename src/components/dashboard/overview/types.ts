
export type CreatedEvent = {
  _id: string;
  title: string;
  category: string;
  location: string;
  eventDate: string;
  createdAt?: string;
};

export type JoinedEvent = {
  eventId: string;
  title: string;
  category: string;
  location: string;
  eventDate: string;
  joinedAt?: string;
};

export type DashboardMetrics = {
  totalCreated: number;
  upcomingHosted: number;
  totalJoined: number;
  upcomingJoined: number;
};

export type UpcomingActivity = {
  id: string;
  title: string;
  category: string;
  location: string;
  eventDate: string;
  role: "Organizer" | "Volunteer";
};

export type CategoryStat = {
  name: string;
  count: number;
};
