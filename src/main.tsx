import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import { LanguageProvider } from "./app/i18n.tsx";
import { ThemeProvider } from "./app/components/ThemeContext.tsx";
import CustomCursor from "./app/components/CustomCursor.tsx";
import Preloader from "./app/components/Preloader.tsx";
import SmoothScroll from "./app/components/SmoothScroll.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Preloader />
          <CustomCursor />
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>
);