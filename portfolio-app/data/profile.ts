import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Kenzo Fukuda",
  role: "Software Engineer",
  tagline:
    "I'm a full-stack engineer, and I love learning fast and shipping products that make a real difference.",
  location: "Gainesville, Florida",
  email: "kenzof28@gmail.com",
  resumeUrl: "/Kenzo_Resume.pdf",
  about: [
    "I'm Kenzo, a CS student at the University of Florida pursuing a career as a Software Engineer. I develop full-stack and mobile apps, and I love making software that helps people. Off the clock I'm on the volleyball court, in the water surfing, on a board, or back home cooking, gaming, and playing guitar.",
    "I ship under tight deadlines and learn by doing. This year I cut cost and latency out of media pipelines at Vobile, co-founded and deployed BeachLens to 5,000+ users, and led the team at SASE to successfully ship our semester project. I'm usually the one who volunteers and is always down to try something new.",
  ],
  now: [
    "SWE Intern at Vobile, optimizing media pipelines for studios like Netflix and Disney.",
    "CTO at BeachLens, a real-time beach data app with 5,000+ users.",
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
