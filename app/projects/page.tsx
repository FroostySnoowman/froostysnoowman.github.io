"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Project from "../components/Project";
import { fontJersey15, fontInter } from "@/lib/font";
import { cn } from "@/lib/utils";
import projectsEn from "../../lang/data-projects-en";
import "../style/projects-parallax.css";

const PARALLAX_HEIGHT = 1000;
const LAYER_COUNT = 9;

export default function ProjectsPage() {
  const [expandedProjectId, setExpandedProjectId] = useState(-1);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-blue-9 dark:bg-blue-4">
      {/* Back to home */}
      <div className="fixed left-4 top-4 z-50">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/20 bg-blue-9/90 px-4 py-2.5 text-sm font-medium text-white-1 shadow-lg backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-blue-8/90 hover:text-white-1",
            fontInter.className,
          )}
        >
          <span aria-hidden>←</span> Back to home
        </Link>
      </div>

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

      {/* Solid panel (matches home page #00131c): covers parallax below the fold */}
      <div
        className="relative z-10 min-h-screen w-full"
        style={{ backgroundColor: "#00131c" }}
      >
        {/* Projects grid (scrolls up after parallax) */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projectsEn.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="flex justify-center"
              >
                <Project
                  id={project.id}
                  isExpanded={expandedProjectId === project.id}
                  onExpand={handleExpandProject}
                  className="max-w-full flex-grow-0 transition-transform duration-300 hover:scale-[1.02] sm:max-w-md lg:max-w-sm"
                />
              </motion.div>
            ))}
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
                <span className="text-xl leading-none" aria-hidden>
                  ×
                </span>
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
    </div>
  );
}
