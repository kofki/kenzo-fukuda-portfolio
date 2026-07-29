// Vinyl sticker fills. Verified 10.4-12.2:1 against the sticker ink.
const FILLS = ["#f6c3ae", "#a9d9d5", "#f5dca2", "#b3ddc3", "#b8ddf0"];
const TILTS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg"];

/**
 * Deterministic, so a given tech always gets the same colour and tilt everywhere
 * on the site — and so nothing shifts between the server and client render.
 */
function hash(label: string): number {
  let total = 0;
  for (let i = 0; i < label.length; i += 1) total += label.charCodeAt(i);
  return total;
}

interface TechBadgeProps {
  label: string;
  /**
   * "sticker" is the post-it on a Polaroid card. "plain" is a quiet outline tag
   * for prose contexts like the experience timeline, where a wall of tilted
   * stickers would fight the text.
   */
  variant?: "sticker" | "plain";
}

export function TechBadge({ label, variant = "sticker" }: TechBadgeProps) {
  if (variant === "plain") {
    return (
      <span className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
        {label}
      </span>
    );
  }

  const h = hash(label);

  return (
    <span
      className="sticker inline-block px-2 py-0.5 text-sm font-semibold leading-tight"
      style={{
        backgroundColor: FILLS[h % FILLS.length],
        transform: `rotate(${TILTS[h % TILTS.length]})`,
      }}
    >
      {label}
    </span>
  );
}
