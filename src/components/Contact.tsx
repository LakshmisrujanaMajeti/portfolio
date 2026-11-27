import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { contact, profile } from "../data/portfolio";
import { CONTACT_ENDPOINT, buildMailto } from "../lib/contact";
import { btnPrimary, iconButton } from "../lib/ui";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type FormValues = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "sending" | "sent" | "handoff" | "failed";

const EMPTY: FormValues = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 3)
    errors.subject = "Add a short subject (at least 3 characters).";
  if (values.message.trim().length < 20)
    errors.message = "Tell me a little more — at least 20 characters.";
  return errors;
}

const labelClass = "mb-2 block font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint";
const fieldClass =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[13.5px] text-ink placeholder:text-faint/60 transition-colors duration-300 focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none";

export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const update =
    (key: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((previous) => ({ ...previous, [key]: value }));
      setErrors((previous) => ({ ...previous, [key]: undefined }));
      if (status === "sent" || status === "failed" || status === "handoff") {
        setStatus("idle");
        setNotice("");
      }
    };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("failed");
      setNotice("Please correct the highlighted fields and try again.");
      return;
    }

    if (!CONTACT_ENDPOINT) {
      window.location.href = buildMailto(values);
      setStatus("handoff");
      setNotice(
        "Your email app is opening with this message pre-filled. Press send there and it lands in my inbox directly.",
      );
      return;
    }

    setStatus("sending");
    setNotice("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      setStatus("sent");
      setNotice("Message sent — thank you. I'll get back to you as soon as I can.");
      setValues(EMPTY);
    } catch {
      setStatus("failed");
      setNotice(
        `The form couldn't be delivered right now. Please email me directly at ${profile.email}.`,
      );
    }
  };

  const noticeTone =
    status === "sent" || status === "handoff"
      ? "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200"
      : status === "failed"
        ? "border-rose-400/25 bg-rose-400/[0.07] text-rose-200"
        : "border-line bg-white/[0.03] text-muted";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_center,rgba(91,140,255,0.08),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div id="contact-title">
          <SectionHeading
            eyebrow="Contact"
            title={contact.heading}
            index="06"
            description={contact.description}
          />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group panel flex items-center gap-4 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/35"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-accent">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    Email
                  </span>
                  <span className="mt-1 block truncate text-[13px] text-ink/90">
                    {profile.email}
                  </span>
                </span>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </a>

              <div className="panel flex items-center gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-violet">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    Location
                  </span>
                  <span className="mt-1 block text-[13px] text-ink/90">{profile.location}</span>
                </span>
              </div>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group panel flex items-center gap-4 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/35"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-accent">
                  <FaLinkedinIn className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    LinkedIn
                  </span>
                  <span className="mt-1 block text-[13px] text-ink/90">Connect with me</span>
                </span>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </a>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group panel flex items-center gap-4 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/35"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-ink/80">
                  <SiGithub className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    GitHub
                  </span>
                  <span className="mt-1 block text-[13px] text-ink/90">See what I'm building</span>
                </span>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </a>

              <div className="panel flex items-center gap-3 p-5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="text-[12px] text-muted">
                  {profile.availability} — usually replies within a day.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="panel relative overflow-hidden p-6 sm:p-8"
              aria-describedby="contact-form-note"
            >
              <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline opacity-60" />

              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-[17px] font-semibold text-ink">
                  Send a message
                </h3>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint transition-colors hover:border-white/20 hover:text-ink"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" aria-hidden /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" aria-hidden /> Copy email
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-[11.5px] text-rose-300">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-[11.5px] text-rose-300">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={update("subject")}
                  placeholder="Opportunity, collaboration, or a quick hello"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={fieldClass}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-[11.5px] text-rose-300">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={update("message")}
                  placeholder="Tell me what you're building and how I can help."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldClass} resize-y`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-[11.5px] text-rose-300">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={status === "sending"} className={btnPrimary}>
                  {status === "sending" ? (
                    <>
                      <span
                        aria-hidden
                        className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-white/40 border-t-white"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    </>
                  )}
                </button>
                <p id="contact-form-note" className="text-[11px] leading-relaxed text-faint">
                  {CONTACT_ENDPOINT
                    ? "Delivered straight to my inbox."
                    : "Opens your email app with the message ready to send."}
                </p>
              </div>

              <div aria-live="polite" role="status" className="min-h-0">
                <AnimatePresence>
                  {notice && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[12px] leading-relaxed ${noticeTone}`}
                    >
                      <span className="mt-0.5 shrink-0">
                        {status === "sent" || status === "handoff" ? (
                          <Check className="h-3.5 w-3.5" aria-hidden />
                        ) : (
                          <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      {notice}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
                <a
                  href={`mailto:${profile.email}`}
                  className={iconButton}
                  aria-label={`Email ${profile.email}`}
                >
                  <Mail className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={iconButton}
                  aria-label="LinkedIn profile"
                >
                  <FaLinkedinIn className="h-3.5 w-3.5" aria-hidden />
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={iconButton}
                  aria-label="GitHub profile"
                >
                  <SiGithub className="h-4 w-4" aria-hidden />
                </a>
                <span className="ml-auto text-right font-mono text-[9px] uppercase tracking-[0.16em] text-faint/80">
                  {profile.location}
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
