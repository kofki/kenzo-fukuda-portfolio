import Image from "next/image";
import { icons } from "@/lib/icons";
import { education } from "@/data/education";

function Gator({ className }: { className?: string }) {
  return (
    <Image
      src="/uf-gator.png"
      alt=""
      width={377}
      height={369}
      className={className}
      aria-hidden
    />
  );
}

export function EducationCard() {
  const Cap = icons.graduationCap;
  const Medal = icons.medal;

  return (
    <div className="relative">
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
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

      <Gator className="pointer-events-none absolute -bottom-5 right-2 z-10 h-auto w-24 drop-shadow-lg sm:w-28" />
    </div>
  );
}
