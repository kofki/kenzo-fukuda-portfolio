import { NameUnderline, PointerArrow } from "@/components/home/Doodles";
import { HeroDive } from "@/components/home/HeroDive";
import { PhotoPrint } from "@/components/home/PhotoPrint";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="top" aria-label="Kenzo Fukuda">
      <HeroDive>
        {/* Bottom padding keeps every line in the sky, above the water. The
            horizon is 24.6% up from the bottom of the scene, and the scene is
            max(100cqh, 66.67cqw) tall, so this clears it with a margin. Units
            come from the hero frame itself, not the window. The container lets
            taps through to the props; only its own controls catch them. */}
        <Container
          className="pointer-events-none relative z-20 flex h-full flex-col justify-center pt-20 [&_a]:pointer-events-auto [&_figure]:pointer-events-auto"
          style={{ paddingBottom: "calc(max(24.6cqh, 16.4cqw) + 1.75rem)" }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
            <div>
              <p
                className="font-hand text-[clamp(1.4rem,3.4cqh,2.4rem)] leading-none text-hand animate-rise"
                style={{ rotate: "-3deg", animationDelay: "60ms" }}
              >
                hi, I&apos;m
              </p>
              <h1
                className="mt-2 font-display text-[clamp(2.4rem,min(9cqw,9.5cqh),6.8rem)] leading-[1.02] text-ink animate-rise"
                style={{ animationDelay: "140ms" }}
              >
                Kenzo
                <br />
                Fukuda
              </h1>
              <NameUnderline className="mt-2 h-3.5 w-[min(100%,24rem)] text-hand" />
              <p
                className="mt-4 text-[clamp(0.95rem,2cqh,1.15rem)] font-medium text-ink animate-rise"
                style={{ animationDelay: "260ms" }}
              >
                {profile.headline} · CS at UF
              </p>
              <div
                className="mt-6 flex items-center gap-6 animate-rise"
                style={{ animationDelay: "340ms" }}
              >
                <a
                  href="#projects"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-sand transition-transform duration-300 hover:-translate-y-0.5"
                >
                  View work <span aria-hidden>→</span>
                </a>
                <span
                  aria-hidden
                  className="relative hidden font-hand text-3xl leading-none text-hand lg:inline-block"
                  style={{ rotate: "-4deg" }}
                >
                  that&apos;s me
                  <PointerArrow className="absolute bottom-3 left-[105%] h-20 w-32" />
                </span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <PhotoPrint
                src={profile.headshot}
                alt="Kenzo Fukuda"
                rotate={3}
                eager
                sizes="(max-width: 1024px) 220px, 320px"
                className="w-[min(52cqw,24cqh,13rem)] lg:w-[min(22rem,40cqh)]"
              />
            </div>
          </div>
        </Container>
      </HeroDive>
    </section>
  );
}
