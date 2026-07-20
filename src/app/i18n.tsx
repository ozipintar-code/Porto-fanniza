// ── Language context ─────────────────────────────────────────────────────
// Two-language support (English / Indonesian) for the whole site. Most of
// Fannisa's real clients and projects are Indonesian, so this isn't a
// decorative feature — it's the language her actual audience reads in.

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "id";

const STORAGE_KEY = "deui-space-lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "id") return saved;
  // Default new visitors with an Indonesian browser/OS locale to Indonesian;
  // everyone else sees English first. Either way it's one click to switch.
  return window.navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
}

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Private browsing / storage disabled — language just won't persist.
    }
  };

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
