import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "beachlens",
    id: "beachlens",
    title: "BeachLens",
    tagline: "Real-time beach conditions you can actually trust.",
    description:
      "An iOS and Android app that unifies 11+ environmental feeds into one honest read on the water. Live on the App Store and Google Play with 5,000+ users.",
    role: "Co-Founder & CTO",
    timeline: "Dec 2025 to present",
    tech: ["React Native", "Swift", "Serverless ELT", "NOAA", "TypeScript"],
    imageUrl: "/beachlens/poster.jpg",
    imageAlt:
      "The BeachLens brand illustration: a beachgoer walking the Florida shoreline.",
    links: {
      live: "https://beachlens.net/",
      appStore: "https://apps.apple.com/us/app/beachlens/id6759271980",
      googlePlay:
        "https://play.google.com/store/apps/details?id=com.beachlens.mobile",
    },
    featured: true,
    year: 2026,
    gallery: [
      {
        url: "/beachlens/team.jpg",
        alt: "Kenzo and his co-founder presenting BeachLens on stage at The Lab Miami.",
        caption: "Pitching BeachLens at The Lab Miami.",
      },
      {
        url: "/beachlens/map.jpg",
        alt: "BeachLens map of Florida beaches: know before you go.",
        aspect: "phone",
      },
      {
        url: "/beachlens/conditions.jpg",
        alt: "Real-time beach conditions: water temperature, water quality, tides, wind, and weather.",
        aspect: "phone",
      },
      {
        url: "/beachlens/rules.jpg",
        alt: "Beach rules and amenities: parking, restrooms, lifeguards, and access.",
        aspect: "phone",
      },
      {
        url: "/beachlens/reports.jpg",
        alt: "Waze-style real-time community reports from the shoreline.",
        aspect: "phone",
      },
      {
        url: "/beachlens/reviews.jpg",
        alt: "Beach reviews and discovery from other beachgoers.",
        aspect: "phone",
      },
    ],
    about: [
      "BeachLens answers one question well: is it actually a good time to go to the beach? It pulls real-time conditions, including weather, water temperature, wave height, wind, UV, tides, rip-current risk, red tide, water quality, and beach-flag status, into one honest read, then adds planning tools (beach maps, amenities, parking, lifeguards) and a Waze-style community feed where beachgoers report water clarity, crowds, marine life, hazards, and parking from the shoreline.",
      "As co-founder and CTO, I built the serverless ELT pipeline that ingests and validates 11+ heterogeneous feeds, anchored by NOAA and environmental monitoring systems, and keeps them fresh in real time, plus a recommendation layer that turns real usage into safety insight. It is live on the App Store and Google Play with 5,000+ users across Florida, and I lead an 11-person team shipping it in Agile sprints.",
    ],
    inspiration: [
      "Deciding whether a beach trip was worth it meant juggling NOAA tide tables, a weather app, and water-quality advisories. The data existed, it was just scattered and hard to trust.",
      "BeachLens started as a simple idea: give the coast one clean, trustworthy dashboard. The hard part was never any single feed, it was making a dozen of them agree and stay fresh.",
    ],
    takeaways: [
      "Unifying messy real-world data is mostly a validation and freshness problem, not a modeling one.",
      "A serverless ELT pipeline let a small team keep latency low without babysitting infrastructure.",
      "Shipping to thousands of real users taught me to design for trust first and features second.",
      "Leading 11 people meant my highest-leverage work was clear tickets and tight feedback loops.",
    ],
  },
];
