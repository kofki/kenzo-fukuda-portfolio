import { cn } from "@/lib/cn";

export function TimelineMarker({ current = false }: { current?: boolean }) {
  return (
    <span className="relative flex size-4 items-center justify-center">
      {current ? (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral/50" />
      ) : null}
      <span
        className={cn(
          "relative size-3 rounded-full border-2",
          current ? "border-coral bg-coral" : "border-teal bg-sand",
        )}
      />
    </span>
  );
}
