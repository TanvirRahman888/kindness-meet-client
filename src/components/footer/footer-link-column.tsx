
import Link from "next/link";

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
      <h3 className="text-sm font-bold text-white">
        {title}
      </h3>

      <ul className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
        {links.map((link, index) => (
          <li
            key={link.href}
            className="inline-flex items-center gap-2"
          >
            <Link
              href={link.href}
              className="text-xs text-white/65 transition-colors hover:text-[#F2B4A7]"
            >
              {link.label}
            </Link>

            {index < links.length - 1 && (
              <span
                aria-hidden="true"
                className="text-xs text-white/30"
              >
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
