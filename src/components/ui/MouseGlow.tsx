import React, { useEffect, useRef } from "react";

const MouseGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`; // offset to center large glow
        glowRef.current.style.opacity = "0.18";
      }
    };
    const off = () => { if (glowRef.current) glowRef.current.style.opacity = "0"; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", off);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseout", off); };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9996]">
      <div ref={glowRef} className="absolute w-[400px] h-[400px] rounded-full bg-blue-400 blur-3xl opacity-0 transform-gpu transition-opacity duration-200" style={{ mixBlendMode: "soft-light" }} />
    </div>
  );
};

export default MouseGlow;
