
"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 1450,
    suffix: "+",
    label: "Active Volunteers",
    color: "text-[#B44942] dark:text-[#F1A69E]",
  },
  {
    value: 180,
    suffix: "+",
    label: "Events Completed",
    color: "text-[#CD7952] dark:text-[#E9AA83]",
  },
  {
    value: 24000,
    suffix: "+",
    label: "Lives Impacted",
    color: "text-[#916080] dark:text-[#D6ABCB]",
  },
  {
    value: 100,
    suffix: "%",
    label: "Community Driven",
    color: "text-[#CF8500] dark:text-[#F7D48B]",
  },
];

export default function HeroStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const duration = 1800;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const percentage = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const eased = 1 - Math.pow(1 - percentage, 3);

      setProgress(eased);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();

        // Respect reduced-motion preferences
        if (
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
        ) {
          setProgress(1);
          return;
        }

        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.2 }
    );

    const element = sectionRef.current;

    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Community impact statistics"
      className="bg-background py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const count = Math.round(stat.value * progress);

            return (
              <div
                key={stat.label}
                role="group"
                aria-label={`${stat.value.toLocaleString("en-US")}${stat.suffix} ${stat.label}`}
                className="flex min-h-24 flex-col items-center justify-center rounded-2xl border border-border bg-surface px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-28"
              >
                <h2
                  aria-hidden="true"
                  className={`text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl lg:text-4xl ${stat.color}`}
                >
                  {count.toLocaleString("en-US")}
                  {stat.suffix}
                </h2>

                <p
                  aria-hidden="true"
                  className="mt-1 text-xs font-medium text-muted sm:text-sm"
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
