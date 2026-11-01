
export default function ManageEventsLoading() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Statistics Skeleton */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"
          >
            <div className="size-12 rounded-xl bg-accent/10" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-24 rounded bg-accent/10" />
              <div className="h-7 w-12 rounded bg-accent/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="border-b border-border p-5">
          <div className="h-5 w-40 rounded bg-accent/10" />
        </div>

        <div className="space-y-3 p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-xl bg-accent/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
