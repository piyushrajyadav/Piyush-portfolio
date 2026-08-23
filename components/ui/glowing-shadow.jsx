import React from "react";

export function GlowingShadow({ children, className = "" }) {
  return (
    <div className={`relative w-full group ${className}`}>
      <style jsx>{`
        @keyframes rotate-hue {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        .glowing-shadow-wrapper {
          position: relative;
          width: 100%;
          border-radius: 1.5rem;
          transition: all 0.4s ease;
        }

        .glowing-shadow-wrapper::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 1.6rem;
          background: linear-gradient(
            135deg,
            #804dee 0%,
            #00cea8 50%,
            #804dee 100%
          );
          z-index: 0;
          opacity: 0.6;
          filter: blur(12px);
          transition: all 0.4s ease;
          animation: rotate-hue 6s linear infinite;
        }

        .glowing-shadow-wrapper:hover::before {
          opacity: 0.95;
          filter: blur(20px);
          inset: -4px;
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
