import { motion, useScroll, useTransform } from "framer-motion";
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
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const frame = bare ? "" : "rounded-sm border border-[var(--color-line)]";

  return (
    <div ref={ref} className={`overflow-hidden ${frame} ${ratio} ${wrapperClass ?? ""}`}>
      <motion.div style={{ scale, y }} className="h-full w-full">
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
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg)]">
            <span className="px-4 text-center text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
              {label}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
