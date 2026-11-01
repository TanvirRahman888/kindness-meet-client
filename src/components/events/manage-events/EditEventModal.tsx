
"use client";

import { useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import { Modal } from "@heroui/react";

import { Pencil, Save } from "lucide-react";

import type {
  ManagedEvent,
  EventCategory,
  UpdateEventData,
} from "./types";

type Props = {
  event: ManagedEvent;
  categories: EventCategory[];
  onClose: () => void;
  onSave: (data: UpdateEventData) => Promise<void>;
};

// Convert stored UTC date to local datetime input value
function toLocalDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);
}

export default function EditEventModal({
  event,
  categories,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    category: event.category,
    location: event.location,
    eventDate: toLocalDateTime(event.eventDate),
    imageUrl: event.imageUrl,
  });

  const [saving, setSaving] = useState(false);

  const updateForm = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Save Changes
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) return;

    const {
      title,
      description,
      category,
      location,
      eventDate,
      imageUrl,
    } = form;

    // Required fields
    if (
      !title.trim() ||
      !description.trim() ||
      !category ||
      !location.trim() ||
      !eventDate ||
      !imageUrl.trim()
    ) {
      await Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all fields.",
      });
      return;
    }

    // Future date validation
    const date = new Date(eventDate);

    if (
      Number.isNaN(date.getTime()) ||
      date <= new Date()
    ) {
      await Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Event date and time must be in the future.",
      });
      return;
    }

    // Image URL validation
    try {
      const url = new URL(imageUrl.trim());

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Invalid URL");
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Invalid Image URL",
        text: "Enter a valid HTTP or HTTPS image URL.",
      });
      return;
    }

    setSaving(true);

    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
        eventDate: date.toISOString(),
        imageUrl: imageUrl.trim(),
      });

      onClose();

      await Swal.fire({
        icon: "success",
        title: "Event Updated!",
        text: "Your event was updated successfully.",
        confirmButtonColor: "#B44942",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error instanceof Error
            ? error.message
            : "Please try again.",
        confirmButtonColor: "#B44942",
      });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10";

  const labelClass =
    "block text-sm font-semibold text-foreground";

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={true}
        onOpenChange={(open) => {
          if (!open && !saving) onClose();
        }}
        variant="blur"
        isDismissable={!saving}
        isKeyboardDismissDisabled={saving}
      >
        <Modal.Container size="lg" scroll="inside">
          <Modal.Dialog className="bg-surface text-foreground">

            {/* Header */}
            <Modal.Header>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Pencil size={21} />
                </div>

                <div>
                  <Modal.Heading>
                    Edit Event
                  </Modal.Heading>

                  <p className="mt-1 text-xs text-muted">
                    Update your event information.
                  </p>
                </div>
              </div>
            </Modal.Header>

            {/* Body */}
            <Modal.Body>
              <form
                id="edit-event-form"
                onSubmit={handleSubmit}
                className="space-y-5 py-2"
              >

                {/* Title */}
                <div>
                  <label
                    htmlFor="edit-title"
                    className={labelClass}
                  >
                    Event Title *
                  </label>

                  <input
                    id="edit-title"
                    type="text"
                    required
                    maxLength={150}
                    value={form.title}
                    onChange={(e) =>
                      updateForm("title", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="edit-category"
                    className={labelClass}
                  >
                    Event Category *
                  </label>

                  <select
                    id="edit-category"
                    required
                    value={form.category}
                    onChange={(e) =>
                      updateForm("category", e.target.value)
                    }
                    className={inputClass}
                  >
                    {!categories.some(
                      (item) => item.name === form.category
                    ) && (
                      <option value={form.category}>
                        {form.category}
                      </option>
                    )}

                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="edit-description"
                    className={labelClass}
                  >
                    Description *
                  </label>

                  <textarea
                    id="edit-description"
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      updateForm("description", e.target.value)
                    }
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="edit-location"
                    className={labelClass}
                  >
                    Event Location *
                  </label>

                  <input
                    id="edit-location"
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) =>
                      updateForm("location", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                {/* Date & Time */}
                <div>
                  <label
                    htmlFor="edit-date"
                    className={labelClass}
                  >
                    Event Date & Time *
                  </label>

                  <input
                    id="edit-date"
                    type="datetime-local"
                    required
                    min={toLocalDateTime(
                      new Date().toISOString()
                    )}
                    value={form.eventDate}
                    onChange={(e) =>
                      updateForm("eventDate", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor="edit-image"
                    className={labelClass}
                  >
                    Event Image URL *
                  </label>

                  <input
                    id="edit-image"
                    type="url"
                    required
                    value={form.imageUrl}
                    onChange={(e) =>
                      updateForm("imageUrl", e.target.value)
                    }
                    placeholder="https://example.com/event.jpg"
                    className={inputClass}
                  />
                </div>
              </form>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer>
              <div className="flex w-full justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/30 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="edit-event-form"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  <Save size={17} />

                  {saving
                    ? "Saving Changes..."
                    : "Save Changes"}
                </button>
              </div>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
