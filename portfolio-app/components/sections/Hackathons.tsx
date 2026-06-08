import { Reveal } from "@/components/fx/Reveal";
import { HackathonCard } from "@/components/projects/HackathonCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hackathons } from "@/data/hackathons";

export function Hackathons() {
  return (
    <section
      id="hackathons"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Weekend builds"
            title="Hackathons"
            description="36 hour sprints. The sandbox where I learn a new tool by shipping with it under pressure."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {hackathons.map((hackathon, index) => (
            <Reveal key={hackathon.id} delay={(index % 2) * 0.08}>
              <HackathonCard project={hackathon} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
