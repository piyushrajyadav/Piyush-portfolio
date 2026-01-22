import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import { slideIn } from "@/utils/motion";

// Lazy load the heavy 3D canvas
const EarthCanvas = dynamic(
	() => import("./canvas").then((mod) => mod.EarthCanvas),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl">
				<div className="text-center">
					<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-tertiary animate-pulse" />
					<p className="text-ctnSecondaryDark text-sm">Loading 3D Earth...</p>
				</div>
			</div>
		),
	}
);

function EarthContainer({ isMobile }) {
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
			className="xl:w-1/2 w-full md:w-2/3 md:h-auto h-[550px]"
		>
			{hasLoaded ? (
				<div className="w-full h-full min-h-[550px]" style={{ visibility: isVisible ? "visible" : "hidden" }}>
					<EarthCanvas isMobile={isMobile} isPaused={!isVisible} />
				</div>
			) : (
				<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl min-h-[550px]">
					<div className="text-center">
						<div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-tertiary opacity-50 animate-pulse" />
						<p className="text-ctnSecondaryDark text-lg">🌍 3D Earth</p>
					</div>
				</div>
			)}
		</motion.div>
	);
}

export default EarthContainer;
