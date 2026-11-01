
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

import { Eye, Pencil, Trash2 } from "lucide-react";

import EditEventModal from "./EditEventModal";



import type {
  ManagedEvent,
  EventCategory,
  UpdateEventData,
} from "./types";
import { deleteManagedEvent, updateManagedEvent } from "../../../app/dashboard/manage-events/actions";

type Props = {
  event: ManagedEvent;
  categories: EventCategory[];
};

export default function ManageEventActions({
  event,
  categories,
}: Props) {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Edit Event
  const handleUpdate = async (data: UpdateEventData) => {
    const result = await updateManagedEvent(event._id, data);

    if (!result.success) {
      throw new Error(result.message);
    }

    router.refresh();
  };

  // Delete Event
  const handleDelete = async () => {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Delete Event?",
      text: `Are you sure you want to delete "${event.title}"? This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#B44942",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    setDeleting(true);

    try {
      const result = await deleteManagedEvent(event._id);

      if (!result.success) {
        throw new Error(result.message);
      }

      router.refresh();

      await Swal.fire({
        icon: "success",
        title: "Event Deleted!",
        text: "Your event was deleted successfully.",
        confirmButtonColor: "#B44942",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error instanceof Error
            ? error.message
            : "Please try again.",
        confirmButtonColor: "#B44942",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">

        {/* View */}
        <Link
          href={`/upcoming-events/${event._id}`}
          title="View Event"
          aria-label={`View ${event.title}`}
          className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:border-accent hover:text-accent"
        >
          <Eye size={17} />
        </Link>

        {/* Edit */}
        <button
          type="button"
          title="Edit Event"
          aria-label={`Edit ${event.title}`}
          onClick={() => setEditing(true)}
          disabled={deleting}
          className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:border-accent hover:bg-accent/10 hover:text-accent disabled:opacity-50"
        >
          <Pencil size={17} />
        </button>

        {/* Delete */}
        <button
          type="button"
          title="Delete Event"
          aria-label={`Delete ${event.title}`}
          onClick={handleDelete}
          disabled={deleting}
          className="flex size-9 items-center justify-center rounded-lg border border-red-500/20 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={17} />
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <EditEventModal
          event={event}
          categories={categories}
          onClose={() => setEditing(false)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}
