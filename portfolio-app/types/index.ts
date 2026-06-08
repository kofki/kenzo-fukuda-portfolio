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
  role: string;
  tagline: string;
  location: string;
  about: string[];
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
  start: string;
  end: string;
  location: string;
  summary: string;
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

export interface Project {
  slug: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  timeline: string;
  tech: string[];
  imageUrl: string;
  imageAlt: string;
  links: ProjectLinks;
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
  coursework: string[];
  awards: string[];
}

export interface Hobby {
  label: string;
  icon: IconName;
  blurb: string;
}
