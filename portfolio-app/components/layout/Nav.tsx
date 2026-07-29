"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

export function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
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

  // Escape closes the sheet; without it the only way out is the toggle itself.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Read from profile.socials so the URL lives in one place.
  const linkedin = profile.socials.find((s) => s.label === "LinkedIn");

  const LinkedIn = icons.linkedin;
  const Resume = icons.resume;
  const ArrowUpRight = icons.arrowUpRight;
  const Menu = icons.menu;
  const Close = icons.close;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4">
      {/* The capsule and toggle stay optically centred; LinkedIn is pinned to the
          far right so it can't shift the centre as its label width changes. */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-3">
      {/* A compact capsule rather than a full-width bar — it sits over the sky
          instead of cutting a band across it. */}
      <div className="panel flex max-w-full items-center gap-1 rounded-full px-2 py-1.5 sm:gap-2 sm:px-3">
        <nav aria-label="Sections" className="hidden items-center md:flex">
          {navItems.map((item) => {
            const isActive = item.sectionId === active;
            return (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive ? "text-coral-ink" : "text-ink/65 hover:text-ink",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-swell"
                    className="absolute inset-0 -z-10 rounded-full bg-coral-ink/10"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                ) : null}
                {item.label}
              </a>
            );
          })}
        </nav>
        <a
          href="/logbook"
          className="hidden shrink-0 rounded-full px-3 py-1.5 text-sm text-ink/65 transition-colors hover:text-ink md:inline"
        >
          Logbook
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink md:hidden"
        >
          {menuOpen ? (
            <Close size={20} weight="bold" />
          ) : (
            <Menu size={20} weight="bold" />
          )}
        </button>
      </div>

      <ThemeToggle />

      {/* Pinned right. Both are filled rather than plain text so they read over a
          moving sky; the arrows mark them as leaving the page. */}
      <div className="absolute right-0 hidden items-center gap-2 sm:flex">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="panel inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Resume size={16} weight="bold" />
          Résumé
        </a>

        {linkedin ? (
          <a
            href={linkedin.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral-ink px-3.5 py-2 text-sm font-medium text-sand shadow-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            <LinkedIn size={16} weight="fill" />
            LinkedIn
            <ArrowUpRight size={13} weight="bold" aria-hidden />
          </a>
        ) : null}
      </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="panel absolute inset-x-4 top-full mt-2 animate-rise rounded-2xl p-2 md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.sectionId}
              href={`#${item.sectionId}`}
              onClick={() => setMenuOpen(false)}
              aria-current={item.sectionId === active ? "true" : undefined}
              className={cn(
                "flex items-baseline justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                active === item.sectionId
                  ? "bg-coral-ink/10 text-coral-ink"
                  : "text-ink/70 hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/logbook"
            onClick={() => setMenuOpen(false)}
            className="mt-1 flex border-t border-border px-3 pb-1 pt-3 text-sm text-ink/70"
          >
            Logbook
          </a>
          {/* The right-hand pills are hidden below `sm`, so the sheet carries them. */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-ink/70"
          >
            <Resume size={15} weight="bold" />
            Résumé
          </a>
          {linkedin ? (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-ink/70"
            >
              <LinkedIn size={15} weight="fill" />
              LinkedIn
            </a>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
