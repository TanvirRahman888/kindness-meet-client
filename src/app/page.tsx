import ExploreCategories from "@/components/home/Category/explore-categories";
import ExploreCategoriesLoading from "@/components/home/Category/explore-categories-loading";
import Hero from "@/components/home/Hero/hero";
import HeroStats from "@/components/home/Hero/hero-stats";
import HowItWorks from "@/components/home/how-it-works/how-it-works";
import UpcomingEvents from "@/components/home/UpcomingEvents/upcoming-events";
import UpcomingEventsLoading from "@/components/home/UpcomingEvents/upcoming-events-loading";
import WhyKindnessMeet from "@/components/home/Why-Choose-KindnessMeet/why-kindnessmeet";
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
      <HowItWorks />
      <WhyKindnessMeet />
    </main>
  );
}