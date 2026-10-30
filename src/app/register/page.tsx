
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Button,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import {
  HeartHandshake,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Swal from "sweetalert2";
import { signUp, signIn } from "../lib/auth-client";

type SocialProvider = "google" | "github";

type FormData = {
  name: string;
  email: string;
  photoURL: string;
  password: string;
  confirmPassword: string;
};

// Password validation
function getPasswordError(password: string): string | null {
  if (password.length < 8) {
    return "At least 8 characters required";
  }

  if (!/[A-Z]/.test(password)) {
    return "At least one uppercase letter required";
  }

  if (!/[a-z]/.test(password)) {
    return "At least one lowercase letter required";
  }

  if (!/[0-9]/.test(password)) {
    return "At least one number required";
  }

  if (!/[^A-Za-z0-9\s]/.test(password)) {
    return "At least one special symbol required";
  }

  return null;
}

// URL validation
function isValidURL(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

// Inline validation message
function ValidationMessage({
  valid,
  message,
}: {
  valid: boolean;
  message: string;
}) {
  return (
    <p
      role="status"
      className={`mt-1 flex items-center gap-1.5 text-xs ${
        valid
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`}
    >
      {valid ? (
        <CheckCircle2 className="size-3.5 shrink-0" />
      ) : (
        <XCircle className="size-3.5 shrink-0" />
      )}

      {message}
    </p>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Live validation
  const nameValid = form.name.trim().length > 0;

  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const photoValid = isValidURL(form.photoURL.trim());

  const passwordError = getPasswordError(form.password);

  const passwordValid =
    form.password.length > 0 && passwordError === null;

  const passwordsMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const formValid =
    nameValid &&
    emailValid &&
    photoValid &&
    passwordValid &&
    passwordsMatch;

  const isBusy = loading || socialLoading !== null;

  // SweetAlert theme
  const alertTheme = {
    background: "var(--surface)",
    color: "var(--foreground)",
    confirmButtonColor: "#B44942",
  };

  // Email registration
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formValid || isBusy) return;

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        image: form.photoURL.trim(),
      });

      if (error) {
        await Swal.fire({
          ...alertTheme,
          icon: "error",
          title: "Registration Failed",
          text: error.message || "Unable to create account.",
        });
        return;
      }

      await Swal.fire({
        ...alertTheme,
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to KindnessMeet!",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      });

      router.push("/");
      router.refresh();
    } catch {
      await Swal.fire({
        ...alertTheme,
        icon: "error",
        title: "Something Went Wrong",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Social authentication
  const handleSocialLogin = async (
    provider: SocialProvider
  ) => {
    if (isBusy) return;

    setSocialLoading(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        await Swal.fire({
          ...alertTheme,
          icon: "error",
          title: "Authentication Failed",
          text: error.message || "Unable to sign in.",
        });
      }
    } catch {
      await Swal.fire({
        ...alertTheme,
        icon: "error",
        title: "Something Went Wrong",
        text: "Unable to connect. Please try again.",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-accent/10">
            <HeartHandshake className="size-7 text-accent" />
          </div>

          <h1 className="text-3xl font-bold text-foreground">
            Join KindnessMeet
          </h1>

          <p className="mt-2 text-sm text-muted">
            Create an account and start making a difference.
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          validationBehavior="aria"
          className="flex w-full flex-col gap-5"
        >
          {/* Name */}
          <TextField
            name="name"
            isRequired
            isInvalid={form.name.length > 0 && !nameValid}
            fullWidth
          >
            <Label>Full Name</Label>

            <Input
              variant="secondary"
              fullWidth
              placeholder="Enter your full name"
              autoComplete="name"
              value={form.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
            />

            {form.name.length > 0 && (
              <ValidationMessage
                valid={nameValid}
                message={
                  nameValid
                    ? "Name looks good"
                    : "Please enter your full name"
                }
              />
            )}
          </TextField>

          {/* Email */}
          <TextField
            name="email"
            type="email"
            isRequired
            isInvalid={form.email.length > 0 && !emailValid}
            fullWidth
          >
            <Label>Email Address</Label>

            <Input
              variant="secondary"
              fullWidth
              placeholder="Enter your email"
              autoComplete="email"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
            />

            {form.email.length > 0 && (
              <ValidationMessage
                valid={emailValid}
                message={
                  emailValid
                    ? "Valid email address"
                    : "Please enter a valid email address"
                }
              />
            )}
          </TextField>

          {/* Photo URL */}
          <TextField
            name="photoURL"
            type="url"
            isRequired
            isInvalid={
              form.photoURL.length > 0 && !photoValid
            }
            fullWidth
          >
            <Label>Profile Photo URL</Label>

            <Input
              variant="secondary"
              fullWidth
              placeholder="https://example.com/photo.jpg"
              value={form.photoURL}
              onChange={(e) =>
                updateField("photoURL", e.target.value)
              }
            />

            {form.photoURL.length > 0 && (
              <ValidationMessage
                valid={photoValid}
                message={
                  photoValid
                    ? "Valid URL format"
                    : "Enter a valid HTTP or HTTPS URL"
                }
              />
            )}
          </TextField>

          {/* Password */}
          <TextField
            name="password"
            isRequired
            isInvalid={
              form.password.length > 0 && !passwordValid
            }
            fullWidth
          >
            <Label>Password</Label>

            <InputGroup variant="secondary" fullWidth>
              <InputGroup.Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                value={form.password}
                onChange={(e) =>
                  updateField("password", e.target.value)
                }
              />

              <InputGroup.Suffix>
                <Button
                  type="button"
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onPress={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>

            {form.password.length > 0 ? (
              <ValidationMessage
                valid={passwordValid}
                message={
                  passwordValid
                    ? "Strong password! All requirements met"
                    : passwordError || "Invalid password"
                }
              />
            ) : (
              <p className="mt-1 text-xs text-muted">
                8+ characters • Uppercase • Lowercase • Number • Symbol
              </p>
            )}
          </TextField>

          {/* Confirm Password */}
          <TextField
            name="confirmPassword"
            isRequired
            isInvalid={
              form.confirmPassword.length > 0 &&
              !passwordsMatch
            }
            fullWidth
          >
            <Label>Confirm Password</Label>

            <InputGroup variant="secondary" fullWidth>
              <InputGroup.Input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) =>
                  updateField(
                    "confirmPassword",
                    e.target.value
                  )
                }
              />

              <InputGroup.Suffix>
                <Button
                  type="button"
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onPress={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>

            {form.confirmPassword.length > 0 && (
              <ValidationMessage
                valid={passwordsMatch}
                message={
                  passwordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"
                }
              />
            )}
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isDisabled={!formValid || isBusy}
            isPending={loading}
            className="mt-2 h-12 font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            fullWidth
            isDisabled={isBusy}
            onPress={() =>
              handleSocialLogin("google")
            }
            className="h-12 font-medium"
          >
            {socialLoading === "google" ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <FcGoogle className="size-5" />
            )}
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            fullWidth
            isDisabled={isBusy}
            onPress={() =>
              handleSocialLogin("github")
            }
            className="h-12 font-medium"
          >
            {socialLoading === "github" ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <FaGithub className="size-5" />
            )}
            GitHub
          </Button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-accent hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
