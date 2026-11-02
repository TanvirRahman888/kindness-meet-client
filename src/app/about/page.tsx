
import type { Metadata } from "next";

import AboutHero from "@/components/about/about-hero";
import AboutPurpose from "@/components/about/about-purpose";
import AboutPossibilities from "@/components/about/about-possibilities";
import AboutValues from "@/components/about/about-values";
import AboutCTA from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About Us | KindnessMeet",
  description:
    "Learn about KindnessMeet, a community-driven platform connecting volunteers with meaningful social service events and helping organizers create positive change.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">

      <AboutHero />
      <AboutPurpose />
      <AboutPossibilities />
      <AboutValues />
      <AboutCTA />

    </main>
  );
}
