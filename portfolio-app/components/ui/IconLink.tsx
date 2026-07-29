import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import type { IconName } from "@/types";

/** "deep" is for the dark deep-water panels, which invert the palette. */
export type Tone = "default" | "deep";

const TONE: Record<Tone, string> = {
  default:
    "border-border bg-surface/60 text-ink hover:border-coral hover:text-coral-ink",
  deep: "border-deep-ink/20 text-deep-ink/80 hover:border-deep-ink hover:text-deep-ink",
};

interface IconLinkProps {
  href: string;
  label: string;
  icon: IconName;
  tone?: Tone;
  className?: string;
}

export function IconLink({
  href,
  label,
  icon,
  tone = "default",
  className,
}: IconLinkProps) {
  const Icon = icons[icon];
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5",
        TONE[tone],
        className,
      )}
    >
      <Icon size={20} weight="regular" />
    </a>
  );
}
