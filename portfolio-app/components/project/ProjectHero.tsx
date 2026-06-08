import { ProjectLinks } from "@/components/project/ProjectLinks";
import { TechBadge } from "@/components/projects/TechBadge";
import { icons } from "@/lib/icons";
import { isHackathon, type WorkItem } from "@/lib/work";

export function ProjectHero({ item }: { item: WorkItem }) {
  const Trophy = icons.trophy;
  const eyebrow = isHackathon(item) ? item.event : "Project";

  return (
    <header className="max-w-3xl">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-coral">
        {eyebrow} · {item.timeline}
      </span>

      <h1 className="mt-4 text-balance font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
        {item.title}
      </h1>

      <p className="mt-4 text-xl leading-relaxed text-muted">{item.tagline}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
        <span className="rounded-full border border-border px-3 py-1">
          {item.role}
        </span>
        {isHackathon(item) && item.award ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/20 px-3 py-1 text-amber">
            <Trophy size={13} weight="fill" />
            {item.award}
          </span>
        ) : null}
        {isHackathon(item) && item.teammates ? (
          <span>Team of {item.teammates}</span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {item.tech.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-8">
        <ProjectLinks links={item.links} />
      </div>
    </header>
  );
}
