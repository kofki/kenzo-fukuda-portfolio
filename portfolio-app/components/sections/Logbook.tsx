import Link from "next/link";
import { KelpBed, KelpFish } from "@/components/home/KelpForest";
import { cityFish, seaFish } from "@/components/home/liveLayers";
import { Swimmers } from "@/components/home/SeaLife";
import { LiveScene } from "@/components/home/LiveScene";
import { Underwater } from "@/components/home/Underwater";
import { Container } from "@/components/ui/Container";
import { allPosts, formatDate } from "@/lib/writing";

/**
 * Logbook is the writing: dated entries in Kenzo's own voice, newest first.
 * Posts tied to a project are that project's story and link from its card in
 * Projects instead, so they never show here.
 */
export function Logbook() {
  const entries = allPosts.filter((post) => !post.project).slice(0, 3);

  return (
    <Underwater
      id="logbook"
      label="Logbook"
      background="linear-gradient(180deg,#0a2442 0%,#0a2442 60%,#081e3a 100%)"
      spill
      scenery={
        <>
        <LiveScene className="pointer-events-none absolute inset-0">
          <KelpFish />
          <Swimmers fish={[seaFish[4], cityFish[0]]} flip />
        </LiveScene>
        <KelpBed />
      </>
      }
    >
      <Container className="max-w-3xl py-20 sm:py-24">
        <div className="reveal">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.08] text-cream">
            Logbook
          </h2>
        </div>

        {entries.length ? (
          <ul className="mt-8 space-y-4">
            {entries.map((post) => (
              <li key={post.slug} className="reveal">
                <Link
                  href={`/writing/${post.slug}`}
                  className="block rounded-md bg-paper p-5 text-indigo shadow-[0_18px_30px_-14px_rgba(5,12,28,0.65)] transition-transform hover:-translate-y-0.5"
                >
                  <p className="font-hand text-lg text-coral-ink">{formatDate(post.publishedAt)}</p>
                  <p className="mt-1 text-lg font-bold">{post.title}</p>
                  <p className="mt-1 text-sm text-indigo/75">{post.description}</p>
                  <p className="mt-2 text-sm font-medium">
                    Read <span aria-hidden>→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="reveal mt-6 max-w-md rounded-md border border-cream/25 bg-navy/60 px-5 py-4 text-sm text-cream/85">
            The first entries are on the way.
          </p>
        )}

        <Link
          href="/writing"
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-cream hover:underline"
        >
          All entries <span aria-hidden className="ml-1.5">→</span>
        </Link>
      </Container>
    </Underwater>
  );
}
