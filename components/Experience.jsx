import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../constants";
import { textVariant } from "../utils/motion";
import { MovingBorderCard } from "@/components/ui/moving-border";

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
        className="mb-10 md:mb-14"
      >
        <p className="sectionSubText">Engineering Journey & Industry Roles</p>
        <h2 className="sectionHeadText">Work Experience.</h2>
      </motion.div>

      {/* Split Interactive Experience Suite */}
      <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Interactive Organization Selector */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-1 pl-1">
            Career Milestones
          </p>

          <div className="space-y-3">
            {experiences.map((exp, idx) => {
              const isActive = activeTab === idx;
              const isItemPresent = exp.date.toLowerCase().includes("present");

              return (
                <div
                  key={`${exp.company_name}-tab`}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative p-4 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer select-none border ${
                    isActive
                      ? "border-gray-300 dark:border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.05)] -translate-y-0.5 bg-white/95 dark:bg-[#0c0e1a]/95"
                      : "border-gray-100/80 dark:border-white/10 bg-white/95 dark:bg-[#0c0e1a]/95 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)] hover:-translate-y-0.5"
                  } backdrop-blur-2xl will-change-transform`}
                >
                  {/* Micro-Dots Pattern from Bento Grid */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:4px_4px]" />
                  </div>

                  {/* Gradient Glow Layer */}
                  <div
                    className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    } transition-opacity duration-300`}
                  />

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Company Logo in Bento-Style Container */}
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 p-1.5 shrink-0 border border-black/5 dark:border-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                        <div className="w-full h-full relative">
                          <Image
                            src={exp.icon}
                            alt={exp.company_name}
                            fill={true}
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 tracking-tight truncate">
                          {exp.company_name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-normal truncate">
                          {exp.title}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm shrink-0 transition-colors duration-300 ${
                        isItemPresent
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                      }`}
                    >
                      {isItemPresent ? "Active" : exp.date.split("-")[0]?.trim()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Study Card Wrapped in MovingBorderCard */}
        <div className="col-span-12 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeExp.company_name}-${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <MovingBorderCard
                borderRadius="1.5rem"
                duration={8000}
                borderClassName="h-32 w-32 opacity-[0.7] group-hover:opacity-[0.95] bg-[radial-gradient(#6366f1_40%,transparent_60%)]"
                containerClassName="w-full h-full"
              >
                <div className="group relative h-full w-full rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-9 bg-white/95 dark:bg-[#0c0e1a]/95 backdrop-blur-2xl border border-gray-100/80 dark:border-white/10 overflow-hidden shadow-lg transition-all duration-300">
                  {/* Micro-Dots Matrix Pattern from Bento Grid */}
                  <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
                  </div>

                  {/* Gradient Glow Layer */}
                  <div className="absolute inset-0 -z-10 rounded-2xl md:rounded-3xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 opacity-100" />

                  <div className="relative z-10 space-y-6">
                    {/* Header: Logo, Title, Meta & Duration */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 p-2 shrink-0 border border-black/5 dark:border-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                          <div className="w-full h-full relative">
                            <Image
                              src={activeExp.icon}
                              alt={activeExp.company_name}
                              fill={true}
                              sizes="48px"
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-lg sm:text-xl">
                            {activeExp.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-semibold text-indigo-600 dark:text-cyan-400">
                              {activeExp.company_name}
                            </span>
                            {activeExp.location && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                                • {activeExp.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Pill */}
                      <span
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm shrink-0 w-fit ${
                          isPresent
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-black/5 dark:border-white/10"
                        }`}
                      >
                        {activeExp.date}
                      </span>
                    </div>

                    {/* Highlight Metrics */}
                    {activeExp.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {activeExp.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 shrink-0" />
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Deliverables / Points */}
                    <div className="space-y-3">
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Key Responsibilities & Deliverables
                      </p>
                      <ul className="space-y-2.5">
                        {activeExp.points.map((point, i) => (
                          <li
                            key={`deliverable-${i}`}
                            className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 shrink-0 mt-2" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Chips at Bottom */}
                    {activeExp.techStack && (
                      <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {activeExp.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 text-xs text-gray-500 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/20"
                            >
                              #{tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </MovingBorderCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Experience;
