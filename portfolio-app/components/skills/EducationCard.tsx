import Image from "next/image";
import { icons } from "@/lib/icons";
import { education } from "@/data/education";

function Gator({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 96" className={className} fill="none" aria-hidden>
      <g fill="#2c7d4d">
        <path d="M72 66 l-4 18 11 0 2 -16z" />
        <path d="M138 64 l-2 18 11 0 0 -16z" />
      </g>
      <path
        d="M8 68 C 26 60 38 64 52 64 L 134 62 C 158 60 178 54 194 42 C 198 52 189 62 169 66 L 70 72 C 52 74 28 76 14 74 C 8 73 6 70 8 68 Z"
        fill="#3a9c63"
      />
      <g fill="#3a9c63">
        <path d="M86 68 l-4 20 12 0 2 -18z" />
        <path d="M150 66 l-2 20 12 0 0 -18z" />
      </g>
      <g fill="#2c7d4d">
        <path d="M60 62 l6 -11 6 11z" />
        <path d="M80 61 l6 -11 6 11z" />
        <path d="M100 60 l6 -11 6 11z" />
        <path d="M120 60 l6 -11 6 11z" />
      </g>
      <circle cx="152" cy="50" r="7" fill="#3a9c63" />
      <circle cx="153" cy="49" r="2.6" fill="#0e3a24" />
      <path
        d="M152 63 C 170 63 184 59 196 53"
        stroke="#0e3a24"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="191" cy="48" r="2" fill="#0e3a24" />
    </svg>
  );
}

export function EducationCard() {
  const Cap = icons.graduationCap;
  const Medal = icons.medal;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <Gator className="pointer-events-none absolute -bottom-2 right-3 w-28 opacity-90 sm:w-32" />

      <div className="relative z-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-amber/20 text-amber">
              <Cap size={22} weight="duotone" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Education
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex shrink-0 items-center rounded-md bg-white p-1.5 ring-1 ring-black/5">
              <Image
                src="/uf-monogram.png"
                alt="University of Florida"
                width={784}
                height={584}
                className="h-6 w-auto"
              />
            </span>
            <h3 className="font-display text-2xl font-semibold text-ink">
              {education.school}
            </h3>
          </div>
          <p className="mt-1 text-muted">
            {education.degree}
            {education.minor ? `, ${education.minor}` : ""}
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            {education.start} to {education.end}
            {education.gpa ? ` · GPA ${education.gpa}` : ""}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <span
                key={course}
                className="rounded-lg border border-border bg-sand/60 px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-sand/40 p-5">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal">
            Awards & Certificates
          </span>
          <ul className="mt-3 space-y-2.5">
            {education.awards.map((award) => (
              <li
                key={award}
                className="flex items-start gap-2 text-sm text-ink/80"
              >
                <Medal size={16} weight="fill" className="mt-0.5 shrink-0 text-amber" />
                {award}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
