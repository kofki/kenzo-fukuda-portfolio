import type { Profile } from "@/types";

// Placeholder copy — replace with real content. Reads as an example of tone.
export const profile: Profile = {
  name: "Kenzo Fukuda",
  role: "Software Engineer",
  tagline:
    "I build dependable, delightful products end to end — and I learn whatever the wave in front of me demands.",
  location: "Los Angeles, California",
  email: "hello@kenzofukuda.dev",
  resumeUrl: "/resume.pdf",
  about: [
    "I'm a software engineer who likes the whole arc of a problem — sketching the idea, shaping the system, and sanding down the last rough edge before it ships. Most of my work lives across the stack, from typed APIs to interfaces that feel good to touch.",
    "What I care about most is momentum: shipping something real, watching how people actually use it, and iterating with intent. I read the docs, I write the tests, and I'm comfortable being the person who learns the unfamiliar thing so the team doesn't have to wait.",
    "Off the clock you'll usually find me near the water. The same instincts carry over — read the conditions, commit to the line, and stay loose enough to adjust mid-ride.",
  ],
  now: [
    "Building developer-facing tooling at a content-tech company.",
    "Learning Rust on weekends, one small CLI at a time.",
    "Chasing clean morning surf before standup.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/kenzofukuda", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kenzofukuda",
      icon: "linkedin",
    },
    { label: "X", href: "https://x.com/kenzofukuda", icon: "twitter" },
    { label: "Email", href: "mailto:hello@kenzofukuda.dev", icon: "email" },
  ],
};
