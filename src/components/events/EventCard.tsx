
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  ImageOff,
} from "lucide-react";

export type EventItem = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  eventDate: string;
  imageUrl: string;
  creatorId: string;
  creatorName?: string;
  creatorEmail?: string;
  creatorImage?: string | null;
};

export default function EventCard({
  event,
}: {
  event: EventItem;
}) {
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const date = new Date(event.eventDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const creatorName = event.creatorName || "Community Organizer";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Event Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-brand-peach/30">
        {event.imageUrl && !imageError ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-accent/40">
            <ImageOff size={42} />
          </div>
        )}

        {/* Category */}
        <span className="absolute left-4 top-4 max-w-[85%] truncate rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#B44942] shadow-sm">
          {event.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">

        {/* Date and Time */}
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} className="text-accent" />
            {formattedDate}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={15} className="text-accent" />
            {formattedTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-xl font-bold text-foreground transition-colors group-hover:text-accent">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {event.description}
        </p>

        {/* Location */}
        <div className="mt-4 flex items-start gap-2 text-sm text-muted">
          <MapPin
            size={17}
            className="mt-0.5 shrink-0 text-accent"
          />

          <span className="line-clamp-1">
            {event.location}
          </span>
        </div>

        {/* Creator and Details */}
        <div className="mt-auto pt-5">

          <div className="mb-4 flex items-center gap-3 border-t border-border pt-4">

            {/* Creator Avatar */}
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/10 text-accent">
              {event.creatorImage && !avatarError ? (
                <Image
                  src={event.creatorImage}
                  alt={creatorName}
                  width={40}
                  height={40}
                  unoptimized
                  onError={() => setAvatarError(true)}
                  className="size-full object-cover"
                />
              ) : (
                <UserRound size={20} />
              )}
            </div>

            {/* Creator Name */}
            <div className="min-w-0">
              <p className="text-xs text-muted">
                Organized by
              </p>

              <p className="truncate text-sm font-semibold text-foreground">
                {creatorName}
              </p>
            </div>
          </div>

          {/* View Details Button */}
          <Link
            href={`/upcoming-events/${event._id}`}
            className="flex items-center justify-between rounded-xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            View Event Details
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}
