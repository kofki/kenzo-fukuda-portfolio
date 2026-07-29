import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "beachlens",
    id: "beachlens",
    title: "BeachLens",
    tagline: "Real-time beach conditions you can actually trust.",
    description:
      "An iOS and Android app that unifies 11+ environmental feeds into one honest read on the water. Live on the App Store and Google Play with 20,000+ users.",
    role: "Co-Founder & CTO",
    timeline: "Dec 2025 to present",
    domains: ["Mobile", "Fullstack", "Backend"],
    // Kept in step with the BeachLens entry in data/experience.ts.
    tech: ["React Native", "iOS", "Android", "TypeScript"],
    imageUrl: "/beachlens/team.jpg",
    imageAlt:
      "Kenzo and his co-founder presenting BeachLens on stage at The Lab Miami.",
    logo: "/beachlens_logo.png",
    links: {
      live: "https://beachlens.net/",
      appStore: "https://apps.apple.com/us/app/beachlens/id6759271980",
      googlePlay:
        "https://play.google.com/store/apps/details?id=com.beachlens.mobile",
    },
    backedBy: [
      {
        name: "Seaworthy Collective",
        logo: "/seaworthy_logo.png",
        url: "https://www.seaworthycollective.com/",
      },
      {
        name: "NOAA",
        logo: "/noaa_logo.png",
        url: "https://www.noaa.gov/",
      },
    ],
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
      "As co-founder and CTO, I built the serverless ELT pipeline that ingests and validates 11+ heterogeneous feeds, anchored by NOAA and environmental monitoring systems, and keeps them fresh in real time, plus a recommendation layer that turns real usage into safety insight. It is live on the App Store and Google Play with 20,000+ users across Florida, and I lead an 11-person team shipping it in Agile sprints.",
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
  {
    slug: "ai-advisor",
    id: "ai-advisor",
    title: "AI Advisor",
    tagline:
      "Turn your transcript into a clear, personalized path through every semester.",
    description:
      "A web app that reads a student's transcript and turns it into personalized semester plans: degree progress, course suggestions, and a balanced workload. Built with the UF SASE Web Development Team.",
    role: "Frontend Lead",
    timeline: "2025 to 2026",
    featured: true,
    domains: ["Frontend", "Fullstack", "Backend"],
    tech: [
      "React",
      "React Router",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Python",
      "Go",
      "PostgreSQL",
    ],
    imageUrl: "/ai-advisor/landing.jpg",
    imageAlt: "The AI Advisor landing page: create your dream schedule.",
    links: {
      live: "https://ai-advisor-psi.vercel.app/",
      repo: "https://github.com/UF-SASE-Web-Team/AI-Advisor",
    },
    year: 2026,
    gallery: [
      {
        url: "/ai-advisor/landing.jpg",
        alt: "The AI Advisor landing page: create your dream schedule.",
        caption:
          "Create your dream schedule: AI-assisted course planning, made by UF SASE.",
      },
      {
        url: "/ai-advisor/planner.png",
        alt: "AI Advisor's semester plan selection view: a degree audit, an AI advisor chat, and a weekly schedule grid.",
        caption:
          "The semester planner: degree audit, AI advisor chat, and a weekly schedule side by side.",
      },
      {
        url: "/ai-advisor/team.jpg",
        alt: "The UF SASE Web Development Team that built AI Advisor.",
        caption: "Built with the UF SASE Web Development Team.",
      },
    ],
    about: [
      "AI Advisor helps students plan their future semesters by turning a transcript into a clear, personalized path to graduation. Upload your transcript, ask questions, and get recommendations: it shows your degree progress, suggests courses for upcoming semesters, and helps you balance a workload by mixing challenging classes with manageable ones, with insight into each course's difficulty and time commitment.",
      "I was the frontend lead on the UF SASE Web Development Team, owning the React and React Router interface (TypeScript, Tailwind, Supabase auth) the whole experience runs on, from the landing page to transcript upload and the recommendation views. The product is deliberately advisory: it is built to guide a student's decisions, not overrule degree requirements or the academic advisors who know them best.",
    ],
    inspiration: [
      "Picking next semester's classes usually means juggling a degree audit, a course catalog, and word of mouth about which professors and workloads are brutal. The information exists, it is just scattered and hard to weigh against your own goals.",
      "We wanted to give students one place to see where they stand and what to take next, clear enough to act on, but honest about staying a guide rather than a replacement for a real advisor.",
    ],
    takeaways: [
      'Leading the frontend meant turning a fuzzy "plan my semesters" idea into concrete screens and flows the rest of the team could build against.',
      "A transcript-to-recommendations product lives or dies on trust, so the UI had to make the reasoning legible, not just hand back a schedule.",
      "Coordinating a large SASE team taught me a shared component vocabulary and clear interfaces matter more than any single feature.",
      "Designing AI as an advisor, not an authority, kept the scope honest and the recommendations something students could actually rely on.",
    ],
  },
  // PLACEHOLDER — copy still to be written. `about`, `inspiration`, `takeaways`
  // and `gallery` are intentionally empty; the detail page skips empty sections,
  // so /projects/ufsase renders the hero alone rather than empty headings.
  // Swap imageUrl for a real screenshot when there is one.
  {
    slug: "ufsase",
    id: "ufsase",
    title: "ufsase.com",
    tagline: "The chapter site for UF SASE.",
    description: "The UF SASE chapter website, which I maintain as webmaster.",
    role: "Webmaster",
    timeline: "2026 to present",
    domains: ["Frontend", "Fullstack"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/sase_logo.png",
    imageAlt: "The SASE logo",
    logo: "/sase_logo.png",
    links: { live: "https://ufsase.com" },
    year: 2026,
    gallery: [],
    about: [],
    inspiration: [],
    takeaways: [],
  },
];
