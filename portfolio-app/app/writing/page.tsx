import type { Metadata } from "next";
import Link from "next/link";
import { BackToHome } from "@/components/project/BackToHome";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/fx/Reveal";
import { WRITING_DESCRIPTION, writingIndexSchema } from "@/lib/seo";
import { allPosts, formatDate, readingMinutes } from "@/lib/writing";
import { profile } from "@/data/profile";

const TITLE = "Writing";

export const metadata: Metadata = {
  title: TITLE,
  description: WRITING_DESCRIPTION,
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    url: "/writing",
    title: `${TITLE} · ${profile.name}`,
    description: WRITING_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · ${profile.name}`,
    description: WRITING_DESCRIPTION,
  },
};

export default function WritingPage() {
  return (
    <main className="relative min-h-[100dvh] pb-24">
      <JsonLd data={writingIndexSchema(allPosts)} />
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
          <BackToHome />
          <ThemeToggle />
        </div>

        <Reveal>
          <p className="text-sm font-medium text-coral-ink">Notes from the build</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Writing
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Essays by {profile.name}, {profile.headline}, on building and
            scaling products, hackathons, and studying computer science at the
            University of Florida.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ol className="divide-y divide-border">
            {allPosts.map((post) => (
              <li key={post.slug} className="py-8 first:pt-0">
                <article>
                  <p className="font-mono text-xs text-muted">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    {" · "}
                    {readingMinutes(post)} min read
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="transition-colors hover:text-coral-ink"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
                    {post.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-16 border-t border-border pt-8">
          <BackToHome label="Back to the dive" />
        </div>
      </Container>
    </main>
  );
}
