import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../constants";
import { textVariant } from "../utils/motion";
import { GlowingShadow } from "@/components/ui/glowing-shadow";

/* Refined, Elegant Top-Right Corner Grid Mesh (Subtle Blocks & Attractive Clean Lines) */
function CornerGridMesh() {
  return (
    <div className="pointer-events-none absolute top-0 right-0 w-[240px] sm:w-[300px] md:w-[360px] h-[160px] sm:h-[200px] md:h-[240px] overflow-hidden select-none z-0 [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_75%)]">
      <svg
        className="w-full h-full text-slate-300/60 dark:text-white/[0.12]"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="corner-grid-pattern"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        {/* Base Crisp Grid */}
        <rect width="100%" height="100%" fill="url(#corner-grid-pattern)" />

        {/* Soft, Subtle Shaded Checkered Tiles in Far Top-Right (Non-Intrusive) */}
        <g className="fill-purple-500/[0.08] dark:fill-purple-400/[0.12]">
          <rect x="216" y="0" width="24" height="24" />
          <rect x="264" y="0" width="24" height="24" />
          <rect x="240" y="24" width="24" height="24" />
          <rect x="288" y="24" width="24" height="24" />
          <rect x="264" y="48" width="24" height="24" />
        </g>
        <g className="fill-teal-400/[0.08] dark:fill-teal-300/[0.12]">
          <rect x="240" y="0" width="24" height="24" />
          <rect x="216" y="24" width="24" height="24" />
          <rect x="264" y="24" width="24" height="24" />
          <rect x="288" y="48" width="24" height="24" />
          <rect x="240" y="48" width="24" height="24" />
        </g>
      </svg>
    </div>
  );
}

function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const activeExp = experiences[activeTab] || experiences[0];
  const isPresent = activeExp.date.toLowerCase().includes("present");

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 my-16 md:my-28 relative z-10" id="work">
      {/* Section Header */}
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-12 md:mb-16"
      >
        <p className="sectionSubText text-slate-500 dark:text-gray-300">Engineering Journey & Industry Roles</p>
        <h2 className="sectionHeadText text-slate-900 dark:text-white">Work Experience.</h2>
      </motion.div>

      {/* Split Interactive Experience Suite */}
      <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Interactive Organization Selector */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2 pl-1">
              Select Career Milestone
            </p>

            {experiences.map((exp, idx) => {
              const isActive = activeTab === idx;
              const isItemPresent = exp.date.toLowerCase().includes("present");

              return (
                <button
                  key={`${exp.company_name}-tab`}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 relative flex items-center justify-between gap-3 border select-none cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-[#111226] border-purple-500/80 dark:border-purple-500/70 shadow-lg shadow-purple-500/10 scale-[1.015]"
                      : "bg-slate-100/80 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.06] hover:bg-slate-200/60 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {/* Left Active Glow Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-teal-400 rounded-r-full shadow-[0_0_10px_rgba(128,77,238,0.8)]" />
                  )}

                  <div className="flex items-center gap-3 pl-1">
                    {/* Index Number */}
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? "text-purple-600 dark:text-teal-400" : "text-slate-400 dark:text-gray-500"
                      }`}
                    >
                      0{idx + 1}
                    </span>

                    {/* Company Logo Icon */}
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-black/40 border border-slate-200 dark:border-white/[0.1] p-1 shrink-0 flex items-center justify-center shadow-2xs">
                      <div className="w-full h-full relative rounded-lg overflow-hidden">
                        <Image
                          src={exp.icon}
                          alt={exp.company_name}
                          fill={true}
                          sizes="40px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div>
                      <h4
                        className={`text-sm md:text-base font-bold tracking-tight line-clamp-1 transition-colors ${
                          isActive
                            ? "text-purple-700 dark:text-white font-extrabold"
                            : "text-slate-700 dark:text-gray-300"
                        }`}
                      >
                        {exp.company_name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {exp.title}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {isItemPresent ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400 dark:text-gray-500 shrink-0">
                      {exp.date.split("-")[0]?.trim()}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Study Card with Subtle Corner Grid Accent */}
        <div className="col-span-12 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeExp.company_name}-${activeTab}`}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              <GlowingShadow>
                <div className="relative h-full w-full rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 bg-white/95 dark:bg-[#0b0c16]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/[0.08] overflow-hidden">
                  {/* Refined Top-Right Corner Grid Pattern (Subtle, Clean Lines) */}
                  <CornerGridMesh />

                  <div className="relative z-10">
                    {/* Header: Company Avatar + Role Title + Duration + Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#121324] border border-slate-200 dark:border-white/[0.15] p-2 shadow-md shrink-0 flex items-center justify-center">
                          <div className="w-full h-full relative rounded-xl overflow-hidden">
                            <Image
                              src={activeExp.icon}
                              alt={activeExp.company_name}
                              fill={true}
                              sizes="56px"
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                              {activeExp.title}
                            </h3>
                            <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                              ✓
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm md:text-base font-semibold text-purple-600 dark:text-teal-400">
                              {activeExp.company_name}
                            </span>
                            {activeExp.location && (
                              <span className="text-xs text-slate-500 dark:text-gray-400">
                                • {activeExp.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Duration Badge with Glass Backdrop */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md shrink-0 z-10 ${
                          isPresent
                            ? "bg-emerald-50/90 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40 shadow-xs"
                            : "bg-purple-50/90 dark:bg-white/[0.08] text-purple-700 dark:text-teal-300 border-purple-200 dark:border-white/[0.15]"
                        }`}
                      >
                        {isPresent && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {activeExp.date}
                      </span>
                    </div>

                    {/* Highlight Metrics Bar */}
                    {activeExp.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
                        {activeExp.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50/80 dark:bg-white/[0.03] border border-purple-200/80 dark:border-white/[0.06] hover:border-purple-400/50 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 shrink-0" />
                            <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-gray-200">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    {activeExp.techStack && (
                      <div className="mb-6">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400 mb-2.5">
                          Key Technologies & Infrastructure
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeExp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-medium px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-gray-200 shadow-2xs hover:border-purple-400/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Engineering Deliverables & Responsibilities */}
                    <div className="pt-5 border-t border-slate-200 dark:border-white/[0.08]">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400 mb-3.5">
                        Key Responsibilities & Production Impact
                      </p>
                      <ul className="space-y-3.5">
                        {activeExp.points.map((point, i) => (
                          <li
                            key={`deliverable-${i}`}
                            className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-normal"
                          >
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(128,77,238,0.6)]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </GlowingShadow>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Experience;
