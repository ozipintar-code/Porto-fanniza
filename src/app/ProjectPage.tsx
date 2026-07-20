import { useState, useEffect } from "react";
import { ArrowRight, X, ArrowLeft } from "lucide-react";
import { CREAM, DARK, DARK2, ACCENT, DISPLAY, BODY, fitTitleSize } from "./theme";
import { localize, type Project } from "./data/projects";
import { useLanguage } from "./i18n";
import { STRINGS } from "./strings";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

// ── Sub-components ────────────────────────────────────────────────────────────
function GalleryImage({
  src, alt, height, onExpand, expandLabel,
}: {
  src: string; alt: string; height: string; onExpand: () => void; expandLabel: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ position: "relative", overflow: "hidden", cursor: "zoom-in" }}
      onClick={onExpand}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={src} alt={alt}
        style={{
          width: "100%", height, objectFit: "cover", display: "block",
          backgroundColor: "#2a2a2a",
          transform: hov ? "scale(1.025)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(.25,.8,.25,1)",
        }}
      />
      {hov && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(17,17,17,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.25s",
        }}>
          <span style={{
            fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "0.15em",
            textTransform: "uppercase", color: CREAM,
            backgroundColor: "rgba(17,17,17,0.55)", padding: "0.4rem 0.9rem",
          }}>
            {expandLabel}
          </span>
        </div>
      )}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <tr style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
      <td style={{
        fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.12em",
        textTransform: "uppercase", opacity: 0.35,
        padding: "1.05rem 1.5rem 1.05rem 0", width: "44%", verticalAlign: "top",
        paddingTop: "1.15rem",
      }}>
        {label}
      </td>
      <td style={{
        fontFamily: BODY, fontSize: "0.9rem", fontWeight: 500,
        padding: "1.05rem 0", lineHeight: 1.6,
      }}>
        {value}
      </td>
    </tr>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
interface ProjectPageProps {
  project: Project;
  nextProject: Project;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
  onViewAllProjects: () => void;
  onInteriorClick?: () => void;
  onVisualMerchandisingClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

export default function ProjectPage({
  project: rawProject, nextProject: rawNextProject, onBack, onSelectProject, onViewAllProjects,
  onInteriorClick, onVisualMerchandisingClick, onAboutClick, onContactClick,
}: ProjectPageProps) {
  const { lang, setLang } = useLanguage();
  const t = STRINGS[lang].project;
  const catLabel = STRINGS[lang].projects.categories;
  const project = localize(rawProject, lang);
  const nextProject = localize(rawNextProject, lang);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lbIdx, setLbIdx] = useState<number>(0);

  const gallery = project.gallery;
  const lightboxSrc = (i: number) => gallery[i].src;

