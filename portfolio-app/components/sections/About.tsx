import Image from "next/image";
import { Reveal } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

export function About() {
  const Now = icons.path;

  return (
    <section id="about" className="relative scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Who I am"
            title="Engineer by craft, beach kid by default."
          />
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          {/* Text column */}
          <Reveal className="space-y-5 lg:col-span-6">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <div className="glass relative !mt-8 rounded-2xl p-6">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-teal">
                <Now size={15} weight="bold" />
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

          {/* One clean candid */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:pl-6">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-border shadow-xl lg:mr-0">
              <Image
                src="/kenzo_sitting.jpeg"
                alt="Kenzo by a window at golden hour"
                fill
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
