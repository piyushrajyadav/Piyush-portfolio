import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { services } from "../constants";
import { fadeIn, textVariant } from "@/utils/motion";

function BentoRoleCard({ service, index, isActive, onSelect }) {
  const getBentoSpan = () => {
    switch (service.id) {
      case "ai-engineer":
        return "col-span-12 lg:col-span-7 min-h-[300px]";
      case "software-developer":
        return "col-span-12 lg:col-span-5 min-h-[300px]";
      case "frontend-developer":
        return "col-span-12 sm:col-span-6 lg:col-span-4 min-h-[280px]";
      case "backend-developer":
        return "col-span-12 sm:col-span-6 lg:col-span-4 min-h-[280px]";
      case "devops-engineer":
        return "col-span-12 sm:col-span-12 lg:col-span-4 min-h-[280px]";
      default:
        return "col-span-12 sm:col-span-6 lg:col-span-4";
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", "tween", index * 0.08, 0.45)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`${getBentoSpan()} relative flex`}
    >
      <div
        onClick={() => onSelect(service.id)}
        className={`group relative w-full h-full cursor-pointer rounded-2xl md:rounded-3xl p-[1.5px] transition-all duration-300 ease-out select-none
          ${
            isActive
              ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 shadow-[0_0_30px_-5px_rgba(128,77,238,0.45)] scale-[1.01]"
              : "bg-gradient-to-br from-purple-400/50 via-indigo-400/30 to-teal-400/40 dark:from-purple-500/40 dark:via-white/[0.1] dark:to-teal-400/30 hover:from-purple-500 hover:to-teal-400 hover:scale-[1.015] shadow-md shadow-purple-500/5 dark:shadow-none"
          }`}
      >
        {/* Card Body */}
        <div
          className={`card moving-dot-card relative h-full w-full rounded-2xl md:rounded-3xl p-6 md:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300
            ${
              isActive
                ? "bg-white dark:bg-[#0c0d18] border border-purple-300 dark:border-purple-500/30 shadow-inner"
                : "bg-white/95 dark:bg-[#0a0a0f]/95 border border-slate-200/90 dark:border-white/[0.08] group-hover:bg-slate-50 dark:group-hover:bg-[#101124]"
            }`}
        >
          {/* Background Laser Grid Lines inside the Card */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.12] group-hover:opacity-[0.1] dark:group-hover:opacity-[0.18] transition-opacity duration-300 bg-[linear-gradient(to_right,#804dee_1px,transparent_1px),linear-gradient(to_bottom,#804dee_1px,transparent_1px)] bg-[size:28px_28px]"
          />

          {/* Precision Architectural Border Lines inside the card */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 dark:via-purple-400/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 dark:via-teal-400/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 dark:via-purple-400/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-teal-500/30 dark:via-teal-400/40 to-transparent" />

          {/* Subtle Ambient Radial Glow on Hover */}
          <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />

          {/* Top Row: 3D Glossy Icon + Title */}
          <div className="relative z-10 w-full flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* 3D Glass Icon Container (light & dark adaptive) */}
              <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-purple-50 dark:bg-gradient-to-b dark:from-white/[0.15] dark:to-white/[0.03] border border-purple-200/90 dark:border-white/[0.15] shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_20px_-4px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-purple-400/60 shrink-0">
                <div className="w-7 h-7 md:w-8 md:h-8 relative z-10 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
                  {service.icon}
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-teal-300 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-purple-600 dark:text-teal-400 tracking-wide mt-0.5">
                  {service.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Description */}
          <div className="relative z-10 my-4">
            <p className="text-[13px] md:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {/* Bottom: Tech Stack with Actual Logos/Icons */}
          <div className="relative z-10 flex flex-wrap gap-2 items-center">
            {service.techStack?.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/90 dark:border-white/[0.1] group-hover:border-purple-400/50 dark:group-hover:border-purple-500/40 group-hover:bg-purple-50/70 dark:group-hover:bg-white/[0.09] transition-all duration-200 shadow-2xs dark:shadow-none"
              >
                {tech.icon && (
                  <div className="w-4 h-4 relative shrink-0 flex items-center justify-center">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      fill={true}
                      className="object-contain"
                      sizes="16px"
                    />
                  </div>
                )}
                <span className="text-[11px] font-medium text-slate-700 dark:text-gray-200">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Tech() {
  const [selectedRoleId, setSelectedRoleId] = useState("ai-engineer");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 my-16 md:my-24 relative z-10" id="skills">
      {/* Section Header */}
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-8 md:mb-10"
      >
        <p className="sectionSubText text-slate-500 dark:text-gray-300">Technical Expertise & Capabilities</p>
        <h2 className="sectionHeadText text-slate-900 dark:text-white">Roles & Skills.</h2>
      </motion.div>

      {/* Unified Bento Grid with All Roles and Skills */}
      <div className="grid grid-cols-12 gap-5 md:gap-6">
        {services.map((service, index) => (
          <BentoRoleCard
            key={service.id || service.title}
            service={service}
            index={index}
            isActive={selectedRoleId === (service.id || service.title)}
            onSelect={(id) => setSelectedRoleId(id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Tech;
