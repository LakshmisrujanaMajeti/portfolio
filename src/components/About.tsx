import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight, Compass, Layers, Sparkles } from "lucide-react";
import { about, profile } from "../data/portfolio";
import { useCountUp } from "../hooks/useCountUp";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const focusAreas = [
  { Icon: Layers, label: "Full-stack product engineering", meta: "React · FastAPI · Node" },
  { Icon: Sparkles, label: "Generative AI & RAG systems", meta: "LangChain · LLMs" },
  { Icon: Compass, label: "Enterprise application delivery", meta: "Education · Civil supplies · IoT" },
] as const;

function StatCard({
  value,
  label,
  note,
  index,
}: {
  value: number;
  label: string;
  note: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(value, inView);

  return (
    <Reveal delay={index * 0.08}>
      <div
        ref={ref}
        className="panel group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/15"
      >
        <div
          aria-hidden
          className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
        />
        <div className="relative flex items-baseline gap-1">
          <span className="font-display text-[42px] font-semibold leading-none tracking-tight text-ink tabular-nums">
            {count}
          </span>
        </div>
        <p className="relative mt-3 text-[13.5px] font-medium text-ink/90">{label}</p>
        <p className="relative mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          {note}
        </p>
      </div>
    </Reveal>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div id="about-title">
              <SectionHeading eyebrow="About" title={about.heading} index="01" />
            </div>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-[17px] font-medium leading-relaxed text-ink/85 sm:text-[18px]">
                {about.lead}
              </p>
            </Reveal>

            <div className="mt-6 space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.14 + index * 0.05}>
                  <p className="max-w-2xl text-[14.5px] leading-[1.8] text-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.12} className="lg:pt-4">
            <div className="panel relative overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px hairline opacity-70"
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-faint">
                  Currently
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
              </div>

              <p className="mt-4 font-display text-lg font-semibold text-ink">
                Junior Developer
              </p>
              <p className="mt-1 text-[13px] text-muted">
                Quantex Intelligence Systems Pvt Ltd
              </p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                May 2026 — Present
              </p>

              <div className="my-6 h-px bg-gradient-to-r from-line to-transparent" />

              <ul className="space-y-4">
                {focusAreas.map(({ Icon, label, meta }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-accent">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[12.5px] font-medium leading-snug text-ink/90">
                        {label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                        {meta}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-6 h-px bg-gradient-to-r from-line to-transparent" />

              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center justify-between rounded-xl border border-line/80 bg-white/[0.02] px-3.5 py-3 transition-colors duration-300 hover:border-accent/35 hover:bg-white/[0.04]"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    Email
                  </span>
                  <span className="mt-1 block truncate text-[12px] text-ink/90">
                    {profile.email}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {about.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              note={stat.note}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
