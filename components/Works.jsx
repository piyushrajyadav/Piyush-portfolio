import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { projects, projectCategories } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import truncateText from "@/utils/truncate";
import GithubLogo from "./../public/assets/icons/github.svg";
import RocketLogo from "./../public/assets/icons/rocket.svg";
import { MovingBorderCard } from "@/components/ui/moving-border";

/* External Link Arrow SVG */
function ExternalLinkIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* Detailed Project Deep-Dive Modal (Portal Mounted Globally to Body) */
function ProjectModal({ project, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!mounted || !project) return null;

  const hasLiveLink = Boolean(project.deployed_link && project.deployed_link.trim() !== "");
  const hasSourceLink = Boolean(project.source_code_link && project.source_code_link.trim() !== "");

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dim & Blur Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-xl max-h-[85vh] bg-white dark:bg-[#0c0e1a] rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/[0.15] shadow-2xl overflow-hidden flex flex-col z-10 my-auto"
      >
        {/* Fixed Header with Category & Prominent Close (X) Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-white/95 dark:bg-[#0c0e1a]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider bg-slate-100 dark:bg-white/[0.06] text-indigo-600 dark:text-cyan-400 rounded-md border border-slate-200 dark:border-white/[0.08]">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-gray-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
            title="Close details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Project Image Frame */}
          <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08]">
            <Image
              src={project.image}
              alt={project.name}
              fill={true}
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug font-mono">
              {project.name}
            </h2>

            {/* In-depth Description */}
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Technology Badges */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08]">
            <h4 className="text-[11px] font-mono font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Technologies & Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags?.map((tag) => (
                <span
                  key={`${project.name}-${tag.name}`}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-gray-200"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-end gap-2.5">
            {hasSourceLink && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-semibold border border-slate-200 dark:border-white/10 transition-all shadow-xs cursor-pointer"
              >
                <div className="w-3.5 h-3.5 relative shrink-0">
                  <GithubLogo className="w-full h-full" />
                </div>
                <span>View Source</span>
                <ExternalLinkIcon className="w-3 h-3 opacity-70" />
              </a>
            )}

            {hasLiveLink && (
              <a
                href={project.deployed_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
              >
                <div className="w-3.5 h-3.5 relative shrink-0">
                  <RocketLogo className="w-full h-full" />
                </div>
                <span>Launch Live App</span>
                <ExternalLinkIcon className="w-3 h-3 text-white/80" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

/* Compact Futuristic Project Card Component */
function FuturisticProjectCard({
  project,
  onSelectProject,
  isGrid = false,
}) {
  const { name, description, tags, image, category } = project;
  const CHAR_LIMIT = 85;

  return (
    <div
      onClick={() => onSelectProject(project)}
      className={`${
        isGrid ? "w-full" : "w-[300px] sm:w-[330px] md:w-[350px] flex-shrink-0"
      } h-[330px] flex flex-col select-none cursor-pointer group`}
    >
      <MovingBorderCard
        borderRadius="1.5rem"
        duration={8000}
        borderClassName="h-32 w-32 opacity-[0.7] group-hover:opacity-[0.95] bg-[radial-gradient(#6366f1_40%,transparent_60%)]"
        containerClassName="w-full h-full"
      >
        <div className="relative h-full w-full rounded-2xl md:rounded-3xl p-4 bg-white/95 dark:bg-[#0c0e1a]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden border border-slate-200/90 dark:border-white/[0.08] group-hover:border-indigo-500/40 transition-colors">
          {/* Ambient Glow Spotlight on Hover */}
          <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />

          <div>
            {/* Top Bar: Terminal Lights + Category */}
            <div className="relative z-10 flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 group-hover:bg-emerald-500 transition-colors animate-pulse" />
                <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                  {category}
                </span>
              </div>

              <span className="text-[11px] font-semibold text-indigo-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform font-mono">
                Details →
              </span>
            </div>

            {/* Project Thumbnail */}
            <div className="relative w-full h-[120px] overflow-hidden rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] group-hover:border-indigo-400/40 transition-colors">
              <Image
                src={image}
                alt={name}
                fill={true}
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Title & Short Teaser */}
            <div className="mt-2.5">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors duration-200 truncate font-mono">
                {name}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-normal line-clamp-2">
                {truncateText(description, CHAR_LIMIT)}
              </p>
            </div>
          </div>

          {/* Bottom Area: Tags */}
          <div className="relative z-10 mt-2 pt-2 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between gap-1.5">
            <div className="flex flex-wrap gap-1">
              {tags?.slice(0, 3).map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-gray-300"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <span className="text-[10px] text-slate-400 dark:text-gray-500 font-mono">
              Click to view
            </span>
          </div>
        </div>
      </MovingBorderCard>
    </div>
  );
}

function Works() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Strictly filter only projects that belong to the active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((item) => item.category === activeCategory);

  // If more than 3 projects, we enable moving marquee; if <= 3 projects, we show a clean static grid
  const shouldMove = filteredProjects.length > 3;

  // Duplicate items for seamless continuous marquee loop if moving
  const marqueeItems = shouldMove
    ? Array(Math.max(4, Math.ceil(12 / filteredProjects.length)))
        .fill(filteredProjects)
        .flat()
    : filteredProjects;

  return (
    <section
      className="w-full my-16 md:my-28 relative z-10 overflow-hidden"
      id="works"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="sectionSubText">My Work</p>
          <h2 className="sectionHeadText">Projects.</h2>
        </motion.div>

        {/* Section Subtext */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-3 text-sm md:text-base text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed font-normal"
        >
          Explore a curated collection of production systems, AI-native platforms, and high-throughput backends. Click any card to read its full story, architecture, and live deployment.
        </motion.p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] backdrop-blur-xl w-fit mt-8">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-md font-semibold scale-[1.02]"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Display: Conditional Moving Marquee vs Static Grid */}
      <AnimatePresence mode="wait">
        {shouldMove ? (
          /* > 3 Projects: 1 Continuous Moving Row with Pause on Hover */
          <motion.div
            key={`marquee-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="marquee-container relative w-full py-4 overflow-hidden"
          >
            {/* Left & Right Edge Gradient Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-bgPrimaryLight dark:from-bgPrimaryDark to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-bgPrimaryLight dark:from-bgPrimaryDark to-transparent z-20" />

            <div className="overflow-hidden w-full">
              <div className="animate-marquee-left-projects flex gap-7 pl-6">
                {marqueeItems.map((project, idx) => (
                  <FuturisticProjectCard
                    key={`${project.name}-${idx}`}
                    project={project}
                    onSelectProject={setSelectedProject}
                    isGrid={false}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* <= 3 Projects: Static, Clean Responsive Grid (No Movement) */
          <motion.div
            key={`grid-${activeCategory}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project) => (
                <div key={project.name} className="w-full">
                  <FuturisticProjectCard
                    project={project}
                    onSelectProject={setSelectedProject}
                    isGrid={true}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Deep-Dive Modal Overlay (Portal Mounted) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Works;
