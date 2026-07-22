import { Mail, Instagram, Linkedin, Phone } from "lucide-react";
import { CREAM, DARK, DISPLAY, BODY } from "../theme";
import { useLanguage } from "../i18n";
import { STRINGS } from "../strings";

const SOCIAL_LINKS: Record<string, string> = {
  Instagram: "https://instagram.com/deui.space",
  LinkedIn: "https://www.linkedin.com/in/fannisazzuri",
};

interface SiteFooterProps {
  onProjectsClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

export default function SiteFooter({ onProjectsClick, onAboutClick, onContactClick }: SiteFooterProps) {
  const { lang } = useLanguage();
  const t = STRINGS[lang].footer;

  const FOOTER_COLS = [
    { title: t.services, items: t.serviceItems, kind: "service" as const },
    { title: t.studio, items: [t.studioItems.projects, t.studioItems.about, t.studioItems.contact], kind: "studio" as const },
    { title: t.follow, items: ["Instagram", "LinkedIn"], kind: "follow" as const },
  ];

  return (
    <footer style={{ backgroundColor: DARK, color: CREAM }}>
      <style>{`
        .sf-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding: 4.5rem 3rem 4rem; }
        @media (max-width: 700px) {
          .sf-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem 1.5rem; padding: 3.5rem 1.5rem 3rem; }
          .sf-grid > *:first-child { grid-column: 1 / -1; }
        }
      `}</style>
      {/* Footer body */}
      <div className="sf-grid" style={{ borderBottom: "1px solid color-mix(in srgb, var(--bg-1) 8%, transparent)" }}>
        {/* Brand column */}
        <div>
          <p style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "1.15rem", letterSpacing: "0.18em", marginBottom: "1.1rem" }}>
            DEUI.SPACE
          </p>
          <p style={{ fontFamily: BODY, fontSize: "0.88rem", lineHeight: 1.75, opacity: 0.45, maxWidth: "240px", marginBottom: "2rem" }}>
            {t.tagline[0]}<br />{t.tagline[1]}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <a href="mailto:fannisazzuri@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: BODY, fontSize: "0.78rem", opacity: 0.45, color: CREAM, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}>
              <Mail size={13} />&nbsp;fannisazzuri@gmail.com
            </a>
            <a href="tel:+6285171672687" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: BODY, fontSize: "0.78rem", opacity: 0.45, color: CREAM, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}>
              <Phone size={13} />&nbsp;+62 851-7167-2687
            </a>
            <a href={SOCIAL_LINKS.Instagram} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: BODY, fontSize: "0.78rem", opacity: 0.45, color: CREAM, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}>
              <Instagram size={13} />&nbsp;@deui.space
            </a>
            <a href={SOCIAL_LINKS.LinkedIn} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: BODY, fontSize: "0.78rem", opacity: 0.45, color: CREAM, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}>
              <Linkedin size={13} />&nbsp;LinkedIn
            </a>
          </div>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <p style={{ fontFamily: BODY, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.28, marginBottom: "1.4rem" }}>
              {col.title}
            </p>
            {col.items.map((s) => {
              const handleClick =
                col.kind === "studio" && s === t.studioItems.projects ? onProjectsClick :
                  col.kind === "studio" && s === t.studioItems.about ? onAboutClick :
                    col.kind === "studio" && s === t.studioItems.contact ? onContactClick :
                      col.kind === "follow" ? () => window.open(SOCIAL_LINKS[s], "_blank", "noreferrer") :
                        undefined;
              return (
                <p
                  key={s}
                  onClick={handleClick}
                  style={{
                    fontFamily: BODY, fontSize: "0.82rem", opacity: 0.48,
                    marginBottom: "0.65rem", cursor: handleClick ? "pointer" : "default", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.48")}
                >
                  {s}
                </p>
              );
            })}
          </div>
        ))}
      </div>

      {/* Oversized footer wordmark */}
      <div style={{ overflow: "hidden", padding: "0", lineHeight: 1, textAlign: "center" }}>
        <p style={{
          fontFamily: DISPLAY, fontWeight: 900,
          fontSize: "clamp(3rem, 13vw, 99rem)",
          lineHeight: 0.82, letterSpacing: "-0.01em",
          margin: 0, padding: "0 2.5rem",
          color: "color-mix(in srgb, var(--bg-1) 5.5%, transparent)",
          whiteSpace: "nowrap", userSelect: "none",
        }}>
          RIENHARDT
        </p>
      </div>

      {/* Legal bar */}
      <div style={{
        padding: "1rem 3rem 1.5rem",
        display: "flex", flexWrap: "wrap", gap: "0.4rem 1rem", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid color-mix(in srgb, var(--bg-1) 5%, transparent)",
      }}>
        <p style={{ fontFamily: BODY, fontSize: "0.62rem", opacity: 0.22, margin: 0 }}>
          © {new Date().getFullYear()} Deui.space · Fannisa Azzuri Rienhardt. {t.rights}
        </p>
        <p style={{ fontFamily: BODY, fontSize: "0.62rem", opacity: 0.22, margin: 0 }}>
          Yogyakarta, Indonesia
        </p>
      </div>
    </footer>
  );
}
