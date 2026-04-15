/**
 * HeroWithAvatar.jsx
 * 
 * Drop-in replacement for your Hero section.
 * Integrates PiyushAvatar3D on the right, your existing hero text on the left.
 * 
 * USAGE:
 *   Replace your current Hero component with this one in pages/index.jsx
 */

import dynamic from "next/dynamic";
import { TypeAnimation } from "react-type-animation";

const PiyushAvatar3D = dynamic(() => import("./PiyushAvatar3D"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%",
      height: "520px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.3,
      fontSize: 14,
    }}>
      Loading 3D...
    </div>
  ),
});

export default function HeroWithAvatar() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 5vw",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {/* LEFT: text content */}
      <div style={{ flex: "1 1 320px", zIndex: 1 }}>
        <p style={{ fontSize: "1rem", opacity: 0.6, marginBottom: "0.5rem" }}>
          Hi there! 👋 I'm
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
          Piyush Yadav
        </h1>
        <h2 style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontWeight: 400, marginBottom: "1.5rem", opacity: 0.75 }}>
          I build{" "}
          <span style={{ color: "#4a9eff" }}>
            <TypeAnimation
              sequence={[
                "AI-powered platforms",   2000,
                "Full Stack Apps",        2000,
                "LangGraph Agents",       2000,
                "3D Portfolios",          2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h2>
        <p style={{ maxWidth: "480px", lineHeight: 1.7, opacity: 0.6, marginBottom: "2rem" }}>
          3rd Year CSE @ IEM Kolkata. Building Agent Builder — an AI platform that 
          auto-generates LangGraph agents from plain language.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              padding: "0.75rem 1.75rem",
              background: "#4a9eff",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              padding: "0.75rem 1.75rem",
              border: "1px solid rgba(150,150,200,0.35)",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            Let's Connect 🤝
          </a>
        </div>
      </div>

      {/* RIGHT: 3D avatar */}
      <div style={{ flex: "1 1 360px", maxWidth: "520px" }}>
        <PiyushAvatar3D height="520px" width="100%" />
      </div>
    </section>
  );
}
