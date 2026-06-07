// Two-period wave paths (width 2880) so a -50% drift loops seamlessly.
const FOAM_PATH =
  "M0,36 C240,4 480,68 720,36 C960,4 1200,68 1440,36 C1680,4 1920,68 2160,36 C2400,4 2640,68 2880,36 L2880,100 L0,100 Z";
const SHORE_PATH =
  "M0,52 C240,24 480,80 720,52 C960,24 1200,80 1440,52 C1680,24 1920,80 2160,52 C2400,24 2640,80 2880,52 L2880,100 L0,100 Z";

/** The shoreline at the foot of the hero — foam crest over the page color. */
export function HorizonWave() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-24 leading-[0] sm:h-32"
    >
      <svg
        className="absolute bottom-0 left-0 h-full w-[200%] animate-wave text-foam [animation-duration:20s]"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d={FOAM_PATH} />
      </svg>
      <svg
        className="absolute bottom-0 left-0 h-full w-[200%] animate-wave text-sand"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d={SHORE_PATH} />
      </svg>
    </div>
  );
}
