
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-bold text-accent">
            KindnessMeet
          </span>

          <ThemeToggle />
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          Small Acts. Big Impact.
        </h1>

        <p className="mt-3 text-muted">
          Discover and join meaningful community events.
          Together, we can make a difference.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-foreground">
            Explore Events
          </button>

          <button className="rounded-lg bg-default px-5 py-3 font-medium text-default-foreground">
            Create Event
          </button>
        </div>
      </div>
    </main>
  );
}
