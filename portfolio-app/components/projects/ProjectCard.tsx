import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TechBadge } from "@/components/projects/TechBadge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-ink"
    >
      <Card seed={project.slug}>
        <div className="polaroid-window">
          <Image
            src={project.imageUrl}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-2 top-2 rounded-full bg-sand/90 px-2 py-0.5 font-mono text-xs text-ink">
            {project.year}
          </span>
          {project.logo ? (
            <Image
              src={project.logo}
              alt=""
              width={82}
              height={91}
              className="pointer-events-none absolute right-1 top-1 h-14 w-auto -rotate-6 drop-shadow-md transition-transform duration-300 group-hover:rotate-0"
            />
          ) : null}

          {/* Tagline over the photo on hover. The ledge has no room for prose, so
              it borrows the window. Hidden from AT: the same text is on the
              detail page, and the card's own link already names the project.
              Also gated behind `hover:hover` so it never sticks open after a tap
              on touch, where there is no pointer to leave. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
          >
            <span className="text-xs leading-snug text-white">
              {project.tagline}
            </span>
          </span>
        </div>

        {/* Name and tag stickers only — the prose lives on the detail page. */}
        <div className="polaroid-caption">
          <h3 className="font-hand text-xl font-bold leading-none text-ink">
            {project.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
