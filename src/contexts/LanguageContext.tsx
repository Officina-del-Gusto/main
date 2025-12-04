import React, { createContext, useContext, useCallback, useMemo, useState, useEffect, ReactNode } from 'react';
import { Language, SiteDictionary, translations, languageOptions, LanguageOption } from '../i18n/translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  dictionary: SiteDictionary;
  translate: (path: string, fallback?: string) => string;
  options: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'odg-language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ro';
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    return stored && translations[stored] ? stored : 'ro';
  });

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue && translations[event.newValue as Language]) {
        setLanguageState(event.newValue as Language);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    window.dispatchEvent(new Event('storage'));
  }, []);

  const dictionary = useMemo<SiteDictionary>(() => translations[language], [language]);

  const translate = useCallback((path: string, fallback = ''): string => {
    const segments = path.split('.');
    let current: any = dictionary;
    for (const segment of segments) {
      if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        current = null;
        break;
      }
    }
    if (typeof current === 'string' || typeof current === 'number') {
      return String(current);
    }
    return fallback || path;
  }, [dictionary]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    dictionary,
    translate,
    options: languageOptions,
  }), [language, setLanguage, dictionary, translate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
