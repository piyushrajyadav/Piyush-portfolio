import { useRef, Suspense, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

function Stars({ isPaused, ...props }) {
	const ref = useRef();
	
	// Memoize the sphere positions - computed once, reused
	const sphere = useMemo(() => {
		const positions = new Float32Array(3000 * 3); // Reduced from 5000
		for (let i = 0; i < positions.length; i++) {
			positions[i] = (Math.random() - 0.5) * 2.4;
		}
		return positions;
	}, []);

	useFrame((state, delta) => {
		if (!isPaused && ref.current) {
			ref.current.rotation.x -= delta / 15; // Slower rotation
			ref.current.rotation.y -= delta / 20;
		}
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points
				ref={ref}
				positions={sphere}
				stride={3}
				frustumCulled
				{...props}
			>
				<PointMaterial
					transparent
					color="#f272c8"
					size={0.002}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	);
}

function StarsCanvas() {
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
			{ threshold: 0.05 }
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, [hasLoaded]);

	return (
		<div ref={containerRef} className="w-full h-auto absolute inset-0 z-[-1]">
			{hasLoaded && (
				<Canvas
					camera={{ position: [0, 0, 1] }}
					dpr={1} // Lower DPR for performance
					frameloop={isVisible ? "always" : "never"} // Stop rendering when not visible
					gl={{
						outputColorSpace: THREE.SRGBColorSpace,
						alpha: false,
						antialias: false, // Disable for performance
						powerPreference: "high-performance",
					}}
				>
					<Suspense fallback={<CanvasLoader />}>
						<Stars isPaused={!isVisible} />
					</Suspense>
					<Preload all />
				</Canvas>
			)}
		</div>
	);
}

export default StarsCanvas;
