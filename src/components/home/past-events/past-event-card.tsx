
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  HeartHandshake,
} from "lucide-react";

import type { PastEvent } from "./past-events-data";

type Props = {
  event: PastEvent;
};

export default function PastEventCard({ event }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-lg">

      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-brand-peach/30">
        <Image
          src={event.image}
          alt={event.title}
          fill
          unoptimized
          sizes="(max-width: 639px) 88vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />

        {/* Category */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#B44942] shadow-sm">
          <HeartHandshake size={13} />
          {event.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Date */}
        <div className="flex items-center gap-2 text-xs font-medium text-accent">
          <CalendarDays size={15} />
          {event.date}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
          {event.description}
        </p>

        {/* Location */}
        <div className="mt-auto flex items-center gap-2 border-t border-border pt-4 text-xs text-muted">
          <MapPin size={15} className="shrink-0 text-accent" />

          <span className="truncate">
            {event.location}
          </span>
        </div>
      </div>
    </article>
  );
}
