
export default function UpcomingEventsLoading() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 space-y-4">
          <div className="h-7 w-48 rounded-full bg-accent/10" />
          <div className="h-10 max-w-xl rounded-xl bg-accent/10" />
          <div className="h-4 max-w-lg rounded bg-accent/10" />
          <div className="h-4 max-w-sm rounded bg-accent/10" />
        </div>

        {/* Event Card Skeletons */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              {/* Image */}
              <div className="h-52 bg-accent/10" />

              {/* Content */}
              <div className="space-y-4 p-5">
                <div className="h-6 w-28 rounded-full bg-accent/10" />

                <div className="h-6 w-4/5 rounded bg-accent/10" />

                <div className="h-4 w-full rounded bg-accent/10" />

                <div className="h-4 w-2/3 rounded bg-accent/10" />

                <div className="h-11 rounded-xl bg-accent/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
