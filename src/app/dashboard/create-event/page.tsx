
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
  Button,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import {
  CalendarPlus,
  Link2,
  ArrowLeft,
} from "lucide-react";

// Get current local date and time
function getLocalDateTime() {
  const now = new Date();

  return new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);
}

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    imageUrl: "",
  });

  const [minDate, setMinDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMinDate(getLocalDateTime());
  }, []);

  const updateForm = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit Event
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    // Required fields validation
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.eventDate
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#B44942",
      });
      return;
    }

    // Future date validation
    const date = new Date(form.eventDate);

    if (
      Number.isNaN(date.getTime()) ||
      date <= new Date()
    ) {
      setMinDate(getLocalDateTime());

      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Event date and time must be in the future.",
        confirmButtonColor: "#B44942",
      });
      return;
    }

    // Image URL validation
    if (form.imageUrl.trim()) {
      try {
        const url = new URL(form.imageUrl.trim());

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Invalid Image URL",
          text: "Please enter a valid HTTP or HTTPS image URL.",
          confirmButtonColor: "#B44942",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Get JWT from Better Auth
      const tokenResponse = await fetch("/api/auth/token", {
        credentials: "include",
      });

      if (!tokenResponse.ok) {
        throw new Error(
          "Authentication failed. Please log in again."
        );
      }

      const { token } = await tokenResponse.json();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Send event data to Express API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title.trim(),
            description: form.description.trim(),
            location: form.location.trim(),
            eventDate: date.toISOString(),
            imageUrl: form.imageUrl.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create event."
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Event Created!",
        text: "Your community event was created successfully.",
        confirmButtonColor: "#B44942",
      });

      router.push("/dashboard/manage-events");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text:
          error instanceof Error
            ? error.message
            : "Please try again.",
        confirmButtonColor: "#B44942",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent"
        >
          <ArrowLeft size={17} />
          Go Back
        </button>

        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <CalendarPlus size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Create Event
            </h1>

            <p className="mt-1 text-sm text-muted">
              Organize a meaningful community event.
            </p>
          </div>
        </div>
      </div>

      {/* Create Event Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Event Information
          </h2>

          <p className="mt-1 text-sm text-muted">
            Fill in the details for your upcoming event.
          </p>
        </div>

        {/* Event Title */}
        <TextField
          name="title"
          isRequired
          fullWidth
          value={form.title}
          onChange={(value) => updateForm("title", value)}
        >
          <Label>Event Title</Label>

          <Input
            variant="secondary"
            placeholder="e.g. Community Tree Plantation"
            maxLength={150}
          />
        </TextField>

        {/* Event Description */}
        <TextField
          name="description"
          isRequired
          fullWidth
          value={form.description}
          onChange={(value) =>
            updateForm("description", value)
          }
        >
          <Label>Event Description</Label>

          <TextArea
            variant="secondary"
            rows={5}
            placeholder="Describe your event and its purpose..."
          />
        </TextField>

        {/* Location */}
        <TextField
          name="location"
          isRequired
          fullWidth
          value={form.location}
          onChange={(value) =>
            updateForm("location", value)
          }
        >
          <Label>Event Location</Label>

          <Input
            variant="secondary"
            placeholder="e.g. Dhaka, Bangladesh"
          />
        </TextField>

        {/* Date and Time */}
        <TextField
          name="eventDate"
          isRequired
          fullWidth
          value={form.eventDate}
          onChange={(value) =>
            updateForm("eventDate", value)
          }
        >
          <Label>Event Date & Time</Label>

          <Input
            type="datetime-local"
            variant="secondary"
            min={minDate}
            onFocus={() =>
              setMinDate(getLocalDateTime())
            }
          />
        </TextField>

        <p className="-mt-4 text-xs text-muted">
          Only future dates and times are allowed.
        </p>

        {/* Image URL */}
        <TextField
          name="imageUrl"
          fullWidth
          value={form.imageUrl}
          onChange={(value) =>
            updateForm("imageUrl", value)
          }
        >
          <Label>
            <span className="inline-flex items-center gap-2">
              <Link2 size={16} />
              Event Image URL (Optional)
            </span>
          </Label>

          <Input
            type="url"
            variant="secondary"
            placeholder="https://example.com/event-image.jpg"
          />
        </TextField>

        <p className="-mt-4 text-xs text-muted">
          Paste a direct image link (JPG, PNG, WebP, etc.).
        </p>

        {/* Form Actions */}
        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            isDisabled={isSubmitting}
            onPress={() => router.back()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            isDisabled={isSubmitting}
            isPending={isSubmitting}
            className="bg-accent text-white"
          >
            <CalendarPlus size={18} />
            {isSubmitting
              ? "Creating Event..."
              : "Create Event"}
          </Button>
        </div>
      </form>
    </main>
  );
}
