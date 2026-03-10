"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ParallaxLayer } from "@react-spring/parallax";
import Link from "next/link";
import Project from "./components/Project";
import { useOnScreen } from "./hooks/useOnScreen";
import { cn } from "@/lib/utils";
import projectsEn from "../lang/data-projects-en";
import Image from "next/image";
import { fontJersey15, fontInter } from "@/lib/font";

function Projects() {
  const [expandedProjectId, setExpandedProjectId] = useState(-1);

  const handleExpandProject = (id: number) => {
    setExpandedProjectId(expandedProjectId === id ? -1 : id);
  };

  const expandedProject = expandedProjectId !== -1
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

  const [project1Ref, project1Visible] = useOnScreen<HTMLDivElement>();
  const [project2Ref, project2Visible] = useOnScreen<HTMLDivElement>();
  const [project3Ref, project3Visible] = useOnScreen<HTMLDivElement>();

  return (
    <>
    <ParallaxLayer
      offset={2}
      speed={0}
      className="h-min-[600px] flex items-center justify-center bg-blue-9 dark:bg-blue-4"
    >
      <div className="flex h-full w-full flex-col justify-center lg:h-4/5 lg:min-h-[600px] lg:flex-row">
        <Project
          ref={project1Ref}
          id={1}
          isExpanded={expandedProjectId === 1}
          onExpand={handleExpandProject}
          className={cn(
            "transition-all duration-1000 ease-in-out hover:duration-300",
            project1Visible ? "" : "pointer-events-none opacity-0",
          )}
        />
        <Project
          ref={project2Ref}
          id={2}
          isExpanded={expandedProjectId === 2}
          onExpand={handleExpandProject}
          className={cn(
            "transition-all delay-300 duration-1000 ease-in-out hover:delay-0 hover:duration-300",
            project2Visible ? "" : "opacity-0",
          )}
        />
        <Project
          ref={project3Ref}
          id={3}
          isExpanded={expandedProjectId === 3}
          onExpand={handleExpandProject}
          className={cn(
            "transition-all delay-[600ms] duration-1000 ease-in-out hover:delay-0 hover:duration-300",
            project3Visible ? "" : "opacity-0",
          )}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/projects"
          className="relative inline-block p-[2px] transition-opacity hover:opacity-90"
        >
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-4 to-blue-5" />
          <span className="relative block rounded-[6px] bg-blue-9 px-8 py-3 text-xs font-semibold text-white-1 transition duration-200 hover:bg-transparent hover:text-blue-9 lg:text-base">
            View More
          </span>
        </Link>
      </div>
    </ParallaxLayer>

    {expandedProject &&
      typeof document !== "undefined" &&
      createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setExpandedProjectId(-1)}
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot"
        >
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col overflow-auto rounded-lg bg-blue-9 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedProjectId(-1)}
              className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white-1 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-8"
              aria-label="Close"
            >
              <span className="text-xl leading-none" aria-hidden>×</span>
            </button>
            <div className="relative h-[60vh] w-full max-w-[90vw] shrink-0 md:h-[70vh]">
              <Image
                src={expandedProject.image_path}
                alt=""
                placeholder="blur"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 1200px"
              />
            </div>
            <div className="p-4 sm:p-6">
              <h2
                className={cn(
                  "mb-2 text-xl font-bold text-white-1 lg:text-2xl",
                  fontJersey15.className,
                )}
              >
                {expandedProject.title}
              </h2>
              <p
                className={cn(
                  "text-sm leading-relaxed text-white-1/90 lg:text-base",
                  fontInter.className,
                )}
              >
                {expandedProject.description}
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

export default Projects;
