import { Reveal } from "@/components/fx/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Things I've built"
            title="Personal Projects"
            description="Side quests, tools, and ideas I kept building after the tutorial ended."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 2) * 0.08}
              className={cn(project.featured && "sm:col-span-2")}
            >
              <ProjectCard project={project} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
