
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image: "/hero/hero-community-cleanup.webp",
    title: "Clean Streets.",
    highlight: "Stronger Communities.",
    description:
      "Join local cleanup drives, work with passionate volunteers, and help create cleaner, healthier neighborhoods for everyone.",
  },
  {
    id: 2,
    image: "/hero/hero-tree-plantation.webp",
    title: "Plant Hope.",
    highlight: "Grow Tomorrow.",
    description:
      "Take part in tree plantation events and help build a healthier environment for future generations.",
  },
  {
    id: 3,
    image: "/hero/hero-winter-donation.webp",
    title: "Share Warmth.",
    highlight: "Spread Kindness.",
    description:
      "Support winter clothing and blanket distribution drives to bring comfort and warmth to people in need.",
  },
  {
    id: 4,
    image: "/hero/hero-food-distribution.webp",
    title: "Share a Meal.",
    highlight: "Make a Difference.",
    description:
      "Join community food distribution events and turn simple acts of generosity into meaningful change.",
  },
];

function HeroSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-30 flex animate-pulse items-center justify-center bg-[#FFF9EF] dark:bg-[#241B1C]"
    >
      <div className="flex w-full max-w-3xl flex-col items-center gap-5 px-6">
        <div className="h-8 w-52 rounded-full bg-[#F4D8CA] dark:bg-[#493131]" />

        <div className="mt-3 h-12 w-full max-w-xl rounded-xl bg-[#F4D8CA] dark:bg-[#493131]" />

        <div className="h-10 w-4/5 rounded-xl bg-[#F4D8CA] dark:bg-[#493131]" />

        <div className="mt-4 h-4 w-full max-w-lg rounded-full bg-[#F4D8CA] dark:bg-[#493131]" />

        <div className="h-4 w-3/4 max-w-md rounded-full bg-[#F4D8CA] dark:bg-[#493131]" />

        <div className="mt-5 flex gap-4">
          <div className="h-12 w-36 rounded-xl bg-[#F4D8CA] dark:bg-[#493131]" />
          <div className="h-12 w-36 rounded-xl bg-[#F4D8CA] dark:bg-[#493131]" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [swiperReady, setSwiperReady] = useState(false);
  const [firstImageReady, setFirstImageReady] = useState(false);

  const isLoading = !swiperReady || !firstImageReady;

  return (
    <section
      aria-label="KindnessMeet community events"
      className="relative w-full"
    >
      <div className="relative h-145 w-full overflow-hidden sm:h-155 lg:h-165">

        {/* Keep Swiper mounted while the skeleton is visible */}
        <Swiper
          modules={[
            Autoplay,
            Navigation,
            Pagination,
            EffectFade,
            A11y,
          ]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          slidesPerView={1}
          loop
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={() => setSwiperReady(true)}
          className="kindness-hero !h-full !w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative flex h-full w-full items-center justify-center">

                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="100vw"
                  preload={index === 0}
                  className="object-cover object-center"
                  onLoad={
                    index === 0
                      ? () => setFirstImageReady(true)
                      : undefined
                  }
                  onError={
                    index === 0
                      ? () => setFirstImageReady(true)
                      : undefined
                  }
                />

                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/55" />

                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-black/25" />

                {/* Slide Content */}
                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 pb-10 text-center sm:px-12">

                  {/* Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                    <HeartHandshake
                      size={17}
                      className="text-[#FFD9BA]"
                    />
                    Community-Driven Social Development
                  </div>

                  {/* Title */}
                  <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                    <span className="mt-2 block text-[#FFD9BA]">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-white/90 sm:text-base lg:text-lg">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">

                    <Link
                      href="/upcoming-events"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#B44942] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#963A35] sm:px-6"
                    >
                      Explore Events
                      <ArrowRight size={18} />
                    </Link>

                    <Link
                      href="/dashboard/create-event"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/70 bg-white px-5 py-3 text-sm font-semibold text-[#45302F] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#FFF1BC] sm:px-6"
                    >
                      <HeartHandshake size={18} />
                      Create an Event
                    </Link>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Loading Skeleton */}
        {isLoading && <HeroSkeleton />}
      </div>
    </section>
  );
}
