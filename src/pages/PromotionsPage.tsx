import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PromotionsGrid } from '../components/promotions/PromotionsGrid';
import { FeaturesGrid } from '../components/features/FeaturesGrid';
import { WavePattern } from '../components/backgrounds/WavePattern';
import { StripesPattern } from '../components/backgrounds/StripesPattern';
import { usePromotions } from '../contexts/PromotionsContext';

export const PromotionsPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const { t } = useTranslation();
  const { getPromotionsByCountry } = usePromotions();
  
  // Validate country code
  if (!countryCode || !['sn', 'ci'].includes(countryCode.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  const countryPromotions = getPromotionsByCountry(countryCode);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <WavePattern />
      <StripesPattern />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-wave-secondary mb-12">
          Nos promos Wave pour vous...
        </h1>

        {countryPromotions.length > 0 ? (
          <div className="mb-16">
            <PromotionsGrid 
              promotions={countryPromotions}
              countryCode={countryCode}
            />
          </div>
        ) : (
          <div className="text-center py-16 mb-16">
            <p className="text-xl text-gray-600">
              Aucune promotion en cours pour {countryCode.toUpperCase()}.
            </p>
          </div>
        )}

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-wave-secondary mb-12">
            Wave c'est
          </h2>
          <FeaturesGrid />
        </div>
      </div>
    </div>
  );
};