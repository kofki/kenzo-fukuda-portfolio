import type { MetadataRoute } from "next";
import { allWorkSlugs } from "@/lib/work";
import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: profile.siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${profile.siteUrl}/logbook`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Derived from allWorkSlugs() so new projects are crawlable automatically.
    ...allWorkSlugs().map((slug) => ({
      url: `${profile.siteUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
