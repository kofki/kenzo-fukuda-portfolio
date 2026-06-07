import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Hackathons } from "@/components/sections/Hackathons";
import { Contact } from "@/components/sections/Contact";
import { WaveDivider } from "@/components/fx/WaveDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <WaveDivider className="text-foam opacity-70" height={48} />
        <Experience />
        <WaveDivider className="text-foam opacity-70" height={48} flip />
        <Projects />
        <WaveDivider className="text-foam opacity-70" height={48} />
        <Hackathons />
        <Contact />
      </main>
    </>
  );
}
