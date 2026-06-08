import type { Project } from "@/types";
import { unsplash } from "@/lib/unsplash";

// Real projects. Gallery images are themed Unsplash placeholders until real
// screenshots are dropped in (swap the `url` and `alt`).
export const projects: Project[] = [
  {
    slug: "beachlens",
    id: "beachlens",
    title: "BeachLens",
    tagline: "Real-time beach conditions you can actually trust.",
    description:
      "An iOS app that unifies 11+ environmental feeds into one honest read on the water. Live on the App Store with 4,000+ users.",
    role: "Co-Founder & CTO",
    timeline: "Dec 2025 to present",
    tech: ["React Native", "Swift", "Serverless ELT", "NOAA", "TypeScript"],
    imageUrl: unsplash("1507525428034-b723cf961d3e"),
    imageAlt:
      "Placeholder. Swap for a BeachLens app screenshot over a shoreline.",
    links: { appStore: "#", live: "#" },
    featured: true,
    year: 2026,
    gallery: [
      {
        url: unsplash("1505228395891-9a51e7e86bf6", 1400),
        alt: "Placeholder. A Florida shoreline at golden hour.",
        caption: "The conditions BeachLens reads, in one place.",
      },
      {
        url: unsplash("1547658719-da2b51169166", 1000),
        alt: "Placeholder. The BeachLens app on a phone.",
        caption: "A single go or no-go call, not five open tabs.",
      },
      {
        url: unsplash("1488590528505-98d2b5aba04b", 1000),
        alt: "Placeholder. The data pipeline dashboard.",
        caption: "Eleven feeds, validated and kept fresh in real time.",
      },
    ],
    about: [
      "BeachLens answers one question well: is it a good time to go? It pulls together more than eleven environmental feeds, including NOAA tides, weather, wind, swell, and water quality, and turns them into a single readable read on conditions. It is live on the Apple App Store with over 4,000 users.",
      "Under the hood, a serverless ELT pipeline ingests and validates those heterogeneous streams in real time, and a recommendation engine layers predictive modeling on top to surface safety insights from how people actually use the app. I lead an eleven person team building it through Agile sprints.",
    ],
    // TODO(kenzo): a true, specific origin moment here (the exact day/trip that
    // made you build BeachLens) would make this land even harder.
    inspiration: [
      "I grew up around the water, and checking conditions used to mean juggling five tabs and still guessing. The data existed, it was just scattered and unfriendly.",
      "BeachLens started as a question: what if the ocean had a clean, trustworthy dashboard? The hard part was never any single feed, it was making eleven of them agree and stay fresh.",
    ],
    takeaways: [
      "Unifying messy real-world data is mostly a validation and freshness problem, not a modeling one.",
      "A serverless ELT pipeline let a small team keep latency low without babysitting servers.",
      "Shipping to thousands of real users taught me to design for trust first and features second.",
      "Leading eleven people meant my biggest leverage was clear tickets and tight feedback loops.",
    ],
  },
  {
    slug: "subscriptos",
    id: "subscriptos",
    title: "Subscriptos",
    tagline: "Spend online without handing over your real card or your rights.",
    description:
      "A virtual burner card manager plus a Chrome extension that uses Gemini to flag predatory terms of service with a plain safety score.",
    role: "Creator",
    timeline: "Mar 2026",
    tech: [
      "Python",
      "TypeScript",
      "React",
      "FastAPI",
      "Supabase",
      "Stripe",
      "Gemini",
    ],
    imageUrl: unsplash("1517245386807-bb43f82c33c4"),
    imageAlt: "Placeholder. Swap for the Subscriptos dashboard.",
    links: { live: "#", repo: "#" },
    year: 2026,
    gallery: [
      {
        url: unsplash("1461749280684-dccba630e2f6", 1400),
        alt: "Placeholder. The Subscriptos card manager.",
        caption: "Spin up a disposable card per merchant.",
      },
      {
        url: unsplash("1517180102446-f3ece451e9d8", 1000),
        alt: "Placeholder. The Chrome extension flagging risky terms.",
        caption: "The extension reads the fine print so you do not have to.",
      },
    ],
    about: [
      "Subscriptos is two tools in one. First, a virtual burner card manager that lets you spin up disposable cards per merchant, so a free trial can never quietly become a charge. Second, a Chrome extension that reads the terms of service you are about to accept and uses Gemini to flag predatory traps with a plain English safety score.",
      "Together they cut predatory billing risk to zero on the cards you route through it, and they reduced the time it takes to vet a terms of service by about 95 percent.",
    ],
    inspiration: [
      "Everyone has a story about a subscription that would not die, or a forty page agreement nobody reads. I wanted to put the asymmetry back in the user's favor.",
      "Make canceling structurally impossible to forget, and make the fine print legible in seconds.",
    ],
    takeaways: [
      "LLMs are great at turning dense legal text into a quick, honest signal, as long as you constrain the output.",
      "A single safety score is more useful than a wall of warnings.",
      "Scoping tightly, cards plus terms of service and nothing else, is why it actually shipped.",
      "Stripe and Supabase handled the boring parts well so I could focus on the experience.",
    ],
  },
];
