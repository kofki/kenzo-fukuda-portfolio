import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette hexes are inlined: ImageResponse resolves no CSS custom properties,
// so these must be kept in step with the light-theme tokens in globals.css.
const SAND = "#f5efe3";
const INK = "#0e2e2c";
const CORAL_INK = "#af3815";
const MUTED = "#5c6b66";
const SEA = "#2fb8c9";

/** Shared by app/opengraph-image.tsx and app/twitter-image.tsx. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: SAND,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Horizon band, echoing the dive gradient on the site itself */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 140,
            background: `linear-gradient(180deg, ${SEA}00, ${SEA}55)`,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: CORAL_INK,
              letterSpacing: 1,
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 118,
              fontWeight: 700,
              color: INK,
              letterSpacing: -3,
              marginTop: 12,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 27,
            color: MUTED,
            position: "relative",
          }}
        >
          {profile.now.map((line) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
