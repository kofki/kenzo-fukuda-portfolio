/**
 * Shared domain types for the portfolio. Content lives in `data/*` as typed
 * objects so section components stay presentation-only and map over data.
 */

/** Semantic icon keys, resolved to Phosphor components in `lib/icons.ts`. */
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
  | "sparkle"
  | "trophy"
  | "menu"
  | "close";

export interface Link {
  label: string;
  href: string;
}

export interface SocialLink extends Link {
  icon: IconName;
}

/** Drives both the nav and the IntersectionObserver scrollspy. */
export interface NavItem {
  label: string;
  /** Matches the `id` on the corresponding <section>. */
  sectionId: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  /** About-section paragraphs. */
  about: string[];
  /** Short "what I'm up to now" lines for the About panel. */
  now: string[];
  socials: SocialLink[];
  email: string;
  resumeUrl: string;
}

export type EmploymentType =
  | "internship"
  | "full-time"
  | "part-time"
  | "contract";

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: EmploymentType;
  /** Display strings, e.g. "Jun 2024". */
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
  /** Marks the present role for "high tide" styling. */
  current?: boolean;
}

export interface ProjectLinks {
  repo?: string;
  live?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  /** Describes the photo to swap in for the placeholder. */
  imageAlt: string;
  links: ProjectLinks;
  featured?: boolean;
  year: number;
}

export interface HackathonProject extends Project {
  event: string;
  award?: string;
  teammates?: number;
  devpostUrl?: string;
}

/** The "vibe as a person" content for the About section. */
export interface Hobby {
  label: string;
  icon: IconName;
  blurb: string;
}
