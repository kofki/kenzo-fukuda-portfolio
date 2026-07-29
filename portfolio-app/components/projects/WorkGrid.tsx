"use client";

import { useMemo, useState } from "react";
import { HackathonCard } from "@/components/projects/HackathonCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import { isHackathon, type WorkItem } from "@/lib/work";
import { DOMAINS, type Domain, type IconName } from "@/types";

/**
 * Shows the featured projects by default, with discipline filters to reach the
 * rest. Picking a filter searches everything, not just the featured set —
 * otherwise a filter could hide the very project it matches.
 */
export function WorkGrid({ work }: { work: WorkItem[] }) {
  const [filter, setFilter] = useState<Domain | null>(null);
  const [expanded, setExpanded] = useState(false);

  const available = useMemo(
    () =>
      DOMAINS.filter((domain) =>
        work.some((item) => item.domains?.includes(domain)),
      ),
    [work],
  );

  const featured = useMemo(() => work.filter((item) => item.featured), [work]);

  const visible = useMemo(() => {
    if (filter) return work.filter((item) => item.domains?.includes(filter));
    return expanded ? work : featured;
  }, [work, featured, filter, expanded]);

  const showToggle = !filter && work.length > featured.length;

  return (
    <div>
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by discipline"
      >
        <FilterChip
          label="Featured"
          icon="star"
          active={filter === null && !expanded}
          onClick={() => {
            setFilter(null);
            setExpanded(false);
          }}
        />
        <FilterChip
          label="All"
          active={filter === null && expanded}
          onClick={() => {
            setFilter(null);
            setExpanded(true);
          }}
        />
        {available.map((domain) => (
          <FilterChip
            key={domain}
            label={domain}
            active={filter === domain}
            onClick={() => setFilter(filter === domain ? null : domain)}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-6">
        {visible.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 0.08}>
            {isHackathon(item) ? (
              <HackathonCard project={item} priority={index === 0} />
            ) : (
              <ProjectCard project={item} priority={index === 0} />
            )}
          </Reveal>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Nothing under that one yet.</p>
      ) : null}

      {showToggle ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          {expanded
            ? "Show featured only"
            : `See all ${work.length} projects`}
        </button>
      ) : null}
    </div>
  );
}

function FilterChip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: IconName;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = icon ? icons[icon] : null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-coral-ink bg-coral-ink text-sand"
          : "border-border bg-surface/60 text-ink/70 hover:text-ink",
      )}
    >
      {Icon ? <Icon size={13} weight="fill" /> : null}
      {label}
    </button>
  );
}
