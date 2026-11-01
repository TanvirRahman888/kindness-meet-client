import ExploreCategories from "@/components/home/explore-categories";
import ExploreCategoriesLoading from "@/components/home/explore-categories-loading";
import Hero from "@/components/home/hero";
import HeroStats from "@/components/home/hero-stats";
import UpcomingEvents from "@/components/home/upcoming-events";
import UpcomingEventsLoading from "@/components/home/upcoming-events-loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroStats/>
      <Suspense fallback={<UpcomingEventsLoading />}>
        <UpcomingEvents />
      </Suspense>
      <Suspense fallback={<ExploreCategoriesLoading />}>
        <ExploreCategories />
      </Suspense>
    </main>
  );
}