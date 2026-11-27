/**
 * Contact delivery.
 *
 * By default the form composes a pre-filled email in the visitor's own mail
 * client (a real delivery path that needs no backend).
 *
 * To deliver submissions to an inbox or endpoint instead, set
 *   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
 * in `.env` (any endpoint accepting a JSON POST) and rebuild.
 * See .env.example.
 */
export const CONTACT_ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT ?? "").trim();

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function buildMailto(payload: ContactPayload): string {
  const subject = payload.subject.trim() || `Portfolio enquiry from ${payload.name.trim()}`;
  const body = [
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    "",
    payload.message.trim(),
  ].join("\n");

  return `mailto:majeti.srujana99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
