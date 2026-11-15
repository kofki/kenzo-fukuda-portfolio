"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

/**
 * One centred capsule holding everything: avatar, section links, résumé and
 * the theme toggle. The old nav pinned Résumé and LinkedIn absolutely to the
 * right, which covered the toggle at around 1024px wide.
 */
export function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // The hero is observed too, so scrolling back to the top clears the pill.
    const sections = ["top", ...navItems.map((item) => item.sectionId)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const Menu = icons.menu;
  const Close = icons.close;
  const Resume = icons.resume;

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      <div className="relative flex items-center gap-1 rounded-full border border-ink/20 bg-sand/90 py-1.5 pl-1.5 pr-1.5 shadow-[0_8px_24px_-12px_rgba(5,12,28,0.45)] backdrop-blur-sm sm:gap-2 sm:pr-2">
        <a href="#top" aria-label="Back to the top" className="shrink-0 rounded-full">
          <Image
            src={profile.headshot}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
        </a>

        <nav aria-label="Sections" className="hidden items-center md:flex">
          {navItems.map((item) => {
            const isActive = item.sectionId === active;
            return (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-coral-ink" : "text-ink/75 hover:text-ink",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-swell"
                    className="absolute inset-0 -z-10 rounded-full bg-coral-ink/12"
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.label}
              </a>
            );
          })}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink"
          >
            <Resume size={15} weight="bold" />
            Résumé
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="inline-flex size-10 items-center justify-center rounded-full text-ink md:hidden"
        >
          {menuOpen ? <Close size={20} weight="bold" /> : <Menu size={20} weight="bold" />}
        </button>

        <ThemeToggle />

        {menuOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Sections"
            className="absolute left-1/2 top-full mt-2 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 animate-rise rounded-2xl border border-ink/20 bg-sand p-2 shadow-lg md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex min-h-11 items-center rounded-xl px-3 text-sm",
                  active === item.sectionId ? "bg-coral-ink/10 text-coral-ink" : "text-ink/80",
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex min-h-11 items-center gap-2 border-t border-ink/15 px-3 text-sm text-ink/80"
            >
              <Resume size={15} weight="bold" />
              Résumé
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
