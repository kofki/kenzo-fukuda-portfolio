import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToHome } from "@/components/project/BackToHome";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { allWorkSlugs, getWorkBySlug } from "@/lib/work";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} · Kenzo Fukuda`,
    description: item.tagline,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();

  return (
    <main className="relative min-h-screen pb-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[460px]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--sky-blue) 20%, var(--sand)), var(--sand))",
        }}
      />

      <Container className="relative">
        <div className="flex items-center justify-between py-8">
          <BackToHome />
          <ThemeToggle />
        </div>

        <article className="space-y-16 pb-8">
          <ProjectHero item={item} />
          <ProjectGallery images={item.gallery} />
          <ProjectSection icon="code" title="About" paragraphs={item.about} />
          <ProjectSection
            icon="lightbulb"
            title="Inspiration"
            paragraphs={item.inspiration}
          />
          <ProjectSection
            icon="target"
            title="Takeaways"
            items={item.takeaways}
          />
          <div className="border-t border-border pt-8">
            <BackToHome label="Back to all work" />
          </div>
        </article>
      </Container>
    </main>
  );
}
