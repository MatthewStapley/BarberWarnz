import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "../../lib/motion";

interface Props {
  children?: ReactNode;
  /** Stagger direct children in on scroll instead of animating as one block */
  stagger?: boolean;
  /** Astro silently drops `class`/`className` attributes on framework islands, so this uses a different key */
  wrapperClass?: string;
}

// Generic "fade + rise into place" wrapper used to give static Astro
// section content a subtle, expensive-feeling entrance on scroll.
export default function RevealOnScroll({ children, stagger = false, wrapperClass }: Props) {
  return (
    <motion.div
      className={wrapperClass}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={stagger ? staggerContainer() : fadeUp}
    >
      {stagger
        ? Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={fadeUp}>
                {child}
              </motion.div>
            ))
          : children
        : children}
    </motion.div>
  );
}
