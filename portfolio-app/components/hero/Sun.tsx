import type { CSSProperties } from "react";

interface SunProps {
  className?: string;
  style?: CSSProperties;
}

/** A minimal sun: a flat solid disc with a soft glow halo behind it. */
export function Sun({ className, style }: SunProps) {
  return (
    <div className={className} style={style}>
      <span
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: "color-mix(in oklab, var(--sun) 60%, transparent)" }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: "var(--sun)" }}
      />
    </div>
  );
}
