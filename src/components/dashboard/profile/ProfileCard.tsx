
import {
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import ProfileAvatar from "./ProfileAvatar";
import EditProfileModal from "./EditProfileModal";

type Props = {
  user: {
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
    createdAt: Date;
  };
};

export default function ProfileCard({ user }: Props) {
  const joinedDate = new Date(
    user.createdAt
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <div className="space-y-6">

      {/* Main Profile Card */}
      <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">

        {/* Cover Banner */}
        <div className="relative h-36 overflow-hidden bg-linear-to-r from-brand-peach via-brand-butter to-brand-peach sm:h-44">

          <div className="absolute -right-14 -top-24 size-72 rounded-full border border-[#B44942]/15" />

          <div className="absolute -bottom-24 right-32 size-56 rounded-full border border-[#B44942]/15" />

          <HeartHandshake
            size={125}
            strokeWidth={1}
            className="absolute bottom-10 right-6 rotate-[-15deg] text-[#B44942]/15"
          />

          <span className="absolute left-6 top-6 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold text-[#B44942] sm:left-8">
            KindnessMeet Member
          </span>
        </div>

        {/* Profile Information */}
        <div className="px-6 pb-7 sm:px-8">

          <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <ProfileAvatar
              name={user.name}
              image={user.image}
            />

            <div className="sm:pb-2">
              <EditProfileModal
                name={user.name}
                image={user.image}
                email={user.email}
              />
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {user.name}
            </h2>

            <p className="mt-2 flex items-center gap-2 break-all text-sm text-muted">
              <Mail
                size={17}
                className="shrink-0 text-accent"
              />
              {user.email}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
              <HeartHandshake size={15} />
              Community Member
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">

        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <UserRound size={22} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground">
              Personal Information
            </h3>

            <p className="mt-1 text-xs text-muted">
              Your KindnessMeet account details
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">

          {/* Name */}
          <div>
            <p className="text-xs font-medium text-muted">
              Full Name
            </p>

            <p className="mt-2 wrap-break-word font-semibold text-foreground">
              {user.name}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs font-medium text-muted">
              Email Address
            </p>

            <p className="mt-2 break-all font-semibold text-foreground">
              {user.email}
            </p>
          </div>

          {/* Member Since */}
          <div>
            <p className="text-xs font-medium text-muted">
              Member Since
            </p>

            <p className="mt-2 flex items-center gap-2 font-semibold text-foreground">
              <CalendarDays size={17} className="text-accent" />
              {joinedDate}
            </p>
          </div>

          {/* Email Status */}
          <div>
            <p className="text-xs font-medium text-muted">
              Email Status
            </p>

            <p className="mt-2 flex items-center gap-2 font-semibold text-foreground">
              {user.emailVerified ? (
                <>
                  <CheckCircle2
                    size={17}
                    className="text-accent"
                  />
                  Verified
                </>
              ) : (
                <>
                  <ShieldCheck
                    size={17}
                    className="text-muted"
                  />
                  Not Verified
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Account Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-brand-butter/20 p-5">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-accent"
        />

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Account Information
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-muted">
            You can update your display name and profile photo.
            Your email address is managed by your
            authentication account.
          </p>
        </div>
      </div>
    </div>
  );
}
