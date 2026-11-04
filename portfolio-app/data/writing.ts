import type { Post } from "@/types";

// Newest first by publishedAt; lib/writing.ts sorts anyway. Every post is
// published under the full name "Kenzo Fukuda" with the BeachLens byline, so
// each one is another page tying the name to the company and to UF.
//
// TO ADD A POST: append an object here. `slug` becomes /writing/<slug>, so keep
// it lowercase with hyphens, and never change it once the post is live.
//
// These three are first drafts written from the facts on the rest of the site.
// Read them through and make them sound like you before they go live.
export const posts: Post[] = [
  {
    slug: "how-i-became-cto-of-beachlens",
    title: "How I became Co-Founder and CTO of BeachLens as a UF sophomore",
    description:
      "The story of how Kenzo Fukuda, a computer science student at the University of Florida, co-founded BeachLens and grew it to 20,000+ users as CTO.",
    publishedAt: "2026-11-04",
    tags: ["BeachLens", "founder", "University of Florida", "startups"],
    sections: [
      {
        paragraphs: [
          "I'm Kenzo Fukuda, and in December 2025 I became the co-founder and CTO of BeachLens, a real-time beach conditions app. Less than a year later it is live on the App Store and Google Play with more than 20,000 users across Florida. This is how that happened while I was a sophomore studying computer science at the University of Florida.",
          "The problem was one every Floridian knows. Deciding whether a beach trip was worth it meant juggling NOAA tide tables, a weather app, a water-quality advisory site, and a guess about rip currents. The data existed. It was just scattered, formatted differently everywhere, and impossible to trust at a glance.",
        ],
      },
      {
        heading: "Saying yes before I was ready",
        paragraphs: [
          "When my co-founder pitched the idea, I had shipped class projects, a hackathon or two, and some internship code. I had never run production infrastructure that real people depended on. I said yes anyway, because the thing I am best at is learning fast under a deadline, and this was the biggest deadline I had ever been handed.",
          "My job as CTO was the data. BeachLens pulls from more than eleven feeds: weather, water temperature, wave height, wind, UV, tides, rip-current risk, red tide, water quality, beach-flag status, and more. None of them agree on units, timing, or reliability. I built a serverless ELT pipeline that ingests each feed, validates it, normalizes it, and keeps it fresh in real time, anchored by NOAA and environmental monitoring systems.",
        ],
      },
      {
        heading: "From a demo to 20,000 users",
        paragraphs: [
          "We built the app in React Native so one codebase could ship to iOS and Android at the same time. That decision let a tiny team cover both stores from day one. Growth came from being genuinely useful: people opened the app before a beach day, it told them the truth, and they told their friends.",
          "Along the way the team grew to eleven people, and I learned that the highest-leverage thing a CTO does at this stage is not writing code. It is writing clear tickets, running tight Agile sprints, and cutting features fast enough that the important ones ship. We pitched on stage at The Lab Miami and found support from Seaworthy Collective and NOAA, which told us the problem was real beyond our own beaches.",
        ],
      },
      {
        heading: "What I would tell another student founder",
        paragraphs: [
          "Build for trust first and features second. A beach app that is occasionally wrong about rip currents is worse than no app at all, so most of my engineering time went into validation and freshness, not screens.",
          "Doing this while taking a full course load at UF was hard, and I would do it again. If you are a student with a problem you understand better than the people currently solving it, that understanding is your unfair advantage. Use it.",
        ],
      },
    ],
  },
  {
    slug: "scaling-react-native-app-to-20000-users",
    title: "Scaling a React Native app to 20,000 users on a student budget",
    description:
      "How BeachLens CTO Kenzo Fukuda keeps 11+ live environmental data feeds agreeing with each other in real time using a serverless ELT pipeline, without a DevOps team.",
    publishedAt: "2026-11-04",
    tags: ["React Native", "serverless", "data pipelines", "BeachLens", "engineering"],
    sections: [
      {
        paragraphs: [
          "BeachLens serves real-time beach conditions to more than 20,000 people, and the engineering team is a group of University of Florida students with no budget for a DevOps hire. As CTO, my job was to make that work. This post is about the architecture decisions that let a small team keep a data-heavy mobile app fast, cheap, and correct.",
        ],
      },
      {
        heading: "The problem is freshness, not modeling",
        paragraphs: [
          "I expected the hard part of BeachLens to be the logic that turns raw readings into a recommendation. It was not. The hard part was that we ingest more than eleven heterogeneous feeds, from NOAA tides and buoys to water-quality advisories and beach-flag status, and every one of them has its own schema, cadence, and failure mode.",
          "Unifying messy real-world data turned out to be mostly a validation and freshness problem. A feed that silently stops updating is more dangerous than one that errors loudly, because the app keeps showing yesterday's rip-current risk as if it were current. So every record carries a timestamp, every feed has a freshness budget, and anything past its budget is flagged or dropped rather than displayed.",
        ],
      },
      {
        heading: "Why serverless ELT",
        paragraphs: [
          "We run an ELT pipeline on serverless functions: extract each feed on its own schedule, load the raw payload as-is, then transform and validate into a normalized shape the app reads. Keeping raw and normalized data separate means a bad transform never destroys source data, and we can replay history when a feed changes format, which happens more than you would think.",
          "Serverless was a budget decision that became an architecture decision. We pay per invocation, which for scheduled ingestion is close to nothing, and nobody on the team has to babysit servers between classes. Latency stayed low because the app never waits on an upstream API; it reads our already-normalized data.",
        ],
      },
      {
        heading: "React Native from day one",
        paragraphs: [
          "One TypeScript codebase for iOS and Android meant every feature shipped to both stores at once, and it meant our frontend and backend shared types. When a feed's shape changed, the compiler told us where the app would break before a user did.",
          "The trade-off is that the app has to be disciplined about what it fetches. We cache aggressively, fetch the normalized conditions for a beach in a single request, and treat the network as unreliable, because on a Florida beach it usually is.",
        ],
      },
      {
        heading: "What I would keep and what I would change",
        paragraphs: [
          "I would keep the raw-then-normalized split, the freshness budgets, and serverless ingestion. Together they let eleven students run a production data product without an on-call rotation.",
          "I would invest earlier in observability. The first time a feed went stale we found out from a user, not a dashboard. Shipping to thousands of real users taught me to design for trust first and features second, and trust starts with knowing when you are wrong before they do.",
        ],
      },
    ],
  },
  {
    slug: "what-winning-swamphacks-xi-taught-me",
    title: "What winning SwampHacks XI taught me about shipping",
    description:
      "Kenzo Fukuda on leading the four-person team behind CaseForward AI to first place out of 100+ projects at SwampHacks XI, the University of Florida's hackathon.",
    publishedAt: "2026-11-04",
    tags: ["SwampHacks", "hackathons", "multi-agent AI", "University of Florida", "leadership"],
    sections: [
      {
        paragraphs: [
          "In January 2026 my team won first place out of more than 100 projects at SwampHacks XI, the University of Florida's hackathon, with CaseForward AI: a multi-agent legal platform that reads raw case documents and turns them into structured analysis. I led a four-person team for 36 hours. These are the lessons I kept.",
        ],
      },
      {
        heading: "Scope is the whole game",
        paragraphs: [
          "Every hackathon team starts with a vision that would take a month. The winning teams are the ones that find the two-day version of it by hour three. We cut features relentlessly: no user accounts, no billing, no mobile. Just document intake, agent analysis, and a dashboard that made the result obvious.",
          "Leading four people in thirty-six hours is mostly about cutting the right features fast, and then protecting the ones that are left from scope creep at 3 a.m. when everyone has a new idea.",
        ],
      },
      {
        heading: "Small specialized agents beat one giant prompt",
        paragraphs: [
          "We were curious whether a team of small, specialized agents could outperform a single mega prompt. It could. I built a serverless orchestrator where Gemini agents with distinct jobs, an orchestrator, an evidence analyzer, and a settlement valuator, delegate reasoning and action tasks to each other through MCP, with Cloudflare R2 handling document storage.",
          "Splitting reasoning from action through MCP gave us a clean contract between the two, which made debugging sane. When the output was wrong, we could tell which agent was wrong. In our demo set it cut manual processing by around 80 percent.",
        ],
      },
      {
        heading: "The demo is the product",
        paragraphs: [
          "Our multi-agent pipeline finally behaved ten minutes before judging. Winning a hackathon is half scope discipline and half a demo that tells a story, and we spent the last two hours on the story: a real-looking police report in, a structured case overview out, with the agents' collaboration visible in a debriefing room view.",
          "Judges do not read code. They watch a screen for three minutes and decide whether they believe you. Build the thing that makes them believe you.",
        ],
      },
      {
        heading: "Why it mattered beyond the trophy",
        paragraphs: [
          "The habits from that weekend, ruthless scope, clear ownership, and a demo-first mindset, are the same ones I use as CTO of BeachLens, where the deadlines are real and the users are counting on us. A hackathon is just a compressed version of shipping. Winning one taught me that I could do it under pressure, and that was worth more than the prize.",
        ],
      },
    ],
  },
];
