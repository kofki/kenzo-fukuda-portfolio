import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TechBadge } from "@/components/projects/TechBadge";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import type { HackathonProject } from "@/types";

interface HackathonCardProps {
  project: HackathonProject;
  priority?: boolean;
  featured?: boolean;
}

export function HackathonCard({
  project,
  priority = false,
  featured = false,
}: HackathonCardProps) {
  const Trophy = icons.trophy;
  const Arrow = icons.arrowUpRight;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
    >
      <Card
        className={cn(
          "flex h-full flex-col",
          featured && "md:min-h-[300px] md:flex-row",
        )}
      >
        <div
          className={cn(
            "relative aspect-[16/9] overflow-hidden",
            featured && "md:aspect-auto md:w-[55%] md:self-stretch",
          )}
        >
          <Image
            src={project.imageUrl}
            alt={project.imageAlt}
            fill
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 640px"
                : "(max-width: 768px) 100vw, 50vw"
            }
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {project.award ? (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-mono text-[11px] font-medium text-ink shadow-md">
              <Trophy size={13} weight="fill" />
              {project.award}
            </span>
          ) : null}
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col gap-3 p-5",
            featured && "md:justify-center md:p-7",
          )}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal">
            {project.event}
          </span>
          <h3
            className={cn(
              "font-display text-xl font-semibold text-ink",
              featured && "md:text-2xl",
            )}
          >
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

          <div className="flex items-center justify-between pt-1 font-mono text-xs">
            <span className="text-muted">
              {project.teammates ? `Team of ${project.teammates}` : "Solo build"}
            </span>
            <span className="inline-flex items-center gap-1 text-coral">
              View project
              <Arrow
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
