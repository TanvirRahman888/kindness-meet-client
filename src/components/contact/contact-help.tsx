
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarPlus,
  CalendarSearch,
  HeartHandshake,
  MessageCircleQuestion,
} from "lucide-react";

import ContactSocials from "./contact-socials";

const resources = [
  {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about KindnessMeet.",
    icon: MessageCircleQuestion,
    href: "/#faq",
  },
  {
    title: "Explore Community Events",
    description:
      "Discover upcoming events and volunteering opportunities.",
    icon: CalendarSearch,
    href: "/upcoming-events",
  },
  {
    title: "Organize an Event",
    description:
      "Create a meaningful initiative for your community.",
    icon: CalendarPlus,
    href: "/dashboard/create-event",
  },
];

export default function ContactHelp() {
  return (
    <aside className="space-y-6">

      {/* Community Card */}
      <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-[#B44942] to-[#81342F] p-7 text-white sm:p-8">

        {/* Decoration */}
        <div className="pointer-events-none absolute -right-16 -top-16 -z-10 size-56 rounded-full border border-white/15" />

        {/* Icon */}
        <div className="flex size-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
          <HeartHandshake size={25} />
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-2xl font-extrabold leading-tight">
          Let's Build a Kinder Community.
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm leading-7 text-white/85">
          Every question, idea, and conversation can be
          a step toward something meaningful. Explore
          opportunities to get involved with KindnessMeet.
        </p>

        {/* Button */}
        <Link
          href="/#get-involved"
          className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#81342F] transition hover:bg-[#FFF1E9]"
        >
          Get Involved

          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Social Media Section */}
      <ContactSocials />

      {/* Helpful Resources */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-7">

        <h3 className="text-lg font-bold text-foreground">
          Helpful Resources
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          You may find what you need here.
        </p>

        {/* Resources List */}
        <div className="mt-5 divide-y divide-border">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <Link
                key={resource.href}
                href={resource.href}
                className="group flex items-start gap-3 py-4 first:pt-0 last:pb-0"
              >
                {/* Icon */}
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={19} />
                </span>

                {/* Content */}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                    {resource.title}
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-muted">
                    {resource.description}
                  </span>
                </span>

                {/* Arrow */}
                <ArrowUpRight
                  size={17}
                  className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
