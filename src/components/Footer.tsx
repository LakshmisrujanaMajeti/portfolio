import { ArrowUp, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { navItems, profile } from "../data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative border-t border-line/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#home" className="inline-flex items-baseline gap-1 text-[15px] font-semibold text-ink">
              Srujana<span className="text-accent">.</span>
            </a>
            <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-faint">
              Software Engineer · Full-Stack Developer · Generative AI Enthusiast
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {navItems.slice(1).map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[11.5px] text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div className="flex items-center gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-ink"
              >
                <SiGithub className="h-3.5 w-3.5" aria-hidden />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-ink"
              >
                <FaLinkedinIn className="h-3.5 w-3.5" aria-hidden />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-ink"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>

            <button
              type="button"
              onClick={backToTop}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-2 text-[11px] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink"
            >
              Back to top
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-faint">Designed &amp; Built with passion by Srujana.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint/70">
            © {year} Majeti Lakshmi Srujana
          </p>
        </div>
      </div>
    </footer>
  );
}
