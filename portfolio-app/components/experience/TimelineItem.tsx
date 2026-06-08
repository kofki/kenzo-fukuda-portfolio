import { CompanyLogo } from "@/components/experience/CompanyLogo";
import { TimelineMarker } from "@/components/experience/TimelineMarker";
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

export function TimelineItem({ experience }: { experience: Experience }) {
  const { current } = experience;
  const Pin = icons.mapPin;

  return (
    <li className="relative pb-12 pl-12 last:pb-0">
      <span
        aria-hidden
        className="absolute left-[7px] top-3 h-full w-px bg-border"
      />
      <span className="absolute left-0 top-1.5">
        <TimelineMarker current={current} />
      </span>

      <div
        className={cn(
          "glass relative rounded-2xl p-6 transition-colors",
          current && "ring-1 ring-coral/50",
        )}
      >
        <div className="flex items-start gap-4">
          <CompanyLogo
            name={experience.company}
            monogram={experience.monogram}
            accent={experience.accent}
            logo={experience.logo}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl font-semibold text-ink">
                {experience.role}
                <span className="text-coral"> · {experience.company}</span>
              </h3>
              <span className="font-mono text-xs text-muted">
                {experience.start} to {experience.end}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="rounded-full border border-border px-2 py-0.5">
                {TYPE_LABEL[experience.type]}
              </span>
              <span className="inline-flex items-center gap-1">
                <Pin size={12} weight="bold" />
                {experience.location}
              </span>
              {current ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-coral/15 px-2 py-0.5 text-coral">
                  High tide · now
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {experience.summary}
        </p>

        <ul className="mt-3 space-y-1.5">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-4 text-sm leading-relaxed text-ink/80 before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-teal"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {experience.tech.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </div>
    </li>
  );
}
