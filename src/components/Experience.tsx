import { Briefcase } from "lucide-react";
import type { ExperienceItem } from "../data/portfolio";
import { experience, internships } from "../data/portfolio";
import { tagStyle } from "../lib/ui";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {stack.map((item) => (
        <li key={item} className={tagStyle}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function PrimaryRole({ item }: { item: ExperienceItem }) {
  return (
    <div className="panel relative overflow-hidden p-6 sm:p-8">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/20 to-violet/10 text-accent">
            <Briefcase className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-emerald-300/85">
              {item.kind} · Current
            </p>
            <h3 className="mt-2 font-display text-[22px] font-semibold leading-tight text-ink sm:text-[26px]">
              {item.role}
            </h3>
            <p className="mt-1 text-[13.5px] text-muted">{item.company}</p>
          </div>
        </div>

        <span className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {item.period}
        </span>
      </div>

      <p className="relative mt-6 max-w-3xl text-[14px] leading-[1.8] text-muted">
        {item.summary}
      </p>
      <StackTags stack={item.stack} />

      {item.projects && (
        <>
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
              Client projects
            </span>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
            <span className="font-mono text-[10px] text-faint">{item.projects.length}</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {item.projects.map((project, index) => (
              <Reveal key={project.title} delay={0.04 * index}>
                <article className="group h-full rounded-xl border border-line/80 bg-white/[0.022] p-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.045]">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[10px] text-accent/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-[13.5px] font-medium leading-snug text-ink/95">
                      {project.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line/70 bg-black/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div id="experience-title">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've built and shipped."
            index="03"
            description="Enterprise products in production, plus focused internships across Generative AI, full-stack engineering and machine learning."
          />
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-0 top-3 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/50 via-violet/30 to-transparent sm:block"
          />
          <div className="relative sm:pl-8">
            <span
              aria-hidden
              className="absolute left-0 top-8 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent/60 bg-accent/80 shadow-[0_0_16px_3px_rgba(91,140,255,0.45)] sm:block"
            />
            {experience.map((item) => (
              <PrimaryRole key={item.company} item={item} />
            ))}

            <div className="mt-12">
              <Reveal>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.16em] text-ink/85">
                    Internship Experiences
                  </h3>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
                  <span className="font-mono text-[10px] text-faint">
                    {internships.length} roles
                  </span>
                </div>
              </Reveal>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {internships.map((item, index) => (
                  <li key={item.company} className="h-full">
                    <Reveal delay={index * 0.06}>
                      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/[0.022] p-5 transition-all duration-400 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04] hover:shadow-[0_24px_50px_-32px_rgba(0,0,0,0.95)]">
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                        />
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
                              Internship
                            </p>
                            <h4 className="mt-2 text-[15px] font-semibold leading-snug text-ink">
                              {item.role}
                            </h4>
                            <p className="mt-1 text-[12px] text-muted">{item.company}</p>
                          </div>
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet/70 shadow-[0_0_10px_2px_rgba(139,92,246,0.35)]" />
                        </div>
                        <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
                          {item.summary}
                        </p>
                        <StackTags stack={item.stack} />
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
