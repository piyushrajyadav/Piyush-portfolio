import { motion } from "framer-motion";
import { slideIn } from "@/utils/motion";
import { PlayerCanvas } from "./canvas";

function PlayerContainer({ isMobile }) {
  return (
    <motion.div
      variants={slideIn("right", "tween", 0.2, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="md:w-[40%] lg:w-[38%] w-full h-[560px] md:h-[620px] cursor-pointer flex items-center justify-center"
    >
      <PlayerCanvas isMobile={isMobile} />
    </motion.div>
  );
}

export default PlayerContainer;
