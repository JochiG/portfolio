export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-current/20 px-3 py-1 font-[family-name:var(--font-label)] text-xs opacity-80">
      {children}
    </span>
  );
}
