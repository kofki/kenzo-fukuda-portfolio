"use client";

import { useEffect, useState } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import { navItems } from "@/data/nav";

export function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const Wave = icons.wave;
  const Menu = icons.menu;
  const Close = icons.close;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
        >
          <Wave size={20} weight="bold" className="text-coral" />
          Kenzo Fukuda
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.sectionId}
              label={item.label}
              href={`#${item.sectionId}`}
              active={active === item.sectionId}
            />
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink"
          >
            {menuOpen ? (
              <Close size={20} weight="bold" />
            ) : (
              <Menu size={20} weight="bold" />
            )}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <nav className="animate-rise border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
          <Container className="flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-3 font-mono text-sm transition-colors",
                  active === item.sectionId
                    ? "text-coral"
                    : "text-ink/70 hover:text-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
