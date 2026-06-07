import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { TechBadge } from "@/components/projects/TechBadge";
import { icons } from "@/lib/icons";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  /** Eagerly load the first (featured) image. */
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const Arrow = icons.arrowUpRight;
  const Repo = icons.github;

  return (
    <Card className="flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-sand/85 px-3 py-1 font-mono text-[11px] text-ink backdrop-blur">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
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

        <div className="flex items-center gap-5 pt-1 font-mono text-xs">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-coral transition-colors hover:text-ink"
            >
              Live <Arrow size={14} weight="bold" />
            </a>
          ) : null}
          {project.links.repo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
            >
              <Repo size={14} weight="bold" /> Code
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
