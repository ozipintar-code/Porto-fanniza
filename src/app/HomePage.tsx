import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { CREAM, DARK, DARK2, ACCENT, TEXT_ON_2, DISPLAY, BODY } from "./theme";
import { PROJECTS } from "./data/projects";
import { useLanguage } from "./i18n";
import { STRINGS } from "./strings";
import SEO from "./components/SEO";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import PillButton from "./components/PillButton";



// ── Home-only imagery — real renders from Fannisa's portfolio PDF ─────────
const IMG = {
  heroMain: "/images/pavilliun-01-hero.png",
  heroT1: "/images/pavilliun-07.png",
  heroT2: "/images/pavilliun-09.png",
  heroT3: "/images/pavilliun-11.png",
  portrait: "/images/portrait-fannisa.jpeg",
  cta: "/images/pakuwon-01-hero.png",
};

// Carousel uses a compact slice of the shared project list.
const PORTFOLIO = PROJECTS.filter((p) =>
  ["Bedroom", "Living & Kitchen", "Pavilliun", "Lab House", "Urban Parfume", "PlayWorks Pakuwon Mall"].includes(p.name)
).map((p) => ({ id: p.id, slug: p.slug, name: p.name, year: p.year, img: p.cardImage }));

interface HomePageProps {
  onSelectProject: (slug: string) => void;
  onViewAllProjects: () => void;
  onInteriorClick?: () => void;
  onVisualMerchandisingClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

export default function HomePage({
  onSelectProject, onViewAllProjects, onInteriorClick, onVisualMerchandisingClick, onAboutClick, onContactClick,
}: HomePageProps) {
  const { lang } = useLanguage();
  const t = STRINGS[lang].home;
  const catLabel = STRINGS[lang].projects.categories;
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const prev = () => setCarouselIdx((i) => (i - 1 + PORTFOLIO.length) % PORTFOLIO.length);
  const next = () => setCarouselIdx((i) => (i + 1) % PORTFOLIO.length);
  const getIdx = (offset: number) => (carouselIdx + offset + PORTFOLIO.length) % PORTFOLIO.length;

  return (
    <div id="page-scroll-root" style={{ fontFamily: BODY, backgroundColor: CREAM, color: DARK, overflowX: "hidden", height: "100vh", overflowY: "auto" }}>
      <SEO />
      <style>{`
        @media (max-width: 760px) {
          .hp-hero-grid { grid-template-columns: 1fr !important; }
          .hp-thumb-stack { flex-direction: row !important; }
          .hp-thumb-stack > div { flex: 1; }
          .hp-projects-layout { grid-template-columns: 1fr !important; }
          .hp-sticky-preview { display: none !important; }
          .hp-table-row { grid-template-columns: 1fr 70px !important; }
          .hp-table-row > *:nth-child(3) { display: none; }
          .hp-cta-grid { grid-template-columns: 1fr !important; }
          .hp-cta-left-img, .hp-cta-right-img { width: 100vw !important; height: 50vh !important; opacity: 0.15 !important; }
          .hp-cta-left-text { top: 12% !important; left: 5% !important; width: 90vw !important; text-align: center !important; font-size: 0.9rem !important; font-weight: 600 !important; }
          .hp-cta-right-text { bottom: 12% !important; right: 5% !important; width: 90vw !important; text-align: center !important; font-size: 0.9rem !important; font-weight: 600 !important; }
          .hp-cta-btn { margin-top: 35vw !important; }
          .hp-carousel-side { display: none !important; }
          .hp-carousel-main { flex: 1 1 100% !important; }
          .hp-carousel-main img { height: 60vh !important; }
        }
      `}</style>

      {/* Nav */}
      <SiteNav
        onLogoClick={() => { }}
        onProjectsClick={onViewAllProjects}
        onInteriorClick={onInteriorClick}
        onVisualMerchandisingClick={onVisualMerchandisingClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        variant="sticky"
      />

      {/* ══════════════════════════════════════════
          §1 · HERO
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, color: DARK }}>

        {/* New Experimental Full-Bleed Hero */}
        <div style={{ position: "relative", width: "100%", height: "85vh", overflow: "hidden" }}>
          {/* Background Image */}
          <img
            src="/images/livingkitchen-01-hero.png"
            alt="Hero Background"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              display: "block"
            }}
          />

          {/* Giant Text Overlay */}
          <div style={{
            position: "absolute",
            bottom: "-0.04em",
            left: 0,
            width: "100%",
            textAlign: "center",
            lineHeight: 0.75
          }}>
            <h1 style={{
              fontFamily: '"Arial Black", Impact, sans-serif',
              fontWeight: 900,
              fontSize: "clamp(3rem, 11vw, 13rem)",
              letterSpacing: "-0.03em",
              color: ACCENT, // Bright vibrant orange matching the reference
              margin: 0,
              whiteSpace: "nowrap"
            }}>
              {t.heroTitle}
            </h1>
          </div>
        </div>

        {/* Intro text below hero */}
        <div style={{
          padding: "4rem 3rem",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          borderBottom: "1px solid color-mix(in srgb, var(--text) 8%, transparent)",
        }}>
          <h2 style={{
            fontFamily: BODY,
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
            maxWidth: "800px",
            color: DARK,
            margin: 0
          }}>
            {t.heroSubtitle}
          </h2>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §2 · WE ARE — DESIGNERS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "5rem 3rem" }}>
        {/* Top Header Row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: '"Arial Black", Impact, sans-serif', fontWeight: 900,
          fontSize: "clamp(3rem, 10vw, 8rem)",
          lineHeight: 0.9, letterSpacing: "-0.04em",
          marginBottom: "4rem"
        }}>
          <div>{t.weAreTitle[0]}</div>
          <div style={{ flex: 1, borderTop: `4px solid ${ACCENT}`, margin: "0 2rem", opacity: 0.8, maxWidth: "60px" }}></div>
          <div>{t.weAreTitle[1]}</div>
        </div>

        {/* 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "5rem" }}>

          {/* Left Column (Photo & Title) */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ backgroundColor: "#fff", padding: "0", overflow: "hidden", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/images/portrait-fannisa.jpeg"
                alt="Fannisa Azzuri Rienhardt"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.2rem", letterSpacing: "0.02em" }}>
                Fannisa Azzuri Rienhardt
              </div>
              <div style={{ fontFamily: BODY, fontSize: "0.8rem", opacity: 0.5, marginTop: "0.2rem", letterSpacing: "0.05em" }}>
                Interior Designer & Visual Merchandiser
              </div>
            </div>
          </div>

          {/* Right Column (Text & Clients) */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{
              fontFamily: BODY, fontSize: "1rem", lineHeight: 1.6, opacity: 0.8,
              marginBottom: "1.5rem", maxWidth: "600px"
            }}>
              {t.aboutBody1}
            </p>
            <p style={{
              fontFamily: BODY, fontSize: "1rem", lineHeight: 1.6, opacity: 0.8,
              marginBottom: "3rem", maxWidth: "600px"
            }}>
              {t.aboutBody2}
            </p>

            <div style={{ marginBottom: "4rem" }}>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                backgroundColor: "transparent", color: TEXT_ON_2, border: "1px solid color-mix(in srgb, var(--text-on-2) 20%, transparent)",
                borderRadius: "99px", padding: "0.4rem 1.25rem 0.4rem 0.4rem",
                fontFamily: BODY, fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                cursor: "pointer", transition: "background-color 0.3s"
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--text-on-2) 10%, transparent)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                <div style={{ backgroundColor: ACCENT, borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowRight size={14} color="var(--bg-1)" />
                </div>
                {t.discoverMore}
              </button>
            </div>

            <div>
              <div style={{ fontFamily: BODY, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: "1rem" }}>
                {t.selectedClients}
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["PlayWorks", "Urban Parfume", "Pakuwon Group"].map(client => (
                  <div key={client} style={{
                    border: "1px solid color-mix(in srgb, var(--text-on-2) 15%, transparent)",
                    borderRadius: "99px",
                    padding: "0.4rem 1rem",
                    fontFamily: BODY, fontSize: "0.75rem", letterSpacing: "0.05em",
                    opacity: 0.7
                  }}>
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §3 · PORTFOLIO CAROUSEL
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "5rem 3rem" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "3rem",
        }}>
          <h2 style={{
            fontFamily: DISPLAY, fontWeight: 900,
            fontSize: "clamp(2.5rem, 7.5vw, 8.5rem)",
            letterSpacing: "-0.03em", lineHeight: 0.84, margin: 0,
          }}>
            {t.portfolioLabel}
          </h2>
          <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.1rem", opacity: 0.3, letterSpacing: "0.04em" }}>
            {String(carouselIdx + 1).padStart(2, "0")} / {String(PORTFOLIO.length).padStart(2, "0")}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
          {([-2, -1] as const).map((offset) => {
            const idx = getIdx(offset);
            return (
              <div key={idx} className="hp-carousel-side" onClick={() => setCarouselIdx(idx)}
                style={{ flex: 1, cursor: "pointer", opacity: 0.28, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.28")}
              >
                <img src={PORTFOLIO[idx].img} alt={PORTFOLIO[idx].name}
                  style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", backgroundColor: "#2a2a2a" }} />
              </div>
            );
          })}

          <div
            className="hp-carousel-main"
            style={{ flex: "0 0 38%", transition: "flex 0.3s", cursor: "pointer", position: "relative" }}
            onClick={() => onSelectProject(PORTFOLIO[carouselIdx].slug)}
            title={`View ${PORTFOLIO[carouselIdx].name}`}
          >
            <img
              src={PORTFOLIO[carouselIdx].img}
              alt={PORTFOLIO[carouselIdx].name}
              style={{ width: "100%", height: "500px", objectFit: "cover", display: "block", backgroundColor: "#2a2a2a" }}
            />
            <div style={{
              position: "absolute", bottom: "1rem", right: "1rem",
              backgroundColor: "color-mix(in srgb, var(--text) 60%, transparent)", color: TEXT_ON_2,
              fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "0.35rem 0.8rem",
            }}>
              {t.viewCaseStudy} →
            </div>
          </div>

          {([1, 2] as const).map((offset) => {
            const idx = getIdx(offset);
            return (
              <div key={idx} className="hp-carousel-side" onClick={() => setCarouselIdx(idx)}
                style={{ flex: 1, cursor: "pointer", opacity: 0.28, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.28")}
              >
                <img src={PORTFOLIO[idx].img} alt={PORTFOLIO[idx].name}
                  style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", backgroundColor: "#2a2a2a" }} />
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center", marginTop: "1.75rem" }}>
          <button onClick={prev} style={{
            width: "46px", height: "46px", borderRadius: "50%",
            border: "1px solid color-mix(in srgb, var(--text-on-2) 20%, transparent)",
            backgroundColor: "transparent", color: TEXT_ON_2, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, background-color 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--text-on-2) 10%, transparent)"; e.currentTarget.style.borderColor = "color-mix(in srgb, var(--text-on-2) 45%, transparent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "color-mix(in srgb, var(--text-on-2) 20%, transparent)"; }}
          >
            <ArrowLeft size={17} />
          </button>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.6rem", margin: 0, letterSpacing: "0.02em" }}>
              {PORTFOLIO[carouselIdx].name}
            </p>
            <p style={{ fontFamily: BODY, fontSize: "0.7rem", opacity: 0.35, marginTop: "0.2rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {PORTFOLIO[carouselIdx].year}
            </p>
          </div>

          <button onClick={next} style={{
            width: "46px", height: "46px", borderRadius: "50%",
            border: "1px solid color-mix(in srgb, var(--text-on-2) 20%, transparent)",
            backgroundColor: "transparent", color: TEXT_ON_2, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, background-color 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--text-on-2) 10%, transparent)"; e.currentTarget.style.borderColor = "color-mix(in srgb, var(--text-on-2) 45%, transparent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "color-mix(in srgb, var(--text-on-2) 20%, transparent)"; }}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §4 · OUR — PROJECTS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "5rem 3rem" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "1.25rem", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "3.5rem",
        }}>
          <div style={{
            fontFamily: DISPLAY, fontWeight: 900,
            fontSize: "clamp(2.15rem, 8.5vw, 9rem)",
            lineHeight: 0.88, letterSpacing: "-0.03em",
            display: "flex", alignItems: "baseline", gap: "clamp(0.6rem, 4vw, 5rem)",
          }}>
            <span>{t.ourProjects[0]}</span>
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: "0.55em" }}>—</span>
            <span>{t.ourProjects[1]}</span>
          </div>
          <PillButton dark onClick={onViewAllProjects}>{t.exploreMore}</PillButton>
        </div>

        <div className="hp-projects-layout" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "3.5rem", alignItems: "start" }}>
          <div>
            <div className="hp-table-row" style={{
              display: "grid", gridTemplateColumns: "1fr 130px 56px",
              paddingBottom: "0.8rem",
              borderBottom: "1px solid color-mix(in srgb, var(--text-on-2) 10%, transparent)",
              marginBottom: "0.15rem",
            }}>
              {[t.tableProject, t.tableCategory, t.tableYear].map((h) => (
                <span key={h} style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.28 }}>
                  {h}
                </span>
              ))}
            </div>

            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className="hp-table-row"
                onMouseEnter={() => setHoveredProject(p.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onSelectProject(p.slug)}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 130px 56px",
                  padding: "1.05rem 0.7rem",
                  borderBottom: "1px solid color-mix(in srgb, var(--text-on-2) 6%, transparent)",
                  backgroundColor: hoveredProject === p.id ? "color-mix(in srgb, var(--text-on-2) 4%, transparent)" : "transparent",
                  transition: "background-color 0.18s",
                  cursor: "pointer", alignItems: "center",
                }}
              >
                <span style={{
                  fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.15rem",
                  letterSpacing: "0.01em",
                  color: hoveredProject === p.id ? TEXT_ON_2 : "color-mix(in srgb, var(--text-on-2) 65%, transparent)",
                  transition: "color 0.18s",
                }}>
                  <span style={{ opacity: 0.3, marginRight: "0.6rem", fontSize: "0.75em" }}>
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {p.name}
                </span>
                <span style={{ fontFamily: BODY, fontSize: "0.72rem", letterSpacing: "0.04em", opacity: 0.38 }}>
                  {catLabel[p.category]}
                </span>
                <span style={{ fontFamily: BODY, fontSize: "0.72rem", opacity: 0.28 }}>
                  {p.year}
                </span>
              </div>
            ))}
          </div>

          <div className="hp-sticky-preview" style={{ position: "sticky", top: "2rem" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", backgroundColor: "#2a2a2a", overflow: "hidden" }}>
              {PROJECTS.map((p) => (
                <img
                  key={p.id}
                  src={p.cardImage}
                  alt={p.name}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: hoveredProject === p.id ? 1 : 0,
                    transition: "opacity 0.38s ease",
                  }}
                />
              ))}
              {!hoveredProject && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.2 }}>
                    {t.hoverPreview}
                  </span>
                </div>
              )}
            </div>
            {hoveredProject && (() => {
              const found = PROJECTS.find((p) => p.id === hoveredProject);
              return found ? (
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.04em", margin: 0 }}>
                    {found.name}
                  </p>
                  <p style={{ fontFamily: BODY, fontSize: "0.68rem", opacity: 0.35, marginTop: "0.3rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {catLabel[found.category]} · {found.year}
                  </p>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §5 · TALK WITH US — CTA
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, color: DARK, position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        
        {/* Top Down Arrow */}
        <div style={{ position: "absolute", top: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 15, display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", border: `1px solid color-mix(in srgb, ${DARK} 30%, transparent)` }}>
          <ArrowDown size={14} color={DARK} />
        </div>

        {/* Bottom Up Arrow */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 15, display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", border: `1px solid color-mix(in srgb, ${DARK} 30%, transparent)` }}>
          <ArrowUp size={14} color={DARK} />
        </div>

        {/* Top Right Image */}
        <div className="hp-cta-right-img" style={{ position: "absolute", top: "0", right: "0", width: "45vw", height: "55vh", overflow: "hidden", zIndex: 5 }}>
          <img src={IMG.heroT1} alt="Project detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Bottom Left Image */}
        <div className="hp-cta-left-img" style={{ position: "absolute", bottom: "0", left: "0", width: "45vw", height: "55vh", overflow: "hidden", zIndex: 5 }}>
          <img src={IMG.cta} alt="Project hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Left Text */}
        <div className="hp-cta-left-text" style={{ position: "absolute", top: "25%", left: "5%", width: "22vw", zIndex: 10 }}>
          <p style={{ fontFamily: BODY, fontSize: "0.85rem", lineHeight: 1.6, opacity: 0.8, letterSpacing: "0.02em" }}>
            {t.ctaBody1}
          </p>
        </div>

        {/* Right Text */}
        <div className="hp-cta-right-text" style={{ position: "absolute", bottom: "25%", right: "5%", width: "22vw", zIndex: 10, textAlign: "right" }}>
          <p style={{ fontFamily: BODY, fontSize: "0.85rem", lineHeight: 1.6, opacity: 0.8, letterSpacing: "0.02em" }}>
            {t.ctaBody2}
          </p>
        </div>

        {/* The Huge "talk with us" text centered */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none" }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(4.5rem, 15vw, 13rem)", letterSpacing: "-0.04em", lineHeight: 0.8, whiteSpace: "nowrap", margin: 0 }}>
            {t.ctaTitle.join(" ")}
          </h2>
        </div>

        {/* Talk Now Button */}
        <div className="hp-cta-btn" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20, marginTop: "6vw" }}>
          <button onClick={onContactClick} style={{
            display: "inline-flex", alignItems: "center", gap: "0.7rem",
            backgroundColor: DARK, color: CREAM, border: "none", textDecoration: "none",
            borderRadius: "99px", padding: "0.4rem 1.4rem 0.4rem 0.4rem",
            fontFamily: BODY, fontSize: "0.85rem", fontWeight: 500,
            letterSpacing: "0.02em", cursor: "pointer",
            transition: "opacity 0.2s", boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span style={{
              width: "32px", height: "32px", backgroundColor: ACCENT, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <img src={IMG.portrait} alt="Fannisa" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
            </span>
            {t.talkNow} &nbsp;→
          </button>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §6 · FOOTER
      ══════════════════════════════════════════ */}
      <SiteFooter onProjectsClick={onViewAllProjects} onAboutClick={onAboutClick} onContactClick={onContactClick} />

    </div>
  );
}
