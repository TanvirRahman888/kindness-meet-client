"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  PlusCircle,
  Settings,
  BookmarkCheck,
  LogOut,
  LogIn,
  Loader2,
} from "lucide-react";
import { UserRound } from "lucide-react";
import Swal from "sweetalert2";

import ThemeToggle from "@/components/theme-toggle";
import { authClient } from "@/app/lib/auth-client";

type NavbarUser = {
  name: string;
  email: string;
  image?: string | null;
};

const navLinks = [{ label: "Upcoming Events", href: "/upcoming-events" }];

const privateLinks = [
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Create Event",
    href: "/dashboard/create-event",
    icon: PlusCircle,
  },
  {
    label: "Manage Events",
    href: "/dashboard/manage-events",
    icon: Settings,
  },
  {
    label: "Joined Events",
    href: "/dashboard/joined-events",
    icon: BookmarkCheck,
  },
];

// User Avatar
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
        initials || "U"
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const navbarRef = useRef<HTMLElement>(null);

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user ?? null;

  // Navbar States
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close menus
  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  // Close menus on outside click or Escape
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

  // Logout
  const handleLogout = async () => {
    if (isLoggingOut) return;

    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#B44942",
      background: "var(--surface)",
      color: "var(--foreground)",
    });

    if (!result.isConfirmed) return;

    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed");
      }

      closeMenus();

      await Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "See you again soon!",
        timer: 1200,
        showConfirmButton: false,
        background: "var(--surface)",
        color: "var(--foreground)",
      });

      router.replace("/");
      router.refresh();
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again.",
        confirmButtonColor: "#B44942",
        background: "var(--surface)",
        color: "var(--foreground)",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Active Link
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 shadow-sm backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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
            className="h-auto w-[150px] object-contain sm:w-[180px]"
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
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Authentication */}
          <div className="hidden md:block">
            {/* Loading */}
            {isPending ? (
              <div className="size-10 animate-pulse rounded-full bg-default" />
            ) : user ? (
              /* Logged In */
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
                    {/* User Information */}
                    <div className="border-b border-border px-3 py-3">
                      <p className="truncate font-semibold">{user.name}</p>

                      <p className="truncate text-xs text-muted">
                        {user.email}
                      </p>
                    </div>

                    {/* Private Links */}
                    <div className="py-2">
                      {privateLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenus}
                            role="menuitem"
                            aria-current={active ? "page" : undefined}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                              active
                                ? "bg-accent/10 font-semibold text-accent"
                                : "text-foreground hover:bg-accent/10 hover:text-accent"
                            }`}
                          >
                            <Icon size={17} />
                            {link.label}

                            {active && (
                              <span className="ml-auto size-1.5 rounded-full bg-accent" />
                            )}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border pt-2">
                      <button
                        type="button"
                        role="menuitem"
                        disabled={isLoggingOut}
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
                      >
                        {isLoggingOut ? (
                          <Loader2 size={17} className="animate-spin" />
                        ) : (
                          <LogOut size={17} />
                        )}
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out */
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

      {/* Mobile Dropdown */}
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

            {/* Loading */}
            {isPending ? (
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="size-9 animate-pulse rounded-full bg-default" />
                <div className="h-4 w-28 animate-pulse rounded bg-default" />
              </div>
            ) : user ? (
              <>
                {/* User Information */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <UserAvatar user={user} />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                </div>

                {/* Private Links */}
                {privateLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? "bg-accent/10 font-semibold text-accent"
                          : "text-foreground hover:bg-accent/10 hover:text-accent"
                      }`}
                    >
                      <Icon size={18} />
                      {link.label}

                      {active && (
                        <span className="ml-auto size-1.5 rounded-full bg-accent" />
                      )}
                    </Link>
                  );
                })}

                {/* Logout */}
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-danger hover:bg-danger/10 disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <LogOut size={18} />
                  )}
                  Logout
                </button>
              </>
            ) : (
              /* Login */
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
