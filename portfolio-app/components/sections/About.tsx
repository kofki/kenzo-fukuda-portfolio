import Image from "next/image";
import { HobbyChip } from "@/components/about/HobbyChip";
import { Reveal } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { icons } from "@/lib/icons";
import { unsplash } from "@/lib/unsplash";
import { hobbies } from "@/data/hobbies";
import { profile } from "@/data/profile";

export function About() {
  const Sparkle = icons.sparkle;

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Who I am" title="Engineer by craft, beach kid by default." />
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="space-y-5">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <div className="!mt-8 rounded-2xl border border-border bg-surface/60 p-6">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-teal">
                <Sparkle size={15} weight="fill" />
                Currently
              </span>
              <ul className="mt-3 space-y-2">
                {profile.now.map((line) => (
                  <li
                    key={line}
                    className="relative pl-4 text-sm leading-relaxed text-ink/80 before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-coral"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <span
              aria-hidden
              className="absolute -right-3 -top-3 size-full rounded-3xl border border-coral/40"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
              <Image
                src={unsplash("1500648767791-00dcc994a43e", 800)}
                alt="Placeholder — swap for a friendly portrait of Kenzo."
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Off the clock
          </span>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hobbies.map((hobby) => (
              <HobbyChip key={hobby.label} hobby={hobby} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
