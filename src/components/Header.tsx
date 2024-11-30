import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  return (
    <header className="bg-wave-primary text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
};