import React, { type ReactNode } from "react";

interface GlowingShadowProps {
  children: ReactNode;
  className?: string;
}

export function GlowingShadow({ children, className = "" }: GlowingShadowProps) {
  return (
    <div className={`relative w-full group ${className}`}>
      <style jsx>{`
        .glowing-shadow-wrapper {
          position: relative;
          width: 100%;
          border-radius: 1.5rem;
          transition: all 0.4s ease;
        }

        .glowing-shadow-wrapper::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 1.55rem;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.35) 0%,
            rgba(6, 182, 212, 0.2) 50%,
            rgba(99, 102, 241, 0.35) 100%
          );
          z-index: 0;
          opacity: 0.4;
          filter: blur(10px);
          transition: all 0.4s ease;
        }

        .glowing-shadow-wrapper:hover::before {
          opacity: 0.8;
          filter: blur(16px);
          inset: -2px;
        }

        .glowing-shadow-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          border-radius: 1.5rem;
        }
      `}</style>

      <div className="glowing-shadow-wrapper">
        <div className="glowing-shadow-inner">{children}</div>
      </div>
    </div>
  );
}

export default GlowingShadow;
