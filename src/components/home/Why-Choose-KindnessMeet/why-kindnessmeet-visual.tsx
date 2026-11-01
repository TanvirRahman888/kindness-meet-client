
import Image from "next/image";

import {
  HeartHandshake,
  Sparkles,
} from "lucide-react";

export default function WhyKindnessMeetVisual() {
  return (
    <div className="relative w-full">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -bottom-3 left-4 right-4 top-3 rounded-[28px] bg-brand-peach/60" />

      {/* Image Container */}
      <div className="relative isolate h-87 w-full overflow-hidden rounded-[26px] bg-accent/10 shadow-[0_20px_55px_-30px_rgba(69,48,47,0.3)] sm:h-107 lg:h-130 xl:h-135">

        {/* Main Image */}
        <Image
          src="/hero/upcoming-events-hero.webp"
          alt="Volunteers working together to support their community"
          fill
          sizes="(max-width: 1023px) 100vw, 45vw"
          className="object-cover object-[70%_center]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#24130F]/90 via-[#24130F]/15 to-transparent" />

        {/* Top Badge */}
        <div className="absolute left-5 top-5 z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 shadow-lg">
            <span className="flex size-7 items-center justify-center rounded-full bg-[#FFE1D4] text-[#B44942]">
              <HeartHandshake size={15} />
            </span>

            <span className="text-xs font-bold text-[#45302F]">
              Together for Good
            </span>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">

          {/* Icon */}
          <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md">
            <Sparkles size={20} />
          </div>

          {/* Small Divider */}
          <div className="mb-3 h-1 w-10 rounded-full bg-brand-peach" />

          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-peach">
            The Power of Community
          </p>

          {/* Heading */}
          <h3 className="mt-3 max-w-sm text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
            Good things happen
            <span className="block text-brand-peach">
              when we come together.
            </span>
          </h3>

          {/* Description */}
          <p className="mt-3 max-w-sm text-xs leading-6 text-white/85 sm:text-sm">
            A little time, a helping hand, and a shared
            purpose can make a meaningful difference.
          </p>
        </div>
      </div>
    </div>
  );
}
