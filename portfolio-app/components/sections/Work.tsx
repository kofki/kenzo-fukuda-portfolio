import { Bubbles } from "@/components/home/Bubbles";
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
    domains: item.domains ?? [],
    story: story ? { title: story.title, href: `/writing/${story.slug}` } : undefined,
  };
});

/** Projects is the first thing below the surface, just under the dive. */
export function Work() {
  return (
    <Underwater
      id="projects"
      label="Projects"
      // Rise up under the waterline during the dive, instead of waiting a
      // whole screen of open water after it.
      className="-mt-[88svh] max-sm:-mt-[61svh]"
      // The water and its light come from SeaBackdrop, shared with the end
      // of the dive and About.
      background="transparent"
      mood={false}
      scenery={<Bubbles />}
    >
      <Container className="pb-6 pt-6 sm:pb-8">
        <Eyebrow>things I&apos;ve built</Eyebrow>
        <SectionTitle>Projects</SectionTitle>
        <ProjectCards cards={cards} />
      </Container>
    </Underwater>
  );
}
