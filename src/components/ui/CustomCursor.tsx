import React, { useEffect, useRef } from "react";

const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTouch) return; // disable on touch

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onDown = () => { if (dotRef.current) dotRef.current.style.transform += " scale(0.9)"; };
    const onUp = () => { if (dotRef.current) dotRef.current.style.transform = dotRef.current.style.transform.replace(" scale(0.9)", ""); };

    const onHover = () => document.body.classList.add("cursor-hover");
    const onUnhover = () => document.body.classList.remove("cursor-hover");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // magnetic on primary buttons
    const buttons = document.querySelectorAll(".btn-primary, [data-magnetic]");
    buttons.forEach((b) => { b.addEventListener("mouseenter", onHover); b.addEventListener("mouseleave", onUnhover); });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      buttons.forEach((b) => { b.removeEventListener("mouseenter", onHover); b.removeEventListener("mouseleave", onUnhover); });
    };
  }, []);

  if (isTouch) return null;

  return (
    <div ref={dotRef} className="cursor-dot" style={{ transform: "translate(-50%, -50%)" }} />
  );
};

export default CustomCursor;
