import { education } from "@/data/education";
import { profile } from "@/data/profile";
import type { Project } from "@/types";

export const SITE_TITLE = `${profile.name} · ${profile.role}`;

export const SITE_DESCRIPTION =
  "Kenzo Fukuda is a full-stack software engineer and CS student at the University of Florida. Co-founder and CTO of BeachLens (20,000+ users), software engineering intern at Vobile, and 1st place at SwampHacks XI.";

export const SITE_KEYWORDS = [
  "Kenzo Fukuda",
  "software engineer",
  "full-stack developer",
  "mobile developer",
  "React Native",
  "Next.js",
  "TypeScript",
  "University of Florida",
  "BeachLens",
  "SwampHacks",
  "portfolio",
];

/** Stable @id so page-level schema can point at the same Person node. */
export const PERSON_ID = `${profile.siteUrl}/#person`;

// Built from data/ so it can never drift from what the page actually says.
export const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name,
      url: profile.siteUrl,
      email: `mailto:${profile.email}`,
      jobTitle: profile.role,
      description: profile.tagline,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: education.school,
      },
      sameAs: profile.socials
        .filter((social) => social.href.startsWith("http"))
        .map((social) => social.href),
    },
    {
      "@type": "WebSite",
      "@id": `${profile.siteUrl}/#website`,
      url: profile.siteUrl,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
    },
  ],
};

function absolute(path: string): string {
  return path.startsWith("http") ? path : `${profile.siteUrl}${path}`;
}

/** CreativeWork + breadcrumb trail for a /projects/[slug] page. */
export function projectSchema(item: Project) {
  const url = `${profile.siteUrl}/projects/${item.slug}`;
  const sameAs = Object.values(item.links).filter(
    (href): href is string => typeof href === "string" && href.startsWith("http"),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: item.title,
        headline: item.tagline,
        description: item.description,
        image: absolute(item.imageUrl),
        keywords: item.tech.join(", "),
        dateCreated: String(item.year),
        inLanguage: "en-US",
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: profile.siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${profile.siteUrl}/#projects`,
          },
          { "@type": "ListItem", position: 3, name: item.title, item: url },
        ],
      },
    ],
  };
}
