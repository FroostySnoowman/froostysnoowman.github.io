"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import ViewTransitionLink from "../components/ViewTransitionLink";
import Image from "next/image";
import Project from "../components/Project";
import ProjectImageCarousel from "../components/ProjectImageCarousel";
import ProjectOutboundLink from "../components/ProjectOutboundLink";
import { fontJersey15, fontInter } from "@/lib/font";
import { cn } from "@/lib/utils";
import projectsEn, {
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "../../lang/data-projects-en";
import "../style/projects-parallax.css";

const PARALLAX_HEIGHT = 1000;
const LAYER_COUNT = 9;

/** Shared with back link / modal: blue-9 surface, cyan accent when selected. */
const filterChipBase = cn(
  "inline-flex items-center rounded-full border px-3.5 py-2 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-200",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-5 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-9",
);

type FilterValue = "all" | ProjectCategory;

export default function ProjectsPage() {
  const [expandedProjectId, setExpandedProjectId] = useState(-1);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  const categoryCounts = useMemo(() => {
    const map = new Map<ProjectCategory, number>();
    for (const c of PROJECT_CATEGORIES) {
      map.set(
        c,
        projectsEn.filter((p) => p.categories.includes(c)).length,
      );
    }
    return map;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectsEn;
    return projectsEn.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  const handleExpandProject = (id: number) => {
    setExpandedProjectId(expandedProjectId === id ? -1 : id);
  };

  const expandedProject =
    expandedProjectId !== -1
      ? projectsEn.find((p) => p.id === expandedProjectId)
      : null;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedProjectId(-1);
    };
    if (expandedProjectId !== -1) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [expandedProjectId]);

  useEffect(() => {
    setExpandedProjectId(-1);
  }, [activeFilter]);

  useEffect(() => {
    const parent = parallaxContainerRef.current;
    if (!parent) return;
    const children = parent.getElementsByTagName("div");

    const handleScroll = () => {
      const pageYOffset = window.scrollY ?? window.pageYOffset;
      for (let i = 0; i < children.length; i++) {
        (children[i] as HTMLElement).style.transform =
          "translateY(-" + (pageYOffset * i) / children.length + "px)";
      }
    };

    window.addEventListener("scroll", handleScroll, false);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        // Own typography + surface: layout uses html.dark + body dark:text-blue-10, which
        // makes unstyled text nearly invisible on dark panels; never use dark:bg-blue-4 here
        // (it fights the #00131c content area).
        "min-h-screen bg-blue-9 text-white-1 dark:bg-blue-9",
        fontInter.className,
      )}
    >
      {/* Back to home */}
      <div className="fixed left-4 top-4 z-50">
        <ViewTransitionLink
          href="/"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/20 bg-blue-9 px-4 py-2.5 text-sm font-medium text-white-1 shadow-lg transition-colors hover:border-white/40 hover:bg-blue-8 hover:text-white-1",
            fontInter.className,
          )}
        >
          <span aria-hidden>←</span> Back to home
        </ViewTransitionLink>
      </div>

      {/* Wrapper for parallax zone (1000px) + gradient fade into solid panel */}
      <div
        className="relative"
        style={{ height: PARALLAX_HEIGHT }}
      >
        {/* Firewatch-style parallax container: 9 fixed layers, scroll-driven transform */}
        <div
          id="parallax-container"
          ref={parallaxContainerRef}
          style={{ height: PARALLAX_HEIGHT }}
        >
          {Array.from({ length: LAYER_COUNT }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url(/img/projects_hero/parallax${i}.png)`,
              }}
            />
          ))}
        </div>

        {/* Gradient overlay: smooth transition from parallax to #00131c */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: 200,
            background: "linear-gradient(to bottom, transparent, #00131c)",
          }}
          aria-hidden
        />

        {/* Title block (same height as parallax, scrolls with content) */}
        <div
          className="relative z-10 flex flex-col items-center justify-center px-4 text-center"
          style={{ height: PARALLAX_HEIGHT, marginTop: -PARALLAX_HEIGHT }}
        >
          <h1
            className={cn(
              "text-5xl font-bold text-white-1 drop-shadow-lg sm:text-6xl lg:text-7xl",
              fontJersey15.className,
            )}
          >
            Projects
          </h1>
          <p
            className={cn(
              "mt-3 max-w-xl text-base text-white-1/90 sm:text-lg",
              fontInter.className,
            )}
          >
            Full-stack apps, Discord platforms, mobile experiences, and more.
          </p>
        </div>
      </div>

      {/* Solid panel (matches home page #00131c): covers parallax below the fold */}
      <div
        className="relative z-10 min-h-screen w-full bg-blue-9 isolate"
        style={{ backgroundColor: "#00131c" }}
      >
        <section
          className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14"
          aria-labelledby="projects-work-heading"
        >
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:gap-6">
            <div className="max-w-2xl">
              <h2
                id="projects-work-heading"
                className={cn(
                  "text-2xl font-bold text-white-1 sm:text-3xl",
                  fontJersey15.className,
                )}
              >
                Selected work
              </h2>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed text-white-1/80 sm:text-base",
                  fontInter.className,
                )}
              >
                Use the filters to browse by the kind of work involved—many
                projects span more than one area.
              </p>
            </div>

            <div
              className={cn(
                "rounded-2xl border border-blue-6/40 bg-blue-8/80 px-3 py-3 shadow-lg sm:px-4 sm:py-4",
                fontInter.className,
              )}
            >
              <p
                id="project-filters-label"
                className="mb-2.5 text-xs font-medium uppercase tracking-wide text-blue-2"
              >
                Filter by type
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="project-filters-label"
              >
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  aria-pressed={activeFilter === "all"}
                  className={cn(
                    filterChipBase,
                    activeFilter === "all"
                      ? "border-blue-5 bg-blue-7 text-white-1 shadow-md ring-1 ring-blue-5/50"
                      : "border-white/20 bg-blue-9/80 text-white-1/90 hover:border-blue-5/50 hover:bg-blue-8/90 hover:text-white-1",
                  )}
                >
                  All
                  <span
                    className={cn(
                      "ml-1.5 tabular-nums",
                      activeFilter === "all"
                        ? "text-blue-2"
                        : "text-white-1/55",
                    )}
                  >
                    {projectsEn.length}
                  </span>
                </button>
                {PROJECT_CATEGORIES.map((category) => {
                  const count = categoryCounts.get(category) ?? 0;
                  const isActive = activeFilter === category;
                  const disabled = count === 0;
                  return (
                    <button
                      key={category}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        if (!disabled) setActiveFilter(category);
                      }}
                      aria-pressed={isActive}
                      aria-disabled={disabled}
                      className={cn(
                        filterChipBase,
                        disabled &&
                          "cursor-not-allowed border-white/[0.07] bg-blue-10/25 text-white-1/35 shadow-none hover:bg-blue-10/25",
                        !disabled &&
                          isActive &&
                          "border-blue-5 bg-blue-7 text-white-1 shadow-md ring-1 ring-blue-5/50",
                        !disabled &&
                          !isActive &&
                          "border-white/20 bg-blue-9/80 text-white-1/90 hover:border-blue-5/50 hover:bg-blue-8/90 hover:text-white-1",
                      )}
                    >
                      {category}
                      <span
                        className={cn(
                          "ml-1.5 tabular-nums",
                          disabled && "text-white-1/25",
                          !disabled &&
                            isActive &&
                            "text-blue-2",
                          !disabled &&
                            !isActive &&
                            "text-white-1/55",
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length === 0 ? (
              <div
                className={cn(
                  "col-span-full rounded-xl border border-blue-7/30 bg-blue-10/40 px-6 py-14 text-center",
                  fontInter.className,
                )}
              >
                <p className="text-base font-medium text-white-1">
                  Nothing in this category yet
                </p>
                <p className="mt-2 text-sm text-blue-3/75">
                  Try another filter or view all projects.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={cn(
                    filterChipBase,
                    "mt-6 border-blue-5 bg-blue-7 px-5 py-2.5 text-white-1 shadow-md ring-1 ring-blue-5/50 hover:bg-blue-8",
                    fontInter.className,
                  )}
                >
                  Show all projects
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project.id} className="flex justify-center">
                  <Project
                    id={project.id}
                    isExpanded={expandedProjectId === project.id}
                    onExpand={handleExpandProject}
                    showCategoryPills
                    className="max-w-full flex-grow-0 transition-transform duration-300 hover:scale-[1.02] sm:max-w-md lg:max-w-sm"
                  />
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Expanded project modal */}
      {expandedProject &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setExpandedProjectId(-1)}
            role="dialog"
            aria-modal="true"
            aria-label="Project gallery"
          >
            <div
              className="relative flex max-h-[90vh] max-w-[90vw] flex-col overflow-auto rounded-lg bg-blue-9 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setExpandedProjectId(-1)}
                className="absolute right-2 top-2 z-[30] flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white-1 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-8"
                aria-label="Close"
              >
                <span className="text-xl leading-none" aria-hidden>
                  ×
                </span>
              </button>
              <ProjectImageCarousel
                key={expandedProject.id}
                images={expandedProject.images}
                title={expandedProject.title}
              />
              <div className="p-4 sm:p-6">
                <h2
                  className={cn(
                    "mb-2 text-xl font-bold text-white-1 lg:text-2xl",
                    fontJersey15.className,
                  )}
                >
                  {expandedProject.title}
                </h2>
                {expandedProject.categories.length > 0 && (
                  <div
                    className={cn(
                      "mb-3 flex flex-wrap gap-2",
                      fontInter.className,
                    )}
                  >
                    {expandedProject.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white-1/90"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
                <p
                  className={cn(
                    "text-sm leading-relaxed text-white-1/90 lg:text-base",
                    fontInter.className,
                  )}
                >
                  {expandedProject.description}
                </p>
                <ProjectOutboundLink project={expandedProject} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
