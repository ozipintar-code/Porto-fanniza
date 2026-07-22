import { Download, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState } from "react";
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

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const slideUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <motion.p variants={slideUpItem} style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.35, marginBottom: "0.9rem" }}>
        {title}
      </motion.p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {items.map((it) => (
          <motion.span key={it} variants={slideUpItem} whileHover={{ scale: 1.05, backgroundColor: "color-mix(in srgb, var(--text) 8%, transparent)", color: DARK }} transition={{ duration: 0.2 }} style={{
            fontFamily: BODY, fontSize: "0.8rem", padding: "0.45rem 0.9rem", cursor: "default",
            border: "1px solid color-mix(in srgb, var(--text) 14%, transparent)", borderRadius: "99px", opacity: 0.75,
          }}>
            {it}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceRow({ exp, isFirst }: { exp: any; isFirst: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      variants={slideUpItem}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="ap-exp-row"
      style={{
        padding: "1.6rem 1rem", margin: "0 -1rem",
        borderTop: isFirst ? "1px solid color-mix(in srgb, var(--text-on-2) 12%, transparent)" : undefined,
        borderBottom: "1px solid color-mix(in srgb, var(--text-on-2) 12%, transparent)",
        backgroundColor: hov ? "color-mix(in srgb, var(--text-on-2) 4%, transparent)" : "transparent",
        transition: "background-color 0.3s",
      }}
    >
      <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.1rem", opacity: 0.4 }}>{exp.year}</span>
      <motion.div animate={{ x: hov ? 12 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.15rem", margin: 0, color: hov ? CREAM : TEXT_ON_2, transition: "color 0.3s" }}>{exp.company}</p>
        <p style={{ fontFamily: BODY, fontSize: "0.92rem", lineHeight: 1.6, opacity: 0.55, marginTop: "0.4rem", maxWidth: "560px" }}>
          {exp.description}
        </p>
      </motion.div>
      <span style={{
        fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
        opacity: 0.4, justifySelf: "start", border: "1px solid color-mix(in srgb, var(--text-on-2) 20%, transparent)",
        borderRadius: "99px", padding: "0.3rem 0.8rem", height: "fit-content",
      }}>
        {exp.role}
      </span>
    </motion.div>
  );
}

export default function AboutPage({
  onSelectProject, onViewAllProjects, onLogoClick,
  onInteriorClick, onVisualMerchandisingClick, onAboutClick, onContactClick,
}: AboutPageProps) {
  const { lang } = useLanguage();
  const t = STRINGS[lang].about;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(heroProgress, [0, 1], ["0%", "15%"]);

  return (
    <div id="page-scroll-root" style={{ fontFamily: BODY, backgroundColor: CREAM, color: DARK, overflowX: "hidden", minHeight: "100vh" }}>
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

      <section ref={heroRef} className="ap-hero-grid" style={{ padding: "3.5rem 3rem 4rem" }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.p variants={slideUpItem} style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.3, marginBottom: "1rem" }}>
            {t.kicker}
          </motion.p>
          <motion.h1 variants={slideUpItem} style={{
            fontFamily: DISPLAY, fontWeight: 900, textTransform: "uppercase",
            fontSize: fitTitleSize(t.title[0] + " " + t.title[1], 8.5, 8.5, 2.6),
            lineHeight: 0.86, letterSpacing: "-0.02em", margin: 0,
          }}>
            {t.title[0]}<br />{t.title[1]}
          </motion.h1>
          <motion.p variants={slideUpItem} style={{ fontFamily: BODY, fontSize: "0.95rem", opacity: 0.45, marginTop: "1.25rem", letterSpacing: "0.02em" }}>
            {t.role} — Deui.space
          </motion.p>
        </motion.div>
        <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", justifySelf: "end", width: "100%" }}>
          <motion.img
            src="/images/portrait-fannisa.jpeg"
            alt="Fannisa Azzuri Rienhardt"
            initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
            animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1], delay: 0.2 }}
            style={{ width: "100%", height: "115%", top: 0, position: "absolute", objectFit: "cover", display: "block", backgroundColor: "#d5d0c8", y: portraitY }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §2 · INTRO / BIO
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "4.5rem 3rem" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="ap-label-grid">
          <motion.p variants={slideUpItem} style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.35, margin: 0 }}>
            {t.introTitle}
          </motion.p>
          <motion.p variants={slideUpItem} style={{ fontFamily: BODY, fontSize: "1.15rem", lineHeight: 1.85, opacity: 0.75, maxWidth: "720px", margin: 0 }}>
            {t.introBody}
          </motion.p>
        </motion.div>
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
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="ap-label-grid" style={{ alignItems: "baseline" }}>
          <motion.p variants={slideUpItem} style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.35, margin: 0 }}>
            {t.educationTitle}
          </motion.p>
          <motion.div variants={slideUpItem}>
            <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.3rem", margin: 0 }}>{t.educationDegree}</p>
            <p style={{ fontFamily: BODY, fontSize: "0.95rem", opacity: 0.55, marginTop: "0.35rem" }}>
              {t.educationSchool} · {t.educationYears}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          §5 · PROFESSIONAL EXPERIENCE
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "4.5rem 3rem" }}>
        <motion.p variants={slideUpItem} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em", margin: "0 0 2.5rem" }}>
          {t.experienceTitle}
        </motion.p>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {t.experiences.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} isFirst={i === 0} />
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          §6 · ACADEMIC EXPERIENCE
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "4rem 3rem", borderBottom: "1px solid color-mix(in srgb, var(--text) 10%, transparent)" }}>
        <motion.p variants={slideUpItem} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.01em", margin: "0 0 2rem" }}>
          {t.academicTitle}
        </motion.p>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="ap-auto-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
          {t.academicExperiences.map((exp, i) => (
            <motion.div variants={slideUpItem} key={i}>
              <p style={{ fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.35, margin: "0 0 0.4rem" }}>
                {exp.year}
              </p>
              <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>{exp.org}</p>
              <p style={{ fontFamily: BODY, fontSize: "0.85rem", opacity: 0.45, marginTop: "0.3rem" }}>{exp.role}</p>
              <p style={{ fontFamily: BODY, fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.6, marginTop: "0.6rem" }}>{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          §7 · AWARDS & ACHIEVEMENTS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "4.5rem 3rem" }}>
        <motion.p variants={slideUpItem} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em", margin: "0 0 2.5rem" }}>
          {t.awardsTitle}
        </motion.p>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="ap-auto-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {t.awards.map((a, i) => (
            <motion.div variants={slideUpItem} key={i} style={{ border: "1px solid color-mix(in srgb, var(--text-on-2) 15%, transparent)", padding: "2rem" }}>
              <span style={{
                display: "inline-block", fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em",
                textTransform: "uppercase", opacity: 0.4, border: "1px solid color-mix(in srgb, var(--text-on-2) 20%, transparent)",
                borderRadius: "99px", padding: "0.3rem 0.8rem", marginBottom: "1.1rem",
              }}>
                {a.year}
              </span>
              <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.25rem", margin: 0 }}>{a.title}</p>
              <p style={{ fontFamily: BODY, fontSize: "0.92rem", lineHeight: 1.6, opacity: 0.6, marginTop: "0.6rem" }}>{a.description}</p>
            </motion.div>
          ))}
        </motion.div>
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
