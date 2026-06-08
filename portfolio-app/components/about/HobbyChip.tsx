import { icons } from "@/lib/icons";
import type { Hobby } from "@/types";

/** A single "off the clock" interest - the quiet signal of range. */
export function HobbyChip({ hobby }: { hobby: Hobby }) {
  const Icon = icons[hobby.icon];

  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-border bg-surface/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foam text-teal transition-colors group-hover:bg-teal group-hover:text-surface">
        <Icon size={22} weight="duotone" />
      </span>
      <div>
        <p className="font-display text-base font-semibold text-ink">
          {hobby.label}
        </p>
        <p className="mt-0.5 text-xs leading-snug text-muted">{hobby.blurb}</p>
      </div>
    </div>
  );
}
