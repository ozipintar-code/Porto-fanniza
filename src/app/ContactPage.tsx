import { Mail, MessageCircle, Linkedin, Download, Instagram } from "lucide-react";
import SiteNav from "./components/SiteNav";
import { CREAM, DARK, ACCENT, DISPLAY, BODY } from "./theme";
import { useLanguage } from "./i18n";
import { STRINGS } from "./strings";
import SEO from "./components/SEO";

interface ContactPageProps {
  onLogoClick: () => void;
  onProjectsClick: () => void;
  onAboutClick?: () => void;
  onInteriorClick?: () => void;
  onVisualMerchandisingClick?: () => void;
  onContactClick?: () => void;
}

export default function ContactPage(props: ContactPageProps) {
  const { lang } = useLanguage();
  const t = STRINGS[lang].contact;

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SEO title="Contact — Fannisa Azzuri" />
      <SiteNav {...props} variant="sticky" />
      
      <main style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        alignItems: "center", 
        padding: "4rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%"
      }}>
        
        {/* Left Side: Big Typography */}
        <div style={{ flex: "1 1 500px", padding: "2rem" }}>
          <h1 style={{ 
            fontFamily: DISPLAY, 
            fontSize: "clamp(4rem, 8vw, 7rem)", 
            fontWeight: 900, 
            color: DARK, 
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            marginBottom: "2rem"
          }}>
            {t.title[0]}<br/>{t.title[1]}<br/>{t.title[2]}
          </h1>
          <p style={{ fontFamily: BODY, fontSize: "1.1rem", color: DARK, opacity: 0.7, maxWidth: "400px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            {t.description}
          </p>
          <a
            href="/CV-Fannisa-Azzuri-Rienhardt.pdf"
            download
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              border: `1px solid color-mix(in srgb, ${DARK} 20%, transparent)`, color: DARK, textDecoration: "none",
              borderRadius: "99px", padding: "0.4rem 1.25rem",
              fontFamily: BODY, fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.05em",
              cursor: "pointer", transition: "background-color 0.3s, border-color 0.3s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${DARK} 4%, transparent)`; e.currentTarget.style.borderColor = DARK; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = `color-mix(in srgb, ${DARK} 20%, transparent)`; }}
          >
            <Download size={15} /> {t.downloadCv}
          </a>
        </div>

        {/* Right Side: Links */}
        <div style={{ flex: "1 1 400px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <a href="https://wa.me/+6285171672687" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: "1.5rem", padding: "2rem",
            backgroundColor: DARK, color: CREAM, textDecoration: "none", borderRadius: "24px",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ backgroundColor: ACCENT, padding: "1rem", borderRadius: "50%" }}>
              <MessageCircle size={32} color={CREAM} />
            </div>
            <div>
              <div style={{ fontFamily: BODY, fontSize: "0.9rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>WhatsApp</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 700 }}>+62 851 7167 2687</div>
            </div>
          </a>

          <a href="mailto:fannisazzuri@gmail.com" style={{
            display: "flex", alignItems: "center", gap: "1.5rem", padding: "2rem",
            backgroundColor: "rgba(0,0,0,0.03)", color: DARK, textDecoration: "none", borderRadius: "24px",
            transition: "background-color 0.3s ease",
          }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.06)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)"}>
            <div style={{ backgroundColor: "rgba(0,0,0,0.06)", padding: "1rem", borderRadius: "50%" }}>
              <Mail size={32} color={DARK} />
            </div>
            <div>
              <div style={{ fontFamily: BODY, fontSize: "0.9rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>Email</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "1.3rem", fontWeight: 700 }}>fannisazzuri@gmail.com</div>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/fannisazzuri/" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: "1.5rem", padding: "2rem",
            backgroundColor: "rgba(0,0,0,0.03)", color: DARK, textDecoration: "none", borderRadius: "24px",
            transition: "background-color 0.3s ease",
          }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.06)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)"}>
            <div style={{ backgroundColor: "rgba(0,0,0,0.06)", padding: "1rem", borderRadius: "50%" }}>
              <Linkedin size={32} color={DARK} />
            </div>
            <div>
              <div style={{ fontFamily: BODY, fontSize: "0.9rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>LinkedIn</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 700 }}>Fannisa Azzuri</div>
            </div>
          </a>

          <a href="https://www.instagram.com/deui.space/" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: "1.5rem", padding: "2rem",
            backgroundColor: "rgba(0,0,0,0.03)", color: DARK, textDecoration: "none", borderRadius: "24px",
            transition: "background-color 0.3s ease",
          }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.06)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)"}>
            <div style={{ backgroundColor: "rgba(0,0,0,0.06)", padding: "1rem", borderRadius: "50%" }}>
              <Instagram size={32} color={DARK} />
            </div>
            <div>
              <div style={{ fontFamily: BODY, fontSize: "0.9rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>Instagram</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 700 }}>@deui.space</div>
            </div>
          </a>

        </div>

      </main>
    </div>
  );
}
