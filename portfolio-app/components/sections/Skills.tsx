import { Reveal } from "@/components/fx/Reveal";
import { EducationCard } from "@/components/skills/EducationCard";
import { SkillCategory } from "@/components/skills/SkillCategory";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

// One accent per category, keyed by title rather than array position so
// reordering data/skills.ts can't silently reassign colours.
const ACCENTS: Record<string, { accent: string; glow: string }> = {
  Languages: { accent: "bg-teal/15 text-teal-ink", glow: "var(--teal)" },
  "Frameworks & Libraries": {
    accent: "bg-coral/15 text-coral-ink",
    glow: "var(--coral)",
  },
  "Infrastructure & Tools": {
    accent: "bg-palm/15 text-palm-ink",
    glow: "var(--palm)",
  },
};

const FALLBACK = { accent: "bg-teal/15 text-teal-ink", glow: "var(--teal)" };

export function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="The toolkit" title="Skills & Technologies" />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skillCategories.map((category, index) => {
            const theme = ACCENTS[category.title] ?? FALLBACK;
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
