
import Link from "next/link";

import {
  ArrowUpRight,
  Utensils,
  Recycle,
  TreePine,
  Shirt,
  PackageOpen,
  Droplets,
  BookOpen,
  HeartPulse,
  HandCoins,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type EventCategory = {
  _id: string;
  name: string;
  slug: string;
};

type Props = {
  category: EventCategory;
  eventCount: number;
};

type CategoryStyle = {
  icon: LucideIcon;
  color: string;
};

const categoryStyles: Record<string, CategoryStyle> = {
  "food-drive": {
    icon: Utensils,
    color: "bg-[#FFE4D6] text-[#B44942]",
  },
  "community-cleanup": {
    icon: Recycle,
    color: "bg-[#F7E7C6] text-[#956B20]",
  },
  "tree-plantation": {
    icon: TreePine,
    color: "bg-[#E5EAD9] text-[#617544]",
  },
  "winter-clothes-distribution": {
    icon: Shirt,
    color: "bg-[#F5DDE6] text-[#A34C72]",
  },
  "blanket-distribution": {
    icon: PackageOpen,
    color: "bg-[#F1E1D5] text-[#9A6342]",
  },
  "blood-donation": {
    icon: Droplets,
    color: "bg-[#FFE0DE] text-[#C44747]",
  },
  "education-support": {
    icon: BookOpen,
    color: "bg-[#F1E5F7] text-[#8754A0]",
  },
  "health-awareness": {
    icon: HeartPulse,
    color: "bg-[#FCE2D6] text-[#AE5B3F]",
  },
  fundraising: {
    icon: HandCoins,
    color: "bg-[#FFF0C4] text-[#976C13]",
  },
  "other-social-initiatives": {
    icon: HeartHandshake,
    color: "bg-[#F4DFE2] text-[#A64F66]",
  },
};

export default function CategoryCard({
  category,
  eventCount,
}: Props) {
  const style = categoryStyles[category.slug] || {
    icon: HeartHandshake,
    color: "bg-accent/10 text-accent",
  };

  const Icon = style.icon;

  return (
    <Link
      href={`/upcoming-events?category=${encodeURIComponent(category.name)}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg sm:p-6"
    >
      {/* Icon */}
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex size-14 items-center justify-center rounded-2xl ${style.color}`}
        >
          <Icon size={27} strokeWidth={1.8} />
        </div>

        <ArrowUpRight
          size={19}
          className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
        />
      </div>

      {/* Category Name */}
      <h3 className="mt-6 min-h-12 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
        {category.name}
      </h3>

      {/* Event Count */}
      <div className="mt-auto pt-4">
        <span className="inline-flex rounded-full bg-background px-3 py-1.5 text-xs font-medium text-muted">
          {eventCount} upcoming{" "}
          {eventCount === 1 ? "event" : "events"}
        </span>
      </div>
    </Link>
  );
}
