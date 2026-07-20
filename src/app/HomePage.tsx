import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CREAM, DARK, DARK2, ACCENT, DISPLAY, BODY } from "./theme";
import { PROJECTS } from "./data/projects";
import { useLanguage } from "./i18n";
import { STRINGS } from "./strings";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import PillButton from "./components/PillButton";



// ── Home-only imagery — real renders from Fannisa's portfolio PDF ─────────
const IMG = {
  heroMain: "/images/pavilliun-01-hero.jpg",
  heroT1: "/images/pavilliun-07.jpg",
  heroT2: "/images/pavilliun-09.jpg",
  heroT3: "/images/pavilliun-11.jpg",
  portrait: "/images/portrait-fannisa.jpg",
  cta: "/images/livingkitchen-01-hero.jpg",
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
              Selected Projects
            </h1>
          </div>
        </div>

        {/* Intro text below hero */}
        <div style={{
          padding: "4rem 3rem",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          borderBottom: "1px solid rgba(17,17,17,0.08)",
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
            A passionate Interior & Visual Merchandising designer dedicated to crafting meaningful spaces.
          </h2>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §2 · WE ARE — DESIGNERS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: CREAM, padding: "5rem 3rem" }}>
        {/* Top Header Row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: '"Arial Black", Impact, sans-serif', fontWeight: 900,
          fontSize: "clamp(3rem, 10vw, 8rem)",
          lineHeight: 0.9, letterSpacing: "-0.04em",
          marginBottom: "4rem"
        }}>
          <div>we are</div>
          <div style={{ flex: 1, borderTop: `4px solid ${ACCENT}`, margin: "0 2rem", opacity: 0.8, maxWidth: "60px" }}></div>
          <div>designers</div>
        </div>

        {/* 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "5rem" }}>

          {/* Left Column (Photo & Title) */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ backgroundColor: "#fff", padding: "0", overflow: "hidden", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/images/hero-photo9.png"
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
              Bridging architecture and human experience, Deui.space crafts environments that balance aesthetic precision with tactile warmth. From residential sanctuaries to retail installations, every project begins with one question: how should this space make you feel?
            </p>
            <p style={{
              fontFamily: BODY, fontSize: "1rem", lineHeight: 1.6, opacity: 0.8,
              marginBottom: "3rem", maxWidth: "600px"
            }}>
              With a dual practice spanning interior design and visual merchandising, Fannisa brings a retailer's eye for narrative to private spaces — and a home's intimacy to commercial interiors. The result: environments that endure beyond trend.
            </p>

            <div style={{ marginBottom: "4rem" }}>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                backgroundColor: "transparent", color: CREAM, border: "1px solid rgba(244,240,234,0.2)",
                borderRadius: "99px", padding: "0.4rem 1.25rem 0.4rem 0.4rem",
                fontFamily: BODY, fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                cursor: "pointer", transition: "background-color 0.3s"
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(244,240,234,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                <div style={{ backgroundColor: ACCENT, borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowRight size={14} color={CREAM} />
                </div>
                Discover More
              </button>
            </div>

            <div>
              <div style={{ fontFamily: BODY, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: "1rem" }}>
                Selected Clients
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["PlayWorks", "Urban Parfume", "Pakuwon Group"].map(client => (
                  <div key={client} style={{
                    border: "1px solid rgba(244,240,234,0.15)",
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
      <section style={{ backgroundColor: DARK2, color: CREAM, padding: "5rem 3rem" }}>
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
              <div key={idx} onClick={() => setCarouselIdx(idx)}
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
              backgroundColor: "rgba(17,17,17,0.6)", color: CREAM,
              fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "0.35rem 0.8rem",
            }}>
              {t.viewCaseStudy} →
            </div>
          </div>

          {([1, 2] as const).map((offset) => {
            const idx = getIdx(offset);
            return (
              <div key={idx} onClick={() => setCarouselIdx(idx)}
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
            border: "1px solid rgba(244,240,234,0.2)",
            backgroundColor: "transparent", color: CREAM, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, background-color 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(244,240,234,0.1)"; e.currentTarget.style.borderColor = "rgba(244,240,234,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(244,240,234,0.2)"; }}
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
            border: "1px solid rgba(244,240,234,0.2)",
            backgroundColor: "transparent", color: CREAM, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, background-color 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(244,240,234,0.1)"; e.currentTarget.style.borderColor = "rgba(244,240,234,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(244,240,234,0.2)"; }}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §4 · OUR — PROJECTS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK, color: CREAM, padding: "5rem 3rem" }}>
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
              borderBottom: "1px solid rgba(244,240,234,0.1)",
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
                  borderBottom: "1px solid rgba(244,240,234,0.06)",
                  backgroundColor: hoveredProject === p.id ? "rgba(244,240,234,0.04)" : "transparent",
                  transition: "background-color 0.18s",
                  cursor: "pointer", alignItems: "center",
                }}
              >
                <span style={{
                  fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.15rem",
                  letterSpacing: "0.01em",
                  color: hoveredProject === p.id ? CREAM : "rgba(244,240,234,0.65)",
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
      <section style={{ backgroundColor: CREAM, color: DARK }}>
        <div className="hp-cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "620px" }}>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <img
              src={IMG.cta}
              alt="Interior detail — Deui.space"
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                backgroundColor: "#d5d0c8", transition: "transform 0.7s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          <div style={{ padding: "5rem 4.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.35, marginBottom: "2rem" }}>
              {t.ctaKicker}
            </p>
            <h2 style={{
              fontFamily: DISPLAY, fontWeight: 900,
              fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
              lineHeight: 0.88, letterSpacing: "-0.03em",
              marginBottom: "2rem",
            }}>
              {t.ctaTitle[0]}<br />{t.ctaTitle[1]}
            </h2>
            <p style={{ fontFamily: BODY, fontSize: "1rem", lineHeight: 1.75, opacity: 0.6, marginBottom: "3rem", maxWidth: "380px" }}>
              {t.ctaBody}
            </p>
            <div>
              <button onClick={onContactClick} style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                backgroundColor: DARK, color: CREAM, border: "none", textDecoration: "none",
                borderRadius: "99px", padding: "0.55rem 1.4rem 0.55rem 0.55rem",
                fontFamily: BODY, fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.04em", cursor: "pointer",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span style={{
                  width: "30px", height: "30px", backgroundColor: ACCENT, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <img src={IMG.portrait} alt="Fannisa" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} />
                </span>
                {t.talkNow}
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §6 · FOOTER
      ══════════════════════════════════════════ */}
      <SiteFooter onProjectsClick={onViewAllProjects} onAboutClick={onAboutClick} onContactClick={onContactClick} />

    </div>
  );
}
