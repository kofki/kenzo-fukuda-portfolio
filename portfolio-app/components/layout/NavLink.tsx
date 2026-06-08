"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface NavLinkProps {
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}

export function NavLink({ label, href, active, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-1 py-1 font-mono text-sm transition-colors",
        active ? "text-coral" : "text-ink/70 hover:text-ink",
      )}
    >
      {label}
      {active ? (
        <motion.span
          layoutId="nav-tide"
          className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-coral"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : null}
    </a>
  );
}
