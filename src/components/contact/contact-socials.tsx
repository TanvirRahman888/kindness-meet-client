
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import type { IconType } from "react-icons";
import { HeartHandshake } from "lucide-react";

type SocialLink = {
  name: string;
  href: string | null;
  icon: IconType;
};

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: null, // Add your Facebook page URL
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: null, // Add your Instagram URL
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: null, // Add your LinkedIn URL
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: null, // Add your YouTube URL
    icon: FaYoutube,
  },
];

export default function ContactSocials() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-7">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <HeartHandshake size={22} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-foreground">
            Connect With Us
          </h3>

          <p className="mt-1 text-xs text-muted">
            Follow our community journey.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-border" />

      {/* Social Media Icons */}
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          const styles =
            "flex size-12 items-center justify-center rounded-xl border border-border bg-background text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white hover:shadow-md";

          if (!social.href) {
            return (
              <span
                key={social.name}
                title={`${social.name} coming soon`}
                aria-label={`${social.name} coming soon`}
                className="flex size-12 cursor-not-allowed items-center justify-center rounded-xl border border-border bg-background text-muted opacity-60"
              >
                <Icon size={21} aria-hidden="true" />
              </span>
            );
          }

          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit KindnessMeet on ${social.name}`}
              title={social.name}
              className={styles}
            >
              <Icon size={21} aria-hidden="true" />
            </a>
          );
        })}
      </div>

      {/* Description */}
      <p className="mt-5 text-xs leading-6 text-muted">
        Stay connected for community stories, upcoming
        events, volunteer opportunities, and updates.
      </p>
    </div>
  );
}
