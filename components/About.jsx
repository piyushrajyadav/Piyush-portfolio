import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { socials } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import EmailIcon from "./../public/assets/icons/email.svg";

function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("piyushyadavrajyadav@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="w-full md:w-[60%] lg:w-[62%] flex flex-col justify-center"
      id="about"
    >
      {/* Section Header */}
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="sectionSubText text-slate-500 dark:text-gray-400">
          Introduction
        </p>
        <h2 className="sectionHeadText text-slate-900 dark:text-white">
          Overview.
        </h2>
      </motion.div>

      {/* Main Narrative & Storytelling */}
      <motion.div
        variants={fadeIn("up", "tween", 0.1, 0.8)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-4 flex flex-col gap-5 text-slate-700 dark:text-gray-300 text-base md:text-[17.5px] leading-relaxed"
      >
        {/* Story Paragraphs */}
        <div className="space-y-4 font-normal">
          <p>
            Hello! I&apos;m <span className="font-bold text-slate-900 dark:text-white">Piyush Yadav</span>, a Software Engineer & AI Builder with a relentless drive for transforming complex ideas into <span className="text-purple-600 dark:text-teal-400 font-semibold">high-performance digital software</span>. I live to build—whether it&apos;s crafting resilient distributed backends or engineering state-of-the-art autonomous AI systems.
          </p>

          <p>
            Currently pursuing Computer Science & Engineering at the <em>Institute of Engineering and Management (2027)</em>, my passion lives at the intersection of <span className="font-semibold text-slate-900 dark:text-white">scalability, sub-second latency, and cloud cost-efficiency</span>. In production, I orchestrated an enterprise-grade <span className="font-semibold text-slate-800 dark:text-gray-200">multi-tenant SaaS ERP suite</span> (HR, CRM, Projects, Finance) supporting 500+ active employees and governed 400+ secured REST APIs.
          </p>

          <p>
            On the AI frontier, building cutting-edge intelligence is what excites me most. I have built and shipped <span className="font-semibold text-slate-800 dark:text-gray-200">dozens of AI-native applications</span>—from <span className="font-semibold text-purple-600 dark:text-teal-400">statewide conversational voice agents handling thousands of daily calls</span> on GCP using <strong>LiveKit, LangGraph, and FastAPI</strong>, to autonomous multi-agent swarms, grounded RAG search engines, and automated voice-agent creation platforms.
          </p>

          <p>
            I love taking ambiguous problems, hacking from 0 to 1, cutting database query latency by 40%, and delivering software that doesn&apos;t just work, but wows the people who use it.
          </p>
        </div>

        {/* Action Strip: Two-Line Clean Hierarchy */}
        <div className="flex flex-col gap-3.5 pt-3 border-t border-slate-200 dark:border-white/[0.08]">
          {/* Row 1: Email Chip & Social Media Icons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Email Chip with Copy Action */}
            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] hover:border-purple-500 text-xs sm:text-sm font-medium text-slate-800 dark:text-gray-200 transition-all duration-200 cursor-pointer shadow-2xs"
              title="Click to copy email"
            >
              <EmailIcon className="w-4 h-4 text-purple-600 dark:text-teal-400" />
              <span className="truncate max-w-[190px] sm:max-w-none">piyushyadavrajyadav@gmail.com</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-white/10 text-purple-700 dark:text-teal-300 ml-1 shrink-0">
                {copied ? "✓ Copied!" : "Copy"}
              </span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <Link
                  href={social.link}
                  target="_blank"
                  key={social.id}
                  className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] hover:border-purple-500 flex items-center justify-center text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs cursor-pointer"
                  title={social.id}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Distinct, Eye-Catching Emerald-Cyan Shimmer Resume CTA Button */}
          <div className="w-fit pt-1">
            <Link
              href="document/Piyush_Yadav_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="relative group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-slate-950 dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-teal-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden select-none border border-teal-300/40"
            >
              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 transition-transform bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

              {/* Document icon */}
              <svg
                className="w-4 h-4 text-slate-950 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>

              <span>View Full Resume</span>

              <span className="text-slate-950 font-black transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
