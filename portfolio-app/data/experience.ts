import type { Experience } from "@/types";

// Placeholder roles — replace with real history. Newest first.
export const experiences: Experience[] = [
  {
    id: "vobile",
    company: "Vobile",
    role: "Software Engineer",
    type: "full-time",
    start: "Jan 2025",
    end: "Present",
    location: "Los Angeles, CA",
    current: true,
    summary:
      "Building internal developer tooling and content-matching services that process media at scale.",
    highlights: [
      "Shipped a self-serve dashboard that cut a manual review workflow from hours to minutes.",
      "Hardened a high-throughput matching pipeline, trimming p95 latency by ~30%.",
      "Mentored two interns through their first production deploys.",
    ],
    tech: ["TypeScript", "Go", "React", "PostgreSQL", "AWS"],
  },
  {
    id: "startup-intern",
    company: "Seabird Labs",
    role: "Software Engineering Intern",
    type: "internship",
    start: "Jun 2024",
    end: "Sep 2024",
    location: "Remote",
    summary:
      "Owned a customer-facing feature end to end on a small, fast-moving product team.",
    highlights: [
      "Designed and built a notifications system used by every active account.",
      "Added end-to-end tests that caught three regressions before release.",
    ],
    tech: ["Next.js", "tRPC", "Prisma", "Tailwind"],
  },
  {
    id: "research",
    company: "University Systems Lab",
    role: "Undergraduate Research Assistant",
    type: "part-time",
    start: "Sep 2023",
    end: "May 2024",
    location: "On campus",
    summary:
      "Investigated scheduling heuristics for distributed jobs and built the benchmarking harness.",
    highlights: [
      "Automated a benchmark suite that replaced a fragile manual process.",
      "Co-authored an internal report adopted as onboarding material.",
    ],
    tech: ["Python", "Rust", "Docker"],
  },
  {
    id: "first-intern",
    company: "Tidepool Software",
    role: "Web Development Intern",
    type: "internship",
    start: "Jun 2023",
    end: "Aug 2023",
    location: "Santa Monica, CA",
    summary:
      "First professional role — shipped marketing site features and learned to read a large codebase.",
    highlights: [
      "Rebuilt the landing page, improving Lighthouse performance to 98.",
      "Closed 20+ issues across the frontend backlog.",
    ],
    tech: ["JavaScript", "Vue", "CSS"],
  },
];
