import { motion, useReducedMotion } from "framer-motion";
import {
  SiFastapi,
  SiLangchain,
  SiNodedotjs,
  SiPython,
  SiReact,
} from "react-icons/si";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "../data/portfolio";

const chips = [
  { label: "React", Icon: SiReact, className: "left-[-4%] top-[16%]", delay: 0 },
  { label: "FastAPI", Icon: SiFastapi, className: "right-[-2%] top-[10%]", delay: 1.1 },
  { label: "LangChain", Icon: SiLangchain, className: "right-[-6%] bottom-[22%]", delay: 2 },
  { label: "Node.js", Icon: SiNodedotjs, className: "left-[-2%] bottom-[26%]", delay: 0.6 },
] as const;

const systems = [
  { Icon: SiPython, label: "Python services", meta: "FastAPI · Flask" },
  { Icon: SiReact, label: "React interfaces", meta: "TypeScript · Tailwind" },
  { Icon: Sparkles, label: "GenAI pipelines", meta: "LangChain · RAG" },
] as const;

/**
 * Abstract technology composition used in place of a stock photograph:
 * orbiting rings, a floating glass identity panel and drifting stack chips.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] select-none">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(91,140,255,0.28),transparent_62%)] blur-2xl" />
        <div className="absolute left-[58%] top-[62%] h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.3),transparent_65%)] blur-2xl" />
        <div className="absolute right-[12%] top-[18%] h-40 w-40 rounded-full bg-cyan/15 blur-[70px]" />

        <div className="absolute inset-[6%] rounded-full border border-white/[0.055]" />
        <div className="absolute inset-[15%] rounded-full border border-white/[0.075]" />
        <div className="absolute inset-[24%] rounded-full border border-dashed border-white/[0.09] motion-safe:animate-spin-slow">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_2px_rgba(34,211,238,0.7)]" />
        </div>
        <div className="absolute inset-[33%] rounded-full border border-white/[0.05] motion-safe:animate-spin-slower">
          <span className="absolute left-0 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_12px_2px_rgba(139,92,246,0.7)]" />
        </div>

        <div className="absolute inset-x-[18%] top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-y-[18%] left-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-accent/60 via-violet/30 to-cyan/40 opacity-60 blur-[2px]"
          />
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0a0d16]/90 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(91,140,255,0.22),transparent_70%)]"
            />
            <div className="relative flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
                Engineer
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-emerald-300">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-pulse-ring" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-emerald-400" />
                </span>
                Online
              </span>
            </div>

            <p className="relative mt-6 font-display text-[46px] font-bold leading-none tracking-[-0.04em] gradient-text sm:text-[54px]">
              {profile.initials}
            </p>
            <p className="relative mt-3 text-[12.5px] font-medium text-ink/90">
              {profile.shortName}
            </p>
            <p className="relative mt-1 text-[10.5px] leading-relaxed text-faint">
              Software Engineer · Full-Stack · GenAI
            </p>

            <div className="relative my-4 h-px bg-gradient-to-r from-white/10 to-transparent" />

            <ul className="relative space-y-2.5">
              {systems.map(({ Icon, label, meta }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-md border border-white/[0.08] bg-white/[0.04] text-[11px] text-muted">
                    <Icon aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[10.5px] font-medium text-ink/85">
                      {label}
                    </span>
                    <span className="block truncate font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                      {meta}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-3 w-3 shrink-0 text-faint" aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {chips.map(({ label, Icon, className, delay }) => (
        <motion.div
          key={label}
          className={`absolute ${className}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={
            reduce
              ? { opacity: 1 }
              : { opacity: 1, y: [0, -9, 0] }
          }
          transition={
            reduce
              ? { duration: 0.6, delay: 0.6 }
              : {
                  opacity: { duration: 0.7, delay: 0.6 + delay * 0.08 },
                  y: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay },
                }
          }
        >
          <div className="flex items-center gap-2 rounded-xl border border-line/90 bg-[#0b0e17]/85 px-2.5 py-1.5 shadow-[0_14px_34px_-18px_rgba(0,0,0,0.95)] backdrop-blur-md">
            <Icon className="h-3.5 w-3.5 text-accent" aria-hidden />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
              {label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
