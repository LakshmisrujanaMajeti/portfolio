import { Sparkles } from "lucide-react";

type VisualProps = {
  variant: "document" | "voice" | "repository";
  from: string;
  to: string;
};

const WAVE = [18, 34, 52, 30, 64, 78, 46, 88, 62, 40, 70, 54, 32, 60, 44, 26, 50, 36];

/** Abstract, hand-built project artwork — used instead of stock screenshots. */
export function ProjectVisual({ variant, from, to }: VisualProps) {
  return (
    <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070a11]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 0%, ${from}26, transparent 60%), radial-gradient(ellipse at 85% 90%, ${to}26, transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(ellipse at 50% 50%, #000 30%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, #000 30%, transparent 78%)",
        }}
      />

      <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-8">
        {variant === "document" && <DocumentArt from={from} to={to} />}
        {variant === "voice" && <VoiceArt from={from} to={to} />}
        {variant === "repository" && <RepositoryArt from={from} to={to} />}
      </div>
    </div>
  );
}

function DocumentArt({ from, to }: { from: string; to: string }) {
  return (
    <div className="relative w-full max-w-[280px]">
      <div
        aria-hidden
        className="absolute inset-x-6 -top-4 h-10 rounded-t-xl border border-white/[0.06] bg-white/[0.02]"
      />
      <div
        aria-hidden
        className="absolute inset-x-3 -top-2 h-10 rounded-t-xl border border-white/[0.07] bg-white/[0.03]"
      />
      <div className="relative rounded-xl border border-white/10 bg-[#0b0f19]/95 p-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-faint">
            source.pdf
          </span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: to, boxShadow: `0 0 10px 2px ${to}80` }}
          />
        </div>
        <div className="mt-4 space-y-2">
          {[100, 88, 94, 62].map((width, index) => (
            <div
              key={index}
              className="h-1.5 rounded-full bg-gradient-to-r from-white/20 to-white/[0.06]"
              style={{ width: `${width}%` }}
            />
          ))}
          <div
            className="mt-3 h-1.5 w-[72%] rounded-full"
            style={{ background: `linear-gradient(90deg, ${from}, ${to})`, opacity: 0.85 }}
          />
          {[84, 66].map((width, index) => (
            <div
              key={`b-${index}`}
              className="h-1.5 rounded-full bg-white/[0.1]"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-lg border border-white/12 bg-[#0c1120]/95 px-2.5 py-2 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.95)] backdrop-blur">
        <Sparkles className="h-3 w-3" style={{ color: to }} aria-hidden />
        <span className="font-mono text-[8.5px] uppercase tracking-[0.13em] text-muted">
          grounded answer
        </span>
      </div>
    </div>
  );
}

function VoiceArt({ from, to }: { from: string; to: string }) {
  return (
    <div className="w-full max-w-[290px]">
      <div className="flex items-end justify-between gap-[3px] rounded-xl border border-white/10 bg-[#0b0f19]/95 px-4 py-5">
        {WAVE.map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-full motion-safe:animate-[float-slow_3s_ease-in-out_infinite]"
            style={{
              height: `${height * 0.62}px`,
              background: `linear-gradient(180deg, ${index % 2 === 0 ? from : to}, ${index % 2 === 0 ? from : to}22)`,
              opacity: 0.55 + (height / 200),
              animationDelay: `${index * 0.08}s`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
        <span>clarity</span>
        <span>grammar</span>
        <span>confidence</span>
      </div>
      <div className="mt-2 flex gap-1.5">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-0.5 flex-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${from}00, ${to})`,
              opacity: 0.4 + index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RepositoryArt({ from, to }: { from: string; to: string }) {
  return (
    <div className="w-full max-w-[290px]">
      <div className="rounded-xl border border-white/10 bg-[#0b0f19]/95 p-4">
        <svg viewBox="0 0 240 92" className="h-[92px] w-full" role="presentation">
          <defs>
            <linearGradient id="repo-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={from} />
              <stop offset="1" stopColor={to} />
            </linearGradient>
          </defs>
          <path d="M24 12 V74" stroke="url(#repo-line)" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
          <path d="M24 34 C60 34 66 20 112 20" stroke="url(#repo-line)" strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
          <path d="M24 58 C64 58 70 70 124 70" stroke="url(#repo-line)" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
          <path d="M112 20 H210" stroke="url(#repo-line)" strokeWidth="1.5" fill="none" strokeOpacity="0.35" />
          <path d="M124 70 H206" stroke="url(#repo-line)" strokeWidth="1.5" fill="none" strokeOpacity="0.25" />
          {[
            { cx: 24, cy: 12, r: 4 },
            { cx: 24, cy: 34, r: 3 },
            { cx: 24, cy: 58, r: 3 },
            { cx: 24, cy: 74, r: 4 },
            { cx: 112, cy: 20, r: 3.5 },
            { cx: 124, cy: 70, r: 3.5 },
          ].map((dot, index) => (
            <circle
              key={index}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="#0b0f19"
              stroke={index % 2 === 0 ? from : to}
              strokeWidth="1.8"
            />
          ))}
        </svg>

        <div className="mt-2 space-y-1.5">
          {[
            { label: "main", meta: "merge" },
            { label: "feat/oauth", meta: "open PR" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1.5"
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: to }}
                />
                <span className="font-mono text-[8.5px] text-muted">{row.label}</span>
              </span>
              <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-faint">
                {row.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-faint">
        caching · real-time updates
      </p>
    </div>
  );
}
