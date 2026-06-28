/** Small section eyebrow: an accent tick + a short, conversational label.
 *  No slide-style numbering. */
export function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-[family-name:var(--font-label)] text-sm font-medium lowercase text-accent">
      <span aria-hidden className="h-px w-8 bg-accent/70" />
      {text}
    </span>
  );
}
