
import {
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import PastEventCard from "./past-event-card";
import PastEventsCarousel from "./past-events-carousel";
import { pastEvents } from "./past-events-data";

export default function PastEventsPortfolio() {
  return (
    <section
      id="past-events"
      className="border-t border-border bg-surface/30 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="max-w-2xl">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
            <Sparkles size={15} />
            Community Portfolio
          </span>

          {/* Title */}
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Moments of Kindness,{" "}
            <span className="text-accent">
              Lasting Impact.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Explore highlights from community initiatives
            and discover how people can come together
            to make a positive difference.
          </p>
        </div>

        {/* Autoplay and Loop Carousel */}
        <div className="mt-5">
          <PastEventsCarousel>
            {pastEvents.map((event) => (
              <PastEventCard
                key={event.id}
                event={event}
              />
            ))}
          </PastEventsCarousel>
        </div>

        {/* Bottom Message */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted">
          <HeartHandshake
            size={17}
            className="text-accent"
          />

          Small Acts. Big Impact.
        </div>

      </div>
    </section>
  );
}
