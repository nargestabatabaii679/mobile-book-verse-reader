
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          {t('library_title')}
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Globe className="w-4 h-4 mr-2" />
        {t('language')}
      </Button>
    </header>
  );
};

export default Header;
