"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { icons } from "@/lib/icons";

/**
 * The scrolling track for the experience timeline, with prev/next controls.
 *
 * Opens parked at the right-hand end so the most current role sits centred
 * rather than showing the oldest role first.
 *
 * The spacers are load-bearing, not padding. The leading one lets the first term
 * reach the centre; the trailing one is sized so the last term lands centred at
 * maximum scroll, rather than pinned against the right edge.
 */
export function TimelineScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const touched = useRef(false);
  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      touched.current = true;
      sync();
    };

    const park = () => {
      if (!touched.current) el.scrollLeft = el.scrollWidth;
      sync();
    };

    // Wait for layout: setting scrollLeft synchronously on mount measures
    // scrollWidth before webfonts and images settle, which lands short.
    const raf = requestAnimationFrame(park);

    // Both spacers are viewport percentages, so a resize changes maximum scroll
    // and the parked position drifts off centre. Re-park until interaction.
    const observer = new ResizeObserver(park);
    observer.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [sync]);

  // One card plus its gap, read from the CSS so it tracks the responsive width.
  const step = (direction: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    touched.current = true;
    const styles = getComputedStyle(el);
    const card = parseFloat(styles.getPropertyValue("--card-w")) || 288;
    const gap = parseFloat(styles.getPropertyValue("--card-gap")) || 20;
    el.scrollBy({ left: direction * (card + gap), behavior: "smooth" });
  };

  const Left = icons.arrowLeft;

  return (
    <div>
      <Container className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Earlier roles"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface/70 text-ink transition-opacity disabled:opacity-35"
        >
          <Left size={16} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Later roles"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface/70 text-ink transition-opacity disabled:opacity-35"
        >
          {/* No arrowRight in the icon registry; mirror arrowLeft so the two
              chevrons are the same shape. */}
          <Left size={16} weight="bold" className="rotate-180" />
        </button>
      </Container>

      <ol
        ref={ref}
        aria-label="Roles in chronological order"
        // From `md` up the clear band is exactly two cards wide (2 x 18rem + the
        // 1.25rem gap = 37.25rem, so 18.62rem either side of centre) and
        // everything past it fades. Because the stops are absolute, the fade
        // widens on its own as the viewport grows, so only ever about two roles
        // read clearly. Phones keep a narrow fade: one card already fills ~80% of
        // the width there, so a two-card window would leave nothing to fade into.
        className="timeline-track flex snap-x snap-proximity gap-5 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8 [mask-image:linear-gradient(to_right,transparent_0,black_1.5rem,black_calc(100%-2rem),transparent_100%)] md:[mask-image:linear-gradient(to_right,transparent_0,black_calc(50%-18.62rem),black_calc(50%+18.62rem),transparent_100%)]"
      >
        {/* Lets the first term reach the centre, so it is actually scrollable to.
            Subtracts the row gap that follows it as well as half a card. */}
        <li
          aria-hidden
          className="shrink-0"
          style={{ width: "calc(50% - var(--card-w) / 2 - var(--card-gap))" }}
        />

        {children}

        {/* Sized so the LAST term lands centred at maximum scroll: half the
            viewport, less half a card and the row gap preceding this spacer. */}
        <li
          aria-hidden
          className="shrink-0"
          style={{ width: "calc(50% - var(--card-w) / 2 - var(--card-gap))" }}
        />
      </ol>
    </div>
  );
}
