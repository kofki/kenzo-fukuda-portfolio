import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TechBadge } from "@/components/projects/TechBadge";
import { icons } from "@/lib/icons";
import type { HackathonProject } from "@/types";

interface HackathonCardProps {
  project: HackathonProject;
  priority?: boolean;
}

export function HackathonCard({
  project,
  priority = false,
}: HackathonCardProps) {
  const Trophy = icons.trophy;

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
          {project.award ? (
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber px-2 py-0.5 font-mono text-xs font-medium text-ink shadow-md">
              <Trophy size={12} weight="fill" />
              {project.award}
            </span>
          ) : null}
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
