
import { useState, useEffect } from 'react';
import { locales, LocaleKey, SupportedLocale } from '@/i18n/locales';

export const useLocale = () => {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(() => {
    const saved = localStorage.getItem('locale');
    return (saved as SupportedLocale) || 'fa';
  });

  useEffect(() => {
    localStorage.setItem('locale', currentLocale);
    document.documentElement.dir = currentLocale === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  const t = (key: LocaleKey): string => {
    return locales[currentLocale][key] || key;
  };

  const changeLocale = (locale: SupportedLocale) => {
    setCurrentLocale(locale);
  };

  return {
    currentLocale,
    t,
    changeLocale,
    isRTL: currentLocale === 'fa'
  };
};
