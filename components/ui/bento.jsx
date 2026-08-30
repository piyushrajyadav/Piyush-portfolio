"use client";
import React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
  children,
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-2xl md:rounded-3xl",
        "bg-white/95 dark:bg-[#0c0e1a]/95 transform-gpu backdrop-blur-2xl border border-slate-200/90 dark:border-white/[0.1] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] shadow-sm",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/15"
      )}
    >
      {graphic && (
        <div className="relative h-44 sm:h-52 shrink-0 overflow-hidden bg-slate-100 dark:bg-[#121528]/80 border-b border-slate-200/80 dark:border-white/[0.06]">
          {graphic}
          {fade.includes("top") && (
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#0c0e1a] to-50% opacity-40 pointer-events-none" />
          )}
          {fade.includes("bottom") && (
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0c0e1a] to-50% opacity-40 pointer-events-none" />
          )}
        </div>
      )}

      <div className="relative p-6 sm:p-7 z-20 flex-1 flex flex-col justify-between">
        <div>
          {eyebrow && (
            <span className="text-xs font-mono font-semibold tracking-wider text-indigo-600 dark:text-cyan-400 uppercase block mb-1">
              {eyebrow}
            </span>
          )}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        {children && (
          <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-white/[0.06]">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function FUIBentoGridDark({ children }) {
  return (
    <div className="grid grid-cols-12 gap-5 md:gap-6 max-w-7xl mx-auto">
      {children}
    </div>
  );
}
