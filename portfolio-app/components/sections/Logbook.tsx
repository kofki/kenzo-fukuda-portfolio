import Image from "next/image";
import Link from "next/link";
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
      background="#0c2947"
      scenery={
        <>
          {/* The kelp print is lighter than the water around it, and its
              bottom 14% is sea floor, so it is stretched past the bottom
              edge and darkened to keep the dive getting deeper. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[116%]">
            <Image src="/scenes/kelp.webp" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,41,71,0.95)_0%,rgba(15,28,56,0.62)_30%,rgba(15,28,56,0.7)_100%)]"
          />
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
