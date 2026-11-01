
import { Suspense } from "react";

import DashboardContent from "@/components/dashboard/overview/DashboardContent";
import DashboardLoading from "@/components/dashboard/overview/DashboardLoading";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
