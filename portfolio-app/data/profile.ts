import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Kenzo Fukuda",
  givenName: "Kenzo",
  familyName: "Fukuda",
  role: "Software Engineer",
  jobTitle: "Co-Founder & CTO",
  headline: "Co-Founder & CTO of BeachLens",
  tagline:
    "I work across the whole stack, and I love learning fast and shipping products people actually use.",
  location: "Gainesville, Florida",
  siteUrl: "https://www.kfukuda.com",
  headshot: "/kenzo_headshot.jpg",
  updated: "2026-11-04",
  email: "kenzof28@gmail.com",
  resumeUrl: "/Kenzo_Resume.pdf",
  about: [
    "I'm Kenzo Fukuda, a CS student at the University of Florida and the co-founder and CTO of BeachLens. I develop full-stack and mobile apps, and I love making software that helps people. Off the clock I'm on the volleyball court, in the water surfing, on a board, or back home cooking, gaming, and playing guitar.",
    "I ship under tight deadlines and learn by doing. This year I cut cost and latency out of media pipelines at Vobile, co-founded and deployed BeachLens to 20,000+ users, and led the team at SASE to successfully ship our semester project. I'm usually the one who volunteers and is always down to try something new.",
  ],
  now: [
    "SWE Intern at Vobile, optimizing media pipelines for studios like Netflix and Disney.",
    "Co-Founder & CTO at BeachLens, a real-time beach data app with 20,000+ users.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/kofki", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kenzo-fukuda",
      icon: "linkedin",
    },
    { label: "X", href: "https://x.com/kenzof28", icon: "twitter" },
    { label: "Email", href: "mailto:kenzof28@gmail.com", icon: "email" },
  ],
  /** X handle with the @, for twitter:creator / twitter:site cards. */
  xHandle: "@kenzof28",
  // Same person, other sites. Keep the name on each one exactly "Kenzo Fukuda".
  // TODO: add Crunchbase and Product Hunt profiles once created.
  profiles: [
    "https://github.com/kofki",
    "https://www.linkedin.com/in/kenzo-fukuda/",
    "https://x.com/kenzof28",
    "https://www.instagram.com/kenzo.fukuda_/",
    "https://devpost.com/kofki",
    "https://beachlens.net/",
  ],
};
