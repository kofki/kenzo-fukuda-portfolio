import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import type { Post, Project } from "@/types";

export const SITE_TITLE = `${profile.name} · ${profile.headline} · ${profile.role}`;

export const SITE_DESCRIPTION =
  "Kenzo Fukuda is a full-stack software engineer and CS student at the University of Florida. Co-founder and CTO of BeachLens (20,000+ users), software engineering intern at Vobile, and 1st place at SwampHacks XI.";

export const ABOUT_DESCRIPTION =
  "About Kenzo Fukuda: Co-Founder and CTO of BeachLens, full-stack software engineer, and Computer Science student at the University of Florida in Gainesville.";

export const WRITING_DESCRIPTION =
  "Writing by Kenzo Fukuda, Co-Founder and CTO of BeachLens, on building and scaling mobile apps, hackathons, and studying computer science at the University of Florida.";

export const SITE_KEYWORDS = [
  "Kenzo Fukuda",
  "Co-Founder & CTO",
  "BeachLens",
  "software engineer",
  "full-stack developer",
  "mobile developer",
  "React Native",
  "Next.js",
  "TypeScript",
  "University of Florida",
  "Gainesville",
  "SwampHacks",
  "portfolio",
];

/** Stable @ids so page-level schema can point at the same nodes. */
export const PERSON_ID = `${profile.siteUrl}/#person`;
export const ORG_ID = `${profile.siteUrl}/#beachlens`;
export const WEBSITE_ID = `${profile.siteUrl}/#website`;

const UF_URL = "https://www.ufl.edu";

function absolute(path: string): string {
  return path.startsWith("http") ? path : `${profile.siteUrl}${path}`;
}

const beachlens = projects.find((project) => project.slug === "beachlens");

const BEACHLENS_LINKS = beachlens
  ? Object.values(beachlens.links).filter(
      (href): href is string =>
        typeof href === "string" && href.startsWith("http"),
    )
  : [];

// Built from data/ so it can never drift from what the page actually says.
const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  givenName: profile.givenName,
  familyName: profile.familyName,
  url: profile.siteUrl,
  // The BeachLens address is the one published in structured data: it ties
  // the person to the company's domain and keeps the personal inbox out of
  // scraped JSON-LD.
  email: `mailto:${profile.businessEmail}`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "business",
      email: profile.businessEmail,
      availableLanguage: ["en"],
    },
  ],
  image: {
    "@type": "ImageObject",
    url: absolute(profile.headshot),
    width: 800,
    height: 800,
    caption: `${profile.name}, ${profile.headline}`,
  },
  jobTitle: profile.jobTitle,
  description: SITE_DESCRIPTION,
  // Several unrelated people share this name. Google reads this field when
  // deciding which entity a page is about, so keep it specific.
  disambiguatingDescription:
    "Software engineer and startup co-founder based in Gainesville, Florida; Co-Founder and CTO of the BeachLens beach-conditions app and a Computer Science student at the University of Florida. Not the Japanese materials-science researcher or the videographer of the same name.",
  worksFor: { "@id": ORG_ID },
  affiliation: [
    { "@id": ORG_ID },
    {
      "@type": "CollegeOrUniversity",
      name: education.school,
      url: UF_URL,
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gainesville",
    addressRegion: "FL",
    addressCountry: "US",
  },
  knowsAbout: [
    "Software engineering",
    "Mobile app development",
    "React Native",
    "Next.js",
    "TypeScript",
    "Serverless data pipelines",
    "Beach safety and ocean conditions data",
  ],
  sameAs: profile.profiles,
};

const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "BeachLens",
  url: beachlens?.links.live ?? "https://beachlens.net/",
  ...(beachlens?.logo ? { logo: absolute(beachlens.logo) } : {}),
  ...(beachlens ? { description: beachlens.description } : {}),
  founder: { "@id": PERSON_ID },
  foundingDate: "2025-12",
  foundingLocation: {
    "@type": "Place",
    name: "Gainesville, Florida",
  },
  ...(BEACHLENS_LINKS.length > 0 ? { sameAs: BEACHLENS_LINKS } : {}),
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: profile.siteUrl,
  // Google's site-name feature reads this; the full title goes in alternateName.
  name: profile.name,
  alternateName: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
};

export const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [PERSON, ORGANIZATION, WEBSITE],
};

function breadcrumbs(trail: Array<{ name: string; item: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

/** ProfilePage for /about: tells crawlers this URL is the canonical bio. */
export function profilePageSchema() {
  const url = `${profile.siteUrl}/about`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: `About ${profile.name}`,
        description: ABOUT_DESCRIPTION,
        inLanguage: "en-US",
        dateModified: profile.updated,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      breadcrumbs([
        { name: "Home", item: profile.siteUrl },
        { name: "About", item: url },
      ]),
    ],
  };
}

/** CollectionPage for /writing. */
export function writingIndexSchema(posts: Post[]) {
  const url = `${profile.siteUrl}/writing`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: `Writing by ${profile.name}`,
        description: WRITING_DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${url}/${post.slug}`,
            name: post.title,
          })),
        },
      },
      breadcrumbs([
        { name: "Home", item: profile.siteUrl },
        { name: "Writing", item: url },
      ]),
    ],
  };
}

/** BlogPosting + breadcrumb trail for a /writing/[slug] page. */
export function postSchema(post: Post, wordCount: number) {
  const url = `${profile.siteUrl}/writing/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        url,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        keywords: post.tags.join(", "),
        wordCount,
        inLanguage: "en-US",
        image: `${profile.siteUrl}/opengraph-image`,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      breadcrumbs([
        { name: "Home", item: profile.siteUrl },
        { name: "Writing", item: `${profile.siteUrl}/writing` },
        { name: post.title, item: url },
      ]),
    ],
  };
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
        ...(item.slug === "beachlens" ? { publisher: { "@id": ORG_ID } } : {}),
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      breadcrumbs([
        { name: "Home", item: profile.siteUrl },
        { name: "Projects", item: `${profile.siteUrl}/#projects` },
        { name: item.title, item: url },
      ]),
    ],
  };
}
