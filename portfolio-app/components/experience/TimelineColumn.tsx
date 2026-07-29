import type { CSSProperties } from "react";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { TimelineMarker } from "@/components/experience/TimelineMarker";
import { cn } from "@/lib/cn";
import type { TimelineColumn as Column } from "@/lib/timeline";

const BAR_TOP = 44; // px below the column top, clear of the label, rule and dot
const LANE_PITCH = 7; // px per lane
const BAR_HEIGHT = 3;
const CARD_TOP = 80; // matches the pt-20 on the column

/** Width of n card slots plus the gaps between them. */
const slotWidth = (n: number) =>
  `calc(${n} * var(--card-w) + ${n - 1} * var(--card-gap))`;

/** Left offset of slot n from the column's left edge. */
const slotLeft = (n: number) =>
  n === 0 ? "0px" : `calc(${n} * (var(--card-w) + var(--card-gap)))`;

/**
 * One term on the axis: its label, its dot, the bars of roles that began in it,
 * and the cards of roles whose term it is.
 *
 * The rule is drawn here and overshoots by the row gap so segments join into a
 * continuous line — an absolutely positioned line on the scroll container would
 * only span the visible width, not the scrollable content.
 */
export function TimelineColumn({ column }: { column: Column }) {
  const empty = column.cards.length === 0 && column.bars.length === 0;

  return (
    <li
      className="relative shrink-0 snap-center pt-20"
      style={{ width: slotWidth(column.width) }}
    >
      <span
        className={cn(
          // text-muted only reached 4.66:1 on the foam-tinted section background,
          // which reads as washed out at 12px. ink/80 is 6.8:1 in light and
          // 9.9:1 in dark.
          "absolute left-0 top-0 text-xs",
          column.isNow
            ? "font-semibold text-coral-ink"
            : "font-semibold text-ink/80",
        )}
      >
        {column.label}
      </span>

      <span
        aria-hidden
        className="absolute left-0 top-8 h-px bg-border"
        style={{ width: `calc(100% + var(--card-gap))` }}
      />
      <span className="absolute left-0 top-6">
        {/* A term with nothing in it still gets a tick, so time stays evenly
            spaced — it just gets a plain one. */}
        {empty ? (
          <span aria-hidden className="ml-[5px] block h-2.5 w-px bg-border" />
        ) : (
          <TimelineMarker current={column.isNow} />
        )}
      </span>

      {/* Duration bars: each runs from the term the role began in through the
          term it ended in, so a role spanning several cycles reads as one span. */}
      {column.bars.map(({ role, startSlot, slots, connectorSlot, lane }) => {
        const barY = BAR_TOP + lane * LANE_PITCH;
        const accent = role.accent ?? "var(--teal)";

        return (
          <span key={`bar-${role.id}`} aria-hidden>
            <span
              className="absolute rounded-full"
              style={
                {
                  top: `${barY}px`,
                  left: slotLeft(startSlot),
                  width: slotWidth(slots),
                  height: `${BAR_HEIGHT}px`,
                  backgroundColor: accent,
                  opacity: 0.75,
                } as CSSProperties
              }
            />
            {/* Drops onto the role's own card, so which bar belongs to which role
                is explicit rather than inferred from colour. For a pinned card
                that's the far end of the bar, not the near one. */}
            <span
              className="absolute w-[2px] rounded-full"
              style={
                {
                  top: `${barY + BAR_HEIGHT}px`,
                  left: `calc(${slotLeft(connectorSlot)} + 0.875rem)`,
                  height: `${CARD_TOP - barY - BAR_HEIGHT}px`,
                  backgroundColor: accent,
                  opacity: 0.75,
                } as CSSProperties
              }
            />
          </span>
        );
      })}

      {/* Side by side, not stacked: the column widened to fit them. */}
      <div className="flex gap-5">
        {column.cards.map((role) => (
          <div key={role.id} style={{ width: "var(--card-w)" }}>
            <ExperienceCard experience={role} />
          </div>
        ))}
      </div>
    </li>
  );
}
