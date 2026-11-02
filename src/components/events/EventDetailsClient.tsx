"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

import { authClient } from "@/app/lib/auth-client";

import EventOrganizerCard from "@/components/events/EventOrganizerCard";
import JoinedVolunteersCard, {
  type Volunteer,
} from "@/components/events/JoinedVolunteersCard";
import VolunteerJoinRules from "@/components/events/VolunteerJoinRules";
import EventDetailsLoading from "@/components/events/EventDetailsLoading";

import type { EventItem } from "@/components/events/EventCard";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [eventMissing, setEventMissing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [eventEnded, setEventEnded] = useState(false);

  // Fetch event details and volunteers
  useEffect(() => {
    let ignore = false;

    async function loadEvent() {
      setLoading(true);
      setError("");
      setEventMissing(false);
      setImageError(false);
      setEvent(null);
      setVolunteers([]);
      setEventEnded(false);

      try {
        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured.");
        }

        // Fetch both APIs together
        const [eventRes, volunteersRes] = await Promise.all([
          fetch(`${API_URL}/api/events/${id}`, {
            cache: "no-store",
          }),
          fetch(`${API_URL}/api/events/${id}/volunteers`, {
            cache: "no-store",
          }),
        ]);

        // Ignore outdated requests
        if (ignore) return;

        if (eventRes.status === 404) {
          setEventMissing(true);
          return;
        }

        if (!eventRes.ok) {
          throw new Error("Failed to load event.");
        }

        if (!volunteersRes.ok) {
          throw new Error("Failed to load volunteers.");
        }

        const [eventData, volunteersData]: [EventDetails, Volunteer[]] =
          await Promise.all([eventRes.json(), volunteersRes.json()]);

        if (ignore) return;

        setEvent(eventData);
        setVolunteers(volunteersData);

        setEventEnded(new Date(eventData.eventDate).getTime() <= Date.now());
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "Something went wrong.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadEvent();

    // Ignore old responses when page changes
    return () => {
      ignore = true;
    };
  }, [id]);

  // Check whether current user owns this event
  const isOrganizer = !!session?.user && session.user.id === event?.creatorId;

  // Check whether user already joined
  const alreadyJoined =
    !!session?.user &&
    volunteers.some((volunteer) => volunteer.userId === session.user.id);

  // Join Event
  const handleJoin = async () => {
    if (isPending || joining || !event || eventEnded) {
      return;
    }

    // Redirect guest to login
    if (!session?.user) {
      router.push("/login");
      return;
    }

    // Prevent organizer or duplicate joins
    if (isOrganizer || alreadyJoined) {
      return;
    }

    setJoining(true);

    try {
      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
      }

      // Get JWT from Better Auth
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

      // Send request to Express backend
      const response = await fetch(`${API_URL}/api/events/${id}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to join event.");
      }

      const newVolunteer: Volunteer = result.volunteer || {
        userId: session.user.id,
        userName: session.user.name,
        userImage: session.user.image,
      };

      // Update volunteer list without page reload
      setVolunteers((previous) => {
        const exists = previous.some(
          (volunteer) => volunteer.userId === newVolunteer.userId,
        );

        if (exists) {
          return previous;
        }

        return [...previous, newVolunteer];
      });

      await Swal.fire({
        icon: "success",
        title: "Successfully Joined!",
        text: "You are now a volunteer for this event.",
        confirmButtonColor: "#B44942",
        background: "var(--surface)",
        color: "var(--foreground)",
      });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Unable to Join",
        text: err instanceof Error ? err.message : "Please try again.",
        confirmButtonColor: "#B44942",
        background: "var(--surface)",
        color: "var(--foreground)",
      });
    } finally {
      setJoining(false);
    }
  };

  // Loading state
  if (loading) {
    return <EventDetailsLoading />;
  }

  // Event not found
  if (eventMissing) {
    notFound();
  }

  // Error state
  if (error || !event) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <ImageOff size={36} />
        </div>

        <h1 className="text-2xl font-bold text-foreground">
          Unable to Load Event
        </h1>

        <p className="max-w-md text-sm text-muted">
          {error || "Something went wrong while loading the event."}
        </p>

        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft size={18} />
          Back to Upcoming Events
        </Link>
      </main>
    );
  }

  // Format event date
  const date = new Date(event.eventDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  });

  // Set join button text
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
    isPending || joining || isOrganizer || alreadyJoined || eventEnded;

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
          {/* Banner Image */}
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

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/10" />

          {/* Banner Content */}
          <div className="relative z-10 w-full p-6 sm:p-9 lg:p-12">
            {/* Category */}
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B44942]">
              <HeartHandshake size={15} />
              {event.category}
            </span>

            {/* Title */}
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            {/* Event Information */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/90">
              {/* Location */}
              <span className="inline-flex items-center gap-2">
                <MapPin size={17} className="text-[#FFD9BA]" />
                {event.location}
              </span>

              {/* Date */}
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} className="text-[#FFD9BA]" />
                {formattedDate}
              </span>

              {/* Time */}
              <span className="inline-flex items-center gap-2">
                <Clock3 size={17} className="text-[#FFD9BA]" />
                {formattedTime}
              </span>
            </div>
          </div>
        </section>

        {/* Volunteers and Join Button */}
        <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          {/* Volunteer Count */}
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

          {/* Join Event Button */}
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

        {/* Event Details */}
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

            {/* Volunteer Guidelines */}
            <VolunteerJoinRules />
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Event Organizer */}
            <EventOrganizerCard
              name={event.creatorName}
              email={event.creatorEmail}
              image={event.creatorImage}
            />

            {/* Joined Volunteers */}
            <JoinedVolunteersCard volunteers={volunteers} />

            {/* Community Participation */}
            <div className="rounded-2xl border border-border bg-brand-butter/25 p-5">
              <div className="flex items-center gap-2 text-accent">
                <UserRound size={19} />

                <h3 className="text-sm font-bold text-foreground">
                  Community Participation
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                Every volunteer matters. Your time and contribution can make a
                meaningful difference in someone&apos;s life.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
