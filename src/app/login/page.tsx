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
import { signIn } from "../lib/auth-client";

type SocialProvider = "google" | "github";

type LoginForm = {
  email: string;
  password: string;
};

// Live validation component
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

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(
    null,
  );

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  // Update form fields
  const updateField = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const passwordValid = form.password.length > 0;

  const formValid = emailValid && passwordValid;

  const isBusy = loading || socialLoading !== null;

  // SweetAlert theme
  const alertTheme = {
    background: "var(--surface)",
    color: "var(--foreground)",
    confirmButtonColor: "#B44942",
  };

  // Email and password login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValid || isBusy) return;

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: form.email.trim(),
        password: form.password,
        rememberMe: true,
      });

      if (error) {
        await Swal.fire({
          ...alertTheme,
          icon: "error",
          title: "Login Failed",
          text: error.message || "Invalid email or password.",
        });

        return;
      }

      await Swal.fire({
        ...alertTheme,
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to KindnessMeet!",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      router.push("/");
      router.refresh();
    } catch {
      await Swal.fire({
        ...alertTheme,
        icon: "error",
        title: "Something Went Wrong",
        text: "Unable to login. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Social authentication
  const handleSocialLogin = async (provider: SocialProvider) => {
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
          text: error.message || "Unable to sign in with this provider.",
        });
      }

      // Better Auth handles OAuth redirect.
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

          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>

          <p className="mt-2 text-sm text-muted">
            Login to KindnessMeet and continue making a difference.
          </p>
        </div>

        {/* Login Form */}
        <Form
          onSubmit={handleSubmit}
          validationBehavior="aria"
          className="flex w-full flex-col gap-5"
        >
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
              onChange={(e) => updateField("email", e.target.value)}
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

          {/* Password */}
          <TextField name="password" isRequired fullWidth>
            <Label>Password</Label>

            <InputGroup variant="secondary" fullWidth>
              <InputGroup.Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
              />

              <InputGroup.Suffix>
                <Button
                  type="button"
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>

            {form.password.length > 0 && (
              <ValidationMessage
                valid={passwordValid}
                message="Password entered"
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
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs text-muted">Or continue with</span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Google */}
          <Button
            type="button"
            variant="outline"
            fullWidth
            isDisabled={isBusy}
            onPress={() => handleSocialLogin("google")}
            className="h-12 font-medium"
          >
            {socialLoading === "google" ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <FcGoogle className="size-5" />
            )}
            Google
          </Button>

          {/* GitHub */}
          <Button
            type="button"
            variant="outline"
            fullWidth
            isDisabled={isBusy}
            onPress={() => handleSocialLogin("github")}
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

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-accent hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}
