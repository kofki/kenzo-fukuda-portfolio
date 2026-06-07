import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { TechBadge } from "@/components/projects/TechBadge";
import { icons } from "@/lib/icons";
import type { HackathonProject } from "@/types";

export function HackathonCard({ project }: { project: HackathonProject }) {
  const Trophy = icons.trophy;
  const External = icons.external;

  return (
    <Card className="flex h-full flex-col">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {project.award ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-mono text-[11px] font-medium text-ink shadow-md">
            <Trophy size={13} weight="fill" />
            {project.award}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal">
          {project.event}
        </span>
        <h3 className="font-display text-2xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 font-mono text-xs text-muted">
          {project.teammates ? (
            <span>
              Team of {project.teammates}
            </span>
          ) : (
            <span>Solo build</span>
          )}
          {project.devpostUrl ? (
            <a
              href={project.devpostUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-coral transition-colors hover:text-ink"
            >
              Devpost <External size={13} weight="bold" />
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
