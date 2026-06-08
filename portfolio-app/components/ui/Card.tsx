import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Base surface shell reused by project and hackathon cards. */
export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group glass relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
