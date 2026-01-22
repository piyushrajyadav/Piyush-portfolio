import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import Image from "next/image";

import { projects } from "../constants";
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
  return (
    <section className="xl:my-36 md:mx-36 p-8 " id="projects">
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
          From AI-powered tools to published npm packages, each project solves real problems. 
          Featured projects have gained traction with international users and recognition on platforms 
          like Product Hunt. Click the rocket to see live demos or GitHub icon for source code.
        </motion.p>
      </div>

      <div className="md:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Works;
