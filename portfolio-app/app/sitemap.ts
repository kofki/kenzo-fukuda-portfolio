import type { MetadataRoute } from "next";
import { allWorkSlugs } from "@/lib/work";
import { allPosts } from "@/lib/writing";
import { profile } from "@/data/profile";

// Real dates only. Stamping every URL with the build time tells crawlers the
// whole site changed on every deploy, which they learn to ignore.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdated = new Date(profile.updated);
  const latestPost = allPosts[0];
  const writingUpdated = latestPost
    ? new Date(latestPost.updatedAt ?? latestPost.publishedAt)
    : siteUpdated;

  return [
    {
      url: profile.siteUrl,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${profile.siteUrl}/about`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${profile.siteUrl}/writing`,
      lastModified: writingUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...allPosts.map((post) => ({
      url: `${profile.siteUrl}/writing/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Derived from allWorkSlugs() so new projects are crawlable automatically.
    ...allWorkSlugs().map((slug) => ({
      url: `${profile.siteUrl}/projects/${slug}`,
      lastModified: siteUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${profile.siteUrl}/logbook`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
