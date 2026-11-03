
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import type { IconType } from "react-icons";

import {
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import FooterLinkColumn from "./footer-link-column";

// Footer Navigation
const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Upcoming Events", href: "/upcoming-events" },
      { label: "Our Portfolio", href: "/#past-events" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Become a Volunteer", href: "/upcoming-events" },
      { label: "Create an Event", href: "/dashboard/create-event" },
      { label: "My Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/#faq" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Newsletter", href: "/#subscribe" },
    ],
  },
];

// Contact Information
const contactInfo = {
  address: "Sylhet, Bangladesh",
  phone: "+8801770888106",
  email: "tanvirrahman8888@gmail.com",
};

// Social Media
type SocialLink = {
  name: string;
  href: string;
  icon: IconType;
};

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/tanvirrahman888",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/tanvirrahman888/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tanvirrahman888/",
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@tanvirrahman888",
    icon: FaYoutube,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Newsletter - Frontend Only
  const handleSubscribe = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) return;

    setShowMessage(true);
    setEmail("");
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#291E1D] text-white">

      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-100 rounded-full bg-[#B44942]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 size-100 rounded-full bg-[#E7A69F]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">

        {/* Top Footer */}
        <div className="grid gap-12 pb-12 lg:grid-cols-[1.1fr_1.5fr_1fr] lg:gap-10 lg:pb-16">

          {/* Brand and Social Media */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              aria-label="KindnessMeet Home"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/KindnessMeetIcon.png"
                alt="KindnessMeet"
                width={44}
                height={44}
                className="size-11 object-contain"
              />

              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">
                  Kindness
                </span>
                <span className="text-[#E7A69F]">
                  Meet
                </span>
              </span>
            </Link>

            {/* Description */}
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Bringing people together to spread kindness,
              inspire change, and create meaningful impacts
              through community volunteering.
            </p>

            {/* Small Highlight */}
            <div className="mt-5 flex items-center gap-2 text-sm text-[#E7A69F]">
              <HeartHandshake size={18} />
              <span className="font-medium">
                Together, we make a difference.
              </span>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white">
                Follow Our Journey
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name} - Opens in new tab`}
                      title={social.name}
                      className="group flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#E7A69F] transition-all duration-300 hover:-translate-y-1 hover:border-[#B44942] hover:bg-[#B44942] hover:text-white"
                    >
                      <Icon
                        size={17}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3"
          >
            {footerColumns.map((column) => (
              <FooterLinkColumn
                key={column.title}
                title={column.title}
                links={column.links}
              />
            ))}
          </nav>

          {/* Contact Information */}
          <div>
            <h3 className="text-base font-bold text-white">
              Get In Touch
            </h3>

            <div className="mt-2 h-0.5 w-10 bg-[#B44942]" />

            <p className="mt-5 text-sm leading-6 text-white/60">
              Have questions or want to collaborate?
              We&apos;d love to hear from you.
            </p>

            <div className="mt-6 space-y-5">

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#E7A69F]">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Our Location
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#E7A69F]">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Call Us
                  </p>

                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="mt-1 inline-block text-sm text-white/80 transition-colors hover:text-[#E7A69F]"
                  >
                    +880 1770-888106
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#E7A69F]">
                  <Mail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Email Us
                  </p>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-1 block break-all text-sm text-white/80 transition-colors hover:text-[#E7A69F]"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section
          id="footer-newsletter"
          className="grid gap-6 border-y border-white/10 py-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12"
        >
          {/* Newsletter Heading */}
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#B44942]/20 text-[#E7A69F]">
              <Send size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                Stay Inspired. Stay Connected.
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/55">
                Get community stories, upcoming events, and
                volunteering opportunities delivered to your inbox.
              </p>
            </div>
          </div>

          {/* Subscribe Form */}
          <div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="footer-email" className="sr-only">
                Your Email Address
              </label>

              <input
                id="footer-email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setShowMessage(false);
                }}
                placeholder="Enter your email address"
                className="min-h-12 w-full min-w-0 flex-1 rounded-xl border border-white/15 bg-white/8 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#E7A69F]"
              />

              <button
                type="submit"
                className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E7A69F] px-6 text-sm font-bold text-[#291E1D] transition-all duration-300 hover:bg-white"
              >
                Subscribe
                <ArrowRight size={18} />
              </button>
            </form>

            {showMessage ? (
              <p
                role="status"
                className="mt-3 text-xs text-[#E7A69F]"
              >
                Thanks for your interest! This is a frontend
                demo; your email has not been saved.
              </p>
            ) : (
              <p className="mt-3 text-xs text-white/40">
                Newsletter preview only — no emails are stored.
              </p>
            )}
          </div>
        </section>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">

          {/* Copyright */}
          <p className="text-xs text-white/45">
            © 2026 KindnessMeet. All rights reserved.
          </p>

          {/* Bottom Links */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/about"
              className="text-xs text-white/50 transition-colors hover:text-[#E7A69F]"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="text-xs text-white/50 transition-colors hover:text-[#E7A69F]"
            >
              Contact
            </Link>

            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#E7A69F] transition-colors hover:text-white"
            >
              Back to Top
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
