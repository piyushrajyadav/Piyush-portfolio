import React, { useRef, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 6000,
  className,
  ...otherProps
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500,#38bdf8)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export function MovingBorderCard({
  borderRadius = "1.5rem",
  children,
  containerClassName,
  borderClassName,
  duration = 8000,
  className,
  ...otherProps
}) {
  return (
    <div
      className={cn(
        "bg-transparent relative p-[1.5px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-32 w-32 opacity-[0.7] group-hover:opacity-[0.95] bg-[radial-gradient(#6366f1_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn("relative h-full w-full", className)}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const MovingBorder = ({
  children,
  duration = 8000,
  rx,
  ry,
  ...otherProps
}) => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const lengthRef = useRef(0);
  const progress = useMotionValue(0);
  const isInView = useInView(containerRef, { margin: "150px" });

  useEffect(() => {
    if (pathRef.current) {
      lengthRef.current = pathRef.current.getTotalLength() || 0;
    }
  }, []);

  useAnimationFrame((time) => {
    if (!isInView) return;

    if (!lengthRef.current && pathRef.current) {
      lengthRef.current = pathRef.current.getTotalLength() || 0;
    }

    const length = lengthRef.current;
    if (length > 0) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      {isInView && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "inline-block",
            transform,
            willChange: "transform",
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
