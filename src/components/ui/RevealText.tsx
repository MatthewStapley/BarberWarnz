import { motion } from "framer-motion";
import { maskReveal, staggerContainer } from "../../lib/motion";

interface Props {
  text: string;
  /** Split by word (default) reads more naturally for headings than by line */
  as?: "span";
}

// Masked line/word reveal: each word sits in an overflow-hidden mask and
// slides up into place. Used for hero + section headings.
export default function RevealText({ text }: Props) {
  const words = text.split(" ");

  return (
    <motion.span
      className="inline"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerContainer(0.06)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.1em] align-bottom"
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={maskReveal}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
