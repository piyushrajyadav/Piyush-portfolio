import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { projects, projectCategories } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import truncateText from "@/utils/truncate";
import GithubLogo from "./../public/assets/icons/github.svg";
import RocketLogo from "./../public/assets/icons/rocket.svg";

function FuturisticProjectCard({
  name,
  description,
  tags,
  image,
  source_code_link,
  deployed_link,
  featured,
  category,
}) {
  const CHAR_LIMIT = 170;
  const hasLiveLink = Boolean(deployed_link && deployed_link.trim() !== "");
  const hasSourceLink = Boolean(source_code_link && source_code_link.trim() !== "");

  return (
    <div className="w-full h-full min-h-[470px] flex flex-col select-none">
      <div className="group relative w-full h-full rounded-2xl md:rounded-3xl p-[1.5px] bg-gradient-to-b from-purple-500/30 via-slate-200/50 to-teal-400/30 dark:from-purple-500/40 dark:via-white/[0.06] dark:to-teal-400/20 hover:from-purple-500 hover:via-indigo-500 hover:to-teal-400 transition-all duration-500 shadow-md hover:shadow-[0_0_30px_-5px_rgba(128,77,238,0.35)] flex flex-col justify-between overflow-hidden">
        {/* Card Interior */}
        <div className="relative h-full w-full rounded-2xl md:rounded-3xl p-5 md:p-6 bg-white/95 dark:bg-[#090a12]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden border border-slate-200/90 dark:border-white/[0.08]">
          {/* Cyber Corner Crosshairs */}
          <span className="pointer-events-none absolute top-2 left-2 text-[10px] text-purple-400/40 dark:text-purple-400/30 font-mono select-none">
            ⌜
          </span>
          <span className="pointer-events-none absolute top-2 right-2 text-[10px] text-teal-400/40 dark:text-teal-400/30 font-mono select-none">
            ⌝
          </span>
          <span className="pointer-events-none absolute bottom-2 left-2 text-[10px] text-purple-400/40 dark:text-purple-400/30 font-mono select-none">
            ⌞
          </span>
          <span className="pointer-events-none absolute bottom-2 right-2 text-[10px] text-teal-400/40 dark:text-teal-400/30 font-mono select-none">
            ⌟
          </span>

          {/* Ambient Glow Spotlight on Hover */}
          <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

          <div>
            {/* Top Bar: Terminal Status Lights + Category Badge */}
            <div className="relative z-10 flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500/80 group-hover:bg-rose-500 transition-colors" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80 group-hover:bg-amber-500 transition-colors" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 group-hover:bg-emerald-500 transition-colors animate-pulse" />
                <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-gray-400 ml-1.5 uppercase tracking-wider">
                  {category}
                </span>
              </div>

              {featured && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-xs">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Clean Project Image Frame (uncluttered) */}
            <div className="relative w-full h-[185px] overflow-hidden rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/[0.1] group-hover:border-purple-400/40 transition-colors">
              <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={image}
                  alt={name}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Title & Description */}
            <div className="mt-3.5">
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-teal-300 transition-colors duration-200 line-clamp-1">
                {name}
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-normal line-clamp-2">
                {truncateText(description, CHAR_LIMIT)}
              </p>
            </div>
          </div>

          {/* Bottom Section: Tags & Dedicated GitHub / Live Action Buttons */}
          <div className="relative z-10 mt-3 pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-col gap-3">
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5">
              {tags?.slice(0, 4).map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-gray-300"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            {/* Bottom Row: Direct Clickable GitHub & Live Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {hasSourceLink ? (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white/[0.08] hover:bg-purple-600 dark:hover:bg-purple-600 text-white text-xs font-semibold border border-slate-800 dark:border-white/10 hover:border-purple-400 transition-all duration-200 shadow-xs hover:scale-105 cursor-pointer"
                  title="View GitHub Repository"
                >
                  <div className="w-3.5 h-3.5 relative shrink-0">
                    <GithubLogo className="w-full h-full" />
                  </div>
                  <span>GitHub</span>
                </a>
              ) : (
                <span className="text-gray-400 text-[11px] font-mono">Proprietary</span>
              )}

              {hasLiveLink ? (
                <a
                  href={deployed_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 text-xs font-bold shadow-xs hover:shadow-teal-500/20 hover:scale-105 transition-all duration-200 cursor-pointer"
                  title="Open Live Application"
                >
                  <div className="w-3.5 h-3.5 relative shrink-0">
                    <RocketLogo className="w-full h-full" />
                  </div>
                  <span>Live App</span>
                </a>
              ) : (
                <span className="text-slate-400 dark:text-gray-500 text-[10px] font-mono">
                  CLI / Service
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Works() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Strictly filter only projects that belong to the active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // If more than 3 projects, we enable moving marquee; if <= 3 projects, we show a clean static grid
  const shouldMove = filteredProjects.length > 3;

  // Duplicate items for seamless continuous marquee loop if moving
  const marqueeItems = shouldMove
    ? Array(Math.max(4, Math.ceil(12 / filteredProjects.length)))
        .fill(filteredProjects)
        .flat()
    : filteredProjects;

  return (
    <section className="w-full my-16 md:my-28 relative z-10 overflow-hidden" id="projects">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="sectionSubText text-slate-500 dark:text-gray-300">Selected Work & Innovations</p>
          <h2 className="sectionHeadText text-slate-900 dark:text-white">Featured Projects.</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-3 text-sm md:text-base text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed"
        >
          Explore production-grade multi-agent AI frameworks, Kubernetes deployment engines, custom Git internal architectures, and published packages.
        </motion.p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] backdrop-blur-xl w-fit mt-8">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-md font-semibold scale-[1.02]"
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
              <div className="animate-marquee-left flex gap-7 pl-6">
                {marqueeItems.map((project, idx) => (
                  <div
                    key={`${project.name}-${idx}`}
                    className="w-[330px] sm:w-[370px] md:w-[400px] flex-shrink-0"
                  >
                    <FuturisticProjectCard {...project} />
                  </div>
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
                  <FuturisticProjectCard {...project} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Works;
