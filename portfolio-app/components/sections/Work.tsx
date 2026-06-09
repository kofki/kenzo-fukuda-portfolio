import { Reveal } from "@/components/fx/Reveal";
import { HackathonCard } from "@/components/projects/HackathonCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { allWork, isHackathon } from "@/lib/work";

export function Work() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Things I've built"
            title="Projects"
            description=""
          />
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {allWork.map((item, index) => (
            <Reveal
              key={item.id}
              delay={(index % 2) * 0.08}
              className={cn(item.featured && "sm:col-span-2")}
            >
              {isHackathon(item) ? (
                <HackathonCard
                  project={item}
                  priority={index === 0}
                  featured={item.featured}
                />
              ) : (
                <ProjectCard
                  project={item}
                  priority={index === 0}
                  featured={item.featured}
                />
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
