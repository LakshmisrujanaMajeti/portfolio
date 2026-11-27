import { ArrowUpRight, Check } from "lucide-react";
import { learning } from "../data/portfolio";
import { Reveal } from "./Reveal";

export function Learning() {
  return (
    <section aria-labelledby="learning-title" className="relative pb-24 sm:pb-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <Reveal>
          <div className="fx-border panel relative overflow-hidden p-7 sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(91,140,255,0.12),transparent_55%),radial-gradient(ellipse_at_88%_100%,rgba(139,92,246,0.12),transparent_55%)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet/70" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet/90">
                    Continuous Learning
                  </span>
                </div>

                <h2
                  id="learning-title"
                  className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.5rem)] font-semibold leading-[1.1] text-ink"
                >
                  {learning.heading}
                </h2>

                <p className="mt-5 max-w-xl text-[14px] leading-[1.8] text-muted">
                  {learning.description}
                </p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {learning.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                        <Check className="h-2.5 w-2.5" aria-hidden />
                      </span>
                      <span className="text-[12px] leading-snug text-ink/75">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex flex-col justify-between gap-8 border-line/70 lg:border-l lg:pl-12">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-faint">
                    The mindset
                  </p>
                  <div className="mt-4 space-y-1">
                    {learning.statement.map((word, index) => (
                      <Reveal key={word} delay={0.08 * index} y={14}>
                        <p
                          className={`font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-[1.06] tracking-tight ${
                            index % 2 === 0 ? "text-ink" : "gradient-text"
                          }`}
                        >
                          {word}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group inline-flex w-fit items-center gap-2 text-[12.5px] font-medium text-ink transition-colors hover:text-white"
                >
                  Explore opportunities with me
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
