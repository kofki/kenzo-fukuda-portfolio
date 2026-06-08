import Image from "next/image";

interface CompanyLogoProps {
  name: string;
  /** Two-letter monogram; derived from the name when omitted. */
  monogram?: string;
  /** Brand color (hex or CSS color) for the monogram badge. */
  accent?: string;
  /** /public/logos/<file>.svg; renders instead of the monogram when set. */
  logo?: string;
}

const STOPWORDS = new Set(["the", "a", "of", "and"]);

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => !STOPWORDS.has(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** A company's logo, falling back to a brand-colored monogram badge. */
export function CompanyLogo({ name, monogram, accent = "var(--teal)", logo }: CompanyLogoProps) {
  if (logo) {
    return (
      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-border bg-white">
        <Image src={logo} alt={`${name} logo`} fill className="object-contain p-1.5" sizes="44px" />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="flex size-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-semibold"
      style={{
        backgroundColor: `color-mix(in oklab, ${accent} 16%, transparent)`,
        color: accent,
      }}
    >
      {monogram ?? initials(name)}
    </span>
  );
}
