export const btnBase =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 will-change-transform";

export const btnPrimary = `${btnBase} bg-gradient-to-r from-accent via-[#7c6bf5] to-violet text-white shadow-[0_10px_36px_-12px_rgba(99,130,255,0.9)] hover:-translate-y-0.5 hover:shadow-[0_16px_46px_-12px_rgba(120,120,255,0.95)] active:translate-y-0`;

export const btnSecondary = `${btnBase} border border-line bg-white/[0.04] text-ink hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] active:translate-y-0`;

export const btnGhost = `${btnBase} border border-transparent text-muted hover:text-ink`;

export const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-ink hover:shadow-[0_10px_28px_-14px_rgba(91,140,255,0.9)]";

export const tagStyle =
  "inline-flex items-center rounded-full border border-line/80 bg-white/[0.035] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted";
