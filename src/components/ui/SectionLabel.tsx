export function SectionLabel({ index, text }: { index: number; text: string }) {
  const num = String(index).padStart(2, '0');
  return (
    <span className="font-[family-name:var(--font-label)] text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {num} — {text}
    </span>
  );
}
