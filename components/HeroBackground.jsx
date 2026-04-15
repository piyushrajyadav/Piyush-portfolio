import Image from "next/image";
import { motion } from "framer-motion";

import Mountain1 from "../public/assets/background/mountain1.svg";
import Mountain2 from "../public/assets/background/mountain2.svg";
import Mountain3 from "../public/assets/background/mountain3.svg";
import Mountain5 from "../public/assets/background/mountain5.svg";
import HeroSvg from "../public/assets/background/hero-wave.svg";

function HeroBackground() {
  return (
    <div className="absolute top-0 w-full h-[100svh] bg-gradient-to-b from-opacity-[6.33%] dark:from-[#322d6d] from-[#b0afb1] to-opacity-[39.13%] dark:to-[#663182] to-[#51afda] overflow-hidden">
      {/* Mountain 1 - Continuous left movement with loop */}
      <motion.div
        animate={{
          x: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-full h-[446px] top-[170px]"
      >
        <Mountain1 className="w-full h-full" />
      </motion.div>

      {/* Mountain 2 - Continuous right movement with loop */}
      <motion.div
        animate={{
          x: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-full h-[464px] top-[160px]"
      >
        <Mountain2 className="w-full h-full" />
      </motion.div>

      {/* Blur layer */}
      <div className="absolute w-full h-[1503px] top-[-200px]">
        <Image
          src={"/assets/background/blur-layer.png"}
          alt="blur-layer"
          fill={true}
        />
      </div>

      {/* Mountain 3 - Slower continuous movement */}
      <motion.div
        animate={{
          x: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-full h-[408px] top-[347px]"
      >
        <Mountain3 className="w-full h-full" />
      </motion.div>

      {/* Mountain 5 - Static (under 3D model) */}
      <div className="absolute w-full h-[867px] md:top-[450px] top-[300px]">
        <Mountain5 className="w-full h-full" />
      </div>

      {/* Hero wave */}
      <HeroSvg className="absolute md:w-full w-full h-[1200px] md:top-[100dvh] md:left-0 top-[520px] dark:text-[#181826] text-[#4e2f84]" />
    </div>
  );
}

export default HeroBackground;
