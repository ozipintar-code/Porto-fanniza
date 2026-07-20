
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { LanguageProvider } from "./app/i18n.tsx";
  import CustomCursor from "./app/components/CustomCursor.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <LanguageProvider>
      <CustomCursor />
      <App />
    </LanguageProvider>
  );
  