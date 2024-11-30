import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'welcome.title': 'Manage all your money in',
      'welcome.subtitle': 'a single application',
      'welcome.description': 'We are building West Africa\'s first super financial application with simple, secure and 100% digital solutions so you can control your money from your mobile phone.',
      'welcome.selectCountry': 'Choose your country',
      'search.placeholder': 'Search promotions...',
      'promotion.viewDetails': 'View Details',
      'promotions.title': 'Active Promotions',
      'common.available': 'Available'
    }
  },
  fr: {
    translation: {
      'welcome.title': 'Gérez tout votre argent dans',
      'welcome.subtitle': 'une application unique',
      'welcome.description': 'Nous bâtissons la première super application financière de l\'Afrique de l\'Ouest avec des solutions simples, sécurisées et 100% numériques afin que vous puissiez avoir le contrôle de votre argent, depuis votre téléphone mobile.',
      'welcome.selectCountry': 'Choisissez un pays',
      'search.placeholder': 'Rechercher des promotions...',
      'promotion.viewDetails': 'Voir les détails',
      'promotions.title': 'Promotions actives',
      'common.available': 'Disponible'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;