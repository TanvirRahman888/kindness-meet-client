
import type { LucideIcon } from "lucide-react";

type Props = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export default function HowItWorksStep({
  number,
  title,
  description,
  icon: Icon,
  color,
}: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg sm:p-8">

      {/* Step Number */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          Step {number}
        </span>

        <span className="text-5xl font-extrabold text-accent/10">
          {number}
        </span>
      </div>

      {/* Icon */}
      <div
        className={`mt-5 flex size-17 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Content */}
      <h3 className="mt-7 text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
        {description}
      </p>

      {/* Bottom Decoration */}
      <div className="mt-auto pt-8">
        <div className="h-1 w-14 rounded-full bg-accent/30 transition-all duration-300 group-hover:w-24 group-hover:bg-accent" />
      </div>
    </article>
  );
}
