
"use client";

import { useState } from "react";
import Image from "next/image";
import { UserRound, UsersRound } from "lucide-react";

export type Volunteer = {
  userId: string;
  userName?: string;
  userImage?: string | null;
};

function VolunteerAvatar({ volunteer }: { volunteer: Volunteer }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/10 text-accent">
      {volunteer.userImage && !imageError ? (
        <Image
          src={volunteer.userImage}
          alt={volunteer.userName || "Volunteer"}
          width={36}
          height={36}
          unoptimized
          onError={() => setImageError(true)}
          className="size-full object-cover"
        />
      ) : (
        <UserRound size={19} />
      )}
    </div>
  );
}

export default function JoinedVolunteersCard({
  volunteers,
}: {
  volunteers: Volunteer[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <UsersRound size={19} className="text-accent" />

        <h3 className="text-sm font-bold text-foreground">
          Joined Volunteers ({volunteers.length})
        </h3>
      </div>

      {volunteers.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted">
          No volunteers have joined yet. Be the first to make
          a difference!
        </p>
      ) : (
        <div className="space-y-4">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.userId}
              className="flex items-center gap-3"
            >
              <VolunteerAvatar volunteer={volunteer} />

              <p className="truncate text-sm font-medium text-foreground">
                {volunteer.userName || "Volunteer"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
