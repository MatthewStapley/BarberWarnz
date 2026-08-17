import type { Variants, Transition } from "framer-motion";

// Mirrors the CSS tokens in src/styles/global.css so JS-driven
// (Framer Motion) animation and CSS transitions feel like one system.
export const ease = {
  premium: [0.16, 1, 0.3, 1] as const,
};

export const duration = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.9,
};

export const transition = {
  premium: (d: number = duration.medium): Transition => ({
    duration: d,
    ease: ease.premium,
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.premium(duration.slow),
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.premium(duration.medium),
  },
};

export const maskReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: transition.premium(duration.slow),
  },
};

export const staggerContainer = (stagger: number = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.premium(duration.slow),
  },
};
