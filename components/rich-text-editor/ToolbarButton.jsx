export default function ToolbarButton({ onClick, isActive, children }) {
  const base = "px-2 py-1 border rounded";
  const active = "bg-blue-500 text-white";

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