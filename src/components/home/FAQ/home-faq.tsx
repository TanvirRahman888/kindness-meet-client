
import Link from "next/link";

import {
  ArrowRight,
  CircleHelp,
  HeartHandshake,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";

import FAQItem from "./faq-item";
import { faqs } from "./faq-data";

export default function HomeFAQ() {
  return (
    <section
      id="faq"
      className="border-t border-border bg-surface/30 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">

          {/* Left Content */}
          <div className="lg:sticky lg:top-28">

            {/* Section Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
              <Sparkles size={15} />
              Need Some Help?
            </span>

            {/* Heading */}
            <h2 className="mt-6 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
              Frequently Asked{" "}
              <span className="text-accent">
                Questions.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-md text-sm leading-7 text-muted sm:text-base">
              Everything you need to know about discovering
              events, joining community initiatives, and
              organizing activities with KindnessMeet.
            </p>

            {/* Decorative Illustration */}
            <div className="relative mt-8 hidden overflow-hidden rounded-2xl border border-border bg-linear-to-br from-brand-peach/50 via-brand-butter/30 to-surface p-6 sm:block">

              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <MessageCircleQuestion size={28} />
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    Have more questions?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    Explore KindnessMeet and discover how
                    you can make an impact.
                  </p>
                </div>
              </div>

              <Link
                href="/upcoming-events"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent transition hover:gap-3"
              >
                Explore Community Events
                <ArrowRight size={17} />
              </Link>

              <HeartHandshake
                size={100}
                strokeWidth={1}
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-7 text-accent/10"
              />
            </div>
          </div>

          {/* Right FAQ Accordion */}
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-muted">
              <CircleHelp
                size={18}
                className="text-accent"
              />
              Common Questions
              <span className="ml-auto rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                {faqs.length} Questions
              </span>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  defaultOpen={index === 0}
                />
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-6 flex items-center gap-2 text-xs text-muted">
              <HeartHandshake
                size={16}
                className="text-accent"
              />
              Small Acts. Big Impact.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
