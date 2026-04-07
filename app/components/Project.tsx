"use client";

import { cn } from "@/lib/utils";
import { fontJersey15, fontInter } from "@/lib/font";
import "../style/project.css";
import Image from "next/image";
import { Ref } from "react";
import projectsEn, { projectCoverImage } from "../../lang/data-projects-en";
import { useLanguage } from "../contexts/language-context";

type Props = {
  ref?: Ref<HTMLDivElement>;
  id: number;
  isExpanded: boolean;
  onExpand: (id: number) => void;
  className?: string;
  /** When true, show category pills on the card (projects page). */
  showCategoryPills?: boolean;
};

function Project({
  ref,
  id,
  isExpanded,
  onExpand,
  className,
  showCategoryPills = false,
}: Props) {
  const projects = projectsEn;

  const selectedProject = projects.find((project) => project.id === id);

  const { texts } = useLanguage();

  const categoryList = selectedProject?.categories;
  const hasCategoryChips =
    showCategoryPills && categoryList && categoryList.length > 0;

  const renderCategoryChips = () =>
    hasCategoryChips && categoryList ? (
      <div className="flex flex-wrap justify-center gap-1.5">
        {categoryList.map((cat) => (
          <span
            key={cat}
            className={cn(
              "rounded-full border border-white/25 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white-1/95 backdrop-blur-sm sm:text-xs",
              fontInter.className,
            )}
          >
            {cat}
          </span>
        ))}
      </div>
    ) : null;

  const title = selectedProject?.title;
  const description =
    selectedProject?.description ?? texts.projects.noDescription;

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
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand(id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={
        title
          ? `${title}. ${texts.projects.cardOpenHint}`
          : texts.projects.cardOpenHint
      }
    >
      <div className="absolute inset-0 flex items-center justify-center transition-[filter] duration-300 group-hover:blur-[12px] lg:group-hover:blur-[16px]">
        <Image
          src={
            selectedProject
              ? (projectCoverImage(selectedProject) ?? "")
              : ""
          }
          placeholder="blur"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 24rem"
        />
      </div>

      {/* Shown when idle; hidden on hover so overlay chips + footer stay visible */}
      {hasCategoryChips && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] flex justify-center bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-3 pt-8 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          aria-hidden
        >
          {renderCategoryChips()}
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[2] flex min-h-0 flex-col bg-black/70 p-3 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 sm:p-4"
      >
        <h3
          className={cn(
            "shrink-0 text-center text-lg font-bold text-white-1 lg:text-xl",
            fontJersey15.className,
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 min-h-0 flex-1 overflow-y-auto overflow-x-hidden text-center text-xs leading-relaxed text-white-1/90 lg:text-sm",
            fontInter.className,
          )}
        >
          {description}
        </p>
        <span
          className={cn(
            "mt-2 shrink-0 text-center text-[11px] font-medium text-white-1/70 lg:text-xs",
            fontInter.className,
          )}
        >
          {texts.projects.seeMore}
        </span>
        {hasCategoryChips && (
          <div className="mt-2 shrink-0 border-t border-white/10 pt-2">
            {renderCategoryChips()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
