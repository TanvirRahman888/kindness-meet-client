
import {
  HeartHandshake,
  Mail,
  MessageCircleHeart,
  Sparkles,
} from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface/30 py-14 sm:py-16 lg:py-20">
      {/* Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-brand-peach/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
              <Sparkles size={15} />
              Contact KindnessMeet
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[54px]">
              Let's Start a{" "}
              <span className="text-accent">
                Conversation.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-8 text-muted sm:text-base">
              Have a question, suggestion, or idea for making
              your community better? We'd love to hear from
              you and learn how KindnessMeet can help.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <HeartHandshake
                  size={19}
                  className="text-accent"
                />
                Meaningful Connections
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MessageCircleHeart
                  size={19}
                  className="text-accent"
                />
                Community First
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-accent/10 bg-linear-to-br from-brand-peach/50 via-surface to-brand-butter/40 p-8 shadow-sm">

              <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
                  <Mail size={32} strokeWidth={1.7} />
                </div>

                <Sparkles
                  size={28}
                  className="text-accent/50"
                />
              </div>

              <h2 className="relative mt-8 max-w-xs text-2xl font-extrabold leading-tight text-foreground">
                Every Great Change
                Starts with a Conversation.
              </h2>

              <p className="relative mt-3 max-w-xs text-sm leading-7 text-muted">
                Share your thoughts, ask questions, or
                explore ways to make a difference.
              </p>

              <div className="relative mt-7 flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <HeartHandshake size={22} />
                </div>

                <div>
                  <p className="text-sm font-bold text-foreground">
                    KindnessMeet
                  </p>

                  <p className="text-xs text-muted">
                    Small Acts. Big Impact.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
