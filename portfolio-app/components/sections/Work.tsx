import { Reveal } from "@/components/fx/Reveal";
import { WorkGrid } from "@/components/projects/WorkGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { allWork } from "@/lib/work";

export function Work() {
  return (
    <section id="projects" className="relative py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Things I've built" title="Projects" />
        </Reveal>

        <WorkGrid work={allWork} />
      </Container>
    </section>
  );
}
