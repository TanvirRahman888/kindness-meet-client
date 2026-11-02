
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export default function AboutValueCard({
  title,
  description,
  icon: Icon,
  color,
}: Props) {
  return (
    <article className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md sm:p-7">

      <div
        className={`flex size-13 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon size={25} strokeWidth={1.8} />
      </div>

      <h3 className="mt-6 text-lg font-bold text-foreground">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted">
        {description}
      </p>

      <div className="mt-6 h-1 w-10 rounded-full bg-accent/30 transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
    </article>
  );
}
