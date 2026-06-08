import { WorldBackground } from "@/components/world/WorldBackground";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";

// Underwater frost: cool and translucent (never sandy) so the content reads as
// descending through water; it grows clearer toward the bottom so the dive
// world deepens and the reef city is revealed at the end. Foam is light in
// light mode / dark in dark mode and --ink flips opposite, so text stays legible.
const DESCENT_SHEET =
  "linear-gradient(180deg," +
  " color-mix(in oklab, var(--foam) 42%, transparent) 0%," +
  " color-mix(in oklab, var(--foam) 34%, transparent) 34%," +
  " color-mix(in oklab, var(--dive-shallow) 24%, transparent) 64%," +
  " color-mix(in oklab, var(--dive-mid) 16%, transparent) 84%," +
  " transparent 100%)";

export default function Home() {
  return (
    <>
      <WorldBackground />
      <Nav />
      <main className="relative">
        <Hero />
        {/* The content descends from the beach surface into the water; the dive
            world frosts through and the reef city is revealed at the bottom. */}
        <div className="relative backdrop-blur-[3px]" style={{ background: DESCENT_SHEET }}>
          <About />
          <Skills />
          <Experience />
          <Work />
        </div>
        <Contact />
      </main>
    </>
  );
}
