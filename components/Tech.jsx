import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { clsx } from "clsx";

import { services } from "../constants";
import { textVariant } from "@/utils/motion";
import { MovingBorderCard } from "@/components/ui/moving-border";

function BentoSkillCard({ service, index, isActive, onSelect }) {
  // Row 1: 2 cards (6 + 6 cols)
  // Row 2: 3 cards (4 + 4 + 4 cols)
  const getColSpan = () => {
    switch (index) {
      case 0:
        return "col-span-12 lg:col-span-6";
      case 1:
        return "col-span-12 lg:col-span-6";
      case 2:
        return "col-span-12 md:col-span-4 lg:col-span-4";
      case 3:
        return "col-span-12 md:col-span-4 lg:col-span-4";
      case 4:
        return "col-span-12 md:col-span-4 lg:col-span-4";
      default:
        return "col-span-12 lg:col-span-4";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={clsx(getColSpan(), "relative flex w-full")}
    >
      <MovingBorderCard
        borderRadius="1.5rem"
        duration={8000}
        borderClassName="h-32 w-32 opacity-[0.7] group-hover:opacity-[0.95] bg-[radial-gradient(#6366f1_40%,transparent_60%)]"
        containerClassName="w-full h-full cursor-pointer select-none"
        onClick={() => onSelect(service.id)}
      >
        <div
          className={clsx(
            "group relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl md:rounded-3xl p-5 sm:p-6 transition-all duration-300",
            "bg-white/95 dark:bg-[#0c0e1a]/95 backdrop-blur-2xl border",
            isActive
              ? "border-indigo-500/70 shadow-lg dark:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
              : "border-slate-200/90 dark:border-white/[0.08] hover:border-indigo-500/40",
            "dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]"
          )}
        >
          {/* Subtle interior laser grid & ambient glow */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.08] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />

          {/* Top Bento Header: Role Domain Eyebrow + Icon + Title */}
          <div className="relative z-10">
            <div className="flex items-center gap-3.5 mb-2.5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50/90 dark:bg-white/[0.08] border border-indigo-200 dark:border-white/[0.15] p-2.5 text-indigo-600 dark:text-cyan-400 group-hover:scale-105 group-hover:border-indigo-400/60 transition-all shadow-xs shrink-0 [&>svg]:w-6 [&>svg]:h-6 [&>svg]:object-contain">
                {service.icon}
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-indigo-600 dark:text-cyan-400 uppercase block">
                  {service.subtitle.split("•")[0]?.trim() || "Core Discipline"}
                </span>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-gray-300 font-normal line-clamp-3">
              {service.description}
            </p>
          </div>

          {/* Bottom Bento Section: Tech Stack Badges with Official Logos */}
          <div className="relative z-10 mt-4 pt-3.5 border-t border-slate-200/80 dark:border-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              {service.techStack?.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/[0.1] group-hover:border-indigo-400/40 dark:group-hover:border-indigo-500/40 transition-colors shadow-2xs"
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
                  <span className="text-xs font-medium text-slate-700 dark:text-gray-200">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MovingBorderCard>
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
        <p className="sectionSubText">Technical Expertise & Capabilities</p>
        <h2 className="sectionHeadText">Roles & Skills.</h2>
      </motion.div>

      {/* 2-Row Bento Grid: Row 1 (2 cards) | Row 2 (3 cards: Frontend, Backend, DevOps) */}
      <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        {services.map((service, index) => (
          <BentoSkillCard
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
