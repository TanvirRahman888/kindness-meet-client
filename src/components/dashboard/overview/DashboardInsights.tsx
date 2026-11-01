
import {
  Activity,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import type {
  CategoryStat,
  DashboardMetrics,
} from "./types";

type Props = {
  metrics: DashboardMetrics;
  categories: CategoryStat[];
};

export default function DashboardInsights({
  metrics,
  categories,
}: Props) {
  const totalActivity =
    metrics.totalCreated + metrics.totalJoined;

  const hostedPercent =
    totalActivity > 0
      ? (metrics.totalCreated / totalActivity) * 100
      : 0;

  const joinedPercent =
    totalActivity > 0
      ? (metrics.totalJoined / totalActivity) * 100
      : 0;

  const maxCategoryCount = Math.max(
    1,
    ...categories.map((category) => category.count)
  );

  return (
    <div className="space-y-5">
      {/* Activity Breakdown */}
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Activity size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">
              Activity Overview
            </h2>

            <p className="mt-1 text-xs text-muted">
              Your organizing and volunteering activity.
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-extrabold text-foreground">
              {totalActivity}
            </p>

            <p className="mt-1 text-xs text-muted">
              Total activities
            </p>
          </div>

          <span className="text-xs font-medium text-muted">
            All time
          </span>
        </div>

        {/* Activity Distribution */}
        <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-background">
          <div
            className="bg-accent transition-all"
            style={{ width: `${hostedPercent}%` }}
          />

          <div
            className="bg-[#E0AB68] transition-all"
            style={{ width: `${joinedPercent}%` }}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="size-2.5 rounded-full bg-accent" />
              Organized
            </div>

            <p className="mt-2 text-xl font-bold text-foreground">
              {metrics.totalCreated}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="size-2.5 rounded-full bg-[#E0AB68]" />
              Joined
            </div>

            <p className="mt-2 text-xl font-bold text-foreground">
              {metrics.totalJoined}
            </p>
          </div>
        </div>
      </section>

      {/* Most Organized Categories */}
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <ChartNoAxesColumnIncreasing size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">
              Top Event Categories
            </h2>

            <p className="mt-1 text-xs text-muted">
              Based on events you have organized.
            </p>
          </div>
        </div>

        {categories.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            Create events to see your category statistics.
          </p>
        ) : (
          <div className="space-y-5">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                  <span className="truncate font-semibold text-foreground">
                    {category.name}
                  </span>

                  <span className="font-bold text-accent">
                    {category.count}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-accent/10">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{
                      width: `${
                        (category.count / maxCategoryCount) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
