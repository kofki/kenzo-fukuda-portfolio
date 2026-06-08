import { Reveal } from "@/components/fx/Reveal";
import { EducationCard } from "@/components/skills/EducationCard";
import { SkillCategory } from "@/components/skills/SkillCategory";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

const CATEGORIES = [
  { accent: "bg-teal/15 text-teal", glow: "var(--teal)" },
  { accent: "bg-coral/15 text-coral", glow: "var(--coral)" },
  { accent: "bg-palm/15 text-palm", glow: "var(--palm)" },
];

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="The toolkit"
            title="Skills & Technologies"
            description="The languages, frameworks, and infrastructure I reach for, plus the ones I am happy to learn next."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skillCategories.map((category, index) => {
            const theme = CATEGORIES[index % CATEGORIES.length];
            return (
              <Reveal key={category.title} delay={index * 0.08}>
                <SkillCategory
                  category={category}
                  accent={theme.accent}
                  glow={theme.glow}
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6">
          <EducationCard />
        </Reveal>
      </Container>
    </section>
  );
}
