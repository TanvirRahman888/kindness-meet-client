
"use client";

import { useState, type FormEvent } from "react";

import {
  ArrowRight,
  Mail,
  Send,
} from "lucide-react";

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/10";

export default function ContactForm() {
  const [showNotice, setShowNotice] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Frontend preview only.
    // Connect your API here later.
    setShowNotice(true);
  };

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-8">

      {/* Heading */}
      <div className="mb-7">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <Mail size={24} />
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Send Us a Message
        </h2>

        <p className="mt-2 text-sm leading-7 text-muted">
          Fill out the form below to prepare your message.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onChange={() => setShowNotice(false)}
        className="space-y-5"
      >
        {/* Name and Email */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Full Name <span className="text-accent">*</span>
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder="Enter your full name"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Email Address <span className="text-accent">*</span>
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>

        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Subject <span className="text-accent">*</span>
          </label>

          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue=""
            className={inputClasses}
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="general">
              General Inquiry
            </option>
            <option value="volunteering">
              Volunteering Questions
            </option>
            <option value="event">
              Event Organization
            </option>
            <option value="partnership">
              Partnership or Collaboration
            </option>
            <option value="support">
              Technical Support
            </option>
            <option value="other">
              Other
            </option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Your Message <span className="text-accent">*</span>
          </label>

          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            minLength={10}
            maxLength={3000}
            placeholder="Tell us how we can help you..."
            className={`${inputClasses} resize-y`}
          />

          <p className="mt-2 text-xs text-muted">
            Please provide at least 10 characters.
          </p>
        </div>

        {/* Submit */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
          >
            <Send size={17} />

            Send Message

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <span className="text-xs text-muted">
            Frontend preview — sending is not enabled.
          </span>
        </div>

        {/* Preview Notice */}
        {showNotice && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm leading-6 text-accent"
          >
            Your form is valid, but your message has not
            been sent. A contact API needs to be connected
            to enable submissions.
          </div>
        )}
      </form>
    </div>
  );
}
