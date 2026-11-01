
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export default function WhyKindnessMeetFeature({
  title,
  description,
  icon: Icon,
  color,
}: Props) {
  return (
    <article className="group flex items-start gap-4 border-b border-border/70 py-3.5 first:pt-0 last:border-b-0 last:pb-0">

      {/* Icon */}
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${color}`}
      >
        <Icon
          size={21}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-accent sm:text-[15px]">
          {title}
        </h3>

        <p className="mt-1.5 max-w-lg text-xs leading-5 text-muted sm:text-[13px] sm:leading-6">
          {description}
        </p>
      </div>
    </article>
  );
}
