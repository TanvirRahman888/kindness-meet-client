
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

import { authClient } from "@/app/lib/auth-client";
import EventOrganizerCard from "@/components/events/EventOrganizerCard";
import JoinedVolunteersCard, {
  type Volunteer,
} from "@/components/events/JoinedVolunteersCard";
import VolunteerJoinRules from "@/components/events/VolunteerJoinRules";
import type { EventItem } from "@/components/EventCard";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
  HeartHandshake,
  CheckCircle2,
  UserRound,
  ImageOff,
} from "lucide-react";

type EventDetails = EventItem & {
  creatorImage?: string | null;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  // Load event and volunteers
  useEffect(() => {
    const controller = new AbortController();

    async function loadEvent() {
      setLoading(true);
      setError("");
      setImageError(false);

      try {
        const [eventRes, volunteersRes] = await Promise.all([
          fetch(`${API_URL}/api/events/${id}`, {
            signal: controller.signal,
          }),
          fetch(`${API_URL}/api/events/${id}/volunteers`, {
            signal: controller.signal,
          }),
        ]);

        if (!eventRes.ok) {
          throw new Error(
            eventRes.status === 404
              ? "Event not found."
              : "Failed to load event."
          );
        }

        if (!volunteersRes.ok) {
          throw new Error("Failed to load volunteers.");
        }

        const [eventData, volunteersData] = await Promise.all([
          eventRes.json(),
          volunteersRes.json(),
        ]);

        if (!controller.signal.aborted) {
          setEvent(eventData);
          setVolunteers(volunteersData);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => controller.abort();
  }, [id]);

  // Current user status
  const isOrganizer =
    !!session?.user && session.user.id === event?.creatorId;

  const alreadyJoined =
    !!session?.user &&
    volunteers.some((v) => v.userId === session.user.id);

  const eventEnded = event
    ? new Date(event.eventDate).getTime() <= Date.now()
    : false;

  // Join Event
  const handleJoin = async () => {
    if (isPending || joining || !event || eventEnded) return;

    // Not logged in
    if (!session?.user) {
      router.push("/login");
      return;
    }

    // Creator cannot join
    if (isOrganizer || alreadyJoined) return;

    setJoining(true);

    try {
      // Better Auth JWT
      const tokenRes = await fetch("/api/auth/token", {
        credentials: "include",
      });

      if (!tokenRes.ok) {
        throw new Error("Please log in again.");
      }

      const { token } = await tokenRes.json();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Join Event API
      const response = await fetch(
        `${API_URL}/api/events/${id}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to join event."
        );
      }

      // Update volunteer list without reloading
      setVolunteers((prev) => [
        ...prev,
        result.volunteer || {
          userId: session.user.id,
          userName: session.user.name,
          userImage: session.user.image,
        },
      ]);

      await Swal.fire({
        icon: "success",
        title: "Successfully Joined!",
        text: "You are now a volunteer for this event.",
        confirmButtonColor: "#B44942",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Unable to Join",
        text:
          err instanceof Error
            ? err.message
            : "Please try again.",
        confirmButtonColor: "#B44942",
      });
    } finally {
      setJoining(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-10 sm:px-6">
        <div className="h-10 w-32 rounded-xl bg-accent/10" />
        <div className="h-96 rounded-3xl bg-accent/10" />
        <div className="h-24 rounded-2xl bg-accent/10" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 rounded-2xl bg-accent/10 lg:col-span-2" />
          <div className="h-64 rounded-2xl bg-accent/10" />
        </div>
      </main>
    );
  }

  // Error
  if (error || !event) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Event Unavailable
        </h1>

        <p className="mt-3 text-sm text-muted">
          {error || "This event could not be found."}
        </p>

        <Link
          href="/upcoming-events"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>
      </main>
    );
  }

  const date = new Date(event.eventDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  let buttonLabel = "Join Event";

  if (isPending) {
    buttonLabel = "Checking Session...";
  } else if (isOrganizer) {
    buttonLabel = "Your Event";
  } else if (alreadyJoined) {
    buttonLabel = "Already Joined";
  } else if (eventEnded) {
    buttonLabel = "Event Ended";
  } else if (joining) {
    buttonLabel = "Joining...";
  }

  const buttonDisabled =
    isPending ||
    isOrganizer ||
    alreadyJoined ||
    eventEnded ||
    joining;

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Link */}
        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-accent"
        >
          <ArrowLeft size={18} />
          Back to Upcoming Events
        </Link>

        {/* Event Banner */}
        <section className="relative flex min-h-85 items-end overflow-hidden rounded-3xl bg-brand-peach/30 sm:min-h-110">

          {event.imageUrl && !imageError ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              priority
              unoptimized
              sizes="100vw"
              onError={() => setImageError(true)}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-accent/30">
              <ImageOff size={70} />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/10" />

          <div className="relative z-10 w-full p-6 sm:p-9 lg:p-12">

            {/* Category */}
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B44942]">
              <HeartHandshake size={15} />
              {event.category}
            </span>

            {/* Event Title */}
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            {/* Location and Date */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/90">

              <span className="inline-flex items-center gap-2">
                <MapPin size={17} className="text-[#FFD9BA]" />
                {event.location}
              </span>

              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} className="text-[#FFD9BA]" />
                {formattedDate}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 size={17} className="text-[#FFD9BA]" />
                {formattedTime}
              </span>
            </div>
          </div>
        </section>

        {/* Volunteers and Join Action */}
        <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div className="flex items-center gap-4">
            <div className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <UsersRound size={25} />
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">
                {volunteers.length}{" "}
                {volunteers.length === 1
                  ? "Volunteer Joined"
                  : "Volunteers Joined"}
              </h2>

              <p className="mt-1 text-xs text-muted">
                Join hands and make a positive impact.
              </p>
            </div>
          </div>

          {/* Join Button */}
          <button
            type="button"
            onClick={handleJoin}
            disabled={buttonDisabled}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isOrganizer || alreadyJoined ? (
              <CheckCircle2 size={19} />
            ) : (
              <HeartHandshake size={19} />
            )}

            {buttonLabel}
          </button>
        </section>

        {/* Details Content */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* Main Content */}
          <div className="space-y-6">

            {/* About Event */}
            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <HeartHandshake size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    About This Event
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    Learn more about this community initiative.
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-line text-sm leading-8 text-muted sm:text-base">
                {event.description}
              </p>
            </section>

            {/* Volunteer Rules */}
            <VolunteerJoinRules />
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">

            {/* Organizer */}
            <EventOrganizerCard
              name={event.creatorName}
              email={event.creatorEmail}
              image={event.creatorImage}
            />

            {/* Joined Volunteers */}
            <JoinedVolunteersCard
              volunteers={volunteers}
            />

            {/* Additional Event Information */}
            <div className="rounded-2xl border border-border bg-brand-butter/25 p-5">
              <div className="flex items-center gap-2 text-accent">
                <UserRound size={19} />

                <h3 className="text-sm font-bold text-foreground">
                  Community Participation
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                Every volunteer matters. Your time and
                contribution can make a meaningful difference
                in someone&apos;s life.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