  // Reset scroll + lightbox whenever we navigate to a different project
  useEffect(() => {
    const el = document.getElementById("page-scroll-root");
    el?.scrollTo(0, 0);
    setLightbox(null);
  }, [project.id]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLbIdx((i) => { const n = (i + 1) % gallery.length; setLightbox(lightboxSrc(n)); return n; });
      if (e.key === "ArrowLeft") setLbIdx((i) => { const n = (i - 1 + gallery.length) % gallery.length; setLightbox(lightboxSrc(n)); return n; });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, gallery]);

  const openLightbox = (idx: number) => {
    setLbIdx(idx);
    setLightbox(lightboxSrc(idx));
  };

  const lbPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const n = (lbIdx - 1 + gallery.length) % gallery.length;
    setLbIdx(n); setLightbox(lightboxSrc(n));
  };
  const lbNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const n = (lbIdx + 1) % gallery.length;
    setLbIdx(n); setLightbox(lightboxSrc(n));
  };

  const SPEC_LEFT = [
    { label: t.specLocation, value: project.location },
    { label: t.specArea, value: project.area },
    { label: t.specRole, value: project.role },
    { label: t.specClient, value: project.client },
  ];

  const SPEC_RIGHT = [
    { label: t.scopeOfWork, value: project.scopeDetail },
    { label: t.materialsUsed, value: project.material },
    { label: t.visualization, value: project.visualization },
    { label: t.status, value: project.status },
  ];

  return (
    <div
      id="page-scroll-root"
      style={{ fontFamily: BODY, backgroundColor: CREAM, color: DARK, overflowX: "hidden", height: "100vh", overflowY: "auto" }}
    >
      <style>{`
        @media (max-width: 760px) {
          .pp-meta-bar { flex-wrap: wrap !important; }
          .pp-meta-cell { flex: 0 0 50% !important; box-sizing: border-box; }
          .pp-meta-cell:nth-child(2n) { border-right: none !important; }
          .pp-meta-cell:nth-child(-n+2) { border-bottom: 1px solid rgba(17,17,17,0.1); }
          .pp-two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .pp-next-row { flex-direction: column !important; align-items: flex-start !important; }
          .pp-next-row > *:last-child { width: 100%; justify-content: space-between; }
        }
        @media (max-width: 400px) {
          .pp-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ────────────────────────────────────────
          LIGHTBOX
      ──────────────────────────────────────── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            backgroundColor: "rgba(17,17,17,0.97)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: "1.5rem", right: "1.5rem",
              background: "none",
              border: "1px solid rgba(244,240,234,0.2)", borderRadius: "50%",
              width: "42px", height: "42px",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: CREAM, cursor: "pointer", zIndex: 10,
            }}
          >
            <X size={17} />
          </button>

          <span style={{
            position: "absolute", top: "1.7rem", left: "50%", transform: "translateX(-50%)",
            fontFamily: DISPLAY, fontWeight: 700, fontSize: "0.85rem",
            letterSpacing: "0.12em", color: CREAM, opacity: 0.45,
          }}>
            {String(lbIdx + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </span>

          <button onClick={lbPrev} style={{
            position: "absolute", left: "2rem",
            background: "none", border: "1px solid rgba(244,240,234,0.2)", borderRadius: "50%",
            width: "46px", height: "46px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: CREAM, cursor: "pointer",
          }}>
            <ArrowLeft size={18} />
          </button>

          <img
            src={lightbox} alt={gallery[lbIdx]?.alt ?? "Gallery image"}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "88vw", maxHeight: "88vh", objectFit: "contain", display: "block" }}
          />

          <button onClick={lbNext} style={{
            position: "absolute", right: "2rem",
            background: "none", border: "1px solid rgba(244,240,234,0.2)", borderRadius: "50%",
            width: "46px", height: "46px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: CREAM, cursor: "pointer",
          }}>
            <ArrowRight size={18} />
          </button>

          <p style={{
            position: "absolute", bottom: "1.8rem", left: "50%", transform: "translateX(-50%)",
            fontFamily: BODY, fontSize: "0.72rem", letterSpacing: "0.08em",
            color: CREAM, opacity: 0.35, whiteSpace: "nowrap",
          }}>
            {gallery[lbIdx]?.alt}
          </p>
        </div>
      )}


      {/* ────────────────────────────────────────
          §1 · NAV
      ──────────────────────────────────────── */}
      <SiteNav
        onLogoClick={onBack}
        onProjectsClick={onViewAllProjects}
        onInteriorClick={onInteriorClick}
        onVisualMerchandisingClick={onVisualMerchandisingClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        variant="sticky"
        showBack
      />


      {/* ────────────────────────────────────────
          §2 · PROJECT HERO
      ──────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }}>
        <div style={{ padding: "0.75rem 2.5rem 0", overflow: "hidden" }}>
          <h1 style={{
            fontFamily: DISPLAY, fontWeight: 900,
            fontSize: fitTitleSize(project.name, 17.5, 99, 2.4),
            lineHeight: 0.84, letterSpacing: "-0.01em",
            margin: 0, color: DARK, textTransform: "uppercase",
            overflowWrap: "break-word",
          }}>
            {project.name}
          </h1>
        </div>

        {/* Meta bar */}
        <div className="pp-meta-bar" style={{
          display: "flex", gap: "0", alignItems: "stretch",
          margin: "1.5rem 2.5rem",
          border: "1px solid rgba(17,17,17,0.1)",
        }}>
          {[
            { label: t.category, value: catLabel[project.category] },
            { label: t.year, value: project.year },
            { label: t.location, value: project.location },
            { label: t.scope, value: project.scope },
          ].map((m, i, arr) => (
            <div key={m.label} className="pp-meta-cell" style={{
              flex: 1, padding: "1.25rem 1.5rem", minWidth: 0,
              borderRight: i < arr.length - 1 ? "1px solid rgba(17,17,17,0.1)" : "none",
            }}>
              <p style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.32, margin: "0 0 0.4rem" }}>
                {m.label}
              </p>
              <p style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: 500, margin: 0, overflowWrap: "break-word" }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Full-bleed hero image */}
        <div
          style={{ padding: "0 2.5rem 4.5rem", cursor: "zoom-in" }}
          onClick={() => setLightbox(project.heroImage)}
        >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={project.heroImage}
              alt={`${project.name} — hero`}
              style={{
                width: "100%", height: "68vh", objectFit: "cover",
                display: "block", backgroundColor: "#ccc8c0",
                transition: "transform 0.6s cubic-bezier(.25,.8,.25,1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.015)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(17,17,17,0.45) 0%, transparent 100%)",
              padding: "3rem 2rem 1.5rem",
              display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", justifyContent: "space-between", alignItems: "flex-end",
            }}>
              <p style={{ fontFamily: BODY, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: CREAM, opacity: 0.7, margin: 0, maxWidth: "80%" }}>
                {project.description}
              </p>
              <p style={{ fontFamily: BODY, fontSize: "0.68rem", color: CREAM, opacity: 0.5, margin: 0 }}>
                {t.clickToExpand}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ────────────────────────────────────────
          §3 · OVERVIEW
      ──────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM, padding: "1rem 3rem 5rem" }}>
        <div className="pp-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", marginBottom: "4.5rem" }}>
          <div>
            <p style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.3, marginBottom: "1.5rem" }}>
              {t.theBrief}
            </p>
            {project.brief.map((para, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: "1.01rem", lineHeight: 1.82, opacity: 0.7, marginTop: i === 0 ? 0 : "1rem" }}>
                {para}
              </p>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.3, marginBottom: "1.5rem" }}>
              {t.theApproach}
            </p>
            {project.approach.map((para, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: "1.01rem", lineHeight: 1.82, opacity: 0.7, marginTop: i === 0 ? 0 : "1rem" }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <div style={{
          borderTop: "1px solid rgba(17,17,17,0.1)",
          borderBottom: "1px solid rgba(17,17,17,0.1)",
          padding: "4rem 0",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: DISPLAY, fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.2vw, 3.8rem)",
            lineHeight: 1.12, letterSpacing: "-0.025em",
            color: DARK, margin: "0 auto", maxWidth: "860px",
          }}>
            <span style={{ color: ACCENT }}>&ldquo;{project.quote}&rdquo;</span>
          </p>
          <p style={{
            fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.18em",
            textTransform: "uppercase", opacity: 0.32, marginTop: "1.75rem",
          }}>
            {project.quoteAuthor}
          </p>
        </div>
      </section>


      {/* ────────────────────────────────────────
          §4 · GALLERY
      ──────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK2, padding: "5rem 3rem", color: CREAM }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.28, margin: 0 }}>
            {t.gallery}
          </p>
          <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "0.95rem", opacity: 0.22, letterSpacing: "0.06em" }}>
            {project.name} · {catLabel[project.category]} · {project.year}
          </p>
        </div>

        {/* Row 1: full-width feature shot */}
        <div style={{ marginBottom: "1.25rem" }}>
          <GalleryImage src={gallery[0].src} alt={gallery[0].alt} height="58vh" onExpand={() => openLightbox(0)} expandLabel={t.expand} />
        </div>

        {/* Remaining shots: responsive grid that adapts to however many real
            photos this project has (as few as 1, as many as 12) instead of
            assuming a fixed count. */}
        {gallery.length > 1 && (
          <div className="pp-gallery-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}>
            {gallery.slice(1).map((g, i) => (
              <GalleryImage key={i + 1} src={g.src} alt={g.alt} height="38vh" onExpand={() => openLightbox(i + 1)} expandLabel={t.expand} />
            ))}
          </div>
        )}

        <p style={{ fontFamily: BODY, fontSize: "0.65rem", opacity: 0.25, marginTop: "1.5rem", textAlign: "right", letterSpacing: "0.06em" }}>
          {t.visualCredit} · {t.clickToExpand}
        </p>
      </section>


      {/* ────────────────────────────────────────
          §5 · PROJECT DETAILS (spec sheet)
      ──────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM, padding: "5rem 3rem" }}>
        <p style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.3, marginBottom: "2.5rem" }}>
          {t.projectDetails}
        </p>
        <div className="pp-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>{SPEC_LEFT.map((r) => <SpecRow key={r.label} label={r.label} value={r.value} />)}</tbody>
          </table>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>{SPEC_RIGHT.map((r) => <SpecRow key={r.label} label={r.label} value={r.value} />)}</tbody>
          </table>
        </div>
      </section>


      {/* ────────────────────────────────────────
          §7 · NEXT PROJECT NAV BAND
      ──────────────────────────────────────── */}
      <div
        onClick={() => onSelectProject(nextProject.slug)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onSelectProject(nextProject.slug)}
        style={{
          backgroundColor: DARK, color: CREAM, cursor: "pointer",
          transition: "background-color 0.28s",
          position: "relative", overflow: "hidden",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1c1c1c")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DARK)}
      >
        <div style={{ height: "1px", backgroundColor: "rgba(244,240,234,0.08)" }} />

        <div className="pp-next-row" style={{ padding: "3.5rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.3, margin: "0 0 0.6rem" }}>
              {t.nextProject}
            </p>
            <h2 style={{
              fontFamily: DISPLAY, fontWeight: 900, textTransform: "uppercase",
              fontSize: fitTitleSize(nextProject.name, 9.5, 9.5, 1.9),
              lineHeight: 0.84, letterSpacing: "-0.02em",
              margin: "0 0 0.8rem", transition: "color 0.25s", overflowWrap: "break-word",
            }}>
              {nextProject.name}
            </h2>
            <p style={{ fontFamily: BODY, fontSize: "0.78rem", opacity: 0.32, margin: 0, letterSpacing: "0.06em" }}>
              {catLabel[nextProject.category]} · {nextProject.location.split(",")[0]} · {nextProject.year}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexShrink: 0 }}>
            <img
              src={nextProject.cardImage}
              alt={`${nextProject.name} — preview`}
              style={{ width: "175px", height: "200px", objectFit: "cover", backgroundColor: "#2a2a2a", display: "block" }}
            />
            <div style={{
              width: "54px", height: "54px",
              border: "1px solid rgba(244,240,234,0.2)", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.22s, background-color 0.22s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(244,240,234,0.6)"; e.currentTarget.style.backgroundColor = "rgba(244,240,234,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(244,240,234,0.2)"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>


      {/* ────────────────────────────────────────
          §8 · FOOTER
      ──────────────────────────────────────── */}
      <SiteFooter onProjectsClick={onViewAllProjects} onAboutClick={onAboutClick} onContactClick={onContactClick} />

    </div>
  );
}
