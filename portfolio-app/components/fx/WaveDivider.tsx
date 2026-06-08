import { cn } from "@/lib/cn";

interface WaveDividerProps {
  /** Color via a `text-*` utility; the wave fills with currentColor. */
  className?: string;
  flip?: boolean;
  height?: number;
}

// Two identical wave periods at 200% width; the -50% drift loops seamlessly.
const WAVE_PATH =
  "M0,40 C240,8 480,72 720,40 C960,8 1200,72 1440,40 C1680,8 1920,72 2160,40 C2400,8 2640,72 2880,40 L2880,80 L0,80 Z";

/** Decorative animated wave band placed between sections. */
export function WaveDivider({
  className,
  flip = false,
  height = 70,
}: WaveDividerProps) {
  return (  
    <div
      aria-hidden
      className={cn(
        "pointer-events-none w-full overflow-hidden leading-[0]",
        flip && "rotate-180",
        className,
      )}
      style={{ height }}
    >
      <svg
        className="h-full w-[200%] animate-wave"
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d={WAVE_PATH} />
      </svg>
    </div>
  );
}
