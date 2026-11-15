"use client";

import gsap from "gsap";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { moon, sky, type Layer } from "@/components/home/liveLayers";
import { prefersReducedMotion, useSceneGsap } from "@/lib/useSceneGsap";
import { playGust, playSparkle, playSplash } from "@/lib/worldSound";

// Horizon and sand line shared by both beach prints, in % of the scene.
const HORIZON = 75.4;
const SAND = 91;

const box = (l: Layer): CSSProperties => ({
  left: `${l.left}%`,
  top: `${l.top}%`,
  width: `${l.width}%`,
  height: `${l.height}%`,
});

// Extra pin-prick stars, fixed so server and client match.
const SPARKLES = [
  [12, 8, 1], [22, 21, 0], [31, 6, 0], [38, 30, 1], [47, 14, 0], [53, 40, 0],
  [61, 9, 1], [66, 27, 0], [72, 47, 0], [78, 16, 1], [88, 35, 0], [93, 12, 0],
  [18, 44, 0], [27, 55, 0], [43, 52, 1], [57, 60, 0],
] as const;

// Three aurora curtains: the shapes they are cut to, and their ink colour.
const CURTAINS = [
  { d: "M0 140 C 120 60, 220 120, 340 70 S 560 40, 700 90 S 900 50, 1000 80 L1000 260 C 860 300, 700 250, 520 290 S 200 250, 0 300 Z", color: "#7be3c0" },
  { d: "M0 190 C 160 120, 300 170, 450 120 S 700 110, 820 150 S 950 120, 1000 140 L1000 300 C 820 330, 640 290, 470 320 S 160 300, 0 330 Z", color: "#5cc6d6" },
  { d: "M140 110 C 260 50, 360 120, 500 70 S 700 40, 860 100 L860 210 C 760 250, 640 205, 500 245 S 260 215, 140 240 Z", color: "#a7e98f" },
];

function Img({ layer, mark, className = "", style }: { layer: Layer; mark: string; className?: string; style?: CSSProperties }) {
  return (
    // Pre-cut WebP sprites; next/image adds nothing here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...{ [`data-${mark}`]: "" }}
      src={layer.src}
      alt=""
      decoding="async"
      draggable={false}
      className={`absolute max-w-none select-none ${className}`}
      style={{ ...box(layer), ...style }}
    />
  );
}

/**
 * Everything that moves above and on the water in the hero: wind in the palm
 * and the clouds, twinkling stars and an aurora at night, a breathing sun,
 * glitter sliding across the sea. Tap the sky for a gust (day) or a shooting
 * star and an aurora flare (night); tap the sea for a splash.
 */
/**
 * Which depth layer to draw: the sky (clouds, aurora, stars, sun and moon
 * glow, wind), the sea (its glitter and the tap-to-ripple zone), or the palm
 * crown, which stands on the sand with its trunk.
 */
