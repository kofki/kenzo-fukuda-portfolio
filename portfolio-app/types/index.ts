export type IconName =
  | "github"
  | "linkedin"
  | "twitter"
  | "email"
  | "resume"
  | "external"
  | "surf"
  | "skate"
  | "guitar"
  | "sing"
  | "volleyball"
  | "sun"
  | "moon"
  | "wave"
  | "mapPin"
  | "arrowDown"
  | "arrowUpRight"
  | "code"
  | "chartLine"
  | "trophy"
  | "star"
  | "menu"
  | "close"
  | "auto"
  | "arrowLeft"
  | "caretRight"
  | "stack"
  | "cube"
  | "database"
  | "terminal"
  | "cpu"
  | "graduationCap"
  | "books"
  | "medal"
  | "certificate"
  | "scales"
  | "creditCard"
  | "deviceMobile"
  | "appStore"
  | "googlePlay"
  | "lightbulb"
  | "target"
  | "path"
  | "rocket"
  | "brain";

export interface Link {
  label: string;
  href: string;
}

export interface SocialLink extends Link {
  icon: IconName;
}

export interface NavItem {
  label: string;
  sectionId: string;
}

export interface Profile {
  name: string;
  givenName: string;
  familyName: string;
  role: string;
  /** Position only, for schema.org jobTitle: "Co-Founder & CTO". */
  jobTitle: string;
  /** Position plus company, for titles and bylines: "Co-Founder & CTO of BeachLens". */
  headline: string;
  tagline: string;
  location: string;
  /** Absolute origin of the deployed site; feeds metadataBase, sitemap, and JSON-LD. */
  siteUrl: string;
  /** Square headshot under public/, used as the Person schema image and on /about. */
  headshot: string;
  /** ISO date of the last meaningful content edit. Feeds sitemap lastModified. */
  updated: string;
  about: string[];
  now: string[];
  socials: SocialLink[];
  /** X handle including the @, for Twitter card metadata. */
  xHandle?: string;
  /**
   * Every public profile that is this same person, for schema.org sameAs and
   * rel="me". Add each new profile (X, Devpost, Crunchbase, ...) here as soon
   * as it exists so search engines can merge them into one entity.
   */
  profiles: string[];
  /** Recruiting and career inbox. Shown only behind an explicit "recruiters" label. */
  email: string;
  /** BeachLens and business inbox; also the address published in the Person schema. */
  businessEmail: string;
  resumeUrl: string;
}

export interface PostSection {
  heading?: string;
  paragraphs: string[];
}

/** One article under /writing. Content is typed data, same as the logbook. */
export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO dates (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  sections: PostSection[];
}

export type EmploymentType =
  | "internship"
  | "full-time"
  | "part-time"
  | "contract"
  | "founder";

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: EmploymentType;
  start: string;
  end: string;
  location: string;
  summary: string;
  /**
   * Overrides the term label on the timeline dot, which is otherwise derived
   * from `start` via termLabel(). Set this when a role's position on the
   * timeline doesn't match its start date — e.g. an ongoing role pinned to the
   * far right, where the derived term would read out of sequence.
   */
  term?: string;
  /**
   * Disciplines this role involved, used by the timeline filter. Omitted for
   * roles with no engineering discipline (mentoring, chapter operations) — those
   * appear only in the unfiltered view.
   */
  domains?: Domain[];
  /**
   * Kept as source material but no longer rendered — the timeline shows the
   * one-sentence `summary` instead of a bullet list. Useful when tailoring a
   * resume, so don't delete it.
   */
  highlights: string[];
  tech: string[];
  current?: boolean;
  accent?: string;
  monogram?: string;
  logo?: string;
}

export interface ProjectLinks {
  repo?: string;
  live?: string;
  caseStudy?: string;
  devpost?: string;
  appStore?: string;
  googlePlay?: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "phone";
}

export interface Backer {
  name: string;
  logo: string;
  url?: string;
}

export interface Project {
  slug: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  timeline: string;
  /** Disciplines this project covers, used by the projects filter. */
  domains?: Domain[];
  tech: string[];
  imageUrl: string;
  imageAlt: string;
  logo?: string;
  links: ProjectLinks;
  backedBy?: Backer[];
  featured?: boolean;
  year: number;
  gallery: GalleryImage[];
  about: string[];
  inspiration: string[];
  takeaways: string[];
}

export interface HackathonProject extends Project {
  event: string;
  award?: string;
  teammates?: number;
}

/** Disciplines the experience and project filters offer. */
export const DOMAINS = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "UI/UX",
  "ML/AI",
  "Data",
] as const;

export type Domain = (typeof DOMAINS)[number];

export interface Skill {
  label: string;
  brand?: string;
  icon?: IconName;
}

export interface SkillCategory {
  title: string;
  icon: IconName;
  skills: Skill[];
}

export interface Education {
  school: string;
  degree: string;
  minor?: string;
  location: string;
  start: string;
  end: string;
  gpa?: string;
}

export interface Hobby {
  label: string;
  icon: IconName;
  blurb: string;
}

/**
 * One dated moment in the logbook. Entries read as a reverse-chronological
 * journal rather than a photo grid, so each one carries its own context.
 */
export interface LogbookEntry {
  id: string;
  src: string;
  alt: string;
  title: string;
  /** Free text, not a Date — "Jan 2026" or "idk" are both fine. */
  date: string;
  description?: string;
  tags?: string[];
}
