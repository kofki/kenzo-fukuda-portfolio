import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Kenzo Fukuda",
  role: "Software Engineer",
  tagline:
    "I'm a full-stack engineer who likes owning a problem end to end, learning fast, and shipping things people actually use.",
  location: "Gainesville, Florida",
  email: "kenzof28@gmail.com",
  resumeUrl: "/Kenzo_Resume.pdf",
  about: [
    "I'm Kenzo, a CS student at the University of Florida and a software engineer who genuinely likes the whole arc of a problem, from the first messy sketch to the last rough edge before it ships. I live mostly on the full stack: typed backends, data pipelines that have to stay honest, and interfaces that feel good in the hand.",
    "I move fast and I learn out loud. This year that has looked like cutting cost and latency out of media pipelines at Vobile, co-founding BeachLens and shipping it to a few thousand people, and leading a 30 person web team at SASE. I'm usually the one who volunteers for the unfamiliar tool so nobody else has to wait on it.",
    "",
  ],
  now: [
    "Interning at Vobile, optimizing media pipelines for studios like Netflix and Disney.",
    "Co-founding BeachLens, a real-time beach data app with 5,000+ users.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/kofki", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kenzo-fukuda",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:kenzof28@gmail.com", icon: "email" },
  ],
};
