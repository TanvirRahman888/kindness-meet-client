
"use client";

import {
  Children,
  useRef,
  type ReactNode,
} from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import "swiper/css";

type Props = {
  children: ReactNode;
};

export default function PastEventsSwiper({
  children,
}: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  const slides = Children.toArray(children);

  return (
    <div className="w-full">

      {/* Navigation Buttons */}
      <div className="mb-6 flex items-center justify-end gap-3">

        {/* Previous */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous past event"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent hover:bg-accent hover:text-white"
        >
          <ArrowLeft size={19} />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next past event"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent hover:bg-accent hover:text-white"
        >
          <ArrowRight size={19} />
        </button>

      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={slides.length > 3}
        speed={700}
        grabCursor
        watchOverflow
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1.15}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="w-full pb-4!"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="h-auto!"
          >
            <div className="h-full">
              {slide}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
