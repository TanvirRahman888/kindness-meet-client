
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

import { Eye, Trash2 } from "lucide-react";

import { leaveJoinedEvent } from "@/app/dashboard/joined-events/actions";
import type { JoinedEvent } from "./types";

type Props = {
  event: JoinedEvent;
};

export default function JoinedEventActions({ event }: Props) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const handleLeave = async () => {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Leave This Event?",
      text: `Are you sure you want to leave "${event.title}"?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Leave Event",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#B44942",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    setLeaving(true);

    try {
      const result = await leaveJoinedEvent(event.eventId);

      if (!result.success) {
        throw new Error(result.message);
      }

      router.refresh();

      await Swal.fire({
        icon: "success",
        title: "Event Left!",
        text: "Your participation has been removed successfully.",
        confirmButtonColor: "#B44942",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Unable to Leave Event",
        text:
          error instanceof Error
            ? error.message
            : "Please try again.",
        confirmButtonColor: "#B44942",
      });
    } finally {
      setLeaving(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">

      {/* View Event */}
      <Link
        href={`/upcoming-events/${event.eventId}`}
        title="View Event"
        aria-label={`View ${event.title}`}
        className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:border-accent hover:bg-accent/10 hover:text-accent"
      >
        <Eye size={17} />
      </Link>

      {/* Leave Event */}
      <button
        type="button"
        title="Leave Event"
        aria-label={`Leave ${event.title}`}
        onClick={handleLeave}
        disabled={leaving}
        className="flex size-9 items-center justify-center rounded-lg border border-red-500/20 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}
