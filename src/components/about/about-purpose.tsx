
import {
  Eye,
  HeartHandshake,
  Target,
} from "lucide-react";

export default function AboutPurpose() {
  return (
    <section className="bg-surface/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Our Purpose
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Driven by Kindness.{" "}
            <span className="text-accent">
              United by Purpose.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            We believe that bringing people together can
            turn simple ideas into meaningful community action.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">

          {/* Mission */}
          <article className="relative overflow-hidden rounded-3xl border border-border bg-brand-peach/20 p-7 sm:p-9">

            <div className="flex size-13 items-center justify-center rounded-2xl bg-accent text-white">
              <Target size={26} />
            </div>

            <h3 className="mt-6 text-2xl font-extrabold text-foreground">
              Our Mission
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-8 text-muted">
              To make community participation easier and
              more accessible by connecting volunteers with
              meaningful events and giving organizers a
              simple way to create and manage social
              initiatives.
            </p>

            <HeartHandshake
              size={130}
              strokeWidth={1}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-8 text-accent/10"
            />
          </article>

          {/* Vision */}
          <article className="relative overflow-hidden rounded-3xl border border-border bg-brand-butter/20 p-7 sm:p-9">

            <div className="flex size-13 items-center justify-center rounded-2xl bg-[#F4D47B] text-[#77501C]">
              <Eye size={26} />
            </div>

            <h3 className="mt-6 text-2xl font-extrabold text-foreground">
              Our Vision
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-8 text-muted">
              A future where people feel empowered to
              support their communities, share opportunities,
              and work together to create lasting positive
              change through everyday acts of kindness.
            </p>

            <HeartHandshake
              size={130}
              strokeWidth={1}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-8 text-[#A77B35]/10"
            />
          </article>

        </div>
      </div>
    </section>
  );
}
