"use client";

import { useMemo, useState } from "react";
import { TimelineColumn } from "@/components/experience/TimelineColumn";
import { TimelineScroller } from "@/components/experience/TimelineScroller";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { buildTimeline } from "@/lib/timeline";
import { DOMAINS, type Domain, type Experience } from "@/types";

/**
 * Filterable timeline. Client-side because picking a discipline rebuilds the
 * columns — term spacing, bar spans and lane packing all depend on which roles
 * are in play, so they cannot be computed once on the server.
 */
export function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  const [active, setActive] = useState<Domain | null>(null);

  // Only offer disciplines that some role actually claims.
  const available = useMemo(
    () =>
      DOMAINS.filter((domain) =>
        experiences.some((role) => role.domains?.includes(domain)),
      ),
    [experiences],
  );

  const filtered = useMemo(
    () =>
      active
        ? experiences.filter((role) => role.domains?.includes(active))
        : experiences,
    [experiences, active],
  );

  const columns = useMemo(() => buildTimeline(filtered), [filtered]);

  return (
    <div>
      <Container className="mb-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
          <FilterChip
            label="All"
            active={active === null}
            onClick={() => setActive(null)}
          />
          {available.map((domain) => (
            <FilterChip
              key={domain}
              label={domain}
              active={active === domain}
              onClick={() => setActive(active === domain ? null : domain)}
            />
          ))}
        </div>
      </Container>

      {/* Keyed on the filter so the track re-parks on the most current role
          instead of holding a scroll position from the previous set. */}
      <TimelineScroller key={active ?? "all"}>
        {columns.map((column) => (
          <TimelineColumn key={column.key} column={column} />
        ))}
      </TimelineScroller>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-coral-ink bg-coral-ink text-sand"
          : "border-border bg-surface/60 text-ink/70 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
