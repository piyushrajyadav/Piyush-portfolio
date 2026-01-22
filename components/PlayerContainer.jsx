import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import { slideIn } from "@/utils/motion";

// Lazy load the heavy 3D canvas
const PlayerCanvas = dynamic(
  () => import("./canvas").then((mod) => mod.PlayerCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-tertiary animate-pulse" />
          <p className="text-ctnSecondaryDark text-sm">Loading 3D Avatar...</p>
        </div>
      </div>
    ),
  }
);

function PlayerContainer({ isMobile }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  return (
    <motion.div
      ref={containerRef}
      variants={slideIn("right", "tween", 0.2, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="md:w-1/3 w-full md:h-auto h-[440px] cursor-pointer"
    >
      {hasLoaded ? (
        <div className="w-full h-full min-h-[440px]" style={{ visibility: isVisible ? "visible" : "hidden" }}>
          <PlayerCanvas isMobile={isMobile} isPaused={!isVisible} />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl min-h-[440px]">
          <div className="text-center">
            <div className="w-36 h-36 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-tertiary opacity-50 animate-pulse" />
            <p className="text-ctnSecondaryDark text-lg">👋 3D Avatar</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default PlayerContainer;
