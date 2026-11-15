/**
 * Hand-drawn marker notes. Each has one job: the underline marks the name as
 * the thing to read first, the arrow points "that's me" at the photo. Both
 * draw themselves in once on load (see .doodle-draw in globals.css).
 */

export function NameUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 340 16"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <path
        className="doodle-draw"
        style={{ "--len": 360, "--delay": "0.5s" } as React.CSSProperties}
        d="M3 9 C 40 4, 70 12, 110 8 S 180 4, 220 9 S 290 13, 337 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PointerArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      className={className}
      fill="none"
    >
      <path
        className="doodle-draw"
        style={{ "--len": 170, "--delay": "1.1s" } as React.CSSProperties}
        d="M4 70 C 40 72, 74 58, 108 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        className="doodle-draw"
        style={{ "--len": 40, "--delay": "1.85s" } as React.CSSProperties}
        d="M94 14 L109 10 L110 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
