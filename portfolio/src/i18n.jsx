import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ui } from './content.js';

const Ctx = createContext(null);

function readPref(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function PrefsProvider({ children }) {
  const [lang, setLang] = useState(() => readPref('pf-lang', 'en'));
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('pf-lang', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('pf-theme', theme);
  }, [theme]);

  /** Resolve a `{ en, ar }` field (or plain string) for the current language. */
  const t = useCallback(
    (v) => {
      if (v == null) return '';
      if (typeof v === 'string' || typeof v === 'number') return v;
      return v[lang] ?? v.en ?? '';
    },
    [lang],
  );

  const value = {
    lang,
    theme,
    t,
    s: ui[lang],
    toggleLang: () => setLang((l) => (l === 'en' ? 'ar' : 'en')),
    toggleTheme: () => setTheme((x) => (x === 'dark' ? 'light' : 'dark')),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePrefs = () => useContext(Ctx);
