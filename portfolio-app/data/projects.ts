import type { Project } from "@/types";
import { unsplash } from "@/lib/unsplash";

// Placeholder projects — replace copy, links, and imagery with real work.
export const projects: Project[] = [
  {
    id: "tideline",
    title: "Tideline",
    description:
      "An open-source observability dashboard that turns noisy service metrics into a calm, readable timeline. Real-time charts, alerting, and a plugin API.",
    tech: ["TypeScript", "Next.js", "WebSockets", "D3", "PostgreSQL"],
    imageUrl: unsplash("1551958219-acbc608c6377"),
    imageAlt: "Placeholder — swap for a screenshot of the Tideline dashboard UI.",
    links: {
      repo: "https://github.com/kenzofukuda/tideline",
      live: "https://tideline.example.com",
      caseStudy: "#",
    },
    featured: true,
    year: 2025,
  },
  {
    id: "driftwood",
    title: "Driftwood",
    description:
      "A local-first markdown notebook with bidirectional links and instant full-text search. Your notes, your machine, no lock-in.",
    tech: ["React", "Rust", "Tauri", "SQLite"],
    imageUrl: unsplash("1517245386807-bb43f82c33c4"),
    imageAlt: "Placeholder — swap for the Driftwood editor interface.",
    links: { repo: "https://github.com/kenzofukuda/driftwood", live: "#" },
    year: 2024,
  },
  {
    id: "sandbar",
    title: "Sandbar",
    description:
      "A zero-config CLI that scaffolds typed API clients from an OpenAPI spec in seconds. Pure ergonomics for the boring parts.",
    tech: ["Go", "Cobra", "OpenAPI"],
    imageUrl: unsplash("1517180102446-f3ece451e9d8"),
    imageAlt: "Placeholder — swap for a terminal recording of Sandbar.",
    links: { repo: "https://github.com/kenzofukuda/sandbar" },
    year: 2024,
  },
  {
    id: "foam",
    title: "Foam",
    description:
      "A small, accessible component library and design-token system. Built to stay out of your way and pass an audit.",
    tech: ["TypeScript", "React", "Storybook", "Radix"],
    imageUrl: unsplash("1461749280684-dccba630e2f6"),
    imageAlt: "Placeholder — swap for the Foam component gallery.",
    links: {
      repo: "https://github.com/kenzofukuda/foam",
      live: "https://foam.example.com",
    },
    year: 2023,
  },
  {
    id: "currents",
    title: "Currents",
    description:
      "A streaming data pipeline that ingests events, enriches them, and lands clean tables — with backpressure that actually works.",
    tech: ["Python", "Kafka", "dbt", "Snowflake"],
    imageUrl: unsplash("1556761175-5973dc0f32e7"),
    imageAlt: "Placeholder — swap for a Currents pipeline diagram.",
    links: { repo: "https://github.com/kenzofukuda/currents" },
    year: 2023,
  },
];
