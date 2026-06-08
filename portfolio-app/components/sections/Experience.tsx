import { TimelineItem } from "@/components/experience/TimelineItem";
import { Reveal } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-contours relative scroll-mt-24 py-16 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="The path so far"
            title="Experience"
            description=""
          />
        </Reveal>

        <Reveal className="mt-10">
          <ol className="max-w-3xl">
            {experiences.map((experience) => (
              <TimelineItem key={experience.id} experience={experience} />
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
