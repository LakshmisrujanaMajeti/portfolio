import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  index?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70" />
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent/90">
            {eyebrow}
          </span>
          {index && (
            <span className="font-mono text-[11px] tracking-[0.2em] text-faint/70">{index}</span>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.08] text-ink">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
