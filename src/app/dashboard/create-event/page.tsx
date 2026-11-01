
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
  Button,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";

import {
  ArrowLeft,
  CalendarPlus,
  Link2,
} from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

const initialForm = {
  title: "",
  description: "",
  category: "",
  location: "",
  eventDate: "",
  imageUrl: "",
};

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

  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [minDate, setMinDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/categories`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();

        setCategories(data);
      } catch {
        if (!controller.signal.aborted) {
          setCategoryError("Unable to load categories.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCategories(false);
        }
      }
    };

    fetchCategories();
    setMinDate(getLocalDateTime());

    return () => controller.abort();
  }, []);

  const updateForm = (
    field: keyof typeof initialForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Create Event
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const { title, description, category, location, eventDate, imageUrl } =
      form;

    if (
      !title.trim() ||
      !description.trim() ||
      !category ||
      !location.trim() ||
      !eventDate ||
      !imageUrl.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all fields.",
      });
      return;
    }

    const date = new Date(eventDate);

    if (Number.isNaN(date.getTime()) || date <= new Date()) {
      setMinDate(getLocalDateTime());

      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Please select a future date and time.",
      });
      return;
    }

    try {
      const url = new URL(imageUrl.trim());

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Invalid URL");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Invalid Image URL",
        text: "Please provide a valid image URL.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get Better Auth JWT
      const tokenResponse = await fetch("/api/auth/token", {
        credentials: "include",
      });

      if (!tokenResponse.ok) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const { token } = await tokenResponse.json();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Save event
      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          location: location.trim(),
          eventDate: date.toISOString(),
          imageUrl: imageUrl.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      // Reset form
      setForm({ ...initialForm });
      setMinDate(getLocalDateTime());

      await Swal.fire({
        icon: "success",
        title: "Event Created!",
        text: "Your community event was created successfully.",
        confirmButtonColor: "#B44942",
      });
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

      {/* Event Form */}
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
            placeholder="e.g. Community Food Distribution"
            maxLength={150}
          />
        </TextField>

        {/* Event Category */}
        <Select
          name="category"
          isRequired
          fullWidth
          variant="secondary"
          placeholder={
            loadingCategories
              ? "Loading categories..."
              : "Select event category"
          }
          value={form.category || null}
          onChange={(value) =>
            updateForm(
              "category",
              typeof value === "string" ? value : ""
            )
          }
          isDisabled={loadingCategories || categories.length === 0}
        >
          <Label>Event Category</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {categories.map((category) => (
                <ListBox.Item
                  key={category._id}
                  id={category.name}
                  textValue={category.name}
                >
                  <Label>{category.name}</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {categoryError && (
          <p className="-mt-4 text-sm text-red-500">
            {categoryError}
          </p>
        )}

        {/* Description */}
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
            placeholder="Describe the event and its purpose..."
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

        {/* Event Date */}
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
            onFocus={() => setMinDate(getLocalDateTime())}
          />
        </TextField>

        <p className="-mt-4 text-xs text-muted">
          Only future dates and times are allowed.
        </p>

        {/* Image URL */}
        <TextField
          name="imageUrl"
          isRequired
          fullWidth
          value={form.imageUrl}
          onChange={(value) =>
            updateForm("imageUrl", value)
          }
        >
          <Label>
            <span className="inline-flex items-center gap-2">
              <Link2 size={16} />
              Event Image URL
            </span>
          </Label>

          <Input
            type="url"
            variant="secondary"
            placeholder="https://example.com/event.jpg"
          />
        </TextField>

        {/* Form Buttons */}
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
            isDisabled={
              isSubmitting ||
              loadingCategories ||
              categories.length === 0
            }
            isPending={isSubmitting}
            className="bg-accent text-white"
          >
            <CalendarPlus size={18} />
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </Button>
        </div>
      </form>
    </main>
  );
}
