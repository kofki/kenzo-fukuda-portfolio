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
  | "chartLine"
  | "trophy"
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
  | "contract"
  | "founder";

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
  /** Brand color (hex) for the monogram badge. */
  accent?: string;
  /** Two-letter monogram shown until a real logo is supplied. */
  monogram?: string;
  /** Optional /public/logos/<file>.svg to swap in for the monogram. */
  logo?: string;
}

export interface ProjectLinks {
  repo?: string;
  live?: string;
  caseStudy?: string;
  devpost?: string;
  appStore?: string;
}

/** One image in a project detail gallery. */
export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  /** URL segment for the detail page: /projects/[slug]. */
  slug: string;
  id: string;
  title: string;
  /** One-line hook shown on the card and detail hero. */
  tagline: string;
  /** Card summary paragraph. */
  description: string;
  role: string;
  timeline: string;
  tech: string[];
  imageUrl: string;
  /** Describes the photo to swap in for the placeholder. */
  imageAlt: string;
  links: ProjectLinks;
  featured?: boolean;
  year: number;
  /** Detail-page content. */
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

/** A single technology, optionally carrying a brand mark or fallback icon. */
export interface Skill {
  label: string;
  /** Simple Icons slug (see lib/brandIcon BRANDS). */
  brand?: string;
  /** Phosphor fallback when there is no brand mark. */
  icon?: IconName;
}

/** A category of skills shown in the Skills section. */
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
  coursework: string[];
  awards: string[];
}

/** The "vibe as a person" content for the About section. */
export interface Hobby {
  label: string;
  icon: IconName;
  blurb: string;
}
