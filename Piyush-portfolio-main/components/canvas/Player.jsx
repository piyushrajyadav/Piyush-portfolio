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
      <ambientLight intensity={0.8} />
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 12]}
        fov={32}
        near={0.8}
        far={120}
        zoom={1.1}
      />
      <directionalLight position={[2, 2, 1]} intensity={1.2} color={"#ffffff"} />
      <pointLight intensity={1.5} position={[1, 1.5, 0]} color={"#804dee"} />
      <pointLight intensity={1.2} position={[-1, 1.5, 1]} color={"#7c3aed"} />
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
          position={isMobile ? [0, -2.8, 0] : [0, -2.2, 0]}
          scale={isMobile ? 2.8 : 2.4}
          group={group}
        />
      </Suspense>
    </>
  );
}

function PlayerCanvas({ isMobile }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
      }}
    >
      <Player isMobile={isMobile} />
    </Canvas>
  );
}

export default PlayerCanvas;
