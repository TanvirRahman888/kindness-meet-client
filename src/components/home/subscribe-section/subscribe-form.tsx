
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

export default function SubscribeForm() {
  const [notice, setNotice] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Frontend preview only — no API connected.
    setNotice(true);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">
      {/* Form Heading */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Mail size={22} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-foreground">
            Join Our Newsletter
          </h3>

          <p className="mt-1 text-xs text-muted">
            Stay connected with your community.
          </p>
        </div>
      </div>

      {/* Subscribe Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="subscribe-email"
          className="block text-sm font-semibold text-foreground"
        >
          Email Address
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="subscribe-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address"
              onChange={() => setNotice(false)}
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/10"
            />
          </div>

          <button
            type="submit"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-white transition hover:opacity-90"
          >
            Subscribe

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Privacy Note */}
        <p className="flex items-start gap-2 pt-2 text-xs leading-5 text-muted">
          <ShieldCheck
            size={15}
            className="mt-0.5 shrink-0 text-accent"
          />
          Newsletter subscription is coming soon.
        </p>

        {/* Frontend-only Notice */}
        {notice && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg bg-accent/10 px-4 py-3 text-sm font-medium text-accent"
          >
            This is a preview. No email was submitted.
          </p>
        )}
      </form>
    </div>
  );
}
