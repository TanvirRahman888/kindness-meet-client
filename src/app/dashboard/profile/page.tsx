
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Label, TextField } from "@heroui/react";
import {
  UserRound,
  Mail,
  Camera,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import { authClient } from "@/app/lib/auth-client";

function isValidImageURL(value: string) {
  if (!value.trim()) return true;

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export default function ProfilePage() {
  const { data: session, isPending, refetch } =
    authClient.useSession();

  const [editedName, setEditedName] =
    useState<string | null>(null);

  const [editedImage, setEditedImage] =
    useState<string | null>(null);

  const [failedImage, setFailedImage] =
    useState<string | null>(null);

  const [saving, setSaving] = useState(false);

  const user = session?.user;

  // Use current session values until user edits them
  const name = editedName ?? user?.name ?? "";
  const image = editedImage ?? user?.image ?? "";

  const validName = name.trim().length > 0;
  const validImage = isValidImageURL(image);

  const hasChanges =
    !!user &&
    (name.trim() !== user.name ||
      image.trim() !== (user.image ?? ""));

  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const showImage =
    !!image && validImage && failedImage !== image;

  const handleSave = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !user ||
      !validName ||
      !validImage ||
      !hasChanges ||
      saving
    ) {
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        throw new Error(
          error.message || "Unable to update profile."
        );
      }

      await refetch();

      setEditedName(null);
      setEditedImage(null);

      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 1600,
        timerProgressBar: true,
        showConfirmButton: true,
        background: "var(--surface)",
        color: "var(--foreground)",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        confirmButtonColor: "#B44942",
        background: "var(--surface)",
        color: "var(--foreground)",
      });
    } finally {
      setSaving(false);
    }
  };

  // Session loading
  if (isPending) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="animate-pulse space-y-6 rounded-2xl border border-border bg-surface p-8">
          <div className="h-8 w-48 rounded-lg bg-default" />
          <div className="mx-auto size-24 rounded-full bg-default" />
          <div className="h-12 rounded-xl bg-default" />
          <div className="h-12 rounded-xl bg-default" />
          <div className="h-12 rounded-xl bg-default" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted">
          Please log in to view your profile.
        </p>
        <Link href="/login" className="font-medium text-accent">
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-muted">
            View and manage your personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

          {/* Header Background */}
          <div className="h-28 bg-linear-to-r from-brand-peach via-brand-butter to-brand-peach sm:h-36" />

          {/* Avatar and User Info */}
          <div className="relative px-6 pb-6 sm:px-8">

            <div className="-mt-12 mb-4 flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-accent/10 text-3xl font-bold text-accent shadow-md">
              {showImage ? (
                <Image
                  src={image}
                  alt={name}
                  width={96}
                  height={96}
                  unoptimized
                  onError={() => setFailedImage(image)}
                  className="size-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <h2 className="text-2xl font-bold text-foreground">
              {user.name}
            </h2>

            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <Mail size={15} />
              {user.email}
            </p>
          </div>

          <div className="border-t border-border" />

          {/* Edit Form */}
          <form
            onSubmit={handleSave}
            className="space-y-6 p-6 sm:p-8"
          >
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <UserRound size={20} className="text-accent" />
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-muted">
                Update your display name and profile photo.
              </p>
            </div>

            {/* Name */}
            <TextField
              name="name"
              isRequired
              fullWidth
              isInvalid={!validName}
            >
              <Label>Full Name</Label>
              <Input
                variant="secondary"
                fullWidth
                value={name}
                placeholder="Enter your full name"
                onChange={(e) =>
                  setEditedName(e.target.value)
                }
              />
            </TextField>

            {!validName && (
              <p className="-mt-4 text-xs text-red-600">
                Name cannot be empty.
              </p>
            )}

            {/* Email - Read Only */}
            <TextField
              name="email"
              fullWidth
              isDisabled
            >
              <Label>Email Address</Label>
              <Input
                variant="secondary"
                fullWidth
                value={user.email}
                readOnly
              />
            </TextField>

            <p className="-mt-4 flex items-center gap-1.5 text-xs text-muted">
              <CheckCircle2 size={14} />
              Your email address is managed by your login account.
            </p>

            {/* Photo URL */}
            <TextField
              name="photoURL"
              fullWidth
              isInvalid={!validImage}
            >
              <Label>Profile Photo URL</Label>
              <Input
                variant="secondary"
                fullWidth
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) =>
                  setEditedImage(e.target.value)
                }
              />
            </TextField>

            {!validImage && (
              <p className="-mt-4 text-xs text-red-600">
                Please enter a valid HTTP or HTTPS URL.
              </p>
            )}

            <p className="-mt-4 flex items-center gap-2 text-xs text-muted">
              <Camera size={14} />
              Use a publicly accessible image URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                isDisabled={saving || !hasChanges}
                onPress={() => {
                  setEditedName(null);
                  setEditedImage(null);
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                isDisabled={
                  saving ||
                  !hasChanges ||
                  !validName ||
                  !validImage
                }
                isPending={saving}
                className="font-semibold"
              >
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
