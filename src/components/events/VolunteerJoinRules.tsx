
import { CheckCircle2, ClipboardList } from "lucide-react";

const rules = [
  "Arrive at the event location at least 15 minutes early.",
  "Follow the event organizer's instructions.",
  "Be respectful and cooperate with other volunteers.",
  "Bring necessary supplies if requested by the organizer.",
  "Inform the organizer if you cannot attend.",
];

export default function VolunteerJoinRules() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <ClipboardList size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground">
            Volunteer Guidelines
          </h2>

          <p className="text-xs text-muted">
            Please follow these guidelines when participating.
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {rules.map((rule) => (
          <li
            key={rule}
            className="flex items-start gap-3 text-sm leading-relaxed text-muted"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-accent"
            />

            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
