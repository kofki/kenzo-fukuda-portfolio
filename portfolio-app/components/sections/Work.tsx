import Image from "next/image";
import { Eyebrow, SectionTitle, Underwater } from "@/components/home/Underwater";
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
      background="#0f345c"
      scenery={
        <Image
          src="/scenes/sea.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_top]"
        />
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
