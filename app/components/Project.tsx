"use client";

import { cn } from "@/lib/utils";
import { fontJersey15, fontInter } from "@/lib/font";
import "../style/project.css";
import Image from "next/image";
import { Ref } from "react";
import projectsEn from "../../lang/data-projects-en";
import { useLanguage } from "../contexts/language-context";

type Props = {
  ref?: Ref<HTMLDivElement>;
  id: number;
  isExpanded: boolean;
  onExpand: (id: number) => void;
  className?: string;
};

function Project({ ref, id, isExpanded, onExpand, className }: Props) {
  const projects = projectsEn;

  const selectedProject = projects.find((project) => project.id === id);

  const { texts } = useLanguage();

  return (
    <div
      ref={ref}
      className={cn(
        "group relative mx-auto my-2 w-full max-w-[88vw] flex-grow cursor-pointer overflow-hidden rounded-md transition-all duration-500 sm:mx-4 sm:max-w-none lg:w-96 lg:flex-grow-0 lg:hover:-translate-y-7 lg:hover:scale-105",
        "aspect-[4/3] min-h-[180px] w-full sm:min-h-[240px] lg:min-h-0",
        "border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] lg:hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
        className,
      )}
      style={{
        background: "transparent",
      }}
      onClick={() => onExpand(id)}
      onKeyDown={(e) => e.key === "Enter" && onExpand(id)}
      role="button"
      tabIndex={0}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-[filter] duration-300 group-hover:blur-[12px] lg:group-hover:blur-[16px]">
        <Image
          src={selectedProject?.image_path ?? ""}
          placeholder="blur"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 24rem"
        />
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={() => onExpand(id)}
        role="presentation"
      >
        <h3
          className={cn(
            "text-center text-lg font-bold text-white-1 lg:text-xl",
            fontJersey15.className,
          )}
        >
          {selectedProject?.title}
        </h3>
        <p
          className={cn(
            "mt-2 max-h-[60vh] overflow-y-auto overflow-x-hidden text-center text-xs leading-relaxed text-white-1/90 lg:text-sm",
            fontInter.className,
          )}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="article"
          tabIndex={0}
        >
          {selectedProject?.description ?? texts.projects.noDescription}
        </p>
        <span
          className={cn(
            "mt-3 inline-block rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-white-1 lg:text-sm",
            fontInter.className,
          )}
        >
          {texts.projects.seeMore}
        </span>
      </div>

    </div>
  );
}

export default Project;
