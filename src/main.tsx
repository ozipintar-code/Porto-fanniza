import { createRoot } from "react-dom/client";
  import { StrictMode } from "react";
  import App from "./app/App.tsx";
  import { LanguageProvider } from "./app/i18n.tsx";
  import { ThemeProvider } from "./app/components/ThemeContext.tsx";
  import CustomCursor from "./app/components/CustomCursor.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LanguageProvider>
        <ThemeProvider>
          <CustomCursor />
          <App />
        </ThemeProvider>
      </LanguageProvider>
    </StrictMode>
  );