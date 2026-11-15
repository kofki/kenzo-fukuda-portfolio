import Image from "next/image";
import { PhotoPrint } from "@/components/home/PhotoPrint";
import { Bubbles } from "@/components/home/Bubbles";
import { reefFish } from "@/components/home/liveLayers";
import { FishSchool, LightRays } from "@/components/home/SeaLife";
import { ScrollLayer } from "@/components/home/ScrollLayer";
import {
  Eyebrow,
  SectionTitle,
  Underwater,
  fadeEdges,
} from "@/components/home/Underwater";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

// Flat woodblock icons, cut from the same print as the beach props.
const HOBBIES = [
  { key: "surf", label: "Surfing", w: 99, h: 335 },
  { key: "skate", label: "Skating", w: 102, h: 260 },
  { key: "volley", label: "Volleyball", w: 160, h: 158 },
  { key: "guitar", label: "Guitar", w: 140, h: 311 },
  { key: "cooking", label: "Cooking", w: 209, h: 166 },
  { key: "games", label: "Games", w: 202, h: 123 },
];

/**
 * Transition 2, "the reef rises": the reef strip climbs in from below a
 * little faster than the page as About arrives.
 */
export function About() {
  return (
    <Underwater
      id="about"
      label="About"
      background="linear-gradient(180deg,#0c2f59 0%,#0c3160 40%,#0c3160 75%,#0b2a4c 100%)"
      scenery={
        <>
          <Bubbles count={5} />
          <ScrollLayer
            className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
            y={[28, 0]}
            range={[0, 0.5]}
          >
            <div
              className="relative aspect-[3/2] w-[max(100%,56rem)]"
              style={fadeEdges(30, 90)}
            >
              <Image
                src="/scenes/reef.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-bottom"
              />
              <LightRays side="left" />
              <FishSchool fish={reefFish} drift={9} />
            </div>
          </ScrollLayer>
        </>
      }
    >
      <Container className="pb-[clamp(16rem,34vw,24rem)] pt-20 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="reveal">
            <Eyebrow>who I am</Eyebrow>
            <SectionTitle className="max-w-xl">
              Mostly I just like building the thing
            </SectionTitle>

            <div className="mt-8 flex justify-center lg:hidden">
              <PhotoPrint
                src="/kenzo_sitting.jpeg"
                alt="Kenzo by a window at golden hour"
                ratio={1.2}
                rotate={-3}
                sizes="240px"
                className="w-60"
              />
            </div>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/90 lg:mt-5">
              {profile.tagline}
            </p>

            <dl className="mt-7 grid max-w-lg grid-cols-2 gap-2.5">
              {profile.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-lg border border-cream/20 bg-navy/85 px-3.5 py-2.5"
                >
                  <dt className="text-[11px] font-bold text-coral-soft">
                    {fact.label}
                  </dt>
                  <dd className="text-sm font-medium text-cream">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul
              aria-label="Off the clock"
              className="mt-8 grid max-w-lg grid-cols-3 gap-y-6 sm:grid-cols-6"
            >
              {HOBBIES.map((hobby) => (
                <li
                  key={hobby.key}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="flex h-14 items-end">
                    <Image
                      src={`/hobbies/${hobby.key}.webp`}
                      alt=""
                      width={hobby.w}
                      height={hobby.h}
                      className="max-h-14 w-auto max-w-14"
                    />
                  </span>
                  <span className="text-xs font-medium text-cream">
                    {hobby.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal hidden justify-end lg:flex">
            <PhotoPrint
              src="/kenzo_sitting.jpeg"
              alt="Kenzo by a window at golden hour"
              ratio={1.2}
              rotate={-3}
              sizes="340px"
              className="mt-10 w-[21rem]"
            />
          </div>
        </div>
      </Container>
    </Underwater>
  );
}
