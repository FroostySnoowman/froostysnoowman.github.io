"use client";

import { cn } from "@/lib/utils";
import { fontJersey15, fontInter } from "@/lib/font";
import "../style/project.css";
import SocialMedia from "./SocialMedia";
import Image from "next/image";
import { Ref } from "react";
import projectsEn from "../../lang/data-projects-en";
import githubBadge from "../../public/img/social_media/github-badge.svg";
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

  const bg_col = selectedProject?.color ?? "#000000";

  const darkenColor = (color: string, percent: number) => {
    const hex = color.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.floor(r * (1 - percent));
    const newG = Math.floor(g * (1 - percent));
    const newB = Math.floor(b * (1 - percent));

    return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB)
      .toString(16)
      .slice(1)}`;
  };

  const darkenedColor = darkenColor(bg_col, 0.2);

  const { texts } = useLanguage();

  return (
    <div
      ref={ref}
      className={cn(
        "group relative mx-6 my-2 flex-grow cursor-pointer overflow-hidden rounded-md border-2 border-blue-7/50 transition-all duration-500 hover:border-blue-6/80 sm:mx-4 lg:w-96 lg:flex-grow-0 lg:hover:-translate-y-7 lg:hover:scale-105",
        "aspect-[4/3] min-h-[180px] w-full sm:min-h-[240px] lg:min-h-0",
        className,
      )}
      style={{
        background: darkenedColor,
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

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
            "mt-2 max-h-[60vh] overflow-y-auto text-center text-xs leading-relaxed text-white-1/90 lg:text-sm",
            fontInter.className,
          )}
        >
          {selectedProject?.description ?? texts.projects.noDescription}
        </p>
        <span className={cn("mt-2 text-center text-xs text-blue-8", fontInter.className)}>
          {texts.projects.seeMore}
        </span>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <SocialMedia
          svgSrc={githubBadge}
          className="p-fluide-anim absolute bottom-1 right-1 z-50 scale-90 shadow-[0_0_5px] shadow-blue-1 lg:bottom-4 lg:right-4 lg:scale-125"
          href={selectedProject?.link}
          alt={`${texts.projects.altProjects} ${selectedProject?.title}`}
        />
      </div>
    </div>
  );
}

export default Project;
