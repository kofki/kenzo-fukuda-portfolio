import Image from "next/image";
import { ProjectLinks } from "@/components/project/ProjectLinks";
import { TechBadge } from "@/components/projects/TechBadge";
import { icons } from "@/lib/icons";
import { isHackathon, type WorkItem } from "@/lib/work";

export function ProjectHero({ item }: { item: WorkItem }) {
  const Trophy = icons.trophy;
  const eyebrow = isHackathon(item) ? item.event : "Project";

  return (
    <header className="max-w-3xl">
      <span className="text-xs text-coral-ink">
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/20 px-3 py-1 text-amber-ink">
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

      {item.backedBy?.length ? (
        <div className="mt-10 border-t border-border pt-6">
          <span className="text-xs text-muted">
            Backed by
          </span>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            {item.backedBy.map((backer) => (
              <a
                key={backer.name}
                href={backer.url}
                target="_blank"
                rel="noopener noreferrer"
                title={backer.name}
                className="inline-flex items-center gap-2.5 rounded-xl opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-ink"
              >
                <Image
                  src={backer.logo}
                  alt={`${backer.name} logo`}
                  width={56}
                  height={56}
                  className="size-12 object-contain"
                />
                <span className="font-medium text-ink/80">{backer.name}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