export function HeroSky({ part = "sky" }: { part?: "sky" | "sea" | "palm" }) {
  const root = useRef<HTMLDivElement>(null);

  useSceneGsap(root, (q) => {
    const loops: gsap.core.Animation[] = [];
    const r = gsap.utils.random;

    // Wind: the palm sways on sine easing and catches the odd stronger gust.
    q("[data-palm]").forEach((palm) => {
      loops.push(
        gsap.fromTo(palm, { rotation: -1.4 }, { rotation: 1.8, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.to(palm, { skewX: 2.5, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1, repeatDelay: 0.1, delay: 6 })
          .repeat(-1).repeatDelay(7),
      );
    });

    // Clouds drift on the wind, each at its own pace, and wander back.
    q("[data-cloud]").forEach((cloud, i) => {
      loops.push(
        gsap.to(cloud, { xPercent: () => r(-7, 7), y: () => r(-6, 6), duration: () => r(16, 26), ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true, delay: i * 1.5 }),
      );
    });

    // Stars twinkle at random; no more than a third bright at once.
    q("[data-star]").forEach((star) => {
      loops.push(
        gsap.to(star, { opacity: () => r(0.15, 1), scale: () => r(0.6, 1.5), duration: () => r(0.5, 1.8), ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true, delay: r(0, 2) }),
      );
    });

    // Aurora curtains ripple and breathe.
    q("[data-curtain]").forEach((curtain, i) => {
      loops.push(
        gsap.to(curtain, { xPercent: () => r(-6, 6), scaleY: () => r(0.85, 1.25), skewX: () => r(-8, 8), opacity: () => r(0.45, 1), duration: () => r(5, 9), ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true, delay: i }),
      );
    });

    // Sun and moon glow breathe.
    q("[data-glow]").forEach((glow) => {
      loops.push(gsap.fromTo(glow, { scale: 0.9, opacity: 0.55 }, { scale: 1.15, opacity: 1, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    });

    // Glitter on the sea: an offset copy of the water slides back and forth.
    q("[data-shimmer]").forEach((shimmer, i) => {
      loops.push(gsap.fromTo(shimmer, { x: -14 }, { x: 14, duration: 6 + i, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    });

    // Wind streaks draw across the sky now and then.
    q("[data-streak]").forEach((streak, i) => {
      const path = streak as SVGPathElement;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: `${len * 0.35} ${len}`, strokeDashoffset: len * 0.35 });
      loops.push(
        gsap.timeline({ repeat: -1, repeatDelay: r(3, 7), delay: 1.5 + i * 2.7 })
          .fromTo(path, { strokeDashoffset: len * 0.35, opacity: 0 }, { strokeDashoffset: -len, opacity: 0.9, duration: 2.6, ease: "sine.inOut" })
          .to(path, { opacity: 0, duration: 0.6 }, "-=0.6"),
      );
    });

    // A shooting star crosses the night sky every so often.
    const star = q("[data-shooting]")[0];
    if (star) {
      loops.push(
        gsap.timeline({ repeat: -1, repeatDelay: 11, delay: 5, repeatRefresh: true })
          .fromTo(star, { left: () => `${r(20, 70)}%`, top: () => `${r(4, 20)}%`, x: 0, y: 0, opacity: 0 }, { x: -220, y: 120, opacity: 1, duration: 0.25, ease: "power1.in" })
          .to(star, { x: -420, y: 230, opacity: 0, duration: 0.55, ease: "power2.out" }),
      );
    }
    return loops;
  });

  const tapSky = (event: PointerEvent<HTMLDivElement>) => {
    const isNight = document.documentElement.classList.contains("dark");
    if (isNight) playSparkle();
    else playGust();
    if (prefersReducedMotion() || !root.current) return;
    const q = gsap.utils.selector(root.current);
    if (isNight) {
      const rect = event.currentTarget.getBoundingClientRect();
      const star = q("[data-shooting]")[0];
      gsap.timeline()
        .set(star, { left: `${((event.clientX - rect.left) / rect.width) * 100}%`, top: `${((event.clientY - rect.top) / rect.height) * HORIZON}%`, x: 0, y: 0, opacity: 0 })
        .to(star, { x: -200, y: 110, opacity: 1, duration: 0.22, ease: "power1.in" })
        .to(star, { x: -380, y: 210, opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(q("[data-aurora]"), { opacity: 1, scaleY: 1 }, { opacity: 1, scaleY: 1.3, duration: 0.5, ease: "power2.out", yoyo: true, repeat: 1, transformOrigin: "50% 100%", onComplete: () => { gsap.set(q("[data-aurora]"), { clearProps: "scaleY" }); } });
      gsap.fromTo(q("[data-star]"), { opacity: 1, scale: 1.8 }, { opacity: 0.5, scale: 1, duration: 0.9, stagger: { each: 0.03, from: "random" }, ease: "power2.out" });
    } else {
      gsap.fromTo(q("[data-palm]"), { rotation: 1.8 }, { rotation: -5, duration: 0.35, ease: "power2.out", yoyo: true, repeat: 3 });
      gsap.to(q("[data-cloud]"), { x: "+=40", duration: 1.2, ease: "power2.out", yoyo: true, repeat: 1 });
      q("[data-streak]").forEach((s, i) => {
        const len = (s as unknown as SVGPathElement).getTotalLength();
        gsap.fromTo(s, { strokeDashoffset: len * 0.35, opacity: 0 }, { strokeDashoffset: -len, opacity: 0.9, duration: 1.1, delay: i * 0.12, ease: "power1.inOut" });
      });
    }
  };

  const tapSea = (event: PointerEvent<HTMLDivElement>) => {
    playSplash();
    if (prefersReducedMotion() || !root.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ring = root.current.querySelector<HTMLElement>("[data-ripple]");
    if (!ring) return;
    gsap.fromTo(
      ring,
      { left: event.clientX - rect.left, top: event.clientY - rect.top, scale: 0.2, opacity: 1 },
      { scale: 2.6, opacity: 0, duration: 1.1, ease: "power2.out" },
    );
  };

  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      {/* Clouds per theme, or the palm crown per theme */}
      {(["day", "night"] as const).map((t) => (
        <div key={t} className={`pointer-events-none absolute inset-0 ${t === "day" ? "dark:hidden" : "hidden dark:block"}`}>
          {part === "sky"
            ? sky[t].clouds.map((c) => <Img key={c.src} layer={c} mark="cloud" className="will-change-transform" />)
            : null}
          {part === "palm" ? (
            <Img
              layer={sky[t].palm}
              mark="palm"
              className="will-change-transform"
              style={{ transformOrigin: `${sky[t].palm.pivotX ?? 20}% 100%` }}
            />
          ) : null}
        </div>
      ))}

      {part === "sky" ? (
      <>
      {/* Night: aurora, stars, shooting star, moon glow */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        {/* Printed-ink aurora: each curtain is a band of colour cut to a
            wavy shape, brightest along its lower edge and fading upward, with
            a wide faint halo. Screen-blended, so the sky's paper grain shows
            through it like ink on the same sheet. */}
        <div
          data-aurora
          aria-hidden
          className="absolute left-0 top-[2%] h-[56%] w-full origin-bottom mix-blend-screen max-sm:opacity-60"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent)" }}
        >
          {CURTAINS.map((c, i) => {
            const shape = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 400' preserveAspectRatio='none'><path d='${c.d}' fill='white'/></svg>`)}")`;
            return (
              <div key={i} data-curtain className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% 100%" }}>
                <div className="absolute inset-[-14%]" style={{ background: `radial-gradient(55% 40% at 50% 64%, ${c.color}38, ${c.color}12 45%, transparent 72%)` }} />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 6%, ${c.color}14 28%, ${c.color}4d 52%, ${c.color}99 66%, #e6fff0aa 72%, ${c.color}55 79%, transparent 90%)`,
                    maskImage: shape,
                    WebkitMaskImage: shape,
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                  }}
                />
              </div>
            );
          })}
        </div>
        {SPARKLES.map(([x, y, big], i) => (
          <span
            key={i}
            data-star
            className="absolute rounded-full bg-[#f4ecd8]"
            style={{ left: `${x}%`, top: `${y}%`, width: big ? 4 : 2.5, height: big ? 4 : 2.5, boxShadow: big ? "0 0 6px 1px rgba(244,236,216,0.7)" : undefined }}
          />
        ))}
        {sky.night.stars.map((s) => (
          <Img key={s.src} layer={s} mark="star" />
        ))}
        <span data-glow className="absolute rounded-full" style={{ left: `${moon.left - moon.width}%`, top: `${moon.top - moon.height * 0.25}%`, width: `${moon.width * 3}%`, height: `${moon.height * 1.5}%`, background: "radial-gradient(closest-side, rgba(244,236,216,0.35), rgba(244,236,216,0))" }} />
        <span data-shooting className="absolute h-[2px] w-[90px] -rotate-[28deg] rounded-full opacity-0" style={{ background: "linear-gradient(90deg, #f4ecd8, rgba(244,236,216,0))" }} />
      </div>

      {/* Day: sun glow */}
      <span data-glow className="pointer-events-none absolute rounded-full dark:hidden" style={{ left: "79%", top: "68%", width: "14%", height: "15%", background: "radial-gradient(closest-side, rgba(255,214,150,0.55), rgba(255,170,110,0))" }} />

      {/* Wind streaks */}
      <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[6%] h-[60%] w-full" aria-hidden>
        {["M60 180 C 220 150, 360 200, 520 170", "M380 300 C 520 270, 650 320, 820 290", "M200 420 C 330 400, 470 440, 600 415"].map((d, i) => (
          <path key={i} data-streak d={d} fill="none" stroke="#f7ead2" strokeWidth="2.2" strokeLinecap="round" opacity="0" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div aria-hidden className="pointer-events-auto absolute inset-x-0 top-0" style={{ height: `${HORIZON}%` }} onPointerDown={tapSky} />
      </>
      ) : null}

      {part === "sea" ? (
      <>
      {/* Glitter on the sea: offset copies of each print's water */}
      {(["day", "night"] as const).map((t) => (
        <div
          key={t}
          className={`pointer-events-none absolute inset-x-0 overflow-hidden opacity-50 ${t === "day" ? "dark:hidden" : "hidden dark:block"}`}
          style={{ top: `${HORIZON + 0.4}%`, height: `${SAND - HORIZON - 3}%`, maskImage: "linear-gradient(180deg, transparent, #000 25%, #000 70%, transparent)", WebkitMaskImage: "linear-gradient(180deg, transparent, #000 25%, #000 70%, transparent)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-shimmer
            src={`/scenes/beach-${t}.webp`}
            alt=""
            draggable={false}
            className="absolute left-0 w-full max-w-none mix-blend-screen will-change-transform"
            style={{ top: `${-((HORIZON + 0.4) / (SAND - HORIZON - 3)) * 100}%`, height: `${(100 / (SAND - HORIZON - 3)) * 100}%` }}
          />
        </div>
      ))}

      <div aria-hidden className="pointer-events-auto absolute inset-x-0" style={{ top: `${HORIZON}%`, height: `${SAND - HORIZON}%` }} onPointerDown={tapSea} />
      <span data-ripple className="pointer-events-none absolute -ml-10 -mt-3 h-6 w-20 rounded-[50%] border-2 border-[#f4ecd8] opacity-0" />
      </>
      ) : null}
    </div>
  );
}
