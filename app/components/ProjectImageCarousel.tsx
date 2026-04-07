"use client";

import { useCallback, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { fontInter } from "@/lib/font";

type Props = {
  images: StaticImageData[];
  /** Used in alt text for the active slide */
  title?: string;
  className?: string;
};

export default function ProjectImageCarousel({
  images,
  title,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const n = images.length;
  const safeIndex = n === 0 ? 0 : ((index % n) + n) % n;

  const go = useCallback(
    (delta: number) => {
      if (n <= 1) return;
      setIndex((i) => (i + delta + n) % n);
    },
    [n],
  );

  if (n === 0) {
    return (
      <div
        className={cn(
          "relative flex h-[60vh] w-full max-w-[90vw] shrink-0 items-center justify-center bg-blue-10/30 md:h-[70vh]",
          className,
        )}
      >
        <span className="text-sm text-white-1/50">No images</span>
      </div>
    );
  }

  const altBase = title?.trim() ? `${title} preview` : "Project preview";

  return (
    <div
      className={cn(
        "relative h-[60vh] w-full max-w-[90vw] shrink-0 overflow-hidden md:h-[70vh]",
        className,
      )}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-200",
            i === safeIndex
              ? "z-[1] opacity-100"
              : "pointer-events-none z-0 opacity-0",
          )}
          aria-hidden={i !== safeIndex}
        >
          <Image
            src={src}
            alt={n > 1 ? `${altBase} (${i + 1} of ${n})` : altBase}
            placeholder="blur"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 1200px"
            priority={i === 0}
          />
        </div>
      ))}

      {n > 1 && (
        <>
          <p
            className={cn(
              "pointer-events-none absolute left-3 top-3 z-[3] select-none rounded-md border border-white/20 bg-black/75 px-2.5 py-1 text-xs font-medium tabular-nums text-white-1 shadow-lg backdrop-blur-sm",
              fontInter.className,
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {safeIndex + 1} / {n}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-1 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white-1 shadow-md backdrop-blur-sm transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-5 sm:left-2"
            aria-label="Previous image"
          >
            <IconChevronLeft className="size-6" stroke={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-1 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white-1 shadow-md backdrop-blur-sm transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-5 sm:right-2"
            aria-label="Next image"
          >
            <IconChevronRight className="size-6" stroke={1.75} aria-hidden />
          </button>
        </>
      )}
    </div>
  );
}
