import type { Experience } from "@/types";

// Newest first.
export const experiences: Experience[] = [
  {
    id: "vobile",
    company: "Vobile Group",
    role: "Software Engineering Intern",
    type: "internship",
    start: "Jan 2026",
    end: "Present",
    location: "Gainesville, FL",
    current: true,
    monogram: "VG",
    accent: "#2f6fd0",
    logo: "/vobile_logo.png",
    summary:
      "Building and optimizing the media pipelines that ingest and match content at scale for major studios.",
    highlights: [
      "Reduced data size by 15% by migrating JSON serialization to binary MessagePack across Django and RabbitMQ.",
      "Grew weekly video metadata discovery by 300k+ records by tapping YouTube recommendation signals and optimizing a Conductor workflow deployed via Helm and Flux GitOps on Kubernetes.",
      "Cut $15,000 in monthly cost and enabled daily processing of 1,000+ assets by engineering TypeScript batching and compression for clients like Netflix, Disney, Sony, and Warner Bros.",
      "Achieved 3.5x throughput and resolved 100+ errors by overhauling a Celery and RabbitMQ pipeline.",
      "Resolved 30+ media endpoints in Node.js using an agentic Claude Skill web scraper generator and prompt tuning.",
    ],
    tech: ["Python", "Django", "RabbitMQ", "Kubernetes", "Helm", "TypeScript"],
  },
  {
    id: "beachlens",
    company: "BeachLens",
    role: "Co-Founder, CTO & Software Engineer",
    type: "founder",
    start: "Dec 2025",
    end: "Present",
    location: "Gainesville, FL",
    current: true,
    monogram: "BL",
    accent: "#0e9aa7",
    logo: "/beachlens_logo.png",
    summary:
      "Co-founding a real-time beach data app that turns messy environmental feeds into clear, safe go or no-go calls.",
    highlights: [
      "Built and shipped a real-time beach data iOS app to 4,000+ users on the App Store with React Native.",
      "Engineered a serverless ELT pipeline that unifies 11+ heterogeneous weather and water condition streams in real time.",
      "Led a team of 11 through Agile sprints to ship a NOAA-backed beach data app.",
      "Developed a recommendation engine using predictive modeling to surface safety insights from user analytics.",
    ],
    tech: ["React Native", "Swift", "Serverless", "ELT", "NOAA"],
  },
  {
    id: "sase-swt",
    company: "SASE Web Development Team",
    role: "Software Engineering Lead",
    type: "part-time",
    start: "Sep 2025",
    end: "May 2026",
    location: "Gainesville, FL",
    monogram: "SW",
    accent: "#e8643c",
    logo: "/sase_logo.png",
    summary:
      "Leading a student engineering org to design and ship an AI advisor for members.",
    highlights: [
      "Led a 30 member org to launch an AI Advisor, managing three technical sub-teams with Scrum.",
      "Architected a React frontend, ran code reviews, and led workshops on Git, React, and REST APIs.",
    ],
    tech: ["React", "REST", "Git", "Scrum"],
  },
  {
    id: "the-bean-code",
    company: "The Bean Code",
    role: "Software Engineering Intern",
    type: "internship",
    start: "Sep 2025",
    end: "Dec 2025",
    location: "Remote",
    monogram: "BC",
    accent: "#caa24a",
    logo: "/thebeancode_logo.png",
    summary:
      "Built the backend that powers a resume and video interview matching engine.",
    highlights: [
      "Engineered an asynchronous FastAPI backend with indexed PostgreSQL schemas that offload resumes and video interviews to S3 to cut database latency.",
      "Automated resume parsing with Regex and NLP to structure raw text into JSON for the matching engine.",
    ],
    tech: ["FastAPI", "PostgreSQL", "AWS S3", "NLP"],
  },
];
