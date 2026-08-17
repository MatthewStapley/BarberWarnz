import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  label?: string;
  ratio?: string;
  class?: string;
}

// Subtle scroll-linked scale/translate on an image (or placeholder) —
// the "premium" parallax effect referenced in the brief. Kept restrained:
// a few percent of movement, nothing that feels like a gimmick.
// Self-contained (renders its own placeholder box) so it can be dropped
// in from .astro files without cross-framework children nesting.
export default function ParallaxImage({
  label = "Image placeholder",
  ratio = "aspect-[4/5]",
  class: className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-sm border border-[var(--color-line)] ${ratio} ${className ?? ""}`}>
      <motion.div
        style={{ scale, y }}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg)]"
      >
        <span className="px-4 text-center text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
          {label}
        </span>
      </motion.div>
    </div>
  );
}
