
export default function ProfileLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="h-44 bg-brand-peach/40" />

        <div className="space-y-5 px-6 pb-8 sm:px-8">
          <div className="-mt-14 size-28 rounded-full border-4 border-surface bg-accent/10" />

          <div className="h-8 w-52 rounded-lg bg-accent/10" />
          <div className="h-4 w-64 rounded bg-accent/10" />
          <div className="h-7 w-36 rounded-full bg-accent/10" />
        </div>
      </div>

      {/* Information Card */}
      <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="h-7 w-48 rounded bg-accent/10" />

        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-3 w-24 rounded bg-accent/10" />
              <div className="h-5 w-44 rounded bg-accent/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
