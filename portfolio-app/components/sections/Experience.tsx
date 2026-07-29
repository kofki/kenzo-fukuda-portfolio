import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Reveal } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-contours relative py-16 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="The path so far" title="Experience" />
        </Reveal>
      </Container>

      {/* Full-bleed below the heading so the track can scroll past the container
          edges while the filters stay aligned to the page gutter. */}
      <Reveal className="mt-8">
        <ExperienceTimeline experiences={experiences} />
      </Reveal>
    </section>
  );
}
