import { Download, ArrowUpRight } from "lucide-react";
import { CREAM, DARK, DARK2, ACCENT, TEXT_ON_2, DISPLAY, BODY, fitTitleSize } from "./theme";
import { useLanguage } from "./i18n";
import { STRINGS } from "./strings";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import PillButton from "./components/PillButton";
import SEO from "./components/SEO";

interface AboutPageProps {
  onSelectProject: (slug: string) => void;
  onViewAllProjects: () => void;
  onLogoClick: () => void;
  onInteriorClick?: () => void;
  onVisualMerchandisingClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.35, marginBottom: "0.9rem" }}>
        {title}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {items.map((it) => (
          <span key={it} style={{
            fontFamily: BODY, fontSize: "0.8rem", padding: "0.45rem 0.9rem",
            border: "1px solid color-mix(in srgb, var(--text) 14%, transparent)", borderRadius: "99px", opacity: 0.75,
          }}>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage({
  onSelectProject, onViewAllProjects, onLogoClick,
  onInteriorClick, onVisualMerchandisingClick, onAboutClick, onContactClick,
}: AboutPageProps) {
  const { lang } = useLanguage();
  const t = STRINGS[lang].about;

  return (
    <div id="page-scroll-root" style={{ fontFamily: BODY, backgroundColor: CREAM, color: DARK, overflowX: "hidden", height: "100vh", overflowY: "auto" }}>
      <SEO title="About — Fannisa Azzuri" />
      <style>{`
        .ap-hero-grid { display: grid; grid-template-columns: 1fr 320px; gap: 3rem; align-items: end; }
        .ap-label-grid { display: grid; grid-template-columns: 220px 1fr; gap: 3rem; }
        .ap-exp-row { display: grid; grid-template-columns: 90px 1fr 160px; gap: 1.5rem; }
        @media (max-width: 700px) {
          .ap-hero-grid { grid-template-columns: 1fr; }
          .ap-hero-grid > *:last-child { justify-self: start; max-width: 220px; }
          .ap-label-grid { grid-template-columns: 1fr; gap: 0.8rem; }
          .ap-exp-row { grid-template-columns: 1fr; gap: 0.5rem; }
          .ap-exp-row > *:last-child { justify-self: start; }
          .ap-auto-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          §1 · NAV + HERO
      ══════════════════════════════════════════ */}
      <SiteNav
        onLogoClick={onLogoClick}
        onProjectsClick={onViewAllProjects}
        onInteriorClick={onInteriorClick}
        onVisualMerchandisingClick={onVisualMerchandisingClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        variant="sticky"
      />

      <section className="ap-hero-grid" style={{ padding: "3.5rem 3rem 4rem" }}>
        <div>
          <p style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.3, marginBottom: "1rem" }}>
            {t.kicker}
          </p>
          <h1 style={{
            fontFamily: DISPLAY, fontWeight: 900, textTransform: "uppercase",
            fontSize: fitTitleSize(t.title[0] + " " + t.title[1], 8.5, 8.5, 2.6),
            lineHeight: 0.86, letterSpacing: "-0.02em", margin: 0,
          }}>
            {t.title[0]}<br />{t.title[1]}
          </h1>
          <p style={{ fontFamily: BODY, fontSize: "0.95rem", opacity: 0.45, marginTop: "1.25rem", letterSpacing: "0.02em" }}>
            {t.role} — Deui.space
          </p>
        </div>
        <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", justifySelf: "end", width: "100%" }}>
          <img
            src="/images/portrait-fannisa.jpeg"
            alt="Fannisa Azzuri Rienhardt"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", backgroundColor: "#d5d0c8" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §2 · INTRO / BIO
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "4.5rem 3rem" }}>
        <div className="ap-label-grid">
          <p style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.35, margin: 0 }}>
            {t.introTitle}
          </p>
          <p style={{ fontFamily: BODY, fontSize: "1.15rem", lineHeight: 1.85, opacity: 0.75, maxWidth: "720px", margin: 0 }}>
            {t.introBody}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §3 · SKILLS & TOOLS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "4.5rem 3rem", borderBottom: "1px solid color-mix(in srgb, var(--text) 10%, transparent)" }}>
        <p style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em", margin: "0 0 2.5rem" }}>
          {t.skillsTitle}
        </p>
        <div className="ap-auto-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
          <SkillGroup title={t.drafting} items={t.draftingItems} />
          <SkillGroup title={t.graphics} items={t.graphicsItems} />
          <SkillGroup title={t.softSkills} items={t.softSkillsItems} />
          <SkillGroup title={t.language} items={t.languageItems} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §4 · EDUCATION
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "3.5rem 3rem", borderBottom: "1px solid color-mix(in srgb, var(--text) 10%, transparent)" }}>
        <div className="ap-label-grid" style={{ alignItems: "baseline" }}>
          <p style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.35, margin: 0 }}>
            {t.educationTitle}
          </p>
          <div>
            <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.3rem", margin: 0 }}>{t.educationDegree}</p>
            <p style={{ fontFamily: BODY, fontSize: "0.95rem", opacity: 0.55, marginTop: "0.35rem" }}>
              {t.educationSchool} · {t.educationYears}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §5 · PROFESSIONAL EXPERIENCE
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "4.5rem 3rem" }}>
        <p style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em", margin: "0 0 2.5rem" }}>
          {t.experienceTitle}
        </p>
        <div>
          {t.experiences.map((exp, i) => (
            <div key={i} className="ap-exp-row" style={{
              padding: "1.6rem 0", borderTop: i === 0 ? "1px solid color-mix(in srgb, var(--text-on-2) 12%, transparent)" : undefined,
              borderBottom: "1px solid color-mix(in srgb, var(--text-on-2) 12%, transparent)",
            }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.1rem", opacity: 0.4 }}>{exp.year}</span>
              <div>
                <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.15rem", margin: 0 }}>{exp.company}</p>
                <p style={{ fontFamily: BODY, fontSize: "0.92rem", lineHeight: 1.6, opacity: 0.55, marginTop: "0.4rem", maxWidth: "560px" }}>
                  {exp.description}
                </p>
              </div>
              <span style={{
                fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
                opacity: 0.4, justifySelf: "start", border: "1px solid color-mix(in srgb, var(--text-on-2) 20%, transparent)",
                borderRadius: "99px", padding: "0.3rem 0.8rem", height: "fit-content",
              }}>
                {exp.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §6 · ACADEMIC EXPERIENCE
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "4rem 3rem", borderBottom: "1px solid color-mix(in srgb, var(--text) 10%, transparent)" }}>
        <p style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.01em", margin: "0 0 2rem" }}>
          {t.academicTitle}
        </p>
        <div className="ap-auto-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
          {t.academicExperiences.map((exp, i) => (
            <div key={i}>
              <p style={{ fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.35, margin: "0 0 0.4rem" }}>
                {exp.year}
              </p>
              <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>{exp.org}</p>
              <p style={{ fontFamily: BODY, fontSize: "0.85rem", opacity: 0.45, marginTop: "0.3rem" }}>{exp.role}</p>
              <p style={{ fontFamily: BODY, fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.6, marginTop: "0.6rem" }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §7 · AWARDS & ACHIEVEMENTS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "4.5rem 3rem" }}>
        <p style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em", margin: "0 0 2.5rem" }}>
          {t.awardsTitle}
        </p>
        <div className="ap-auto-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {t.awards.map((a, i) => (
            <div key={i} style={{ border: "1px solid color-mix(in srgb, var(--text-on-2) 15%, transparent)", padding: "2rem" }}>
              <span style={{
                display: "inline-block", fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em",
                textTransform: "uppercase", opacity: 0.4, border: "1px solid color-mix(in srgb, var(--text-on-2) 20%, transparent)",
                borderRadius: "99px", padding: "0.3rem 0.8rem", marginBottom: "1.1rem",
              }}>
                {a.year}
              </span>
              <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.25rem", margin: 0 }}>{a.title}</p>
              <p style={{ fontFamily: BODY, fontSize: "0.92rem", lineHeight: 1.6, opacity: 0.6, marginTop: "0.6rem" }}>{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §8 · CV DOWNLOAD + CONTACT CTA
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "4.5rem 3rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
        <p style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", margin: 0 }}>
          {t.contactTitle}
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="/CV-Fannisa-Azzuri-Rienhardt.pdf"
            download
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              border: `1px solid ${DARK}`, color: DARK, textDecoration: "none",
              borderRadius: "99px", padding: "0.65rem 1.4rem",
              fontFamily: BODY, fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.03em",
            }}
          >
            <Download size={15} /> {t.downloadCV}
          </a>
          <button
            onClick={onContactClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              backgroundColor: DARK2, color: TEXT_ON_2, textDecoration: "none", border: "none", cursor: "pointer",
              borderRadius: "99px", padding: "0.65rem 1.4rem",
              fontFamily: BODY, fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.03em",
            }}
          >
            <span style={{
              width: "22px", height: "22px", backgroundColor: ACCENT, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <ArrowUpRight size={11} color={CREAM} />
            </span>
            {STRINGS[lang].nav.talkWithUs}
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §9 · FOOTER
      ══════════════════════════════════════════ */}
      <SiteFooter onProjectsClick={onViewAllProjects} onAboutClick={onAboutClick} onContactClick={onContactClick} />

    </div>
  );
}
