import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

// Colors mirror the light-theme --sand token in app/globals.css.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · ${profile.role}`,
    short_name: profile.name,
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe3",
    theme_color: "#f5efe3",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
