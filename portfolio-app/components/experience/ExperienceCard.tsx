import { CompanyLogo } from "@/components/experience/CompanyLogo";
import { TechBadge } from "@/components/projects/TechBadge";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import type { EmploymentType, Experience } from "@/types";

const TYPE_LABEL: Record<EmploymentType, string> = {
  internship: "Internship",
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  founder: "Founder",
};

/**
 * Just the role card. The term label, dot and axis rule belong to the column it
 * sits in (TimelineColumn) — the axis is the time scale, so a card never carries
 * its own date tag.
 */
export function ExperienceCard({ experience }: { experience: Experience }) {
  const { current } = experience;
  const Pin = icons.mapPin;

  return (
    <div
      className={cn(
        "panel relative rounded-2xl p-5 transition-colors",
        current && "ring-1 ring-coral/50",
      )}
    >
      <CompanyLogo
        name={experience.company}
        monogram={experience.monogram}
        accent={experience.accent}
        logo={experience.logo}
      />

      <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-ink">
        {experience.role}
      </h3>
      <p className="text-sm font-medium text-coral-ink">{experience.company}</p>

      <p className="mt-2 font-mono text-xs text-muted">
        {experience.start} — {experience.end}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="rounded-full border border-border px-2 py-0.5">
          {TYPE_LABEL[experience.type]}
        </span>
        <span className="inline-flex items-center gap-1">
          <Pin size={12} weight="bold" />
          {experience.location}
        </span>
      </div>

      {/* One clean sentence instead of a bullet list — the exhaustive version
          belongs on the resume, not here. */}
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        {experience.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {experience.tech.map((tech) => (
          <TechBadge key={tech} label={tech} variant="plain" />
        ))}
      </div>
    </div>
  );
}
