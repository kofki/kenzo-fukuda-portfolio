import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Kenzo Fukuda",
  role: "Software Engineer",
  tagline:
    "I'm a full-stack engineer who likes owning a problem end to end, learning fast, and shipping things people actually use.",
  location: "Gainesville, Florida",
  email: "kenzof28@gmail.com",
  resumeUrl: "/Kenzo_Resume.pdf",
  // TODO(kenzo): a line about where you grew up or how you first got into code
  // would make this section even more yours. Drop it into about[] below.
  about: [
    "I'm Kenzo, a CS student at the University of Florida and a software engineer who genuinely likes the whole arc of a problem, from the first messy sketch to the last rough edge before it ships. I live mostly on the full stack: typed backends, data pipelines that have to stay honest, and interfaces that feel good in the hand.",
    "I move fast and I learn out loud. This year that has looked like cutting cost and latency out of media pipelines at Vobile, co-founding BeachLens and shipping it to a few thousand people, and leading a 30 person web team at SASE. I'm usually the one who volunteers for the unfamiliar tool so nobody else has to wait on it.",
    "Off the keyboard I'm in the water, on a board, or with my SASE friends (yes, that is me in the lei). Surfing taught me most of what I know about shipping: read the set, commit to the line, and stay calm when it changes on you.",
  ],
  now: [
    "Interning at Vobile, optimizing media pipelines for studios like Netflix and Disney.",
    "Co-founding BeachLens, a real-time beach data app with 4,000+ users.",
    "Leading the web development team at UF's chapter of SASE.",
    "Picking up Rust on weekends and chasing clean morning surf.",
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
