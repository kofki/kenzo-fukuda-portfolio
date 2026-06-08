const BASE = 620;
const SILHOUETTE = "color-mix(in oklab, var(--dive-mid) 52%, var(--deep-bottom))";
const BEACON = "color-mix(in oklab, var(--dive-glow) 70%, white)";

interface Building {
  x: number;
  w: number;
  top: number;
  dome?: boolean;
  spire?: boolean;
}

// A taller, denser skyline of towers, domes, and slender spires.
const BUILDINGS: Building[] = [
  { x: 20, w: 110, top: 360, dome: true },
  { x: 122, w: 70, top: 300 },
  { x: 178, w: 38, top: 196, spire: true },
  { x: 236, w: 122, top: 330, dome: true },
  { x: 352, w: 64, top: 424 },
  { x: 430, w: 152, top: 280, dome: true },
  { x: 560, w: 34, top: 150, spire: true },
  { x: 620, w: 98, top: 380 },
  { x: 722, w: 132, top: 300, dome: true },
  { x: 842, w: 60, top: 430 },
  { x: 906, w: 38, top: 178, spire: true },
  { x: 962, w: 172, top: 250, dome: true },
  { x: 1132, w: 80, top: 360 },
  { x: 1202, w: 42, top: 200, spire: true },
  { x: 1256, w: 122, top: 322, dome: true },
  { x: 1372, w: 70, top: 404 },
];

interface Win {
  x: number;
  y: number;
  beacon: boolean;
  delay: string;
}

// Deterministic window grid per building (no randomness, so SSR matches).
const WINDOWS: Win[] = [];
BUILDINGS.forEach((b, bi) => {
  if (b.spire) return;
  const cols = b.w >= 140 ? 3 : b.w >= 80 ? 2 : 1;
  const rows = Math.max(1, Math.min(3, Math.floor((BASE - b.top - 40) / 70)));
  const gapX = b.w / (cols + 1);
  for (let c = 1; c <= cols; c++) {
    for (let r = 0; r < rows; r++) {
      WINDOWS.push({
        x: b.x + gapX * c - 4,
        y: b.top + 30 + r * 62,
        beacon: (bi + c + r) % 7 === 0,
        delay: `${((bi + r + c) % 5) * 0.5}s`,
      });
    }
  }
});

// Beacon lights crowning the spires.
const BEACONS = BUILDINGS.filter((b) => b.spire).map((b) => ({
  cx: b.x + b.w / 2,
  cy: b.top,
}));

function Windows({ blur }: { blur?: boolean }) {
  return (
    <g
      fill={blur ? "var(--dive-glow)" : undefined}
      style={blur ? { filter: "blur(6px)", opacity: 0.7 } : undefined}
    >
      {WINDOWS.map((win) => {
        const w = win.beacon ? 11 : 8;
        const h = win.beacon ? 14 : 11;
        return (
          <rect
            key={`${win.x}-${win.y}`}
            className="animate-glow"
            x={win.x}
            y={win.y}
            width={blur ? w + 4 : w}
            height={blur ? h + 4 : h}
            rx={2}
            fill={blur ? undefined : win.beacon ? BEACON : "var(--dive-glow)"}
            style={{ animationDelay: win.delay }}
          />
        );
      })}
    </g>
  );
}

/** The glowing sunken reef city at the deepest point of the dive. */
export function ReefCity() {
  const fade = "linear-gradient(180deg, transparent 0, black 24%)";

  return (
    <div
      className="absolute inset-x-0 bottom-0 h-[82vh]"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <svg
        viewBox={`0 0 1440 ${BASE}`}
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-full w-full"
      >
        <g fill={SILHOUETTE}>
          {BUILDINGS.map((b) => (
            <g key={b.x}>
              <rect x={b.x} y={b.top} width={b.w} height={BASE - b.top} rx={6} />
              {b.dome ? (
                <ellipse cx={b.x + b.w / 2} cy={b.top} rx={b.w / 2} ry={46} />
              ) : null}
              {b.spire ? (
                <path
                  d={`M${b.x} ${b.top} L${b.x + b.w / 2} ${b.top - 54} L${b.x + b.w} ${b.top} Z`}
                />
              ) : null}
            </g>
          ))}
        </g>

        {/* Glow bloom underneath, then the crisp windows on top. */}
        <Windows blur />
        <Windows />

        {/* Spire beacons: a bright core inside a soft halo. */}
        {BEACONS.map((beacon) => (
          <g key={beacon.cx} className="animate-glow">
            <circle
              cx={beacon.cx}
              cy={beacon.cy - 54}
              r={16}
              fill="var(--dive-glow)"
              style={{ filter: "blur(7px)", opacity: 0.85 }}
            />
            <circle cx={beacon.cx} cy={beacon.cy - 54} r={4.5} fill={BEACON} />
          </g>
        ))}
      </svg>
    </div>
  );
}
