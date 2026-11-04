import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToHome } from "@/components/project/BackToHome";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/fx/Reveal";
import { postSchema } from "@/lib/seo";
import {
  allPostSlugs,
  formatDate,
  getPostBySlug,
  postWordCount,
  readingMinutes,
} from "@/lib/writing";
import { profile } from "@/data/profile";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { robots: { index: false } };

  const url = `/writing/${slug}`;
  // The title template in app/layout.tsx appends "· Kenzo Fukuda" already.
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [`${profile.siteUrl}/about`],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-[100dvh] pb-24">
      <JsonLd data={postSchema(post, postWordCount(post))} />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-teal) 14%, var(--sand)), var(--sand))",
        }}
      />

      <Container className="relative">
        <div className="flex items-center justify-between py-8">
          <BackToHome label="Back to writing" />
          <ThemeToggle />
        </div>

        <article className="mx-auto max-w-3xl">
          <Reveal>
            <header>
              <p className="font-mono text-xs text-muted">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                {" · "}
                {readingMinutes(post)} min read
              </p>
              <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-sm text-ink/80">
                By{" "}
                <Link
                  href="/about"
                  rel="author"
                  className="font-medium text-ink underline decoration-coral/60 underline-offset-4 transition-colors hover:text-coral-ink"
                >
                  {profile.name}
                </Link>
                , {profile.headline}
              </p>
            </header>
          </Reveal>

          <Reveal className="mt-10 space-y-10">
            {post.sections.map((section, index) => (
              <section key={section.heading ?? index} className="space-y-5">
                {section.heading ? (
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>

          <footer className="mt-12 rounded-2xl border border-border p-6">
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-medium text-ink">{profile.name}</span> is the{" "}
              {profile.headline.replace(/^Co-Founder/, "co-founder")} and a
              computer science student at the University of Florida.{" "}
              <Link
                href="/about"
                className="text-coral-ink transition-colors hover:text-ink"
              >
                More about Kenzo
              </Link>
              .
            </p>
          </footer>

          <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
            <BackToHome label="Back to writing" />
          </div>
        </article>
      </Container>
    </main>
  );
}
