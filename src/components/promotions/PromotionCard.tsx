import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { Promotion } from '../../types';

interface PromotionCardProps {
  promotion: Promotion;
  countryCode: string;
}

export const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, countryCode }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-bold text-wave-secondary mb-2">
          {promotion.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {promotion.description}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          <span>
            {format(promotion.startDate, 'dd MMMM yyyy', { locale: fr })} - {format(promotion.endDate, 'dd MMMM yyyy', { locale: fr })}
          </span>
        </div>
        <Link
          to={`/${countryCode}/promotions/${promotion.id}`}
          className="block w-full bg-wave-primary text-center text-white py-3 px-4 rounded-lg hover:bg-wave-primary/90 transition-colors"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};