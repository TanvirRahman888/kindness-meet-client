
import {
  HandHeart,
  HeartHandshake,
  UsersRound,
} from "lucide-react";

import AboutValueCard from "./about-value-card";

const values = [
  {
    title: "Community First",
    description:
      "We believe stronger communities are built when people support, respect, and work alongside one another.",
    icon: UsersRound,
    color: "bg-[#FFE1D4] text-[#B44942]",
  },
  {
    title: "Kindness in Action",
    description:
      "Even small acts of kindness can create meaningful change when people take action together.",
    icon: HandHeart,
    color: "bg-[#FFF1BC] text-[#926100]",
  },
  {
    title: "Working Together",
    description:
      "Collaboration helps turn individual ideas into shared initiatives that benefit the wider community.",
    icon: HeartHandshake,
    color: "bg-[#F8DEE8] text-[#9C5576]",
  },
];

export default function AboutValues() {
  return (
    <section className="border-y border-border bg-surface/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
            What We Believe
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            The Values That{" "}
            <span className="text-accent">
              Bring Us Together.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            KindnessMeet is built around simple ideas
            that encourage connection, participation,
            and positive community action.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {values.map((value) => (
            <AboutValueCard
              key={value.title}
              {...value}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
