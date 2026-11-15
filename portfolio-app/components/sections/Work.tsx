import Image from "next/image";
import { Bubbles } from "@/components/home/Bubbles";
import { LiveScene } from "@/components/home/LiveScene";
import { seaBubbles, seaFish } from "@/components/home/liveLayers";
import { FishSchool, LightRays, PrintBubbles } from "@/components/home/SeaLife";
import { Eyebrow, SectionTitle, Underwater, fadeEdges } from "@/components/home/Underwater";
import { ProjectCards, type CardData } from "@/components/home/ProjectCards";
import { Container } from "@/components/ui/Container";
import { allWork, isHackathon } from "@/lib/work";
import { allPosts } from "@/lib/writing";

// One line on the result for each card, from facts already on the site.
function metaFor(item: (typeof allWork)[number]): string {
  if (isHackathon(item)) {
    return [item.award, item.event].filter(Boolean).join(" · ");
  }
  return item.role;
}

const cards: CardData[] = allWork.map((item) => {
  const story = allPosts.find((post) => post.project === item.slug);
  return {
    slug: item.slug,
    title: item.title,
    line: item.tagline,
    meta: metaFor(item),
    cover: item.cover ?? item.imageUrl,
    coverAlt: item.coverAlt ?? item.imageAlt,
    featured: Boolean(item.featured),
    story: story ? { title: story.title, href: `/writing/${story.slug}` } : undefined,
  };
});

/**
 * Projects is the first thing below the surface: the scene is the ocean seen
 * from just underneath, with light coming down through it.
 */
export function Work() {
  return (
    <Underwater
      id="projects"
      label="Projects"
      // Starts at the colour the hero's rising sea ends on.
      background="linear-gradient(180deg,#3f7a90 0%,#1a4a72 22%,#0e3560 55%,#0c2f59 100%)"
      scenery={
        <LiveScene className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 overflow-hidden" style={fadeEdges(0, 62)}>
            {/* The print is cropped like object-cover at 70% / top; the
                creatures share the same 3:2 frame so they stay where drawn. */}
            <div className="absolute left-[70%] top-0 aspect-[3/2] min-h-full min-w-full -translate-x-[70%]">
              <Image src="/scenes/sea.webp" alt="" fill sizes="100vw" className="object-cover" />
              <LightRays side="right" />
              <PrintBubbles bubbles={seaBubbles} />
              <FishSchool fish={seaFish} />
            </div>
          </div>
          <Bubbles />
        </LiveScene>
      }
    >
      <Container className="pb-20 pt-[clamp(5rem,12vw,8rem)] sm:pb-28">
        <Eyebrow>things I&apos;ve built</Eyebrow>
        <SectionTitle>Projects</SectionTitle>
        <ProjectCards cards={cards} />
      </Container>
    </Underwater>
  );
}
