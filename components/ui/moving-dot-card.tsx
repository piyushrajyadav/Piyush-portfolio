import React, { useState, useEffect } from "react";

interface DotCardProps {
  target?: number;
  duration?: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  customText?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function DotCard({
  target = 777000,
  duration = 2000,
  label = "Views",
  prefix = "",
  suffix = "",
  customText,
  icon,
  className = "",
}: DotCardProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (customText) return;
    let start = 0;
    const end = target;
    const range = end - start;
    if (range <= 0) return;
    const increment = Math.ceil(end / (duration / 50));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration, customText]);

  const display = customText
    ? customText
    : count < 1000
    ? `${prefix}${count}${suffix}`
    : `${prefix}${Math.floor(count / 1000)}k${suffix}`;

  return (
    <div className={`outer ${className}`}>
      <div className="dot"></div>
      <div className="card moving-dot-card">
        <div className="ray"></div>
        {icon && <div className="mb-2 relative z-10">{icon}</div>}
        <div className="text">{display}</div>
        <div className="label">{label}</div>
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
    </div>
  );
}
