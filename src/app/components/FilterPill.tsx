import { CREAM, DARK, BODY } from "../theme";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: BODY, fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.04em",
        padding: "0.5rem 1.25rem", borderRadius: "99px", cursor: "pointer",
        backgroundColor: active ? DARK : "transparent",
        color: active ? CREAM : DARK,
        border: `1px solid ${active ? DARK : "rgba(17,17,17,0.22)"}`,
        opacity: active ? 1 : 0.7,
        transition: "background-color 0.2s, color 0.2s, opacity 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = DARK; } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = "rgba(17,17,17,0.22)"; } }}
    >
      {label}
    </button>
  );
}
