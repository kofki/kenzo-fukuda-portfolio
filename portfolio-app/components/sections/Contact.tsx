import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/fx/Reveal";
import { WaveDivider } from "@/components/fx/WaveDivider";
import { Container } from "@/components/ui/Container";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

export function Contact() {
  const Email = icons.email;

  return (
    <section id="contact" className="relative scroll-mt-24">
      {/* The frosted content sheet dissolves into the open deep water here;
          the dive WorldBackground (deep band + glowing reef city) shows through. */}
      <WaveDivider className="-mb-px text-sand" height={80} />

      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--deep-bottom) 30%, transparent) 0%, color-mix(in oklab, var(--deep-bottom) 6%, transparent) 60%)",
          }}
        />
        <Container className="relative z-10 py-20 sm:py-28">
          <Reveal>
            <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
              {/* Portrait */}
              <div className="relative mx-auto aspect-[4/3] w-full max-w-xs rotate-[-2deg] overflow-hidden rounded-2xl border border-deep-ink/20 shadow-2xl md:mx-0">
                <Image
                  src="/kenzo_suit.jpeg"
                  alt="Kenzo at a conference by the river"
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  className="object-cover"
                />
              </div>

              {/* Invitation */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-deep-ink/60">
                  05 · Say hi
                </span>
                <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-deep-ink sm:text-5xl">
                  Let&apos;s make something. Or just talk shop.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-deep-ink/70">
                  I&apos;m always up for a good problem, a new team, or a long
                  tangent about the ocean. Email is the fastest way to reach me,
                  and I read every one.
                </p>

                <div className="mt-8 flex flex-col items-start gap-5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-deep-ink px-7 py-3.5 font-mono text-sm text-deep-bottom transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Email size={18} weight="bold" />
                    {profile.email}
                  </a>

                  <div className="flex items-center gap-3">
                    {profile.socials.map((social) => {
                      const Icon = icons[social.icon];
                      const isExternal = social.href.startsWith("http");
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          title={social.label}
                          {...(isExternal
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className="inline-flex size-11 items-center justify-center rounded-full border border-deep-ink/20 text-deep-ink/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-deep-ink hover:text-deep-ink"
                        >
                          <Icon size={20} weight="regular" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Footer />
        </Container>
      </div>
    </section>
  );
}
