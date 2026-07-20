import { useState, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { CREAM, DARK, DARK2, ACCENT, DISPLAY, BODY, fitTitleSize } from "./theme";
import { PROJECTS, CATEGORIES, YEARS, type Category } from "./data/projects";
import { useLanguage } from "./i18n";
import { STRINGS } from "./strings";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import FilterPill from "./components/FilterPill";
import PillButton from "./components/PillButton";

// "Interior" and "Visual Merchandising" (the two disciplines on Fannisa's
// portfolio cover) each span more than one `Category`, so they live as two
// extra filter values alongside the plain Category ones.
export type CategoryFilter = "All" | Category | "Interior" | "VisualMerchandising";

interface ProjectsPageProps {
  onSelectProject: (slug: string) => void;
  onLogoClick: () => void;
  onInteriorClick?: () => void;
  onVisualMerchandisingClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  initialFilter?: CategoryFilter;
}

function ArchiveCard({ slug, name, categoryLabel, year, cardImage, onClick, viewLabel }: {
  slug: string; name: string; categoryLabel: string; year: string; cardImage: string; onClick: (slug: string) => void; viewLabel: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onClick(slug)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", cursor: "pointer" }}
    >
      <img
        src={cardImage}
        alt={name}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          backgroundColor: "#2a2a2a",
          transform: hov ? "scale(1.045)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(.25,.8,.25,1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: hov ? "rgba(17,17,17,0.55)" : "rgba(17,17,17,0.22)",
        transition: "background-color 0.3s",
      }} />

      {/* Hover CTA */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hov ? 1 : 0, transition: "opacity 0.3s",
      }}>
        <span style={{
          display: "flex", alignItems: "center", gap: "0.6rem",
          backgroundColor: CREAM, color: DARK, borderRadius: "99px",
          padding: "0.5rem 1.3rem 0.5rem 0.5rem",
          fontFamily: BODY, fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.04em",
        }}>
          <span style={{
            width: "26px", height: "26px", backgroundColor: ACCENT, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ArrowUpRight size={13} color={CREAM} />
          </span>
          {viewLabel}
        </span>
      </div>

      {/* Card info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem" }}>
        <p style={{ fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: CREAM, opacity: 0.6, margin: "0 0 0.5rem" }}>
          {categoryLabel} &middot; {year}
        </p>
        <h3 style={{
          fontFamily: DISPLAY, fontWeight: 900, textTransform: "uppercase",
          fontSize: fitTitleSize(name, 2.4, 2.4, 1.15), lineHeight: 0.95,
          color: CREAM, margin: 0,
        }}>
          {name}
        </h3>
      </div>
    </div>
  );
}

export default function ProjectsPage({
  onSelectProject, onLogoClick, onInteriorClick, onVisualMerchandisingClick, onAboutClick, onContactClick, initialFilter,
}: ProjectsPageProps) {
  const { lang } = useLanguage();
  const t = STRINGS[lang].projects;
  const catLabel = t.categories;
  const DISCIPLINE_LABEL: Record<string, string> = {
    Interior: t.disciplineInterior,
    VisualMerchandising: t.disciplineVM,
  };
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialFilter ?? "All");
  const [activeYear, setActiveYear] = useState("All");
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Re-apply the requested filter whenever it changes — e.g. the visitor is
  // already on this page and clicks "Interior" or "Visual Merchandising"
  // again in the nav, which re-renders this component without remounting it.
  useEffect(() => {
    if (initialFilter) setActiveCategory(initialFilter);
  }, [initialFilter]);

  const filtered = PROJECTS.filter((p) => {
    let catMatch: boolean;
    if (activeCategory === "All") catMatch = true;
    else if (activeCategory === "Interior") catMatch = p.category === "Residential" || p.category === "Commercial";
    else if (activeCategory === "VisualMerchandising") catMatch = p.category === "Retail";
    else catMatch = p.category === activeCategory;
    const yearMatch = activeYear === "All" || p.year === activeYear;
    return catMatch && yearMatch;
  });

  // The asymmetric editorial layout below has exactly 10 hand-placed slots.
  // Only use it when showing the full unfiltered list.
  const isFullGrid = filtered.length === PROJECTS.length;
  const viewLabel = t.viewProject;

  return (
    <div id="page-scroll-root" style={{ fontFamily: BODY, backgroundColor: CREAM, color: DARK, overflowX: "hidden", height: "100vh", overflowY: "auto" }}>

      {/* ══════════════════════════════════════════
          §1 · NAV
      ══════════════════════════════════════════ */}
      <SiteNav
        onLogoClick={onLogoClick}
        onProjectsClick={() => setActiveCategory("All")}
        onInteriorClick={onInteriorClick}
        onVisualMerchandisingClick={onVisualMerchandisingClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        variant="sticky"
      />

      {/* ══════════════════════════════════════════
          §2 · ARCHIVE HEADER
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "3.5rem 3rem 3rem" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "flex-end",
          borderBottom: "1px solid rgba(17,17,17,0.1)", paddingBottom: "2rem",
        }}>
          <h1 style={{
            fontFamily: DISPLAY, fontWeight: 900, textTransform: "uppercase",
            fontSize: "clamp(2.6rem, 9.5vw, 9rem)", lineHeight: 0.86, letterSpacing: "-0.03em",
            margin: 0, color: DARK,
          }}>
            {t.title}
          </h1>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.3, margin: "0 0 0.4rem" }}>
              {t.total}
            </p>
            <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "2.2rem", margin: 0 }}>
              {String(PROJECTS.length).padStart(2, "0")}
            </p>
          </div>
        </div>
        <p style={{ fontFamily: BODY, fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.55, maxWidth: "560px", marginTop: "1.5rem" }}>
          {t.subtitle(PROJECTS.length)}
        </p>
      </section>

      {/* ══════════════════════════════════════════
          §3 · FILTER BAR
      ══════════════════════════════════════════ */}
      <section style={{
        backgroundColor: CREAM, padding: "1.25rem 3rem",
        borderTop: "1px solid rgba(17,17,17,0.1)", borderBottom: "1px solid rgba(17,17,17,0.1)",
        position: "sticky", top: "68px", zIndex: 40,
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            {CATEGORIES.map((cat) => (
              <FilterPill key={cat} label={catLabel[cat]} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
            ))}
            <span style={{ opacity: 0.2, margin: "0 0.4rem" }}>|</span>
            {YEARS.map((y) => (
              <FilterPill key={y} label={y === "All" ? catLabel.All : y} active={activeYear === y} onClick={() => setActiveYear(y)} />
            ))}
          </div>
          <p style={{ fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, margin: 0 }}>
            {t.projectCount(filtered.length)}
          </p>
        </div>

        {DISCIPLINE_LABEL[activeCategory] && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.9rem" }}>
            <span style={{ fontFamily: BODY, fontSize: "0.72rem", letterSpacing: "0.06em", opacity: 0.5 }}>
              {t.showing} {DISCIPLINE_LABEL[activeCategory]}
            </span>
            <button
              onClick={() => setActiveCategory("All")}
              style={{
                fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.06em", textTransform: "uppercase",
                background: "none", border: "none", textDecoration: "underline", opacity: 0.45, cursor: "pointer", padding: 0,
              }}
            >
              {t.clear}
            </button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          §4 · PROJECT GRID
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2 }}>
        {filtered.length === 0 ? (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 0",
            fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", color: CREAM, opacity: 0.25,
          }}>
            {t.noProjectsFound}
          </div>
        ) : isFullGrid ? (
          // Editorial asymmetric grid — used only when showing all 10 projects
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "2px" }}>
            <div style={{ gridColumn: "span 12", height: "62vh" }}>
              <ArchiveCard slug={filtered[0].slug} name={filtered[0].name} categoryLabel={catLabel[filtered[0].category]} year={filtered[0].year} cardImage={filtered[0].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 7", height: "52vh" }}>
              <ArchiveCard slug={filtered[1].slug} name={filtered[1].name} categoryLabel={catLabel[filtered[1].category]} year={filtered[1].year} cardImage={filtered[1].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 5", height: "52vh" }}>
              <ArchiveCard slug={filtered[2].slug} name={filtered[2].name} categoryLabel={catLabel[filtered[2].category]} year={filtered[2].year} cardImage={filtered[2].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 4", height: "56vh" }}>
              <ArchiveCard slug={filtered[3].slug} name={filtered[3].name} categoryLabel={catLabel[filtered[3].category]} year={filtered[3].year} cardImage={filtered[3].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 4", height: "56vh" }}>
              <ArchiveCard slug={filtered[4].slug} name={filtered[4].name} categoryLabel={catLabel[filtered[4].category]} year={filtered[4].year} cardImage={filtered[4].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 4", height: "56vh" }}>
              <ArchiveCard slug={filtered[5].slug} name={filtered[5].name} categoryLabel={catLabel[filtered[5].category]} year={filtered[5].year} cardImage={filtered[5].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 5", height: "52vh" }}>
              <ArchiveCard slug={filtered[6].slug} name={filtered[6].name} categoryLabel={catLabel[filtered[6].category]} year={filtered[6].year} cardImage={filtered[6].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 7", height: "52vh" }}>
              <ArchiveCard slug={filtered[7].slug} name={filtered[7].name} categoryLabel={catLabel[filtered[7].category]} year={filtered[7].year} cardImage={filtered[7].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 8", height: "52vh" }}>
              <ArchiveCard slug={filtered[8].slug} name={filtered[8].name} categoryLabel={catLabel[filtered[8].category]} year={filtered[8].year} cardImage={filtered[8].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 4", height: "52vh" }}>
              <ArchiveCard slug={filtered[9].slug} name={filtered[9].name} categoryLabel={catLabel[filtered[9].category]} year={filtered[9].year} cardImage={filtered[9].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
            <div style={{ gridColumn: "span 12", height: "62vh" }}>
              <ArchiveCard slug={filtered[10].slug} name={filtered[10].name} categoryLabel={catLabel[filtered[10].category]} year={filtered[10].year} cardImage={filtered[10].cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
            </div>
          </div>
        ) : (
          // Standard filtered grid
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2px" }}>
            {filtered.map((p) => (
              <div key={p.id} style={{ height: "50vh" }}>
                <ArchiveCard slug={p.slug} name={p.name} categoryLabel={catLabel[p.category]} year={p.year} cardImage={p.cardImage} onClick={onSelectProject} viewLabel={viewLabel} />
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", padding: "3.5rem 0" }}>
            <div onClick={() => setPopupOpen(true)}>
              <PillButton dark accentDot>{t.loadMore}</PillButton>
            </div>
          </div>
        )}
      </section>

    {/* ══════════════════════════════════════════
        §5 · FOOTER
    ══════════════════════════════════════════ */}
    <SiteFooter onProjectsClick={() => setActiveCategory("All")} onAboutClick={onAboutClick} onContactClick={onContactClick} />

    {/* ══════════════════════════════════════════
        §6 · POPUP (REMAINING PROJECTS)
    ══════════════════════════════════════════ */}
    {isPopupOpen && (
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        backgroundColor: "rgba(17,17,17,0.85)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem"
      }}>
        <div style={{
          backgroundColor: CREAM, width: "100%", maxWidth: "600px", maxHeight: "85vh",
          borderRadius: "1.5rem", display: "flex", flexDirection: "column", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
        }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.5rem 2rem", borderBottom: "1px solid rgba(17,17,17,0.1)"
          }}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.4rem", margin: 0, color: DARK }}>
              {t.title}
            </h2>
            <button
              onClick={() => setPopupOpen(false)}
              style={{
                background: "none", border: "1px solid rgba(17,17,17,0.2)", borderRadius: "50%",
                width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                color: DARK, cursor: "pointer", transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(17,17,17,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <X size={16} />
            </button>
          </div>

          {/* List */}
          <div style={{ padding: "0 2rem", overflowY: "auto", flex: 1 }}>
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setPopupOpen(false);
                  onSelectProject(p.slug);
                }}
                style={{
                  display: "flex", alignItems: "center", gap: "1.25rem",
                  padding: "1.25rem 0", borderBottom: "1px solid rgba(17,17,17,0.08)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.querySelector('.rp-title') as HTMLElement).style.color = ACCENT;
                  (e.currentTarget.querySelector('.rp-arrow') as HTMLElement).style.opacity = "1";
                  (e.currentTarget.querySelector('.rp-arrow') as HTMLElement).style.transform = "translate(2px, -2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.querySelector('.rp-title') as HTMLElement).style.color = DARK;
                  (e.currentTarget.querySelector('.rp-arrow') as HTMLElement).style.opacity = "0.2";
                  (e.currentTarget.querySelector('.rp-arrow') as HTMLElement).style.transform = "none";
                }}
              >
                <div style={{ width: "90px", height: "65px", borderRadius: "0.5rem", overflow: "hidden", flexShrink: 0, backgroundColor: "#e2ddd4" }}>
                  <img src={p.cardImage} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="rp-title" style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.1rem", color: DARK, margin: "0 0 0.3rem", transition: "color 0.2s" }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: BODY, fontSize: "0.75rem", letterSpacing: "0.06em", color: DARK, opacity: 0.55, margin: 0 }}>
                    {catLabel[p.category]} • {p.year}
                  </p>
                </div>
                <div className="rp-arrow" style={{ opacity: 0.2, transition: "opacity 0.2s, transform 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowUpRight size={20} color={DARK} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

  </div>
);
}
