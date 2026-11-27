import { Award, GraduationCap, Sparkles, Trophy } from "lucide-react";
import { achievements, certifications, education } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="relative py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div id="education-title">
          <SectionHeading
            eyebrow="Education & Recognition"
            title="Foundations, certifications and milestones."
            index="05"
          />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <article className="panel relative h-full overflow-hidden p-7 sm:p-9">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline opacity-70" />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
              />

              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/20 to-violet/10 text-accent">
                  <GraduationCap className="h-5 w-5" aria-hidden />
                </span>
                <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {education.period}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[24px] font-semibold leading-tight text-ink sm:text-[28px]">
                {education.degree}
              </h3>
              <p className="mt-2 text-[15px] text-accent/90">{education.field}</p>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted">
                {education.institute}
              </p>

              <div className="mt-8 flex items-end gap-6 border-t border-line/70 pt-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
                    CGPA
                  </p>
                  <p className="mt-1.5 flex items-baseline gap-1">
                    <span className="font-display text-[36px] font-semibold leading-none text-ink">
                      {education.cgpa}
                    </span>
                    <span className="text-[13px] text-faint">/ 10</span>
                  </p>
                </div>
                <div className="mb-1 h-10 w-px bg-line/80" aria-hidden />
                <p className="mb-1 max-w-[190px] text-[11.5px] leading-relaxed text-faint">
                  Computer Science &amp; Engineering, 2022 – 2026
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="panel h-full p-7 sm:p-8">
              <div className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-violet" aria-hidden />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                  Certifications
                </h3>
              </div>

              <ul className="mt-6 divide-y divide-line/70">
                {certifications.map((certification, index) => (
                  <li
                    key={certification.title}
                    className="group flex items-start gap-3 py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="mt-0.5 font-mono text-[10px] text-accent/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium leading-snug text-ink/90 transition-colors group-hover:text-ink">
                        {certification.title}
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                        {certification.issuer}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement} delay={0.06 * index}>
              <article className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white/[0.022] p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-white/[0.15]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-amber-300/90">
                  {index === 0 ? (
                    <Trophy className="h-4 w-4" aria-hidden />
                  ) : (
                    <Sparkles className="h-4 w-4" aria-hidden />
                  )}
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    Achievement
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/85">
                    {achievement}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
