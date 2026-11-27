import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../data/portfolio";
import { fadeUp, stagger } from "../lib/motion";
import { btnGhost, btnPrimary, btnSecondary, iconButton } from "../lib/ui";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.15, 0.08)}
          className="relative z-10"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/90">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-pulse-ring" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[clamp(2.7rem,6.2vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.045em]"
          >
            <span className="block text-ink">Majeti Lakshmi</span>
            <span className="block gradient-text pb-1">Srujana</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-muted"
          >
            {profile.roles.map((role, index) => (
              <span key={role} className="flex items-center gap-2.5">
                {index > 0 && (
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent/60" />
                )}
                <span className={index === 0 ? "text-ink/90" : undefined}>{role}</span>
              </span>
            ))}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-7 max-w-xl font-display text-[clamp(1.15rem,2.1vw,1.5rem)] font-medium leading-snug text-ink/95"
          >
            <span className="text-gradient">Building Intelligent Applications.</span>
            <br className="hidden sm:block" /> Engineering Real-World Solutions.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[14.5px] leading-[1.75] text-muted"
          >
            {profile.intro}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 text-[13px] text-faint">
            {profile.supporting}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={btnPrimary}>
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
            <a href={profile.resume} download className={btnSecondary}>
              <Download className="h-4 w-4 text-accent" aria-hidden />
              Download Resume
            </a>
            <a href="#contact" className={btnGhost}>
              Let&apos;s Connect
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-3">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className={iconButton}
              aria-label="LinkedIn profile"
              title="LinkedIn (replace placeholder URL in src/data/portfolio.ts)"
            >
              <FaLinkedinIn className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className={iconButton}
              aria-label="GitHub profile"
              title="GitHub (replace placeholder URL in src/data/portfolio.ts)"
            >
              <SiGithub className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className={iconButton}
              aria-label={`Email ${profile.email}`}
            >
              <Mail className="h-4 w-4" />
            </a>
            <span aria-hidden className="ml-1 h-px w-10 bg-gradient-to-r from-line to-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
              Based in India
            </span>
          </motion.div>
        </motion.div>

        <div className="relative order-first lg:order-last">
          <HeroVisual />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base via-base/40 to-transparent"
      />
    </section>
  );
}
