import React from 'react';

export const InfiniteMarquee = ({ items, speed = 25, className = "" }: { items: React.ReactNode[], speed?: number, className?: string }) => {
  return (
    <div className={`relative flex overflow-hidden w-full group ${className}`}>
      <div 
        className="flex whitespace-nowrap animate-marquee items-center"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <div key={`m1-${i}`} className="mx-8 shrink-0">{item}</div>
        ))}
        {/* Duplicate immediately for seamless looping */}
        {items.map((item, i) => (
          <div key={`m2-${i}`} className="mx-8 shrink-0">{item}</div>
        ))}
      </div>
    </div>
  );
};
