
import {
  FolderOpen,
  HeartHandshake,
} from "lucide-react";

type Props = {
  hasError?: boolean;
};

export default function ExploreCategoriesEmpty({
  hasError = false,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center">

      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        {hasError ? (
          <FolderOpen size={30} />
        ) : (
          <HeartHandshake size={30} />
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold text-foreground">
        {hasError
          ? "Unable to Load Categories"
          : "No Categories Available"}
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
        {hasError
          ? "We couldn't load the event categories. Please try again later."
          : "Community event categories will appear here once they are available."}
      </p>
    </div>
  );
}
