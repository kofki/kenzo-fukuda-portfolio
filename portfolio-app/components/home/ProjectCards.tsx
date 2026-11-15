"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface CardData {
  slug: string;
  title: string;
  line: string;
  meta: string;
  cover: string;
  coverAlt: string;
  featured: boolean;
  story?: { title: string; href: string };
}

function ProjectCard({ card, eager }: { card: CardData; eager: boolean }) {
  return (
    <article className="reveal flex w-[78vw] max-w-[19rem] shrink-0 snap-start flex-col gap-1.5 rounded-md bg-paper p-2.5 text-indigo shadow-[0_2px_2px_rgba(5,12,28,0.2),0_18px_30px_-14px_rgba(5,12,28,0.65)] md:w-auto md:max-w-none">
      <Link
        href={`/projects/${card.slug}`}
        className="group relative block aspect-[1.44] overflow-hidden rounded-sm bg-[#e8e1d0]"
      >
        <Image
          src={card.cover}
          alt={card.coverAlt}
          fill
          sizes="(max-width: 768px) 78vw, 320px"
          loading={eager ? "eager" : "lazy"}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1 px-1 pb-1 pt-2">
        <h3 className="text-lg font-bold">
          <Link href={`/projects/${card.slug}`} className="hover:underline">
            {card.title}
          </Link>
        </h3>
        <p className="text-sm leading-snug text-indigo/85">{card.line}</p>
        <p className="text-xs font-medium text-coral-ink">{card.meta}</p>
        {card.story ? (
          <Link
            href={card.story.href}
            className="mt-auto pt-2 text-xs font-bold text-indigo hover:underline"
          >
            Read: {card.story.title} <span aria-hidden>→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Featured projects first, the rest one tap away. On phones the cards are a
 * swipeable row with the next card peeking in from the edge.
 */
export function ProjectCards({ cards }: { cards: CardData[] }) {
  const [all, setAll] = useState(false);
  const featured = cards.filter((card) => card.featured);
  const shown = all ? cards : featured;

  return (
    <>
      <div className="no-scrollbar -mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {shown.map((card, index) => (
          <ProjectCard key={card.slug} card={card} eager={index === 0} />
        ))}
      </div>
      {cards.length > featured.length ? (
        <button
          type="button"
          onClick={() => setAll((open) => !open)}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-cream hover:underline"
        >
          {all ? "Show fewer" : `See all ${cards.length} projects`}{" "}
          <span aria-hidden className="ml-1.5">→</span>
        </button>
      ) : null}
    </>
  );
}
