import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Promotion } from '../types';

interface PromotionCardProps {
  promotion: Promotion;
  onViewDetails: (id: string) => void;
}

export const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, onViewDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={promotion.bannerUrl}
        alt={promotion.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-wave-primary mb-2">
          {promotion.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {promotion.description}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          <span>
            {format(promotion.startDate, 'PP')} - {format(promotion.endDate, 'PP')}
          </span>
        </div>
        <button
          onClick={() => onViewDetails(promotion.id)}
          className="w-full flex items-center justify-center space-x-2 bg-wave-secondary text-white py-2 px-4 rounded-lg hover:bg-wave-secondary/90 transition-colors"
        >
          <span>{t('promotion.viewDetails')}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};