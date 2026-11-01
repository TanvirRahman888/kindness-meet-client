
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

type Props = {
  label: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  buttonText: string;
  icon: LucideIcon;
  variant: "volunteer" | "organizer";
};

export default function GetInvolvedCard({
  label,
  title,
  description,
  features,
  href,
  buttonText,
  icon: Icon,
  variant,
}: Props) {
  const isVolunteer = variant === "volunteer";

  return (
    <article
      className={`group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg sm:p-8 ${
        isVolunteer
          ? "bg-brand-peach/20"
          : "bg-brand-butter/20"
      }`}
    >
      {/* Background Decoration */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 -z-10 size-64 rounded-full blur-3xl ${
          isVolunteer
            ? "bg-brand-peach/50"
            : "bg-brand-butter/50"
        }`}
      />

      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex size-14 items-center justify-center rounded-2xl ${
            isVolunteer
              ? "bg-accent text-white"
              : "bg-brand-butter text-[#7A4C19]"
          }`}
        >
          <Icon size={27} strokeWidth={1.8} />
        </div>

        <ArrowUpRight
          size={21}
          className="text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
        />
      </div>

      {/* Heading */}
      <div className="mt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          {label}
        </span>

        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-[28px]">
          {title}
        </h3>

        <p className="mt-3 max-w-md text-sm leading-7 text-muted">
          {description}
        </p>
      </div>

      {/* Features */}
      <ul className="mt-5 space-y-2.5">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-sm text-foreground"
          >
            <CheckCircle2
              size={17}
              className="shrink-0 text-accent"
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-7">
        <Link
          href={href}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
            isVolunteer
              ? "bg-accent text-white hover:opacity-90"
              : "border border-border bg-surface text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          {buttonText}

          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
