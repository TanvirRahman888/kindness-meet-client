
"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, ShieldCheck, UserRound } from "lucide-react";

type Props = {
  name?: string;
  email?: string;
  image?: string | null;
};

export default function EventOrganizerCard({
  name,
  email,
  image,
}: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <h3 className="mb-5 text-sm font-bold text-foreground">
        Event Organizer
      </h3>

      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/10 text-accent">
          {image && !imageError ? (
            <Image
              src={image}
              alt={name || "Organizer"}
              width={48}
              height={48}
              unoptimized
              onError={() => setImageError(true)}
              className="size-full object-cover"
            />
          ) : (
            <UserRound size={24} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">
            {name || "Community Organizer"}
          </p>

          {email && (
            <p className="mt-1 flex items-center gap-1.5 break-all text-xs text-muted">
              <Mail size={13} className="shrink-0" />
              {email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted">
        <ShieldCheck size={16} className="text-accent" />
        Community Event Organizer
      </div>
    </div>
  );
}
