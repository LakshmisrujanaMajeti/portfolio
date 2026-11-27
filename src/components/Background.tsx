import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Ambient page background: deep gradient wash, masked grid, slow drifting
 * accent light and a cursor-following glow (pointer devices only).
 */
export function Background() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);
  const x = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.5 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(91,140,255,0.09), rgba(139,92,246,0.05) 42%, transparent 72%)`;

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-20%,#101528_0%,#080a11_45%,#06070b_100%)]" />
      <div className="absolute inset-0 grid-overlay opacity-70" />

      <div className="absolute -top-40 left-[8%] h-[34rem] w-[34rem] rounded-full bg-accent/12 blur-[130px] motion-safe:animate-float-slow" />
      <div
        className="absolute top-[18%] right-[-8%] h-[30rem] w-[30rem] rounded-full bg-violet/12 blur-[140px] motion-safe:animate-float-slow"
        style={{ animationDelay: "-2.5s" }}
      />
      <div
        className="absolute bottom-[-12%] left-[32%] h-[26rem] w-[26rem] rounded-full bg-cyan/8 blur-[150px] motion-safe:animate-float-slow"
        style={{ animationDelay: "-4s" }}
      />

      {!reduce && <motion.div className="absolute inset-0" style={{ background: spotlight }} />}

      <div className="absolute inset-0 noise opacity-[0.035] mix-blend-soft-light" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-base to-transparent" />
    </div>
  );
}
