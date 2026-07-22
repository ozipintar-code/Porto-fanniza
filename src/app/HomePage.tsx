import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants } from "framer-motion";
import { CREAM, DARK, DARK2, ACCENT, TEXT_ON_2, DISPLAY, BODY } from "./theme";
import { PROJECTS } from "./data/projects";
import { useLanguage } from "./i18n";
import { STRINGS } from "./strings";

function CoverFlowItem({ project, containerRef, onSelect, viewLabel }: { project: any; containerRef: React.RefObject<HTMLDivElement | null>; onSelect: () => void; viewLabel: string; }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ target: itemRef, container: containerRef, axis: "x", offset: ["center end", "center start"] });
  
  // Hanya menggunakan SCALE (visual transform) agar layout box (fisik) tetap statis!
  // Menganimasi layout (seperti height) saat menggunakan scroll-snap akan menyebabkan glitch/getar.
  const scale = useTransform(scrollXProgress, [0, 0.4, 0.5, 0.6, 1], [0.75, 0.9, 1, 0.9, 0.75]);
  const opacity = useTransform(scrollXProgress, [0, 0.4, 0.5, 0.6, 1], [0.25, 0.45, 1, 0.45, 0.25]);
  const zIndex = useTransform(scrollXProgress, [0, 0.4, 0.5, 0.6, 1], [0, 5, 10, 5, 0]);
  const labelOpacity = useTransform(scrollXProgress, [0.45, 0.5, 0.55], [0, 1, 0]);
  const textY = useTransform(scrollXProgress, [0.4, 0.5, 0.6], [20, 0, -20]);

  return (
    <div ref={itemRef} className="hp-coverflow-item" style={{ flex: "0 0 min(40vw, 450px)", scrollSnapAlign: "center", position: "relative" }}>
      <motion.div onClick={onSelect} style={{ scale, opacity, zIndex, cursor: "pointer", position: "relative", width: "100%" }}>
        <img src={project.img} alt={project.name} style={{ width: "100%", height: "500px", objectFit: "cover", display: "block", backgroundColor: "#2a2a2a" }} />
        <motion.div style={{ opacity: labelOpacity, position: "absolute", bottom: "1rem", right: "1rem", backgroundColor: "color-mix(in srgb, var(--text) 60%, transparent)", color: TEXT_ON_2, fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.35rem 0.8rem" }}>
          {viewLabel} →
        </motion.div>
        <motion.div style={{ opacity: labelOpacity, y: textY, position: "absolute", bottom: "-4rem", left: "0", right: "0", textAlign: "center" }}>
          <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.6rem", margin: 0, letterSpacing: "0.02em" }}>{project.name}</p>
          <p style={{ fontFamily: BODY, fontSize: "0.7rem", opacity: 0.35, marginTop: "0.2rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{project.year}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

import SEO from "./components/SEO";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import PillButton from "./components/PillButton";

const IMG = {
  heroMain: "/images/pavilliun-01-hero.png",
  heroT1: "/images/pavilliun-07.png",
  heroT2: "/images/pavilliun-09.png",
  heroT3: "/images/pavilliun-11.png",
  portrait: "/images/portrait-fannisa.jpeg",
  cta: "/images/pakuwon-01-hero.png",
};

const PORTFOLIO = PROJECTS.map((p) => ({ id: p.id, slug: p.slug, name: p.name, year: p.year, img: p.cardImage }));
const LOOPED_PORTFOLIO = [...PORTFOLIO, ...PORTFOLIO, ...PORTFOLIO];

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
  const [hoveredProject, setHoveredProject] = useState<string>(PROJECTS[0].id);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const ctaLeftRef = useRef<HTMLImageElement>(null);
  const ctaRightRef = useRef<HTMLImageElement>(null);
  const ctaTextRef = useRef<HTMLHeadingElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: carouselContainerRef });
  
  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    const idx = Math.round(latest * (LOOPED_PORTFOLIO.length - 1));
    const realIdx = idx % PORTFOLIO.length;
    if (realIdx !== carouselIdx && !isNaN(realIdx)) setCarouselIdx(realIdx);
  });

  const teleportTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getBlockWidth = () => {
    if (!carouselContainerRef.current) return 0;
    const items = carouselContainerRef.current.querySelectorAll('.hp-coverflow-item');
    if (items.length >= PORTFOLIO.length + 1) {
      const first = items[0] as HTMLElement;
      const nextBlockFirst = items[PORTFOLIO.length] as HTMLElement;
      return nextBlockFirst.offsetLeft - first.offsetLeft;
    }
    return 0;
  };

  const handleScroll = () => {
    if (teleportTimeout.current) clearTimeout(teleportTimeout.current);
    teleportTimeout.current = setTimeout(() => {
      const container = carouselContainerRef.current;
      if (!container || isDragging.current) return;
      
      const bWidth = getBlockWidth();
      if (bWidth === 0) return;

      if (container.scrollLeft < bWidth * 0.5) {
        container.style.scrollSnapType = "none";
        container.scrollLeft += bWidth;
        requestAnimationFrame(() => { container.style.scrollSnapType = "x mandatory"; });
      } else if (container.scrollLeft > bWidth * 1.5) {
        container.style.scrollSnapType = "none";
        container.scrollLeft -= bWidth;
        requestAnimationFrame(() => { container.style.scrollSnapType = "x mandatory"; });
      }
    }, 150);
  };

  useEffect(() => {
    const initScroll = () => {
      const container = carouselContainerRef.current;
      const bWidth = getBlockWidth();
      if (container && bWidth > 0) {
        container.style.scrollSnapType = "none";
        container.scrollLeft = bWidth;
        requestAnimationFrame(() => { container.style.scrollSnapType = "x mandatory"; });
      }
    };
    setTimeout(initScroll, 100);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.5 });
      gsap.from(subtitleRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.8 });
      gsap.to(heroBgRef.current, { yPercent: 50, ease: "none", scrollTrigger: { trigger: heroBgRef.current?.parentElement, start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(portraitRef.current, { yPercent: -30 }, { yPercent: 30, ease: "none", scrollTrigger: { trigger: portraitRef.current?.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => ctx.revert();
  }, []);

  const next = () => carouselContainerRef.current?.scrollBy({ left: window.innerWidth * 0.45, behavior: 'smooth' });
  const prev = () => carouselContainerRef.current?.scrollBy({ left: -window.innerWidth * 0.45, behavior: 'smooth' });

  // Drag to scroll logic
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!carouselContainerRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - carouselContainerRef.current.offsetLeft;
    scrollLeft.current = carouselContainerRef.current.scrollLeft;
    carouselContainerRef.current.style.cursor = "grabbing";
    carouselContainerRef.current.style.scrollSnapType = "none";
  };

  const handlePointerLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.cursor = "grab";
      carouselContainerRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.cursor = "grab";
      carouselContainerRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !carouselContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    if (Math.abs(walk) > 10) hasDragged.current = true;
    carouselContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged.current = false;
    }
  };

  // WE ARE Parallax
  const weAreRef = useRef<HTMLElement>(null);
  const { scrollYProgress: weAreProgress } = useScroll({
    target: weAreRef,
    offset: ["start end", "center center"]
  });
  const weAreX1 = useTransform(weAreProgress, [0, 1], ["-10vw", "0vw"]);
  const weAreX2 = useTransform(weAreProgress, [0, 1], ["10vw", "0vw"]);

  // PORTFOLIO Parallax
  const portfolioRef = useRef<HTMLElement>(null);
  const { scrollYProgress: portProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "center center"]
  });
  const portX1 = useTransform(portProgress, [0, 1], ["-10vw", "0vw"]);
  const portX2 = useTransform(portProgress, [0, 1], ["10vw", "0vw"]);

  // Our Projects Parallax
  const ourProjectsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: opEnterProgress } = useScroll({
    target: ourProjectsRef,
    offset: ["start end", "center center"]
  });
  const ourTextX = useTransform(opEnterProgress, [0, 1], ["-10vw", "0vw"]);
  const projectsTextX = useTransform(opEnterProgress, [0, 1], ["10vw", "0vw"]);

  const { scrollYProgress: opFullProgress } = useScroll({
    target: ourProjectsRef,
    offset: ["start end", "end start"]
  });
  const stickyImageY = useTransform(opFullProgress, [0, 1], ["-15%", "15%"]);

  const tableContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const tableRowVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  // CTA Parallax
  const ctaSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaSectionRef,
    offset: ["start end", "end start"]
  });
  const ctaTextX = useTransform(ctaProgress, [0, 1], ["-20vw", "10vw"]);
  const ctaClipPath = useTransform(ctaProgress, [0.1, 0.6], ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)"]);
  const ctaImageScale = useTransform(ctaProgress, [0.1, 0.8], [1.3, 1]);

  return (
    <div id="page-scroll-root" style={{ fontFamily: BODY, backgroundColor: CREAM, color: DARK, overflowX: "hidden", minHeight: "100vh" }}>
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
        
        .hp-carousel-main { overflow: hidden; }
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
          {/* Background Image with Parallax Scale */}
          <img
            ref={heroBgRef}
            src="/images/livingkitchen-01-hero.png"
            alt="Hero Background"
            style={{
              position: "absolute",
              top: "-25%",
              width: "100%", height: "150%", objectFit: "cover",
              display: "block",
              willChange: "transform"
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
            <h1 ref={titleRef} style={{
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
          <h2 ref={subtitleRef} style={{
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
      <section ref={weAreRef} style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "5rem 3rem" }}>
        {/* Top Header Row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: '"Arial Black", Impact, sans-serif', fontWeight: 900,
          fontSize: "clamp(3rem, 10vw, 8rem)",
          lineHeight: 0.9, letterSpacing: "-0.04em",
          marginBottom: "4rem",
          overflow: "hidden"
        }}>
          <motion.div style={{ x: weAreX1 }}>{t.weAreTitle[0]}</motion.div>
          <div style={{ flex: 1, borderTop: `4px solid ${ACCENT}`, margin: "0 2rem", opacity: 0.8, maxWidth: "60px" }}></div>
          <motion.div style={{ x: weAreX2 }}>{t.weAreTitle[1]}</motion.div>
        </div>

        {/* 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "5rem" }}>

          {/* Left Column (Photo & Title) */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ backgroundColor: "#fff", padding: "0", overflow: "hidden", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <img
                ref={portraitRef}
                src="/images/portrait-fannisa.jpeg"
                alt="Fannisa Azzuri Rienhardt"
                style={{ position: "absolute", top: "-30%", width: "100%", height: "160%", objectFit: "cover", willChange: "transform" }}
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
      <section ref={portfolioRef} style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "5rem 0", overflowX: "hidden" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "3rem", padding: "0 3rem"
        }}>
          <motion.h2 style={{
            fontFamily: DISPLAY, fontWeight: 900,
            fontSize: "clamp(2.5rem, 7.5vw, 8.5rem)",
            letterSpacing: "-0.03em", lineHeight: 0.84, margin: 0,
            x: portX1
          }}>
            {t.portfolioLabel}
          </motion.h2>
          <motion.span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.1rem", opacity: 0.3, letterSpacing: "0.04em", x: portX2 }}>
            {String(carouselIdx + 1).padStart(2, "0")} / {String(PORTFOLIO.length).padStart(2, "0")}
          </motion.span>
        </div>

        <div 
          ref={carouselContainerRef}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onClickCapture={handleClickCapture}
          onScroll={handleScroll}
          style={{ 
            display: "flex", alignItems: "center", gap: "2rem", overflowX: "auto", 
            scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none",
            paddingBottom: "6rem", cursor: "grab"
          }}
        >
          {/* Safari Hack: Spacer fisik menggantikan padding agar scroll-snap ke kiri tidak glitch */}
          <div style={{ flex: "0 0 calc(50vw - min(20vw, 225px) - 2rem)" }} />

          {LOOPED_PORTFOLIO.map((project, i) => (
             <CoverFlowItem 
                key={`${project.slug}-${i}`} 
                project={project} 
                containerRef={carouselContainerRef} 
                onSelect={() => onSelectProject(project.slug)}
                viewLabel={t.viewCaseStudy}
             />
          ))}

          {/* Safari Hack: Spacer kanan */}
          <div style={{ flex: "0 0 calc(50vw - min(20vw, 225px) - 2rem)" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center", padding: "0 3rem" }}>
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
      <section ref={ourProjectsRef} style={{ backgroundColor: DARK2, color: TEXT_ON_2, padding: "5rem 3rem" }}>
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
            <motion.span style={{ x: ourTextX }}>{t.ourProjects[0]}</motion.span>
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: "0.55em" }}>—</span>
            <motion.span style={{ x: projectsTextX }}>{t.ourProjects[1]}</motion.span>
          </div>
          <PillButton dark onClick={onViewAllProjects}>{t.exploreMore}</PillButton>
        </div>

        <div className="hp-projects-layout" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "3.5rem", alignItems: "start" }}>
          <motion.div variants={tableContainerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
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
              <motion.div
                variants={tableRowVariants}
                key={p.id}
                className="hp-table-row"
                onMouseEnter={() => setHoveredProject(p.id)}
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
              </motion.div>
            ))}
          </motion.div>

          <div className="hp-sticky-preview" style={{ position: "sticky", top: "2rem" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", backgroundColor: "#2a2a2a", overflow: "hidden" }}>
              {PROJECTS.map((p) => (
                <motion.img
                  key={p.id}
                  src={p.cardImage}
                  alt={p.name}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: hoveredProject === p.id ? 1 : 0,
                    transition: "opacity 0.38s ease",
                    y: stickyImageY,
                    scale: 1.25
                  }}
                />
              ))}
            </div>
            {(() => {
              const found = PROJECTS.find((p) => p.id === hoveredProject) || PROJECTS[0];
              return (
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.04em", margin: 0 }}>
                    {found.name}
                  </p>
                  <p style={{ fontFamily: BODY, fontSize: "0.68rem", opacity: 0.35, marginTop: "0.3rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {catLabel[found.category]} · {found.year}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          §5 · TALK WITH US — CTA
      ══════════════════════════════════════════ */}
      <section ref={ctaSectionRef} style={{ backgroundColor: CREAM, color: DARK, position: "relative", minHeight: "100vh", overflow: "hidden" }}>

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
          <motion.img src={IMG.heroT1} alt="Project detail" style={{ position: "absolute", top: "0", width: "100%", height: "100%", objectFit: "cover", clipPath: ctaClipPath, scale: ctaImageScale }} />
        </div>

        {/* Bottom Left Image */}
        <div className="hp-cta-left-img" style={{ position: "absolute", bottom: "0", left: "0", width: "45vw", height: "55vh", overflow: "hidden", zIndex: 5 }}>
          <motion.img src={IMG.cta} alt="Project hero" style={{ position: "absolute", top: "0", width: "100%", height: "100%", objectFit: "cover", clipPath: ctaClipPath, scale: ctaImageScale }} />
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
          <motion.h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(4.5rem, 15vw, 13rem)", letterSpacing: "-0.04em", lineHeight: 0.8, whiteSpace: "nowrap", margin: 0, x: ctaTextX }}>
            {t.ctaTitle.join(" ")}
          </motion.h2>
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
