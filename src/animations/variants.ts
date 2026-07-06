import type { Variants } from "framer-motion";

/* ─── Easings ─────────────────────────────────────────────
   Mirror CSS custom props for use in JS motion values
──────────────────────────────────────────────────────────── */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_EXPO = [0.87, 0, 0.13, 1] as const;
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

/* ─── Spring configs ──────────────────────────────────────*/
export const springSnappy = { type: "spring", stiffness: 400, damping: 30 } as const;
export const springGentle = { type: "spring", stiffness: 200, damping: 25 } as const;
export const springBouncy = { type: "spring", stiffness: 300, damping: 18, mass: 0.8 } as const;

/* ─── Fade Up (most-used section reveal) ─────────────────*/
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/* ─── Fade In (simple) ───────────────────────────────────*/
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/* ─── Fade Left ──────────────────────────────────────────*/
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/* ─── Fade Right ─────────────────────────────────────────*/
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/* ─── Scale In ───────────────────────────────────────────*/
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

/* ─── Stagger container ──────────────────────────────────*/
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/* ─── Stagger item (uses fadeUp internally) ──────────────*/
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

/* ─── Page transition ─────────────────────────────────────*/
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(8px)",
    transition: { duration: 0.35, ease: EASE_IN_OUT_EXPO },
  },
};

/* ─── Card hover preset (whileHover) ─────────────────────*/
export const cardHover = {
  y: -4,
  scale: 1.01,
  transition: springSnappy,
};

/* ─── Mega menu ──────────────────────────────────────────*/
export const megaMenu: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.18, ease: EASE_IN_OUT_EXPO },
  },
};

/* ─── Word reveal ────────────────────────────────────────*/
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};
