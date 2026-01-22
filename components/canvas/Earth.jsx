import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";
import EarthModel from "./models/EarthModel";

function Earth({ isMobile, isPaused }) {
  const { nodes, materials } = useGLTF("models/planet/scene.gltf");
  const earthRef = useRef();

  useFrame(() => {
    if (!isPaused && earthRef.current) {
      earthRef.current.rotation.y += 0.005; // Slower rotation
    }
  });

  return (
    <>
      {!isMobile && (
        <OrbitControls
          autoRotate={!isPaused}
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          enablePan={false}
          enableRotate={true}
          makeDefault
        />
      )}
      <Suspense fallback={<CanvasLoader />}>
        <EarthModel
          materials={materials}
          nodes={nodes}
          scale={2.2}
          position={[0, 0, 0]}
          earthRef={earthRef}
        />
      </Suspense>
    </>
  );
}

function EarthCanvas({ isMobile, isPaused = false }) {
  return (
    <Canvas
      dpr={1} // Lower DPR for performance
      frameloop={isPaused ? "never" : "always"}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      className="cursor-pointer"
      style={{ width: "100%", height: "100%", minHeight: "550px" }}
    >
      <Earth isMobile={isMobile} isPaused={isPaused} />
    </Canvas>
  );
}

export default EarthCanvas;
