
import {
  Search,
  CalendarCheck2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import HowItWorksStep from "./how-it-works-step";
import HowItWorksCTA from "./how-it-works-cta";

const steps = [
  {
    number: "01",
    title: "Explore Events",
    description:
      "Discover upcoming community events that match your interests. Browse different categories, search by location, and find opportunities to help.",
    icon: Search,
    color: "bg-[#FFE1D4] text-[#B44942]",
  },
  {
    number: "02",
    title: "Join an Event",
    description:
      "Choose an event you care about, sign in to your account, and join as a volunteer. View event details and prepare for your participation.",
    icon: CalendarCheck2,
    color: "bg-[#FFF1BC] text-[#926100]",
  },
  {
    number: "03",
    title: "Make an Impact",
    description:
      "Show up, connect with other volunteers, follow the organizer's guidelines, and contribute to making your community a better place.",
    icon: HeartHandshake,
    color: "bg-[#F8DEE8] text-[#9C5576]",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
            <Sparkles size={16} />
            Simple Steps, Meaningful Impact
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
            How{" "}
            <span className="text-accent">
              KindnessMeet
            </span>{" "}
            Works
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm leading-7 text-muted sm:text-base">
            Making a difference does not have to be complicated.
            Follow three simple steps to discover opportunities,
            join community events, and create meaningful change.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <HowItWorksStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              color={step.color}
            />
          ))}
        </div>

        {/* Call to Action */}
        <HowItWorksCTA />
      </div>
    </section>
  );
}
