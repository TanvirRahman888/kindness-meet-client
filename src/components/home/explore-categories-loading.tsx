
export default function ExploreCategoriesLoading() {
  return (
    <section className="border-y border-border bg-surface/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">

        {/* Header Skeleton */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4">
          <div className="h-7 w-36 rounded-full bg-accent/10" />

          <div className="h-10 w-3/4 rounded-xl bg-accent/10" />

          <div className="h-4 w-full rounded bg-accent/10" />

          <div className="h-4 w-2/3 rounded bg-accent/10" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-56 rounded-2xl border border-border bg-surface p-5"
            >
              <div className="size-14 rounded-2xl bg-accent/10" />

              <div className="mt-6 h-5 w-4/5 rounded bg-accent/10" />

              <div className="mt-3 h-4 w-3/5 rounded bg-accent/10" />

              <div className="mt-7 h-7 w-28 rounded-full bg-accent/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
