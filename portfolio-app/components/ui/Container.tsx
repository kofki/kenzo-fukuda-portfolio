import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)} style={style}>
      {children}
    </div>
  );
}
