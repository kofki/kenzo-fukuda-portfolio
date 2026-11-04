import { posts } from "@/data/writing";
import type { Post } from "@/types";

/** Newest first. */
export const allPosts: Post[] = [...posts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function allPostSlugs(): string[] {
  return allPosts.map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function postWordCount(post: Post): number {
  return post.sections
    .flatMap((section) => [section.heading ?? "", ...section.paragraphs])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(post: Post): number {
  return Math.max(1, Math.round(postWordCount(post) / 200));
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-11-04" → "Nov 4, 2026". UTC so the date never shifts by timezone. */
export function formatDate(iso: string): string {
  return DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}
