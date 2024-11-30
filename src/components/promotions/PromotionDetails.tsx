import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Promotion } from '../../types';

interface PromotionDetailsProps {
  promotion: Promotion;
  onClose: () => void;
}

export const PromotionDetails: React.FC<PromotionDetailsProps> = ({ promotion, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-wave-secondary">{promotion.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Période de la promotion</h3>
            <p className="text-gray-600">
              Du {format(promotion.startDate, 'dd MMMM yyyy', { locale: fr })} au{' '}
              {format(promotion.endDate, 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>

          {promotion.highlights && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Points clés</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {promotion.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Conditions générales</h3>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p className="whitespace-pre-wrap">{promotion.termsAndConditions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};