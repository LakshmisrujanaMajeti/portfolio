import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check, CircleDot, ExternalLink } from "lucide-react";
import type { FeaturedProject } from "../data/portfolio";
import { projects } from "../data/portfolio";
import { tagStyle } from "../lib/ui";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  const rotateX = useSpring(useTransform(py, [0, 100], [3.4, -3.4]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 100], [-4.4, 4.4]), {
    stiffness: 120,
    damping: 20,
  });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${px}% ${py}%, rgba(${project.accent.glow},0.13), transparent 62%)`;

  const onMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width) * 100);
    py.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const onLeave = () => {
    px.set(50);
    py.set(50);
  };

  return (
    <Reveal delay={0.04 * (index % 2)}>
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformPerspective: 1500, transformStyle: "preserve-3d" }
        }
        className="fx-border group relative overflow-hidden rounded-[26px] border border-line bg-surface/50 p-2.5 backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.14] sm:p-3"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative grid gap-3">
          <div className="relative overflow-hidden rounded-[20px]">
            <ProjectVisual
              variant={project.visual}
              from={project.accent.from}
              to={project.accent.to}
            />
            <span className="pointer-events-none absolute left-4 top-4 rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 backdrop-blur">
              {project.index}
            </span>
          </div>

          <div className="flex flex-col justify-between p-3 sm:p-5">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-accent/85">
                {project.subtitle}
              </p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h3 className="font-display text-[26px] font-semibold leading-none tracking-tight text-ink sm:text-[30px]">
                  {project.name}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-400 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:text-accent"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>

              <p className="mt-4 text-[13px] leading-[1.75] text-muted">{project.description}</p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <Check
                      className="mt-[3px] h-3 w-3 shrink-0"
                      style={{ color: project.accent.to }}
                      aria-hidden
                    />
                    <span className="text-[11.5px] leading-snug text-ink/75">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech} className={tagStyle}>
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-medium text-ink transition-colors hover:border-accent/40 hover:text-white"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden />
                    Repository
                  </a>
                ) : (
                  <span
                    title="Add the real repository URL in src/data/portfolio.ts — no link is invented here."
                    className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint"
                  >
                    <CircleDot className="h-2.5 w-2.5" aria-hidden />
                    Repository link pending
                  </span>
                )}

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-medium text-ink transition-colors hover:border-accent/40 hover:text-white"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden />
                    Live demo
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint/80">
                    Demo link pending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-24 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-violet/[0.07] blur-[120px]" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div id="projects-title">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Things I've designed, built and shipped."
            index="04"
            description="Ten end-to-end builds spanning retrieval-augmented AI, NLP, computer vision and full-stack product engineering."
          />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint/80">
            Repository and demo links are added only when a real URL exists — no invented links.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
