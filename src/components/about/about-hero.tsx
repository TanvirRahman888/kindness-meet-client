
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  HeartHandshake,
  Sparkles,
  UsersRound,
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-16 sm:py-20 lg:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-brand-peach/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div className="relative">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
              <Sparkles size={15} />
              About KindnessMeet
            </span>

            {/* Heading */}
            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
              Bringing People Together for a{" "}
              <span className="text-accent">
                Kinder Tomorrow.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-muted">
              KindnessMeet is a community-driven platform
              designed to connect people who care about
              making a difference.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              From organizing food drives and neighborhood
              cleanups to supporting education and health
              initiatives, we make it easier to discover
              meaningful opportunities and work together
              for positive change.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/upcoming-events"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Explore Events

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/#get-involved"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                Get Involved
              </Link>
            </div>

            {/* Bottom Detail */}
            <div className="mt-9 flex items-center gap-3 border-t border-border pt-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand-peach/50 text-accent">
                <UsersRound size={21} />
              </div>

              <p className="text-sm font-medium text-muted">
                Connecting communities through
                <span className="font-bold text-foreground">
                  {" "}meaningful action.
                </span>
              </p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="pointer-events-none absolute -bottom-4 left-5 right-5 top-4 rounded-[30px] bg-brand-peach/60" />

            <div className="relative h-95 overflow-hidden rounded-[28px] bg-accent/10 shadow-xl sm:h-117 lg:h-125">
              <Image
                src="/hero/upcoming-events-hero.webp"
                alt="Community volunteers working together to help people"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#24130F]/85 via-transparent to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-xs font-bold text-[#B44942] shadow-lg">
                <HeartHandshake size={17} />
                Together for Good
              </div>

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <div className="mb-4 h-1 w-12 rounded-full bg-brand-peach" />

                <h2 className="max-w-sm text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  Small Acts.
                  <span className="block text-brand-peach">
                    Big Impact.
                  </span>
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/85">
                  Every meaningful change starts with
                  people choosing to help one another.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
