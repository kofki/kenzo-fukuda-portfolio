import type { HackathonProject } from "@/types";

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
    links: {
      live: "https://case-forward-ai.vercel.app/",
      devpost: "https://devpost.com/software/caseforwardai",
      repo: "https://github.com/kofki/CaseForwardAI",
    },
    featured: true,
    year: 2026,
    gallery: [
      {
        url: "/caseforward/dashboard.jpg",
        alt: "The CaseForward AI case dashboard with action items, case list, and an activity feed.",
        caption: "The case dashboard: action items, case list, and activity feed.",
      },
      {
        url: "/caseforward/debriefing.jpg",
        alt: "The Debriefing Room, where Gemini specialist agents collaborate on a case.",
        caption:
          "The Debriefing Room: Gemini specialists (Orchestrator, Evidence Analyzer, Settlement Valuator) collaborate on a case.",
      },
      {
        url: "/caseforward/analysis.jpg",
        alt: "An ingested police report parsed into a structured case overview.",
        caption: "Raw documents in, structured case analysis out.",
      },
      {
        url: "/swamphacks_win.jpeg",
        alt: "The CaseForward AI team winning 1st place at SwampHacks XI.",
        caption: "First place out of 100+ projects at SwampHacks XI.",
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
  {
    slug: "subscriptos",
    id: "subscriptos",
    title: "Subscriptos",
    tagline:
      "A firewall for your finances: catch predatory terms, pay with burner cards.",
    description:
      "A Chrome extension that scores predatory terms of service with Gemini, plus Stripe-issued virtual burner cards so free trials can't quietly charge you. Built at SASEHacks 2026.",
    role: "Frontend & UI/UX",
    timeline: "Mar 2026",
    event: "SASEHacks 2026",
    teammates: 4,
    tech: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Gemini",
      "Stripe",
      "Supabase",
    ],
    imageUrl: "/subscriptos/team.jpg",
    imageAlt:
      "The four-person Subscriptos team at SASEHacks 2026 with the app on a laptop.",
    links: {
      live: "https://subscriptos-rho.vercel.app/",
      devpost: "https://devpost.com/software/subscriptos",
    },
    year: 2026,
    gallery: [
      {
        url: "/subscriptos/hero.jpg",
        alt: "The Subscriptos landing page: a firewall for your finances.",
        caption:
          "A firewall for your finances: scan the terms, then pay with a burner card.",
      },
      {
        url: "/subscriptos/team.jpg",
        alt: "The four-person Subscriptos team at SASEHacks 2026 with the app on a laptop.",
        caption: "Built by four of us at SASEHacks 2026.",
      },
    ],
    about: [
      "Subscriptos fights the information asymmetry in subscriptions and free trials, where aggressive auto-renewals and data-sharing clauses hide in pages of legalese that companies know nobody reads. A Chrome extension detects subscription sites and scans their terms of service on the spot; Google's Gemini scores the risk 0 to 100 across data privacy, integrity, and consumer fairness, with plain-English justifications and an embedded AI chat for follow-up questions.",
      "For a second layer of defense, Stripe's Issuing API generates virtual burner cards on demand, so a trial can never silently become a charge, and a dashboard tracks every scan and card. I built the frontend and UI/UX (React 19, Vite, Tailwind, Framer Motion) for our four-person team at SASEHacks 2026.",
    ],
    inspiration: [
      "Subscriptions and free trials have become information-asymmetry traps: auto-renewal and data-sharing clauses buried in tens of pages of legalese.",
      "We wanted to flip that asymmetry back to the user, translate the legalese into a clear score, and add burner payment methods as a hard backstop, regardless of the platform.",
    ],
    takeaways: [
      "Constraining an LLM to structured JSON output is what makes a safety score consistent and trustworthy.",
      "Integrating Stripe's Issuing API taught us the intricacies of virtual card generation and secure handling of payment data.",
      "A multi-service app held together only because we standardized our .env config and kept strict version control.",
      "Each of us picked up an unfamiliar technology and shipped it into a working full-stack product in a hackathon timeframe.",
    ],
  },
];
