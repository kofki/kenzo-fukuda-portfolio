import type { HackathonProject } from "@/types";
import { unsplash } from "@/lib/unsplash";

// Real hackathon builds. Gallery images are themed placeholders for now.
export const hackathons: HackathonProject[] = [
  {
    slug: "caseforward-ai",
    id: "caseforward-ai",
    title: "CaseForward AI",
    tagline: "A multi-agent AI paralegal that reads the case so you do not have to.",
    description:
      "A multi-agent AI legal platform that automates document intake and case analysis. Won 1st place out of 100+ projects at SwampHacks XI.",
    role: "Team Lead",
    timeline: "Jan 2026",
    event: "SwampHacks XI",
    award: "1st Place",
    teammates: 4,
    tech: ["Next.js", "React", "MongoDB", "Gemini", "Cloudflare R2", "MCP"],
    imageUrl: "/swamphacks_win.jpeg",
    imageAlt: "The CaseForward AI team winning 1st place at SwampHacks XI.",
    links: { devpost: "#", repo: "#" },
    featured: true,
    year: 2026,
    gallery: [
      {
        url: unsplash("1498050108023-c5249f4df085", 1400),
        alt: "Placeholder. The CaseForward AI analysis view.",
        caption: "Raw documents in, structured case analysis out.",
      },
      {
        url: "/swamphacks_win.jpeg",
        alt: "The CaseForward AI team at SwampHacks XI.",
        caption: "Four people, thirty six hours, first place.",
      },
      {
        url: unsplash("1531297484001-80022131f5a1", 1000),
        alt: "Placeholder. The agent orchestrator architecture.",
        caption: "Gemini agents delegating reasoning and action via MCP.",
      },
    ],
    about: [
      "CaseForward AI is a multi-agent legal platform that automates document intake and case analysis. It takes raw case documents, structures them, and runs reasoning and action steps to surface what matters. It won first place out of more than 100 projects at SwampHacks XI.",
      "I led a four person team and built the serverless orchestrator: a set of Gemini agents that delegate reasoning and action tasks to each other through MCP, with Cloudflare R2 handling storage. It cut manual processing by around 80 percent.",
    ],
    inspiration: [
      "Legal work is full of careful, repetitive reading, exactly the kind of task that breaks people and suits machines.",
      "We were curious whether a team of small, specialized agents could outperform one big prompt. Splitting reasoning from action through MCP is what made it reliable enough to demo under pressure.",
    ],
    takeaways: [
      "Multi-agent orchestration beats a single mega prompt when the tasks have distinct shapes.",
      "MCP gave us a clean contract between reasoning and action, which made debugging sane.",
      "Winning a hackathon is half scope discipline and half a demo that tells a story.",
      "Leading four people in thirty six hours is mostly about cutting the right features fast.",
    ],
  },
];
