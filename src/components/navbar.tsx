"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  PlusCircle,
  Settings,
  BookmarkCheck,
  LogOut,
  LogIn,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

type NavbarUser = {
  name: string;
  email?: string;
  image?: string | null;
};

type NavbarProps = {
  user?: NavbarUser | null;
  onLogout?: () => void | Promise<void>;
};

const navLinks = [{ label: "Upcoming Events", href: "/upcoming-events" }];

const privateLinks = [
  {
    label: "Create Event",
    href: "/create-event",
    icon: PlusCircle,
  },
  {
    label: "Manage Events",
    href: "/manage-events",
    icon: Settings,
  },
  {
    label: "Joined Events",
    href: "/joined-events",
    icon: BookmarkCheck,
  },
];

function UserAvatar({ user }: { user: NavbarUser }) {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/15 text-sm font-semibold text-accent">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name}
          width={36}
          height={36}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

export default function Navbar({ user = null, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Close menus when clicking outside or pressing Escape.
  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    closeMenus();
    void onLogout?.();
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 shadow-sm backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center"
          aria-label="KindnessMeet Home"
        >
          <Image
            src="/KindnessMeetLogo.png"
            alt="KindnessMeet"
            width={180}
            height={60}
            priority
            className="h-auto w-37.5 object-contain sm:w-[45"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-accent/10 text-accent"
                  : "text-foreground hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Desktop Authentication */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  title={user.name}
                  aria-label={`${user.name} profile menu`}
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface p-1.5 pr-3 transition-colors hover:bg-accent/10"
                >
                  <UserAvatar user={user} />
                  <ChevronDown
                    size={16}
                    className={`text-muted transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl border border-border bg-overlay p-2 text-overlay-foreground shadow-xl"
                  >
                    <div className="border-b border-border px-3 py-3">
                      <p className="truncate font-semibold">{user.name}</p>
                      {user.email && (
                        <p className="truncate text-xs text-muted">
                          {user.email}
                        </p>
                      )}
                    </div>

                    <div className="py-2">
                      {privateLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenus}
                            role="menuitem"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
                          >
                            <Icon size={17} />
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>

                    {onLogout && (
                      <div className="border-t border-border pt-2">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger transition-colors hover:bg-danger/10"
                        >
                          <LogOut size={17} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                <LogIn size={17} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-accent/10 md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown - OVERLAYS PAGE CONTENT */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-border bg-surface/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {/* Public Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-accent/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-border" />

            {user ? (
              <>
                {/* User Information */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <UserAvatar user={user} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    {user.email && (
                      <p className="truncate text-xs text-muted">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Private Links */}
                {privateLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent"
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}

                {onLogout && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-danger hover:bg-danger/10"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                )}
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
