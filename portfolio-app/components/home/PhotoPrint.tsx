import Image from "next/image";
import { cn } from "@/lib/cn";

interface PhotoPrintProps {
  src: string;
  alt: string;
  /** Height of the photo window relative to its width. 1 is square. */
  ratio?: number;
  /** Tilt in degrees. The tape tilts the other way, as hand-placed tape does. */
  rotate?: number;
  sizes: string;
  className?: string;
  eager?: boolean;
}

/**
 * A photo print with a single strip of washi tape across the top edge. The
 * tape colour comes from --tape, so it is coral by day and cream at night.
 */
export function PhotoPrint({
  src,
  alt,
  ratio = 1,
  rotate = 3,
  sizes,
  className,
  eager = false,
}: PhotoPrintProps) {
  return (
    <figure
      className={cn(
        "relative bg-[#fdfbf4] p-[4.5%] shadow-[0_2px_2px_rgba(5,12,28,0.2),0_20px_36px_-16px_rgba(5,12,28,0.6)]",
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-0 z-10 aspect-[3.4/1] w-[34%] -translate-x-1/2 -translate-y-1/2 bg-tape/85 shadow-[0_1px_2px_rgba(40,20,10,0.18)]"
        style={{
          rotate: `${-rotate - 2}deg`,
          clipPath:
            "polygon(0 6%, 4% 0, 96% 3%, 100% 10%, 98% 50%, 100% 92%, 95% 100%, 5% 97%, 0 90%, 2% 50%)",
        }}
      />
      <div className="relative overflow-hidden" style={{ aspectRatio: `1 / ${ratio}` }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="object-cover"
        />
      </div>
    </figure>
  );
}
