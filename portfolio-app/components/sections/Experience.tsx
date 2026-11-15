import Image from "next/image";
import { ExperienceList } from "@/components/home/ExperienceList";
import { Bubbles } from "@/components/home/Bubbles";
import { Jellies } from "@/components/home/Jellies";
import { cityFish, seaFish } from "@/components/home/liveLayers";
import { Swimmers } from "@/components/home/SeaLife";
import { LiveScene } from "@/components/home/LiveScene";
import { SwimAway } from "@/components/home/SwimAway";
import { ScrollLayer } from "@/components/home/ScrollLayer";
import { Eyebrow, SectionTitle, Underwater, fadeEdges } from "@/components/home/Underwater";
import { Container } from "@/components/ui/Container";
import { experiences } from "@/data/experience";
import { featuredSkills, skillCategories } from "@/data/skills";
import { BrandIcon } from "@/lib/brandIcon";

const brandFor = (label: string) =>
  skillCategories.flatMap((c) => c.skills).find((s) => s.label === label)?.brand;

/**
 * Transition 3, "deeper": the water darkens a step and the jellyfish drift in
 * from the right edge. They stay in view while you read down the list, each
 * one drifting on its own, and pulse when tapped.
 */
export function Experience() {
  return (
    <Underwater
      id="experience"
      label="Experience and skills"
      background="linear-gradient(180deg,#0b2a4c 0%,#0b2848 50%,#0a2442 100%)"
      scenery={
        <LiveScene className="pointer-events-none absolute inset-0">
          {/* Plain water with the print's faint current lines. */}
          <div className="absolute inset-0" style={fadeEdges(10, 90)}>
            <Image src="/scenes/jelly.webp" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <Bubbles count={5} />
          <Swimmers fish={[seaFish[0], seaFish[2], cityFish[2]]} />
          {/* The jellyfish ride along in a sticky frame for the whole section,
              then swim up and away to the side before its bottom edge, so the
              next section's water never cuts across them. */}
          <SwimAway className="absolute inset-0">
            <div className="sticky top-0 h-[100svh] overflow-hidden">
              <ScrollLayer
                className="absolute right-[-12%] top-[4%] w-[min(70rem,110vw)] max-sm:right-[-62%] max-sm:w-[170vw] lg:right-[-3%]"
                x={[22, 0]}
                opacity={[0, 1]}
                range={[0, 0.12]}
              >
                <Jellies />
              </ScrollLayer>
            </div>
          </SwimAway>
        </LiveScene>
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
