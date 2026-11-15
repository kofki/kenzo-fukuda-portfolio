import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compatibility; the CSS reveal is driven by scroll. */
  delay?: number;
}

/**
 * Content is always in the HTML at full opacity. The `.reveal` class adds a
 * short rise as the block scrolls into view, but only in browsers that support
 * scroll-driven animations and only when the visitor allows motion. The old
 * version rendered `opacity: 0` on the server, so every section stayed blank
 * until JavaScript loaded.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
