import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function XCard({
  link = "https://x.com",
  authorName = "Piyush Yadav",
  authorHandle = "piyushrajyadav",
  authorImage = "/assets/company/alphaxine_logo.jpeg",
  content = [
    "Orchestrated 400+ secure RESTful APIs with RBAC authentication.",
    "Engineered production ERP suite serving 500+ employees in multi-tenant SaaS.",
  ],
  isVerified = true,
  timestamp = "March 2025 - Present",
  reply = null,
}) {
  return (
    <div
      className={cn(
        "w-full p-1.5 rounded-2xl md:rounded-3xl relative isolate overflow-hidden",
        "bg-white/95 dark:bg-[#090a12]/95",
        "bg-gradient-to-br from-purple-500/20 via-slate-200/50 to-teal-400/20 dark:from-purple-500/30 dark:via-white/[0.04] dark:to-teal-400/20",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "border border-slate-200/80 dark:border-white/10",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        "will-change-transform translate-z-0"
      )}
    >
      <div
        className={cn(
          "w-full p-6 md:p-8 rounded-xl md:rounded-2xl relative",
          "bg-white/90 dark:bg-[#0c0d18]/90",
          "backdrop-blur-md backdrop-saturate-150",
          "border border-slate-200/80 dark:border-white/[0.06]",
          "text-slate-900 dark:text-white",
          "shadow-sm",
          "will-change-transform translate-z-0"
        )}
      >
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-xl overflow-hidden bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 p-1">
              <img
                src={authorImage}
                alt={authorName}
                className="h-full w-full object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                    {authorName}
                  </span>
                  {isVerified && (
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-purple-600 dark:text-teal-400 text-xs font-semibold">
                  @{authorHandle}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-white/[0.06] text-purple-700 dark:text-teal-300 border border-purple-200 dark:border-white/10">
                {timestamp}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {content.map((item, index) => (
            <p
              key={index}
              className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed"
            >
              • {item}
            </p>
          ))}
        </div>

        {reply && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="h-9 w-9 rounded-lg overflow-hidden bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 p-0.5">
                  <img
                    src={reply.authorImage}
                    alt={reply.authorName}
                    className="h-full w-full object-contain rounded-md"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-slate-900 dark:text-white">
                    {reply.authorName}
                  </span>
                  {reply.isVerified && (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  )}
                  <span className="text-slate-400 text-[11px]">
                    @{reply.authorHandle}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-gray-300 text-xs mt-0.5">
                  {reply.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { XCard };
