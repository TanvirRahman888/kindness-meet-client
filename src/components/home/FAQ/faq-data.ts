
export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is KindnessMeet?",
    answer:
      "KindnessMeet is a community-driven event platform where people can discover, create, and join social service initiatives. It helps volunteers and event organizers connect to make a positive impact.",
  },
  {
    id: 2,
    question: "How can I join a community event?",
    answer:
      "Browse upcoming events, choose an event that interests you, and open its details page. Sign in to your account and click the Join Event button. You can then track your participation from your dashboard.",
  },
  {
    id: 3,
    question: "Can I create my own community event?",
    answer:
      "Yes! After signing in, go to your dashboard and select Create Event. Add your event title, description, category, location, date, and image URL to publish your initiative.",
  },
  {
    id: 4,
    question: "Can I edit or delete an event I created?",
    answer:
      "Yes. Visit Dashboard > Manage Events to view your created events. You can update event information or delete an event after confirmation. Only the event creator can manage that event.",
  },
  {
    id: 5,
    question: "Can I leave an event after joining?",
    answer:
      "Yes. Open Dashboard > Joined Events to see your participation history. You can leave an event using the Leave Event option, which removes your participation without deleting the original event.",
  },
  {
    id: 6,
    question: "How can I find events that match my interests?",
    answer:
      "Visit the Upcoming Events page to explore community initiatives. You can filter events by category and search using event names, locations, and other event information.",
  },
];
