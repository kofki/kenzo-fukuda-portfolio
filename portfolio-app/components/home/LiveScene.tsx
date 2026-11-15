"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Wraps a piece of scenery and pauses its CSS loops while it is off screen,
 * so the waves, kelp and jellyfish only cost frames when you can see them.
 */
export function LiveScene({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.removeAttribute("data-offscreen");
        else el.setAttribute("data-offscreen", "");
      },
      { rootMargin: "150px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
