import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "../../lib/motion";

interface Props {
  nav: { label: string; href: string }[];
  businessName: string;
  bookingUrl: string;
  bookingLabel: string;
  instagramUrl: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
}

// Minimal Instagram glyph — rounded square + lens + shutter dot, drawn with
// currentColor so it inherits whatever text color/hover state wraps it.
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Header({
  nav,
  businessName,
  bookingUrl,
  bookingLabel,
  instagramUrl,
  logoSrc,
  logoWidth,
  logoHeight,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-[var(--color-bg)]/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
      <div className="mx-auto flex h-20 max-w-(--container-max) items-center justify-between px-6 md:px-10">
        <a href="/" className="flex items-center gap-2.5">
          <img
            src={logoSrc}
            width={logoWidth}
            height={logoHeight}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded-full"
          />
          <span className="font-[var(--font-display)] text-lg tracking-[0.15em] text-[var(--color-ink)] uppercase">
            {businessName}
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-[var(--color-ink-muted)] transition-colors duration-300 hover:text-[var(--color-ink)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Barber Warnz on Instagram"
            className="text-[var(--color-ink-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <InstagramGlyph className="h-5 w-5" />
          </a>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-colors duration-300 hover:bg-[var(--color-accent-soft)]"
          >
            {bookingLabel}
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: ease.premium }}
            className="h-px w-6 bg-[var(--color-ink)]"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: ease.premium }}
            className="h-px w-6 bg-[var(--color-ink)]"
          />
        </button>
      </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.premium }}
            className="fixed inset-0 top-20 z-40 flex flex-col justify-between bg-[var(--color-bg)] px-6 pb-10 md:hidden"
          >
            <nav className="flex flex-1 flex-col items-start justify-center gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: ease.premium, delay: 0.05 * i }}
                  className="font-[var(--font-display)] text-4xl text-[var(--color-ink)]"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ease.premium, delay: 0.05 * nav.length }}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <InstagramGlyph className="h-5 w-5" />
                Follow on Instagram
              </motion.a>
            </nav>
            <motion.a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: ease.premium, delay: 0.2 }}
              className="w-full rounded-full bg-[var(--color-accent)] px-6 py-4 text-center text-sm font-medium text-[var(--color-bg)]"
            >
              {bookingLabel}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
