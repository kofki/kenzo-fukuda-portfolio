import { BRANDS, BrandIcon } from "@/lib/brandIcon";
import { icons } from "@/lib/icons";
import type { CSSProperties } from "react";
import type { Skill } from "@/types";

interface SkillChipProps {
  skill: Skill;
  /** CSS color used for the hover ring/glow, inherited from the category. */
  glow?: string;
}

/** A technology pill with its brand mark, lifting and glowing on hover. */
export function SkillChip({ skill, glow = "var(--teal)" }: SkillChipProps) {
  const hasBrand = skill.brand ? Boolean(BRANDS[skill.brand]) : false;
  const Fallback = !hasBrand && skill.icon ? icons[skill.icon] : null;

  return (
    <span
      style={{ "--chip-glow": glow } as CSSProperties}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-sand/55 px-2.5 py-1.5 font-mono text-xs text-ink/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--chip-glow)] hover:text-[var(--chip-glow)] hover:shadow-[0_0_0_1px_var(--chip-glow),0_8px_20px_-10px_var(--chip-glow)]"
    >
      {hasBrand ? (
        <BrandIcon slug={skill.brand as string} size={14} className="opacity-75" />
      ) : Fallback ? (
        <Fallback size={14} weight="bold" className="opacity-75" />
      ) : null}
      {skill.label}
    </span>
  );
}
