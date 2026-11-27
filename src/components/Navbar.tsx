import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { EASE } from "../lib/motion";

const SECTION_IDS = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-line/70 bg-base/75 backdrop-blur-xl supports-[backdrop-filter]:bg-base/60"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-8"
        >
          <a
            href="#home"
            className="group flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.04] text-[11px] font-bold tracking-tight text-ink transition-colors duration-300 group-hover:border-accent/50">
              <span className="gradient-text">{profile.initials}</span>
              <span className="absolute -inset-px rounded-lg bg-gradient-to-br from-accent/20 to-violet/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            <span className="hidden sm:inline">Srujana</span>
            <span className="-ml-1.5 text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative block rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300"
                  >
                    <span
                      className={
                        isActive ? "text-ink" : "text-muted group-hover:text-ink"
                      }
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-px h-px origin-left bg-gradient-to-r from-accent via-violet to-transparent transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.07] lg:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" aria-hidden />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.04] text-ink transition-colors hover:border-white/25 lg:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-base/92 px-6 pt-[92px] pb-10 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: 0.06 } },
              }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "page" : undefined}
                    className="group flex items-baseline justify-between border-b border-line/60 py-4"
                  >
                    <span
                      className={`font-display text-[26px] font-semibold tracking-tight transition-colors ${
                        active === item.id ? "text-ink" : "text-muted group-hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="font-mono text-[11px] text-faint">
                      0{index + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-auto pt-10"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.4, duration: 0.5, ease: EASE }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                {profile.availability}
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 inline-block text-sm text-ink underline decoration-accent/40 decoration-1 underline-offset-4"
              >
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
