import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Tone } from "@/components/ui/IconLink";

const TONE: Record<Tone, { eyebrow: string; title: string; body: string }> = {
  default: {
    eyebrow: "text-coral-ink",
    title: "text-ink",
    body: "text-muted",
  },
  deep: {
    eyebrow: "text-deep-ink/70",
    title: "text-deep-ink",
    body: "text-deep-ink/70",
  },
};

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tone?: Tone;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "default",
  className,
}: SectionHeadingProps) {
  const t = TONE[tone];

  return (
    <div className={cn("max-w-2xl", className)}>
      <p className={cn("text-sm font-medium", t.eyebrow)}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-3 text-balance font-display text-3xl font-semibold sm:text-4xl",
          t.title,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-lg leading-relaxed", t.body)}>{description}</p>
      ) : null}
    </div>
  );
}
