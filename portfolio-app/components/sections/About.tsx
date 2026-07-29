import Image from "next/image";
import { Reveal } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

export function About() {
  const Now = icons.path;

  return (
    <section id="about" className="relative py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who I am"
            title="Mostly I just like building the thing"
          />
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="space-y-5 lg:col-span-6">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <div className="panel relative !mt-8 rounded-2xl p-6">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-ink">
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

          <Reveal delay={0.1} className="lg:col-span-6 lg:pl-6 lg:-mt-6">
            <div
              className="polaroid mx-auto max-w-md rotate-[1.8deg] transition-transform duration-500 hover:rotate-0 lg:mr-0"
            >
              <div className="polaroid-window">
                <Image
                  src="/kenzo_sitting.jpeg"
                  alt="Kenzo by a window at golden hour"
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="polaroid-caption">
                {/* Inherits the handwriting font from .polaroid-caption. Sized
                    to fill the ledge, and --ink rather than --muted so it reads
                    as written on the print (15.8:1 on the cream frame). */}
                <p className="text-4xl leading-none text-ink">
                  learn fast, build fast
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
