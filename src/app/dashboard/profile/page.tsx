
import { Suspense } from "react";

import ProfileContent from "@/components/dashboard/profile/ProfileContent";
import ProfileLoading from "@/components/dashboard/profile/ProfileLoading";

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-muted">
          View and manage your KindnessMeet account information.
        </p>
      </div>

      {/* Server-rendered Profile */}
      <Suspense fallback={<ProfileLoading />}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}
