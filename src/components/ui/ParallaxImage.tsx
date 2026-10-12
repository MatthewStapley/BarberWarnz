import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ease } from "../../lib/motion";
import { useRef } from "react";

interface Props {
  label?: string;
  ratio?: string;
  wrapperClass?: string;
  /** Pre-optimized image URL (from astro:assets getImage()) — omit to render the placeholder box */
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  width?: number;
  height?: number;
  /** Above-the-fold images (e.g. hero) should load eagerly instead of lazily */
  priority?: boolean;
  /** Skip the border/rounded-corner treatment for full-bleed usage (e.g. hero) */
  bare?: boolean;
  /** CSS object-position for the crop focal point, e.g. "center 30%" */
  focalPoint?: string;
  /** Unveil the frame bottom-up the first time it scrolls into view */
  reveal?: boolean;
  /** Seconds to wait before the reveal — used to stagger grids */
  delay?: number;
  /** Gentle zoom on hover (gallery tiles) */
  hoverZoom?: boolean;
}

// Subtle scroll-linked scale/translate on an image (or placeholder) —
// the "premium" parallax effect referenced in the brief. Kept restrained:
// a few percent of movement, nothing that feels like a gimmick.
// Self-contained so it can be dropped in from .astro files without
// cross-framework children nesting — pass `src` for a real photo
// (already optimized via astro:assets) or omit it for the placeholder box.
export default function ParallaxImage({
  label = "Image placeholder",
  ratio = "aspect-[4/5]",
  wrapperClass,
  src,
  srcSet,
  sizes,
  alt = "",
  width,
  height,
  priority = false,
  bare = false,
  focalPoint,
  reveal = true,
  delay = 0,
  hoverZoom = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const frame = bare ? "" : "rounded-sm border border-[var(--color-line)]";
  const shouldReveal = reveal && !priority && !reduceMotion;

  return (
    <motion.div
      ref={ref}
      className={`group overflow-hidden ${frame} ${ratio} ${wrapperClass ?? ""}`}
      initial={shouldReveal ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
      whileInView={shouldReveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.3, ease: ease.premium, delay }}
    >
      <motion.div style={reduceMotion ? undefined : { scale, y }} className="h-full w-full">
        {src ? (
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            style={focalPoint ? { objectPosition: focalPoint } : undefined}
            className={`h-full w-full object-cover ${
              hoverZoom
                ? "transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.045]"
                : ""
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg)]">
            <span className="px-4 text-center text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
              {label}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
