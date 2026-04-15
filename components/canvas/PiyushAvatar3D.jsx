/**
 * PiyushAvatar3D.jsx
 * 
 * Drop-in 3D animated avatar for Piyush Yadav's portfolio.
 * Features:
 *   - Stylized 3D character: blazer, tie, glasses, beard
 *   - Handshake/wave animation loop
 *   - Idle breathing animation
 *   - Mouse-follow head rotation
 *   - Orbit controls for interaction
 * 
 * INSTALL DEPS:
 *   npm install three @react-three/fiber @react-three/drei
 * 
 * USAGE in your Next.js portfolio:
 *   import dynamic from 'next/dynamic'
 *   const PiyushAvatar3D = dynamic(() => import('../components/PiyushAvatar3D'), { ssr: false })
 *   
 *   <PiyushAvatar3D />
 */

"use client";
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ─── Color palette matching Piyush's photo ──────────────────────────────────
const COLORS = {
  skin:       "#C68642",
  skinDark:   "#A0522D",
  hair:       "#1a1008",
  beard:      "#2a1a0a",
  blazer:     "#7a6a5a",   // brownish-gray blazer
  blazerDark: "#5a4d40",
  shirt:      "#a8c8e8",   // light blue shirt
  tie:        "#b89060",   // gold/brown tie
  tieDot:     "#d4a870",
  pants:      "#c8c8b8",   // light gray pants
  glasses:    "#1a1a1a",
  lensColor:  "#1a2a3a",
  belt:       "#2a1a0a",
  shoes:      "#2a1a0a",
  lapelPin:   "#e05030",   // orange pin (matching the logo pin in photo)
  white:      "#f8f8f0",
};

// ─── Helper: rounded box geometry ────────────────────────────────────────────
function RoundedBox({ args, radius = 0.05, ...props }) {
  return (
    <mesh {...props}>
      <boxGeometry args={args} />
      {props.children}
    </mesh>
  );
}

// ─── Glasses component ────────────────────────────────────────────────────────
function Glasses({ position }) {
  return (
    <group position={position}>
      {/* Left lens frame */}
      <mesh position={[-0.135, 0, 0]}>
        <torusGeometry args={[0.085, 0.012, 8, 20]} />
        <meshStandardMaterial color={COLORS.glasses} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Left lens */}
      <mesh position={[-0.135, 0, 0.005]}>
        <circleGeometry args={[0.073, 20]} />
        <meshStandardMaterial color={COLORS.lensColor} transparent opacity={0.35} roughness={0} metalness={0.1} />
      </mesh>
      {/* Right lens frame */}
      <mesh position={[0.135, 0, 0]}>
        <torusGeometry args={[0.085, 0.012, 8, 20]} />
        <meshStandardMaterial color={COLORS.glasses} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Right lens */}
      <mesh position={[0.135, 0, 0.005]}>
        <circleGeometry args={[0.073, 20]} />
        <meshStandardMaterial color={COLORS.lensColor} transparent opacity={0.35} roughness={0} metalness={0.1} />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
        <meshStandardMaterial color={COLORS.glasses} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Temple arms */}
      <mesh position={[-0.22, 0, -0.05]} rotation={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.14, 8]} />
        <meshStandardMaterial color={COLORS.glasses} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0.22, 0, -0.05]} rotation={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.14, 8]} />
        <meshStandardMaterial color={COLORS.glasses} roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Tie component ────────────────────────────────────────────────────────────
