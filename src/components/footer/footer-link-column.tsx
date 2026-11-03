
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
};

type Props = {
  title: string;
  links: FooterLink[];
};

export default function FooterLinkColumn({
  title,
  links,
}: Props) {
  return (
    <div>
      {/* Column Heading */}
      <h3 className="text-sm font-bold text-white">
        {title}
      </h3>

      {/* Accent Line */}
      <div className="mt-3 h-0.5 w-8 bg-[#B44942]" />

      {/* Navigation Links */}
      <ul className="mt-6 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm leading-5 text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-[#E7A69F]"
            >
              <span>{link.label}</span>

              <ArrowUpRight
                size={13}
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
