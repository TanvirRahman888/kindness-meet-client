
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  HeartHandshake,
  Home,
  SearchX,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100dvh-72px)] items-center justify-center overflow-hidden bg-background px-4 py-16">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-brand-peach/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-brand-butter/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl border border-accent/10 bg-accent/10 text-accent shadow-sm">
          <SearchX size={46} strokeWidth={1.5} />
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="text-[110px] font-extrabold leading-none tracking-tighter text-accent sm:text-[160px]">
            404
          </h1>

          <Sparkles
            size={28}
            className="absolute right-8 top-0 text-accent/50 sm:right-20"
          />

          <HeartHandshake
            size={30}
            className="absolute bottom-2 left-8 text-accent/40 sm:left-20"
          />
        </div>

        {/* Text */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Oops! Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Looks like this page has wandered off on its own
            little adventure. The page you're looking for
            doesn't exist or may have been moved.
          </p>

          <p className="mt-3 text-sm font-medium text-accent">
            Don't worry, there's still plenty of kindness to explore!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/upcoming-events"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent sm:w-auto"
          >
            <CalendarDays size={18} />
            Explore Events
          </Link>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 flex items-center justify-center gap-2 border-t border-border pt-6 text-sm text-muted">
          <HeartHandshake size={18} className="text-accent" />
          Small Acts. Big Impact.
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted transition hover:text-accent"
        >
          <ArrowLeft size={15} />
          Return to KindnessMeet
        </Link>
      </div>
    </main>
  );
}
