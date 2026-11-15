import Image from "next/image";
import { ExperienceList } from "@/components/home/ExperienceList";
import { ScrollLayer } from "@/components/home/ScrollLayer";
import { Eyebrow, SectionTitle, Underwater } from "@/components/home/Underwater";
import { Container } from "@/components/ui/Container";
import { experiences } from "@/data/experience";
import { featuredSkills, skillCategories } from "@/data/skills";
import { BrandIcon } from "@/lib/brandIcon";

const brandFor = (label: string) =>
  skillCategories.flatMap((c) => c.skills).find((s) => s.label === label)?.brand;

/**
 * Transition 3, "deeper": the water darkens a step and the jellyfish drift in
 * from the right edge, then keep slowly bobbing.
 */
export function Experience() {
  return (
    <Underwater
      id="experience"
      label="Experience and skills"
      background="linear-gradient(180deg,#1b3a64 0%,#10284a 30%,#0c2947 100%)"
      scenery={
        <ScrollLayer
          className="pointer-events-none absolute right-[-12%] top-6 w-[min(64rem,105vw)] max-sm:right-[-58%] max-sm:w-[150vw] sm:right-[-20%] lg:right-[-14%]"
          x={[22, 0]}
          opacity={[0, 1]}
          range={[0, 0.32]}
        >
          <div className="animate-jelly relative aspect-[3/2]">
            <Image src="/scenes/jelly.webp" alt="" fill sizes="80vw" className="object-contain" />
          </div>
        </ScrollLayer>
      }
    >
      <Container className="py-20 sm:py-24">
        <div className="reveal">
          <Eyebrow>the path so far</Eyebrow>
          <SectionTitle>Experience</SectionTitle>
        </div>
        <ExperienceList experiences={experiences} />

        <div className="reveal mt-14">
          <h3 className="font-display text-2xl text-cream">Skills</h3>
          <div className="mt-5 space-y-3">
            {featuredSkills.map((group) => (
              <div key={group.title} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <p className="w-32 shrink-0 text-xs font-bold text-coral-soft">{group.title}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((label) => {
                    const brand = brandFor(label);
                    return (
                      <li
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-cream/45 px-3 py-1 text-xs font-medium text-cream"
                      >
                        {brand ? <BrandIcon slug={brand} size={13} /> : null}
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Underwater>
  );
}
