
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@heroui/react";
import Swal from "sweetalert2";

import {
  Camera,
  CheckCircle2,
  Mail,
  Pencil,
  Save,
  UserRound,
  X,
} from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import ProfileAvatar from "./ProfileAvatar";

type Props = {
  name: string;
  email: string;
  image?: string | null;
};

function isValidImageURL(value: string) {
  if (!value.trim()) return true;

  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export default function EditProfileModal({
  name,
  email,
  image,
}: Props) {
  const router = useRouter();

  const { refetch } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedImage, setEditedImage] = useState(image ?? "");
  const [saving, setSaving] = useState(false);

  const validName = editedName.trim().length > 0;
  const validImage = isValidImageURL(editedImage);

  const hasChanges =
    editedName.trim() !== name ||
    editedImage.trim() !== (image ?? "");

  // Open modal with current profile information
  const openModal = () => {
    setEditedName(name);
    setEditedImage(image ?? "");
    setIsOpen(true);
  };

  // Save Profile
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      saving ||
      !validName ||
      !validImage ||
      !hasChanges
    ) {
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: editedName.trim(),
        image: editedImage.trim() || null,
      });

      if (error) {
        throw new Error(
          error.message || "Unable to update profile."
        );
      }

      // Close modal and refresh profile information
      setIsOpen(false);

      await refetch();
      router.refresh();

      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#B44942",
        timer: 1800,
        timerProgressBar: true,
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

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10 disabled:opacity-60";

  const labelClass =
    "block text-sm font-semibold text-foreground";

  return (
    <>
      {/* Edit Profile Button */}
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <Pencil size={17} />
        Edit Profile
      </button>

      {/* Edit Modal */}
      <Modal>
        <Modal.Backdrop
          isOpen={isOpen}
          onOpenChange={(open) => {
            if (!saving) setIsOpen(open);
          }}
          variant="blur"
          isDismissable={!saving}
          isKeyboardDismissDisabled={saving}
        >
          <Modal.Container size="md" scroll="inside">
            <Modal.Dialog className="bg-surface text-foreground">

              {/* Modal Header */}
              <Modal.Header>
                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Pencil size={21} />
                    </div>

                    <div>
                      <Modal.Heading>
                        Edit Profile
                      </Modal.Heading>

                      <p className="mt-1 text-xs text-muted">
                        Update your personal information.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={saving}
                    aria-label="Close edit profile modal"
                    className="flex size-9 items-center justify-center rounded-lg text-muted transition hover:bg-accent/10 hover:text-accent disabled:opacity-50"
                  >
                    <X size={19} />
                  </button>
                </div>
              </Modal.Header>

              {/* Modal Body */}
              <Modal.Body>
                <form
                  id="edit-profile-form"
                  onSubmit={handleSubmit}
                  className="space-y-5 py-2"
                >
                  {/* Profile Image Preview */}
                  <div className="flex flex-col items-center gap-3 rounded-xl bg-background p-5">
                    <ProfileAvatar
                      name={editedName || "User"}
                      image={
                        validImage ? editedImage : null
                      }
                      size="md"
                    />

                    <p className="text-xs text-muted">
                      Profile photo preview
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="edit-profile-name"
                      className={labelClass}
                    >
                      Full Name *
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-muted"
                      />

                      <input
                        id="edit-profile-name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        value={editedName}
                        onChange={(event) =>
                          setEditedName(event.target.value)
                        }
                        placeholder="Enter your full name"
                        className={`${inputClass} pl-11`}
                        aria-invalid={!validName}
                      />
                    </div>

                    {!validName && (
                      <p className="mt-2 text-xs text-red-500">
                        Name cannot be empty.
                      </p>
                    )}
                  </div>

                  {/* Email - Read Only */}
                  <div>
                    <label
                      htmlFor="edit-profile-email"
                      className={labelClass}
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-muted"
                      />

                      <input
                        id="edit-profile-email"
                        name="email"
                        type="email"
                        value={email}
                        disabled
                        className={`${inputClass} pl-11`}
                      />
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                      <CheckCircle2 size={14} />
                      Email is managed by your login account.
                    </p>
                  </div>

                  {/* Profile Photo URL */}
                  <div>
                    <label
                      htmlFor="edit-profile-image"
                      className={labelClass}
                    >
                      Profile Photo URL
                    </label>

                    <div className="relative">
                      <Camera
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-muted"
                      />

                      <input
                        id="edit-profile-image"
                        name="image"
                        type="url"
                        value={editedImage}
                        onChange={(event) =>
                          setEditedImage(event.target.value)
                        }
                        placeholder="https://example.com/photo.jpg"
                        className={`${inputClass} pl-11`}
                        aria-invalid={!validImage}
                      />
                    </div>

                    {!validImage ? (
                      <p className="mt-2 text-xs text-red-500">
                        Enter a valid HTTP or HTTPS image URL.
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-muted">
                        Leave empty to remove your current photo.
                      </p>
                    )}
                  </div>
                </form>
              </Modal.Body>

              {/* Modal Footer */}
              <Modal.Footer>
                <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={saving}
                    className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    form="edit-profile-form"
                    disabled={
                      saving ||
                      !hasChanges ||
                      !validName ||
                      !validImage
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={17} />

                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
