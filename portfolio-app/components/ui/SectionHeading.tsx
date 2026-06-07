import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/** Mono eyebrow + serif title used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  const Wave = icons.wave;

  return (
    <div className={cn("max-w-2xl", className)}>
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-coral">
        <Wave size={16} weight="bold" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
