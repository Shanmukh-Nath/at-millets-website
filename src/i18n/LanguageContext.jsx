// src/i18n/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./transaltions";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "EN");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // src/i18n/LanguageContext.jsx
  const t = (key) => {
    return (
      key.split(".").reduce((obj, k) => obj?.[k], translations[lang]) || key
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
