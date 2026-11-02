
import type { Metadata } from "next";

import ContactHero from "@/components/contact/contact-hero";
import ContactForm from "@/components/contact/contact-form";
import ContactHelp from "@/components/contact/contact-help";

export const metadata: Metadata = {
  title: "Contact Us | KindnessMeet",
  description:
    "Contact KindnessMeet with questions about volunteering, community events, organizing initiatives, partnerships, or technical support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Contact Hero */}
      <ContactHero />

      {/* Contact Form and Resources */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8">

            {/* Left: Contact Form */}
            <ContactForm />

            {/* Right: Resources */}
            <ContactHelp />

          </div>
        </div>
      </section>

    </main>
  );
}
