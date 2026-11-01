
import Link from "next/link";

export default function NavbarFallback() {
  return (
    <header className="h-18 border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-bold text-accent"
        >
          KindnessMeet
        </Link>
      </div>
    </header>
  );
}
