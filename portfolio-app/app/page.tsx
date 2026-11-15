import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Logbook } from "@/components/sections/Logbook";
import { Work } from "@/components/sections/Work";

// The layout supplies title and description; the canonical belongs to this
// route rather than every route that inherits the layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * One continuous dive: the beach, then under the surface to Projects, past the
 * reef (About), deeper water (Experience), the kelp (Logbook), and the reef
 * city at the bottom (Contact). Each section paints its own scenery, and their
 * edges share colours so they meet without seams.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Logbook />
        <Contact />
      </main>
    </>
  );
}
