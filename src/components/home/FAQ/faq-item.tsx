
import { Plus } from "lucide-react";

import type { FAQ } from "./faq-data";

type Props = {
  faq: FAQ;
  defaultOpen?: boolean;
};

export default function FAQItem({
  faq,
  defaultOpen = false,
}: Props) {
  return (
    <details
      name="kindnessmeet-faq"
      open={defaultOpen ? true : undefined}
      className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors open:border-accent/30 open:bg-accent/5"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 items-center gap-4">
          {/* Number */}
          <span className="shrink-0 text-xs font-bold text-accent/60">
            {String(faq.id).padStart(2, "0")}
          </span>

          {/* Question */}
          <h3 className="text-sm font-semibold leading-6 text-foreground transition-colors group-open:text-accent sm:text-base">
            {faq.question}
          </h3>
        </div>

        {/* Expand Icon */}
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-accent transition-colors group-open:bg-accent group-open:text-white">
          <Plus
            size={19}
            className="transition-transform duration-300 group-open:rotate-45"
          />
        </span>
      </summary>

      {/* Answer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="ml-0 border-t border-border/60 pt-4 sm:ml-8">
          <p className="text-sm leading-7 text-muted">
            {faq.answer}
          </p>
        </div>
      </div>
    </details>
  );
}
