import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lang, SiteTranslations, TRANSLATIONS } from './translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isRtl: boolean;
  t: SiteTranslations;
}

const STORAGE_KEY = 'orit_lang_v1';

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'he',
  setLang: () => {},
  isRtl: true,
  t: TRANSLATIONS.he,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      if (urlLang === 'he' || urlLang === 'en' || urlLang === 'es') return urlLang;
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'he' || saved === 'en' || saved === 'es') return saved;
    } catch {
      // ignore
    }
    return 'he';
  });

  const isRtl = lang === 'he';
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.title = t.metaTitle;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang, isRtl, t.metaTitle]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
