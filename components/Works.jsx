import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

import { projects, projectCategories } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import truncateText from "@/utils/truncate";
import GithubLogo from "./../public/assets/icons/github.svg";
import RocketLogo from "./../public/assets/icons/rocket.svg";

function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  deployed_link,
  featured,
}) {
  const CHAR_LIMIT = 280;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX="8"
        tiltMaxAngleY="8"
        scale={1.02}
        transitionSpeed={450}
        className={`dark:bg-bgSecondaryDark bg-bgSecondaryLight p-5 rounded-2xl w-full h-full min-h-[590px] shadow-sm hover:shadow-lg transition-shadow duration-300 ${
          featured
            ? "shadow-primary ring-1 ring-primary/20"
            : "shadow-primary/50"
        }`}
      >
        {featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary to-tertiary text-white rounded-full shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}
        <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
          <motion.div 
            className="w-full h-full object-cover relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              alt="project_image"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
              className="object-cover"
            />
          </motion.div>

          {deployed_link && (
            <div className="absolute inset-0 flex justify-start m-3 card-img_hover">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(deployed_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-primary/50 transition-shadow"
              >
                <RocketLogo className="w-1/2 h-1/2 mr-[2px] z-10" />
              </motion.div>
            </div>
          )}
          {source_code_link && (
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-white/30 transition-shadow"
              >
                <GithubLogo className="w-2/3 h-2/3 z-10" />
              </motion.div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="dark:text-ctnPrimaryDark text-ctnPrimaryLight font-bold text-[22px] leading-tight hover:text-primary transition-colors duration-200">
            {name}
          </h3>
          <p className="mt-3 dark:text-ctnSecondaryDark text-ctnSecondaryLight text-[14px] leading-relaxed">
            {truncateText(description, CHAR_LIMIT)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={`${name}-${tag.name}`}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`text-[13px] font-medium ${tag.color} cursor-default`}
            >
              #{tag.name}
            </motion.span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
}

function Works() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Split ALL projects into two rows for carousel (not filtered)
  const allProjects = projects;
  const midPoint = Math.ceil(allProjects.length / 2);
  const firstRow = allProjects.slice(0, midPoint);
  const secondRow = allProjects.slice(midPoint);

  return (
    <div className="xl:my-36 md:mx-36 p-8" id="projects">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className={"sectionSubText"}>My work</p>
        <h2 className={"sectionHeadText"}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 dark:text-ctnSecondaryDark text-ctnSecondaryLight text-[17px] max-w-3xl leading-[30px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          From systems engineering to AI and web applications, each project demonstrates 
          real-world engineering. Featured projects have gained international traction with 100+ developers, 
          Product Hunt recognition, and PyPI/NPM publications. Toggle between categories or view all in the sliding showcase.
        </motion.p>
      </div>

      {/* Category Tabs */}
      <motion.div 
        className="mt-10 flex flex-wrap gap-3 justify-center md:justify-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {projectCategories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-primary to-tertiary text-white shadow-lg shadow-primary/50 scale-105"
                : "dark:bg-bgSecondaryDark bg-bgSecondaryLight dark:text-ctnSecondaryDark text-ctnSecondaryLight hover:shadow-md hover:scale-105"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Display */}
      <AnimatePresence mode="wait">
        {activeCategory === "all" ? (
          // Sliding carousel for "All Projects" - Faster with drag support
          <motion.div
            key="all-projects-carousel"
            className="md:mt-12 mt-8 space-y-8 overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r dark:from-bgPrimaryDark from-bgPrimaryLight to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l dark:from-bgPrimaryDark from-bgPrimaryLight to-transparent z-10 pointer-events-none" />

            {/* First Row - Slides Left faster */}
            <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div
                className="flex gap-7"
                drag="x"
                dragConstraints={{ left: -2000, right: 0 }}
                dragElastic={0.1}
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {[...firstRow, ...firstRow].map((project, index) => (
                  <motion.div 
                    key={`row1-${index}`} 
                    className="flex-shrink-0 w-[350px]"
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <ProjectCard index={index} {...project} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Second Row - Slides Right faster */}
            <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div
                className="flex gap-7"
                drag="x"
                dragConstraints={{ left: -2000, right: 0 }}
                dragElastic={0.1}
                animate={{
                  x: ["-50%", "0%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 28,
                    ease: "linear",
                  },
                }}
              >
                {[...secondRow, ...secondRow].map((project, index) => (
                  <motion.div 
                    key={`row2-${index}`} 
                    className="flex-shrink-0 w-[350px]"
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <ProjectCard index={index} {...project} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Regular grid for specific categories with stagger animation
          <motion.div 
            key={activeCategory}
            className="md:mt-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`project-${activeCategory}-${index}`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <ProjectCard index={index} {...project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="dark:text-ctnSecondaryDark text-ctnSecondaryLight text-lg">
            No projects found in this category yet.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Works;
