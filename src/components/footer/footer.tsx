
import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import type { IconType } from "react-icons";

import FooterLinkColumn from "./footer-link-column";

// Footer Navigation
const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Events", href: "/upcoming-events" },
      { label: "Portfolio", href: "/#past-events" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Volunteer", href: "/#get-involved" },
      { label: "Create Event", href: "/dashboard/create-event" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/#faq" },
      { label: "Newsletter", href: "/#subscribe" },
    ],
  },
];

// Social Media
type SocialLink = {
  name: string;
  href: string | null;
  icon: IconType;
};

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: null,
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: null,
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: null,
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: null,
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="bg-background px-4 py-6 sm:px-6 lg:px-8">

      {/* Compact Footer Container */}
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#291E1D] px-5 py-7 text-white sm:px-8 sm:py-8 lg:px-10">

        {/* Main Footer */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">

          {/* Left Column */}
          <div>

            {/* Brand Logo */}
            <Link
              href="/"
              aria-label="KindnessMeet Home"
              className="inline-flex items-center gap-2"
            >
              <Image
                src="/KindnessMeetIcon.png"
                alt=""
                width={32}
                height={32}
                className="size-8 object-contain"
              />

              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-white">
                  Kindness
                </span>
                <span className="text-[#E7A69F]">
                  Meet
                </span>
              </span>
            </Link>

            {/* Brand Description */}
            <p className="mt-4 max-w-sm text-left text-sm leading-6 text-white/65">
              Connecting passionate people through
              acts of kindness and meaningful
              community events.
            </p>

            {/* Social Media */}
            <div className="mt-4">
              <h3 className="mb-3 text-sm font-semibold text-white">
                Follow Us
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  const iconStyles =
                    "flex size-9 items-center justify-center rounded-lg bg-[#493532] text-[#E7A69F] transition-all duration-200 hover:bg-[#B44942] hover:text-white";

                  if (!social.href) {
                    return (
                      <span
                        key={social.name}
                        title={`${social.name} coming soon`}
                        aria-label={`${social.name} coming soon`}
                        className="flex size-9 items-center justify-center rounded-lg bg-[#493532] text-[#E7A69F]/60"
                      >
                        <Icon
                          size={17}
                          aria-hidden="true"
                        />
                      </span>
                    );
                  }

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`KindnessMeet on ${social.name}`}
                      className={iconStyles}
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

          {/* Right Column - Compact Link Groups */}
          <nav
            aria-label="Footer navigation"
            className="space-y-4"
          >
            {footerColumns.map((column) => (
              <FooterLinkColumn
                key={column.title}
                title={column.title}
                links={column.links}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Divider */}
        <div className="mt-7 border-t border-white/15" />

        {/* Copyright */}
        <div className="pt-5 text-center">
          <p className="text-center text-xs text-white/55">
            © 2026 KindnessMeet. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
