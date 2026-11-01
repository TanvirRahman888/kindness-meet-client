
import {
  HeartHandshake,
  CalendarPlus,
  Sparkles,
} from "lucide-react";

import GetInvolvedCard from "./get-involved-card";

const opportunities = [
  {
    label: "For Volunteers",
    title: "Become a Volunteer",
    description:
      "Give your time to a cause that matters. Discover community initiatives, meet like-minded people, and take part in meaningful activities.",
    features: [
      "Discover upcoming community events",
      "Join events that match your interests",
      "Track participation from your dashboard",
    ],
    href: "/upcoming-events",
    buttonText: "Explore Events",
    icon: HeartHandshake,
    variant: "volunteer" as const,
  },
  {
    label: "For Organizers",
    title: "Become an Organizer",
    description:
      "Have an idea to help your community? Create your own initiative, bring volunteers together, and turn your idea into action.",
    features: [
      "Create your own community events",
      "Manage event details and schedules",
      "Connect with interested volunteers",
    ],
    href: "/dashboard/create-event",
    buttonText: "Create an Event",
    icon: CalendarPlus,
    variant: "organizer" as const,
  },
];

export default function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
            <Sparkles size={15} />
            Get Involved
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Your Community.{" "}
            <span className="text-accent">
              Your Way.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            There is more than one way to make a difference.
            Choose how you want to contribute and take the
            first step with KindnessMeet.
          </p>
        </div>

        {/* Volunteer & Organizer Cards */}
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:gap-6">
          {opportunities.map((opportunity) => (
            <GetInvolvedCard
              key={opportunity.variant}
              {...opportunity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
