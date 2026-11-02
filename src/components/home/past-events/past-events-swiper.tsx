
"use client";

import {
  Children,
  useRef,
  type ReactNode,
} from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

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
