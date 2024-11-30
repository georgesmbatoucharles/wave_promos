import React from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { WavePattern } from '../components/backgrounds/WavePattern';
import { StripesPattern } from '../components/backgrounds/StripesPattern';
import { usePromotions } from '../contexts/PromotionsContext';

export const PromotionDetailsPage: React.FC = () => {
  const { countryCode, promotionId } = useParams<{ countryCode: string; promotionId: string }>();
  const navigate = useNavigate();
  const { getPromotionsByCountry } = usePromotions();

  if (!countryCode) {
    return <Navigate to="/" replace />;
  }

  const countryPromotions = getPromotionsByCountry(countryCode);
  const promotion = countryPromotions.find(p => p.id === promotionId);

  if (!promotion) {
    return <Navigate to={`/${countryCode}`} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <WavePattern />
      <StripesPattern />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to={`/${countryCode}`}
            className="inline-flex items-center text-wave-primary hover:text-wave-primary/80 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux promotions
          </Link>

          {/* Promotion Header */}
          <div className="bg-white rounded-t-xl p-8 shadow-lg mb-1">
            <h1 className="text-3xl font-bold text-wave-secondary mb-4">
              {promotion.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {promotion.description}
            </p>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-5 h-5 mr-2" />
              <span>
                Du {format(promotion.startDate, 'dd MMMM yyyy', { locale: fr })} au{' '}
                {format(promotion.endDate, 'dd MMMM yyyy', { locale: fr })}
              </span>
            </div>
          </div>

          {/* Highlights */}
          {promotion.highlights && (
            <div className="bg-white p-8 shadow-lg mb-1">
              <h2 className="text-xl font-bold text-wave-secondary mb-4">
                Points clés de la promotion
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promotion.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-wave-primary rounded-full" />
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="bg-white rounded-b-xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-wave-secondary mb-4">
              Conditions générales
            </h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p className="whitespace-pre-wrap">{promotion.termsAndConditions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};