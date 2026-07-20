import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CREAM, DARK, ACCENT, BODY } from "../theme";

interface PillButtonProps {
  children: React.ReactNode;
  dark?: boolean;
  accentDot?: boolean;
  onClick?: () => void;
}

export default function PillButton({ children, dark = false, accentDot = false, onClick }: PillButtonProps) {
  const [hovered, setHovered] = useState(false);
  const bg = dark ? (hovered ? CREAM : DARK) : hovered ? DARK : CREAM;
  const fg = dark ? (hovered ? DARK : CREAM) : hovered ? CREAM : DARK;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.6rem",
        backgroundColor: bg, color: fg,
        border: `1px solid ${dark ? "rgba(244,240,234,0.25)" : "rgba(17,17,17,0.18)"}`,
        borderRadius: "99px",
        padding: accentDot ? "0.55rem 1.4rem 0.55rem 0.55rem" : "0.65rem 1.5rem",
        fontFamily: BODY, fontSize: "0.82rem", fontWeight: 500,
        letterSpacing: "0.04em", cursor: "pointer",
        transition: "background-color 0.22s, color 0.22s",
      }}
    >
      {accentDot && (
        <span style={{
          width: "28px", height: "28px", backgroundColor: ACCENT, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <ArrowUpRight size={13} color={CREAM} />
        </span>
      )}
      {children}
    </button>
  );
}
