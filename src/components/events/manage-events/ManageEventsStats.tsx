
import {
  CalendarDays,
  CalendarClock,
  ListChecks,
} from "lucide-react";

type Props = {
  total: number;
  upcoming: number;
  past: number;
};

export default function ManageEventsStats({
  total,
  upcoming,
  past,
}: Props) {
  const stats = [
    {
      label: "Total Events",
      value: total,
      icon: ListChecks,
    },
    {
      label: "Upcoming Events",
      value: upcoming,
      icon: CalendarClock,
    },
    {
      label: "Past Events",
      value: past,
      icon: CalendarDays,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon size={23} />
            </div>

            <div>
              <p className="text-sm text-muted">
                {stat.label}
              </p>

              <p className="mt-1 text-2xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
