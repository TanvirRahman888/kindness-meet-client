
export default function UpcomingEventsLoading() {
  return (
    <div className="animate-pulse">

      {/* Hero Skeleton */}
      <div className="flex min-h-82 items-center bg-accent/10 px-4 py-14 sm:min-h-100">
        <div className="mx-auto w-full max-w-7xl space-y-5">
          <div className="h-7 w-44 rounded-full bg-accent/10" />

          <div className="h-12 max-w-xl rounded-xl bg-accent/10" />

          <div className="h-5 max-w-lg rounded bg-accent/10" />

          <div className="h-12 w-40 rounded-xl bg-accent/10" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="space-y-4">
          <div className="h-8 w-48 rounded-xl bg-accent/10" />
          <div className="h-4 w-80 max-w-full rounded bg-accent/10" />
        </div>

        {/* Category Skeleton */}
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-28 rounded-full bg-accent/10"
            />
          ))}
        </div>

        {/* Event Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="h-52 bg-accent/10" />

              <div className="space-y-4 p-5">
                <div className="h-6 w-28 rounded bg-accent/10" />
                <div className="h-6 w-4/5 rounded bg-accent/10" />
                <div className="h-4 w-full rounded bg-accent/10" />
                <div className="h-4 w-2/3 rounded bg-accent/10" />
                <div className="h-11 rounded-xl bg-accent/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
