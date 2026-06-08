/** The sand at the surface: layered dunes, fine grain, and raked ripples.
    The waterline itself is the Sea band rendered behind this. */
export function BeachScene() {
  const grainMask = "linear-gradient(180deg, transparent 0, black 30%)";
  const rakeMask = "linear-gradient(180deg, transparent, black)";

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-[24vh]">
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-full w-full"
      >
        <defs>
          <linearGradient id="sandMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sand-deep)" />
            <stop offset="100%" stopColor="var(--sand)" />
          </linearGradient>
          <linearGradient id="sandFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sand)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--sand) 68%, var(--surface))" />
          </linearGradient>
        </defs>
        <path
          d="M0 54 C360 34 620 80 900 58 C1130 40 1320 76 1440 60 L1440 300 L0 300 Z"
          fill="url(#sandMain)"
        />
        <path
          d="M0 150 C320 120 660 176 1000 146 C1210 128 1350 160 1440 150 L1440 300 L0 300 Z"
          fill="url(#sandFront)"
          opacity="0.92"
        />
      </svg>

      {/* Fine sand grain, only on the sand. */}
      <div
        className="bg-grain absolute inset-0 opacity-50 mix-blend-soft-light"
        style={{ maskImage: grainMask, WebkitMaskImage: grainMask }}
      />
      {/* Faint raked ripples in the foreground. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          backgroundImage:
            "repeating-linear-gradient(93deg, transparent 0 24px, color-mix(in oklab, var(--sand-deep) 45%, transparent) 25px 26px)",
          opacity: 0.22,
          maskImage: rakeMask,
          WebkitMaskImage: rakeMask,
        }}
      />
    </div>
  );
}
