
export default function EventDetailsLoading() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <div className="h-5 w-44 animate-pulse rounded bg-accent/10" />

      <div className="h-80 animate-pulse rounded-3xl bg-accent/10 sm:h-100" />

      <div className="h-24 animate-pulse rounded-2xl bg-accent/10" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-72 animate-pulse rounded-2xl bg-accent/10 lg:col-span-2" />

        <div className="h-60 animate-pulse rounded-2xl bg-accent/10" />
      </div>
    </main>
  );
}