function Tie({ position }) {
  const tieShape = new THREE.Shape();
  tieShape.moveTo(0, 0);
  tieShape.lineTo(-0.04, -0.06);
  tieShape.lineTo(-0.055, -0.3);
  tieShape.lineTo(0, -0.38);
  tieShape.lineTo(0.055, -0.3);
  tieShape.lineTo(0.04, -0.06);
  tieShape.closePath();

  return (
    <group position={position}>
      <mesh>
        <shapeGeometry args={[tieShape]} />
        <meshStandardMaterial color={COLORS.tie} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Tie knot */}
      <mesh position={[0, 0.01, 0.005]}>
        <boxGeometry args={[0.065, 0.045, 0.01]} />
        <meshStandardMaterial color={COLORS.tieDot} roughness={0.5} />
      </mesh>
      {/* Small dots/pattern on tie */}
      {[-0.1, -0.18, -0.26].map((y, i) => (
        <mesh key={i} position={[0, y, 0.005]}>
          <circleGeometry args={[0.008, 8]} />
          <meshStandardMaterial color={COLORS.tieDot} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Main Character ───────────────────────────────────────────────────────────
function PiyushCharacter({ mousePos }) {
  const groupRef      = useRef();
  const headRef       = useRef();
  const rightArmRef   = useRef();
  const leftArmRef    = useRef();
  const bodyRef       = useRef();
  const handRef       = useRef();
  const time          = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    const t = time.current;

    // Breathing - subtle body bob
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 1.2) * 0.005;
      bodyRef.current.scale.y = 1 + Math.sin(t * 1.2) * 0.004;
    }

    // Head follows mouse softly
    if (headRef.current) {
      const targetRotX = -mousePos.current.y * 0.18;
      const targetRotY =  mousePos.current.x * 0.25;
      headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * 0.06;
      headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * 0.06;
      // Subtle nod
      headRef.current.rotation.x += Math.sin(t * 0.4) * 0.005;
    }

    // Handshake / wave animation for right arm
    if (rightArmRef.current) {
      // Wave: oscillate between extended (handshake pose) and neutral
      const wavePhase  = Math.sin(t * 2.5);
      const wavePhase2 = Math.sin(t * 2.5 + 0.5);
      rightArmRef.current.rotation.z = -0.4 + wavePhase * 0.3;
      rightArmRef.current.rotation.x = -0.6 + wavePhase2 * 0.15;
      // Forearm angle
      if (handRef.current) {
        handRef.current.rotation.x = 0.6 + Math.sin(t * 3) * 0.2;
        handRef.current.rotation.z = Math.sin(t * 2.5) * 0.15;
      }
    }

    // Left arm gentle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.15 + Math.sin(t * 1.2 + 1) * 0.04;
    }

    // Slight overall sway
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      <group ref={bodyRef}>

        {/* ── LEGS ─────────────────────────────── */}
        {/* Left leg */}
        <mesh position={[-0.18, 0.38, 0]}>
          <boxGeometry args={[0.22, 0.72, 0.2]} />
          <meshStandardMaterial color={COLORS.pants} roughness={0.7} />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.18, 0.38, 0]}>
          <boxGeometry args={[0.22, 0.72, 0.2]} />
          <meshStandardMaterial color={COLORS.pants} roughness={0.7} />
        </mesh>
        {/* Left shoe */}
        <mesh position={[-0.18, 0.02, 0.04]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial color={COLORS.shoes} roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Right shoe */}
        <mesh position={[0.18, 0.02, 0.04]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial color={COLORS.shoes} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* ── BELT ─────────────────────────────── */}
        <mesh position={[0, 0.76, 0]}>
          <boxGeometry args={[0.5, 0.06, 0.21]} />
          <meshStandardMaterial color={COLORS.belt} roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Belt buckle */}
        <mesh position={[0, 0.76, 0.11]}>
          <boxGeometry args={[0.08, 0.05, 0.01]} />
          <meshStandardMaterial color="#888" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* ── TORSO / SHIRT ──────────────────── */}
        <mesh position={[0, 1.08, 0]}>
          <boxGeometry args={[0.52, 0.6, 0.24]} />
          <meshStandardMaterial color={COLORS.shirt} roughness={0.6} />
        </mesh>

        {/* ── TIE ───────────────────────────── */}
        <Tie position={[0.02, 1.58, 0.13]} />

        {/* ── BLAZER BODY ──────────────────── */}
        {/* Main blazer */}
        <mesh position={[0, 1.08, 0]}>
          <boxGeometry args={[0.62, 0.62, 0.22]} />
          <meshStandardMaterial color={COLORS.blazer} roughness={0.75} />
        </mesh>
        {/* Left lapel */}
        <mesh position={[-0.14, 1.42, 0.11]} rotation={[0, 0, 0.22]}>
          <boxGeometry args={[0.12, 0.28, 0.015]} />
          <meshStandardMaterial color={COLORS.blazer} roughness={0.75} />
        </mesh>
        {/* Right lapel */}
        <mesh position={[0.14, 1.42, 0.11]} rotation={[0, 0, -0.22]}>
          <boxGeometry args={[0.12, 0.28, 0.015]} />
          <meshStandardMaterial color={COLORS.blazerDark} roughness={0.75} />
        </mesh>
        {/* Lapel pin (orange circle - like in the photo) */}
        <mesh position={[0.2, 1.28, 0.12]}>
          <circleGeometry args={[0.022, 16]} />
          <meshStandardMaterial color={COLORS.lapelPin} roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Pocket square */}
        <mesh position={[-0.24, 1.3, 0.115]}>
          <boxGeometry args={[0.06, 0.04, 0.005]} />
          <meshStandardMaterial color={COLORS.white} roughness={0.8} />
        </mesh>
        {/* Blazer buttons */}
        {[1.05, 0.9].map((y, i) => (
          <mesh key={i} position={[0.0, y, 0.12]}>
            <cylinderGeometry args={[0.016, 0.016, 0.01, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color={COLORS.blazerDark} roughness={0.5} metalness={0.1} />
          </mesh>
        ))}

        {/* ── RIGHT ARM (Handshake arm) ──────── */}
        <group
          ref={rightArmRef}
          position={[0.42, 1.22, 0]}
          rotation={[-0.6, 0, -0.4]}
        >
          {/* Upper arm */}
          <mesh position={[0.14, -0.15, 0]}>
            <cylinderGeometry args={[0.1, 0.09, 0.38, 12]} />
            <meshStandardMaterial color={COLORS.blazer} roughness={0.75} />
          </mesh>
          {/* Forearm group (with pivot) */}
          <group ref={handRef} position={[0.14, -0.38, 0]} rotation={[0.6, 0, 0]}>
            <mesh position={[0, -0.16, 0]}>
              <cylinderGeometry args={[0.085, 0.075, 0.34, 12]} />
              <meshStandardMaterial color={COLORS.blazer} roughness={0.75} />
            </mesh>
            {/* Shirt cuff */}
            <mesh position={[0, -0.33, 0]}>
              <cylinderGeometry args={[0.079, 0.079, 0.06, 12]} />
              <meshStandardMaterial color={COLORS.shirt} roughness={0.6} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.48, 0]}>
              <boxGeometry args={[0.13, 0.15, 0.08]} />
              <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
            </mesh>
            {/* Fingers - extended for handshake */}
            {[-0.04, -0.01, 0.02, 0.05].map((x, i) => (
              <mesh key={i} position={[x, -0.6, 0]}>
                <cylinderGeometry args={[0.015, 0.012, 0.1, 8]} />
                <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
              </mesh>
            ))}
            {/* Thumb */}
            <mesh position={[0.075, -0.5, 0.02]} rotation={[0, 0, -0.8]}>
              <cylinderGeometry args={[0.017, 0.014, 0.09, 8]} />
              <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
            </mesh>
          </group>
        </group>

        {/* ── LEFT ARM ──────────────────────── */}
        <group
          ref={leftArmRef}
          position={[-0.42, 1.22, 0]}
          rotation={[0.1, 0, 0.15]}
        >
          {/* Upper arm */}
          <mesh position={[-0.12, -0.15, 0]}>
            <cylinderGeometry args={[0.1, 0.09, 0.38, 12]} />
            <meshStandardMaterial color={COLORS.blazer} roughness={0.75} />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.12, -0.52, 0]}>
            <cylinderGeometry args={[0.085, 0.075, 0.34, 12]} />
            <meshStandardMaterial color={COLORS.blazer} roughness={0.75} />
          </mesh>
          {/* Shirt cuff */}
          <mesh position={[-0.12, -0.69, 0]}>
            <cylinderGeometry args={[0.079, 0.079, 0.06, 12]} />
            <meshStandardMaterial color={COLORS.shirt} roughness={0.6} />
          </mesh>
          {/* Hand (in pocket / relaxed) */}
          <mesh position={[-0.12, -0.8, 0]}>
            <boxGeometry args={[0.12, 0.13, 0.08]} />
            <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
          </mesh>
        </group>

        {/* ── NECK ─────────────────────────── */}
        <mesh position={[0, 1.52, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.18, 16]} />
          <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
        </mesh>

        {/* ── HEAD GROUP ───────────────────── */}
        <group ref={headRef} position={[0, 1.78, 0]}>
          {/* Head */}
          <mesh>
            <boxGeometry args={[0.44, 0.50, 0.38]} />
            <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
          </mesh>
          {/* Cheeks (slightly wider) */}
          <mesh position={[0, -0.04, 0]} scale={[1.04, 0.85, 1.05]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
          </mesh>

          {/* ── HAIR ────────────────────── */}
          {/* Top hair */}
          <mesh position={[0, 0.24, -0.01]}>
            <boxGeometry args={[0.44, 0.12, 0.36]} />
            <meshStandardMaterial color={COLORS.hair} roughness={0.8} />
          </mesh>
          {/* Side hair left */}
          <mesh position={[-0.22, 0.14, 0]}>
            <boxGeometry args={[0.04, 0.22, 0.36]} />
            <meshStandardMaterial color={COLORS.hair} roughness={0.8} />
          </mesh>
          {/* Side hair right */}
          <mesh position={[0.22, 0.14, 0]}>
            <boxGeometry args={[0.04, 0.22, 0.36]} />
            <meshStandardMaterial color={COLORS.hair} roughness={0.8} />
          </mesh>
          {/* Back hair */}
          <mesh position={[0, 0.1, -0.2]}>
            <boxGeometry args={[0.44, 0.32, 0.04]} />
            <meshStandardMaterial color={COLORS.hair} roughness={0.8} />
          </mesh>

          {/* ── BEARD ───────────────────── */}
          {/* Chin beard */}
          <mesh position={[0, -0.2, 0.17]}>
            <boxGeometry args={[0.28, 0.14, 0.06]} />
            <meshStandardMaterial color={COLORS.beard} roughness={0.9} />
          </mesh>
          {/* Upper lip mustache */}
          <mesh position={[0, -0.06, 0.2]}>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshStandardMaterial color={COLORS.beard} roughness={0.9} />
          </mesh>
          {/* Cheek stubble left */}
          <mesh position={[-0.16, -0.08, 0.15]}>
            <boxGeometry args={[0.08, 0.1, 0.04]} />
            <meshStandardMaterial color={COLORS.beard} roughness={0.9} transparent opacity={0.8} />
          </mesh>
          {/* Cheek stubble right */}
          <mesh position={[0.16, -0.08, 0.15]}>
            <boxGeometry args={[0.08, 0.1, 0.04]} />
            <meshStandardMaterial color={COLORS.beard} roughness={0.9} transparent opacity={0.8} />
          </mesh>

          {/* ── EYES ────────────────────── */}
          {/* Eye whites left */}
          <mesh position={[-0.115, 0.03, 0.195]}>
            <boxGeometry args={[0.1, 0.065, 0.01]} />
            <meshStandardMaterial color="#f5f0e8" roughness={0.4} />
          </mesh>
          {/* Iris left */}
          <mesh position={[-0.115, 0.03, 0.2]}>
            <circleGeometry args={[0.025, 16]} />
            <meshStandardMaterial color="#3a2010" roughness={0.2} />
          </mesh>
          {/* Eye whites right */}
          <mesh position={[0.115, 0.03, 0.195]}>
            <boxGeometry args={[0.1, 0.065, 0.01]} />
            <meshStandardMaterial color="#f5f0e8" roughness={0.4} />
          </mesh>
          {/* Iris right */}
          <mesh position={[0.115, 0.03, 0.2]}>
            <circleGeometry args={[0.025, 16]} />
            <meshStandardMaterial color="#3a2010" roughness={0.2} />
          </mesh>
          {/* Eyebrows */}
          <mesh position={[-0.115, 0.08, 0.2]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.1, 0.022, 0.005]} />
            <meshStandardMaterial color={COLORS.hair} roughness={0.6} />
          </mesh>
          <mesh position={[0.115, 0.08, 0.2]} rotation={[0, 0, -0.08]}>
            <boxGeometry args={[0.1, 0.022, 0.005]} />
            <meshStandardMaterial color={COLORS.hair} roughness={0.6} />
          </mesh>

          {/* ── NOSE ────────────────────── */}
          <mesh position={[0, -0.02, 0.21]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.06, 0.1, 0.04]} />
            <meshStandardMaterial color={COLORS.skinDark} roughness={0.7} />
          </mesh>

          {/* ── MOUTH / SMILE ────────────── */}
          <mesh position={[0, -0.1, 0.198]}>
            <boxGeometry args={[0.12, 0.02, 0.008]} />
            <meshStandardMaterial color="#5a2010" roughness={0.4} />
          </mesh>
          {/* Smile corners */}
          <mesh position={[-0.065, -0.095, 0.198]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.04, 0.018, 0.008]} />
            <meshStandardMaterial color="#5a2010" roughness={0.4} />
          </mesh>
          <mesh position={[0.065, -0.095, 0.198]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.04, 0.018, 0.008]} />
            <meshStandardMaterial color="#5a2010" roughness={0.4} />
          </mesh>

          {/* ── GLASSES ──────────────────── */}
          <Glasses position={[0, 0.03, 0.21]} />

          {/* ── EARS ────────────────────── */}
          <mesh position={[-0.24, 0.02, 0]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
          </mesh>
          <mesh position={[0.24, 0.02, 0]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ─── Floating name tag ────────────────────────────────────────────────────────
function FloatingLabel() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1.5 + Math.sin(clock.elapsedTime * 1.5) * 0.06;
    }
  });
  return (
    <group ref={meshRef} position={[0, 1.5, 0]}>
      {/* glowing ring */}
      <mesh>
        <torusGeometry args={[0.5, 0.012, 8, 60]} />
        <meshStandardMaterial color="#60a0ff" emissive="#60a0ff" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

// ─── Scene setup ──────────────────────────────────────────────────────────────
function Scene({ mousePos }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 8, 5]}  intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#a0c0ff" />
      <pointLight position={[0, 4, 3]} intensity={0.6} color="#ffe8d0" />

      <Suspense fallback={null}>
        <PiyushCharacter mousePos={mousePos} />
        <FloatingLabel />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.45}
          scale={3}
          blur={2}
          far={4}
          color="#000020"
        />
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function PiyushAvatar3D({
  height = "520px",
  width  = "100%",
  className = "",
}) {
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
      };
    };
    const handleMouseLeave = () => { mousePos.current = { x: 0, y: 0 }; };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, cursor: "grab", position: "relative" }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 3.8], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene mousePos={mousePos} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>

      {/* Interaction hint */}
      <div style={{
        position: "absolute",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "11px",
        color: "rgba(150,150,170,0.7)",
        pointerEvents: "none",
        letterSpacing: "0.05em",
      }}>
        drag to rotate · hover to interact
      </div>
    </div>
  );
}
