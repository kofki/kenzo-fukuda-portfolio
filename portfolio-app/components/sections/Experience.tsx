import { TimelineItem } from "@/components/experience/TimelineItem";
import { Reveal } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-contours relative scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The path so far"
            title="Experience"
            description="From a first marketing-site internship to a current engineering role — a steady climb, one wave at a time."
          />
        </Reveal>

        <Reveal className="mt-14">
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
