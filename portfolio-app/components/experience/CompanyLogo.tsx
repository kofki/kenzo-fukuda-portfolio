import Image from "next/image";

interface CompanyLogoProps {
  name: string;
  monogram?: string;
  accent?: string;
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
