import { useState } from "react";
import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiAndroidstudio,
  SiBootstrap,
  SiCss,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGooglecolab,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiOpenjdk,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiStreamlit,
  SiTailwindcss,
} from "react-icons/si";
import { Layers, Network, Sparkles, Terminal } from "lucide-react";
import { skillGroups } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type TechIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const icons: Record<string, TechIcon> = {
  Python: SiPython,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  "React.js": SiReact,
  HTML: SiHtml5,
  CSS: SiCss,
  Bootstrap: SiBootstrap,
  "Tailwind CSS": SiTailwindcss,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": Network,
  Flutter: SiFlutter,
  "Android Studio": SiAndroidstudio,
  LangChain: SiLangchain,
  RAG: Layers,
  "Large Language Models": Sparkles,
  "Scikit-learn": SiScikitlearn,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Git: SiGit,
  GitHub: SiGithub,
  Streamlit: SiStreamlit,
  "Google Colab": SiGooglecolab,
  "VS Code": Terminal,
};

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const group = skillGroups[activeIndex];

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-0 h-72 bg-[radial-gradient(ellipse_at_center,rgba(91,140,255,0.07),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div id="skills-title">
          <SectionHeading
            eyebrow="Technical Skills"
            title="The stack I build with."
            index="02"
            description="Grouped the way I actually work — languages, interfaces, services, data and the AI tooling that connects them."
          />
        </div>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Skill categories"
            className="mt-11 -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {skillGroups.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`skill-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`skill-panel-${item.id}`}
                  onClick={() => setActiveIndex(index)}
                  className={`relative shrink-0 rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all duration-300 ${
                    isActive
                      ? "border-transparent text-white"
                      : "border-line bg-white/[0.02] text-muted hover:border-white/20 hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-tab-pill"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent/90 to-violet/90 shadow-[0_8px_26px_-12px_rgba(99,110,255,0.9)]"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </Reveal>

          <div
            key={group.id}
            id={`skill-panel-${group.id}`}
            role="tabpanel"
            aria-labelledby={`skill-tab-${group.id}`}
            className="mt-8 motion-safe:animate-[panel-enter_0.45s_ease-out_both]"
          >
            <p className="mb-5 text-[13.5px] text-faint">{group.caption}</p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => {
                const Icon = icons[item] ?? Terminal;
                return (
                  <li key={item}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white/[0.025] p-4 transition-all duration-400 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/[0.05] hover:shadow-[0_20px_46px_-26px_rgba(91,140,255,0.75)]">
                      <div
                        aria-hidden
                        className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <div className="relative flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.07] to-transparent text-[16px] text-ink/85 transition-colors duration-300 group-hover:text-accent">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="text-[12.5px] font-medium leading-tight text-ink/90">
                          {item}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

        <Reveal delay={0.16}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-faint/80">
            No invented proficiency scores — just tools I've actually built with.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
