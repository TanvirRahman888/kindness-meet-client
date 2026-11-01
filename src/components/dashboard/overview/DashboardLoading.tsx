
export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-8">

      {/* Welcome Banner */}
      <div className="space-y-5 rounded-3xl bg-brand-peach/30 p-6 sm:p-10">
        <div className="h-7 w-48 rounded-full bg-accent/10" />
        <div className="h-10 max-w-md rounded-lg bg-accent/10" />
        <div className="h-4 max-w-xl rounded bg-accent/10" />
        <div className="h-4 max-w-sm rounded bg-accent/10" />

        <div className="flex gap-3 pt-4">
          <div className="h-11 w-36 rounded-xl bg-accent/10" />
          <div className="h-11 w-36 rounded-xl bg-accent/10" />
        </div>
      </div>

      {/* Statistics */}
      <section className="space-y-5">
        <div className="h-7 w-52 rounded bg-accent/10" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="space-y-5 rounded-2xl border border-border bg-surface p-5"
            >
              <div className="size-12 rounded-xl bg-accent/10" />
              <div className="h-4 w-28 rounded bg-accent/10" />
              <div className="h-10 w-20 rounded bg-accent/10" />
              <div className="h-3 w-36 rounded bg-accent/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming and Insights */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-5 rounded-2xl border border-border bg-surface p-6">
          <div className="h-6 w-44 rounded bg-accent/10" />

          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div className="size-14 rounded-xl bg-accent/10" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 rounded bg-accent/10" />
                <div className="h-3 w-1/2 rounded bg-accent/10" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="h-56 rounded-2xl bg-accent/10" />
          <div className="h-56 rounded-2xl bg-accent/10" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-24 rounded-2xl bg-accent/10"
          />
        ))}
      </div>
    </div>
  );
}
