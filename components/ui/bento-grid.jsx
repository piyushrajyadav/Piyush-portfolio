"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({ items, children, className = "" }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {children
        ? children
        : items?.map((item, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-5 rounded-2xl overflow-hidden transition-all duration-300",
                "border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0c0e1a]/95 backdrop-blur-xl",
                "hover:shadow-lg hover:border-indigo-500/40",
                "hover:-translate-y-0.5 will-change-transform",
                item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                {
                  "shadow-md -translate-y-0.5 border-indigo-500/40": item.hasPersistentHover,
                }
              )}
            >
              {/* Background Micro-Dots Matrix */}
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-300 pointer-events-none",
                  item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[length:6px_6px]" />
              </div>

              <div className="relative flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  {item.icon && (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 group-hover:border-indigo-400/40 transition-colors">
                      {item.icon}
                    </div>
                  )}
                  {item.status && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-indigo-600 dark:text-cyan-400">
                      {item.status}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
                    {item.title}
                    {item.meta && (
                      <span className="ml-2 text-xs text-slate-500 dark:text-gray-400 font-normal font-mono">
                        {item.meta}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.children}

                {item.tags && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {item.cta && (
                      <span className="text-xs font-semibold text-indigo-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                        {item.cta}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
    </div>
  );
}

export default BentoGrid;
