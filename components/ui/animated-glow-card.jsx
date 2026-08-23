import React from 'react';

const CardCanvas = ({ children, className = "" }) => {
  return (
    <div className={`card-canvas relative w-full ${className}`}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0"></feColorMatrix>
        </filter>
      </svg>
      <div className="card-backdrop"></div>
      {children}
    </div>
  );
};

const Card = ({ children, className = "" }) => {
  return (
    <div className={`glow-card relative rounded-2xl md:rounded-3xl p-[1.5px] bg-gradient-to-br from-purple-500/40 via-indigo-500/20 to-teal-400/30 dark:from-purple-500/50 dark:via-white/[0.08] dark:to-teal-400/30 transition-all duration-300 shadow-md hover:shadow-xl ${className}`}>
      <div className="border-element border-left pointer-events-none absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/50 to-transparent"></div>
      <div className="border-element border-right pointer-events-none absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-teal-400/50 to-transparent"></div>
      <div className="border-element border-top pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-500/50 via-indigo-500/30 to-teal-400/50"></div>
      <div className="border-element border-bottom pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"></div>
      <div className="card-content relative rounded-2xl md:rounded-3xl bg-white/95 dark:bg-[#0b0c16]/95 backdrop-blur-2xl p-6 md:p-8 overflow-hidden border border-slate-200/90 dark:border-white/[0.08]">
        {children}
      </div>
    </div>
  );
};

export { CardCanvas, Card };
