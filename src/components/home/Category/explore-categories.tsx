
import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowRight,
  HeartHandshake,
  Shapes,
} from "lucide-react";

import CategoryCard, {
  type EventCategory,
} from "./category-card";

import ExploreCategoriesEmpty from "./explore-categories-empty";

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL;

type CategoryEvent = {
  category: string;
};

export default async function ExploreCategories() {
  // Wait for an actual request before fetching data
  await connection();

  let categories: EventCategory[] = [];
  let events: CategoryEvent[] = [];
  let hasError = false;

  try {
    if (!API_URL) {
      throw new Error("API URL is not configured.");
    }

    // Fetch categories and events from Express
    const [categoryResponse, eventsResponse] =
      await Promise.all([
        fetch(`${API_URL}/api/categories`, {
          cache: "no-store",
        }),
        fetch(`${API_URL}/api/events`, {
          cache: "no-store",
        }),
      ]);

    if (!categoryResponse.ok || !eventsResponse.ok) {
      throw new Error(
        "Failed to fetch categories or events."
      );
    }

    [categories, events] = await Promise.all([
      categoryResponse.json(),
      eventsResponse.json(),
    ]);
  } catch (error) {
    console.error("Explore categories error:", error);
    hasError = true;
  }

  // Count upcoming events for each category
  const categoryCounts = new Map<string, number>();

  for (const event of events) {
    categoryCounts.set(
      event.category,
      (categoryCounts.get(event.category) || 0) + 1
    );
  }

  return (
    <section
      id="explore-categories"
      className="border-y border-border bg-surface/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
            <HeartHandshake size={16} />
            Find Your Cause
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
            Explore Events{" "}
            <span className="text-accent">
              by Category
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            Every cause matters. Discover volunteering
            opportunities that match your interests
            and help create meaningful change in your community.
          </p>
        </div>

        {/* Categories Grid */}
        {hasError ? (
          <ExploreCategoriesEmpty hasError />
        ) : categories.length === 0 ? (
          <ExploreCategoriesEmpty />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                eventCount={
                  categoryCounts.get(category.name) || 0
                }
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!hasError && categories.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 text-center">

            <p className="text-sm text-muted">
              Not sure where to start?
              Explore all community initiatives.
            </p>

            <Link
              href="/upcoming-events"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Shapes size={18} />
              Browse All Events

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
