
export default function ToolbarButton({ onClick, isActive, children }: { onClick: () => void; isActive: boolean; children: React.ReactNode }) {
  const base = "px-2 py-1 rounded border border-border text-sm font-medium text-text-primary hover:bg-surface-muted transition-colors cursor-pointer";
  const active = "bg-brand-500 text-white border-brand-500";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${isActive ? active : ""}`}
    >
      {children}
    </button>
  );
}