import { useState, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Menu, X, Droplet, Moon } from "lucide-react";
import { CREAM, DARK, ACCENT, DISPLAY, BODY } from "../theme";
import { useLanguage } from "../i18n";
import { STRINGS } from "../strings";
import { useTheme } from "./ThemeContext";

interface SiteNavProps {
  onLogoClick: () => void;
  onProjectsClick: () => void;
  onAboutClick?: () => void;
  /** Filters the Projects archive down to Residential + Commercial work. */
  onInteriorClick?: () => void;
  /** Filters the Projects archive down to Retail / visual-merchandising work. */
  onVisualMerchandisingClick?: () => void;
  /** Takes the visitor to the "Talk With Us" contact section on Home. */
  onContactClick?: () => void;
  /** "static" = home hero nav (not sticky, plain). "sticky" = sticky nav with scroll shadow, used on the archive & detail pages. */
  variant?: "static" | "sticky";
  /** Shows a back arrow before the logo (used on the project detail page). */
  showBack?: boolean;
}

// Below this width the link row doesn't have room to breathe (it starts
// clipping past the edge of the screen), so it collapses into a hamburger
// menu instead. Inline styles can't express a media query, hence the one
// small <style> tag — everything else on this component stays inline like
// the rest of the app.
const BREAKPOINT = 900;

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        backgroundColor: isLight ? "#E4E1DA" : "var(--bg-2)",
        border: `1.5px solid ${isLight ? "#1A1A1A" : "var(--accent)"}`,
        borderRadius: "999px",
        padding: "0.4rem 1rem 0.4rem 0.4rem",
        cursor: "pointer",
        fontFamily: BODY, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em",
        color: isLight ? "#1A1A1A" : "var(--bg-1)",
        transition: "all 0.2s"
      }}
    >
      <div style={{
        backgroundColor: isLight ? "#F1F0EC" : "transparent",
        borderRadius: "50%", padding: "0.3rem",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {isLight ? <Droplet size={14} color="#1A1A1A" /> : <Moon size={14} color="var(--bg-1)" />}
      </div>
      {isLight ? "BLUSH" : "NOIR"}
    </button>
  );
}

function LanguageToggle({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLanguage();
  const color = dark ? CREAM : DARK;
  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "flex", alignItems: "center", flexShrink: 0,
        border: `1px solid color-mix(in srgb, ${dark ? CREAM : DARK} ${dark ? '25%' : '15%'}, transparent)`,
        borderRadius: "99px", padding: "0.2rem",
      }}
    >
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={{
            fontFamily: BODY, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.05em",
            padding: "0.28rem 0.6rem", borderRadius: "99px", border: "none", cursor: "pointer",
            backgroundColor: lang === l ? (dark ? CREAM : DARK) : "transparent",
            color: lang === l ? (dark ? DARK : CREAM) : color,
            opacity: lang === l ? 1 : 0.55,
            transition: "opacity 0.2s, background-color 0.2s",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function SiteNav({
  onLogoClick,
  onProjectsClick,
  onAboutClick,
  onInteriorClick,
  onVisualMerchandisingClick,
  onContactClick,
  variant = "static",
  showBack = false,
}: SiteNavProps) {
  const { lang } = useLanguage();
  const t = STRINGS[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sticky = variant === "sticky";

  useEffect(() => {
    if (!sticky) return;
    const el = document.getElementById("page-scroll-root");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 20);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, [sticky]);

  // Close the mobile menu on any route change (nav components remount /
  // re-render with new handlers when the page changes) so it never lingers
  // open over the next page.
  useEffect(() => {
    setMenuOpen(false);
  }, [onProjectsClick, onAboutClick]);

  // Safety net: if the menu is open and the viewport is resized past the
  // breakpoint (e.g. rotating a tablet, or a resized browser window), close
  // it so it can't get stuck open over the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;
    const mql = window.matchMedia(`(min-width: ${BREAKPOINT + 1}px)`);
    const handler = () => { if (mql.matches) setMenuOpen(false); };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [menuOpen]);

  const links = [
    { label: "Home", onClick: onLogoClick },
    { label: t.projects, onClick: onProjectsClick },
    { label: t.about, onClick: onAboutClick },
    { label: t.contact, onClick: onContactClick },
  ];

  const runAndClose = (fn?: () => void) => {
    setMenuOpen(false);
    fn?.();
  };

  return (
    <nav
      style={{
        position: sticky ? "sticky" as const : "relative",
        top: 0,
        zIndex: 60,
        backgroundColor: CREAM,
        transform: sticky ? "translateZ(0)" : "none",
        willChange: sticky ? "transform" : "auto",
      }}
    >
      <style>{`
        .sn-links { display: flex; align-items: center; gap: 2rem; }
        .sn-burger-btn { display: none; }
        .sn-cta-text { display: inline; }
        @media (max-width: ${BREAKPOINT}px) {
          .sn-links { display: none; }
          .sn-burger-btn { display: flex; }
        }
        @media (max-width: 420px) {
          .sn-cta-text { display: none; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.4rem 1.5rem",
          borderBottom: scrolled ? "1px solid color-mix(in srgb, var(--text) 12%, transparent)" : "1px solid color-mix(in srgb, var(--text) 8%, transparent)",
          ...(sticky
            ? { transition: "border-color 0.25s, box-shadow 0.25s", boxShadow: scrolled ? "0 2px 20px color-mix(in srgb, var(--text) 6%, transparent)" : "none" }
            : {}),
        }}
      >
        <button
          onClick={() => runAndClose(onLogoClick)}
          style={{
            fontFamily: DISPLAY, fontWeight: 900, fontSize: "1.45rem", letterSpacing: "0.18em",
            background: "none", border: "none", cursor: "pointer", color: DARK, padding: 0,
            display: "flex", alignItems: "center", gap: "0.65rem", whiteSpace: "nowrap",
          }}
        >
          {showBack && <ArrowLeft size={14} style={{ opacity: 0.5 }} />}
          FANNISA
        </button>

        <div className="sn-links">
          {links.map((n) => (
            <a
              key={n.label}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                n.onClick?.();
              }}
              style={{
                fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", color: DARK, opacity: 0.55, transition: "opacity 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <span style={{ fontFamily: BODY, fontSize: "0.75rem", letterSpacing: "0.08em", opacity: 0.4 }}>
            © {new Date().getFullYear()}
          </span>

          <button
            className="sn-burger-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              alignItems: "center", justifyContent: "center",
              width: "38px", height: "38px", borderRadius: "50%",
              backgroundColor: menuOpen ? DARK : "transparent",
              border: "1px solid color-mix(in srgb, var(--text) 15%, transparent)",
              color: menuOpen ? CREAM : DARK,
              cursor: "pointer", flexShrink: 0,
            }}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className="sn-mobile-panel"
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          backgroundColor: DARK,
          padding: "0.5rem 1.5rem 2rem",
        }}
      >
        {links.map((n) => (
          <a
            key={n.label}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              runAndClose(n.onClick);
            }}
            style={{
              fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.5rem", textTransform: "uppercase",
              textDecoration: "none", color: CREAM, opacity: 0.85,
              padding: "0.85rem 0", borderBottom: "1px solid color-mix(in srgb, var(--bg-1) 12%, transparent)",
            }}
          >
            {n.label}
          </a>
        ))}
        <div style={{ marginTop: "1.25rem", display: "flex", gap: "1rem" }}>
          <ThemeToggle />
          <LanguageToggle dark />
        </div>
      </div>
    </nav>
  );
}
