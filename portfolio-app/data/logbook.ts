import type { LogbookEntry } from "@/types";

export const logbook = {
  eyebrow: "Off the clock",
  title: "Logbook",
  intro: [
    "Everything here is the part that does not fit on a resume. Most of what I know about shipping under pressure I learned somewhere on this page first — reading a set, eating it on a trick until it lands, calling a ball in the dark.",
    "Intentionally unfinished. I add to it when something is worth remembering.",
  ],
} as const;

// Reverse chronological — newest first. Entries flow in a masonry column, so
// portrait and landscape shots can sit next to each other without cropping.
//
// TO ADD SURF / SKATE SHOTS: drop the files in `public/logbook/` and add entries
// at the top of this array. Only `id`, `src`, `alt`, `title` and `date` are
// required; `description` and `tags` are optional.
export const logbookEntries: LogbookEntry[] = [
  {
    id: "sasehacks-2026",
    src: "/subscriptos/team.jpg",
    alt: "The Subscriptos team at SASEHacks 2026",
    title: "SASEHacks, take two",
    date: "Mar 2026",
    description:
      "Built a burner-card Chrome extension in a weekend with these four. Nobody slept much.",
    tags: ["hackathon", "team"],
  },
  {
    id: "swamphacks-xi",
    src: "/swamphacks_win.jpeg",
    alt: "Kenzo and his team holding the first place prize at SwampHacks XI",
    title: "First place, SwampHacks XI",
    date: "Jan 2026",
    description:
      "36 hours, 100+ projects, one very stubborn multi-agent demo that finally behaved ten minutes before judging.",
    tags: ["hackathon", "win"],
  },
  {
    id: "beachlens-crew",
    src: "/beachlens/team.jpg",
    alt: "The BeachLens team together at the beach",
    title: "The BeachLens crew",
    date: "Dec 2025",
    description:
      "Eleven people who agreed to build a beach app with me. Still the best decision I have made.",
    tags: ["beachlens", "team"],
  },
  {
    id: "sase-web-team",
    src: "/ai-advisor/team.jpg",
    alt: "The UF SASE web development team behind AI Advisor",
    title: "Thirty people deep",
    date: "Sep 2025",
    description:
      "Leading the SASE web team taught me that clear tickets beat clever code.",
    tags: ["sase", "team", "college"],
  },
  {
    id: "golden-hour",
    src: "/kenzo_sitting.jpeg",
    alt: "Kenzo by a window at golden hour",
    title: "Somewhere around hour 30",
    date: "idk",
    description: "Gainesville, golden hour, third coffee.",
    tags: ["college"],
  },
];
