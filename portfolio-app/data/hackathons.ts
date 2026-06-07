import type { HackathonProject } from "@/types";
import { unsplash } from "@/lib/unsplash";

// Placeholder hackathon builds — weekend sprints, replace with real entries.
export const hackathons: HackathonProject[] = [
  {
    id: "wavelength",
    title: "WaveLength",
    event: "HackSoCal 2025",
    award: "Best Use of AI",
    teammates: 3,
    description:
      "A live captioning + translation layer for in-person events, built in 36 hours. Speech to text to subtitles, on-device.",
    tech: ["Next.js", "WebRTC", "Whisper", "Python"],
    imageUrl: unsplash("1498050108023-c5249f4df085"),
    imageAlt: "Placeholder — swap for the WaveLength demo screen.",
    links: { repo: "https://github.com/kenzofukuda/wavelength" },
    devpostUrl: "https://devpost.com/software/wavelength",
    year: 2025,
  },
  {
    id: "shoreline",
    title: "Shoreline",
    event: "TreeHacks 2024",
    award: "Top 10 Finalist",
    teammates: 4,
    description:
      "A coastal-erosion visualizer that overlays public satellite data on an interactive map for city planners.",
    tech: ["React", "Mapbox", "FastAPI", "GDAL"],
    imageUrl: unsplash("1531297484001-80022131f5a1"),
    imageAlt: "Placeholder — swap for the Shoreline map view.",
    links: { repo: "https://github.com/kenzofukuda/shoreline" },
    devpostUrl: "https://devpost.com/software/shoreline",
    year: 2024,
  },
  {
    id: "riptide",
    title: "Riptide",
    event: "HackTheBeach 2024",
    teammates: 2,
    description:
      "A pomodoro app disguised as a tide chart — your focus sessions rise and fall with a living shoreline.",
    tech: ["Svelte", "Canvas", "IndexedDB"],
    imageUrl: unsplash("1547658719-da2b51169166"),
    imageAlt: "Placeholder — swap for the Riptide app UI.",
    links: { repo: "https://github.com/kenzofukuda/riptide", live: "#" },
    year: 2024,
  },
  {
    id: "tidepool",
    title: "Tidepool",
    event: "CalHacks 2023",
    teammates: 4,
    description:
      "A collaborative whiteboard for study groups with real-time cursors and a tiny CRDT under the hood.",
    tech: ["TypeScript", "Yjs", "Node", "Redis"],
    imageUrl: unsplash("1531403009284-440f080d1e12"),
    imageAlt: "Placeholder — swap for the Tidepool collaboration view.",
    links: { repo: "https://github.com/kenzofukuda/tidepool" },
    devpostUrl: "https://devpost.com/software/tidepool",
    year: 2023,
  },
];
