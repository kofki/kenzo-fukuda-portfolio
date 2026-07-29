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

  return (
    <div className="relative">
      <div className="panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-amber/20 text-amber-ink">
              <Cap size={22} weight="duotone" />
            </span>
            <span className="text-xs text-muted">Education</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex shrink-0 items-center rounded-md bg-white p-1.5 ring-1 ring-black/5">
              {/* alt="" — the school name is in the heading right beside it, so a
                  label here would just be announced twice. */}
              <Image
                src="/uf-monogram.png"
                alt=""
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
        </div>
      </div>

      <Gator className="pointer-events-none absolute -bottom-5 right-2 z-10 h-auto w-24 drop-shadow-lg sm:w-28" />
    </div>
  );
}
