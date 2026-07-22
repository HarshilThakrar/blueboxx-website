import { useEffect, useRef } from "react";
import { useInView, animate, useReducedMotion } from "framer-motion";

export const useCountUp = (
  end: number,
  durationMs: number = 1000,
  delay: number = 0
) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !ref.current) return;

    if (prefersReducedMotion) {
      ref.current.textContent = end.toLocaleString("en-IN");
      return;
    }

    const controls = animate(0, end, {
      duration: durationMs / 1000, // convert to seconds
      delay: delay,
      ease: [0.16, 1, 0.3, 1], // Smooth custom easing (easeOutExpo-like)
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.round(value).toLocaleString("en-IN");
        }
      },
    });

    return () => controls.stop();
  }, [end, durationMs, delay, isInView, prefersReducedMotion]);

  return { ref };
};
