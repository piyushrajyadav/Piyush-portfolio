import {
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

import CanvasLoader from "../Loader";
import PlayerModel from "./models/PlayerModel";

function Player({ isMobile }) {
  const group = useRef();
  const [animationsLoaded, setAnimationsLoaded] = useState(false);

  const { nodes, materials, scene } = useGLTF("models/player/player.gltf");
  const { animations: waveAnimation } = useFBX(
    "animations/standing-greeting.fbx"
  );
  scene.frustumCulled = false;

  waveAnimation[0].name = "wave-animation";

  const { actions } = useAnimations(waveAnimation, group);

  useEffect(() => {
    if (waveAnimation && actions["wave-animation"]) {
      setAnimationsLoaded(true);
    }
    if (animationsLoaded) {
      actions["wave-animation"].reset().play();
    }
  }, [animationsLoaded, waveAnimation, actions]);

  setTimeout(() => {
    if (waveAnimation && actions["wave-animation"]) {
      setAnimationsLoaded(true);
    }
  }, 2000);

  return (
    <>
      <ambientLight intensity={1} />
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 10]}
        fov={34}
        near={0.5}
        far={150}
        zoom={1.2}
      />
      <RandomizedLight position={[0, 1, 0]} />
      <pointLight intensity={2} position={[1, 1.5, 0]} color={"#6366f1"} />
      <pointLight intensity={2} position={[-1, 1.5, 1]} color={"#06b6d4"} />
      <pointLight intensity={2} position={[-1, 0.5, 1]} color={"#818cf8"} />
      {!isMobile && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          enablePan={false}
          autoRotate={false}
        />
      )}
      <Suspense fallback={<CanvasLoader />}>
        <PlayerModel
          nodes={nodes}
          materials={materials}
          rotation={[-1.6, 0, 0]}
          position={isMobile ? [0, -2.55, 0] : [0.28, -2.15, 0]}
          scale={isMobile ? 3.0 : 2.35}
          group={group}
        />
      </Suspense>
    </>
  );
}

function PlayerCanvas({ isMobile }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[560px]">
      <Canvas
        dpr={[1, 1.25]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Player isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

export default PlayerCanvas;
