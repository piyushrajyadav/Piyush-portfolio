import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { openSourceContributions, openSourceCategories } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";
import GithubLogo from "./../public/assets/icons/github.svg";
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

/* Open Source Card Component */
function OpenSourceCard({ contribution, isGrid = false }) {
  return (
    <div
      className={`${
        isGrid ? "w-full" : "w-[350px] sm:w-[390px] md:w-[420px] flex-shrink-0"
      } h-[410px] flex flex-col select-none`}
    >
      <MovingBorderCard
        borderRadius="1.5rem"
        duration={8000}
        borderClassName="h-32 w-32 opacity-[0.7] group-hover:opacity-[0.95] bg-[radial-gradient(#6366f1_40%,transparent_60%)]"
        containerClassName="w-full h-full group"
      >
        <div className="relative h-full w-full rounded-2xl md:rounded-3xl p-5 sm:p-6 bg-white/95 dark:bg-[#0c0e1a]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden border border-slate-200/90 dark:border-white/[0.08] transition-colors duration-300 group-hover:border-indigo-500/40">
          {/* Subtle interior laser grid & ambient glow */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />

          <div>
            {/* Top Row: Org Logo + Highly Legible Repo Name & PR Number */}
            <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#14172b] border border-slate-200 dark:border-white/[0.12] p-1.5 shrink-0 flex items-center justify-center shadow-xs">
                  <div className="w-full h-full relative">
                    <Image
                      src={contribution.orgLogo}
                      alt={contribution.org}
                      fill={true}
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tracking-tight block truncate">
                    {contribution.repo}
                  </span>
                  <span className="text-xs text-indigo-600 dark:text-cyan-400 font-mono font-semibold block">
                    PR #{contribution.prNumber}
                  </span>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 shrink-0 font-mono">
                {contribution.org}
              </span>
            </div>

            {/* PR Title */}
            <div className="mt-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors duration-200 font-mono line-clamp-3">
                {contribution.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed font-normal line-clamp-4">
                {contribution.description}
              </p>
            </div>
          </div>

          {/* Bottom Area: Tech Tags & View PR Link */}
          <div className="relative z-10 mt-3 pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-col gap-2.5">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {contribution.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Direct GitHub PR Link Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-cyan-400 truncate max-w-[210px]">
                {contribution.highlightBadge}
              </span>

              <a
                href={contribution.prLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white/[0.08] hover:bg-indigo-600 dark:hover:bg-indigo-600 text-white text-xs font-semibold border border-slate-800 dark:border-white/10 hover:border-indigo-400 transition-all duration-200 shadow-xs hover:scale-105 cursor-pointer shrink-0"
                title="View Pull Request on GitHub"
              >
                <div className="w-3.5 h-3.5 relative shrink-0">
                  <GithubLogo className="w-full h-full" />
                </div>
                <span>View PR</span>
                <ExternalLinkIcon className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </MovingBorderCard>
    </div>
  );
}

function OpenSource() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredContributions =
    activeCategory === "all"
      ? openSourceContributions
      : openSourceContributions.filter(
          (item) => item.orgCategory === activeCategory
        );

  // If > 3 items, enable continuous marquee loop; if <= 3 items, render clean static grid
  const shouldMove = filteredContributions.length > 3;

  // Duplicate items for seamless continuous marquee loop if moving
  const marqueeItems = shouldMove
    ? Array(Math.max(4, Math.ceil(12 / filteredContributions.length)))
        .fill(filteredContributions)
        .flat()
    : filteredContributions;

  return (
    <section
      className="w-full my-16 md:my-28 relative z-10 overflow-hidden"
      id="opensource"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="sectionSubText">Open Source Engineering</p>
          <h2 className="sectionHeadText">Open Source Contributions.</h2>
        </motion.div>

        {/* Captivating Human Developer Narrative */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-3 text-sm md:text-base text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed font-normal"
        >
          I actively contribute to foundational open-source ecosystems—patching core runtime specifications in{" "}
          <strong className="text-indigo-600 dark:text-cyan-400 font-semibold">Node.js</strong>, eliminating distributed concurrency race conditions in{" "}
          <strong className="text-indigo-600 dark:text-cyan-400 font-semibold">Kubernetes</strong>, and building autonomous agent orchestration pipelines for{" "}
          <strong className="text-indigo-600 dark:text-cyan-400 font-semibold">Kiro by AWS</strong>.
        </motion.p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] backdrop-blur-xl w-fit mt-8">
          {openSourceCategories.map((category) => {
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

      {/* Contributions Display: Moving Marquee (> 3 items) vs Static Grid (<= 3 items) */}
      <AnimatePresence mode="wait">
        {shouldMove ? (
          /* > 3 Contributions: Continuous Moving Marquee */
          <motion.div
            key={`os-marquee-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="marquee-container relative w-full py-4 overflow-hidden"
          >
            {/* Left & Right Edge Gradient Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-bgPrimaryLight dark:from-bgPrimaryDark to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-bgPrimaryLight dark:from-bgPrimaryDark to-transparent z-20" />

            <div className="overflow-hidden w-full">
              <div className="animate-marquee-left flex gap-7 pl-6">
                {marqueeItems.map((contribution, idx) => (
                  <OpenSourceCard
                    key={`${contribution.id}-${idx}`}
                    contribution={contribution}
                    isGrid={false}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* <= 3 Contributions: Static, Clean Centered Grid */
          <motion.div
            key={`os-grid-${activeCategory}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredContributions.map((contribution) => (
                <div key={contribution.id} className="w-full">
                  <OpenSourceCard contribution={contribution} isGrid={true} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default OpenSource;
