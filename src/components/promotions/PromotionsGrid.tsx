import React from 'react';
import { PromotionCard } from './PromotionCard';
import { Promotion } from '../../types';

interface PromotionsGridProps {
  promotions: Promotion[];
  countryCode: string;
}

export const PromotionsGrid: React.FC<PromotionsGridProps> = ({ promotions, countryCode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          countryCode={countryCode}
        />
      ))}
    </div>
  );
};