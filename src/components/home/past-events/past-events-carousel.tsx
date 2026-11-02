
"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const PastEventsSwiper = dynamic(
  () => import("./past-events-swiper"),
  {
    ssr: false,
    loading: () => (
      <div className="grid animate-pulse gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="aspect-16/10 bg-accent/10" />

            <div className="space-y-4 p-5">
              <div className="h-4 w-28 rounded bg-accent/10" />
              <div className="h-6 w-4/5 rounded bg-accent/10" />
              <div className="h-4 w-full rounded bg-accent/10" />
              <div className="h-4 w-2/3 rounded bg-accent/10" />
            </div>
          </div>
        ))}
      </div>
    ),
  }
);

type Props = {
  children: ReactNode;
};

export default function PastEventsCarousel({
  children,
}: Props) {
  return (
    <PastEventsSwiper>
      {children}
    </PastEventsSwiper>
  );
}
