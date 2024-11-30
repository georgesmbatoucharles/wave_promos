import React, { createContext, useContext, useState, useEffect } from 'react';
import { Promotion } from '../types';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface PromotionsContextType {
  promotions: Record<string, Promotion[]>;
  getPromotionsByCountry: (countryCode: string) => Promotion[];
  addPromotion: (promotion: Promotion) => Promise<void>;
  updatePromotion: (id: string, promotion: Promotion) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
  refreshPromotions: () => Promise<void>;
}

const PromotionsContext = createContext<PromotionsContextType | null>(null);

export const PromotionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [promotions, setPromotions] = useState<Record<string, Promotion[]>>({
    sn: [],
    ci: [],
  });

  const refreshPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPromotions = data.reduce((acc: Record<string, Promotion[]>, promo) => {
        const promotion: Promotion = {
          id: promo.id,
          title: promo.title,
          description: promo.description,
          termsAndConditions: promo.terms_and_conditions,
          startDate: new Date(promo.start_date),
          endDate: new Date(promo.end_date),
          country: promo.country,
          isActive: promo.is_active,
          highlights: promo.highlights || [],
        };

        const countryCode = promo.country.toLowerCase();
        if (!acc[countryCode]) {
          acc[countryCode] = [];
        }
        acc[countryCode].push(promotion);
        return acc;
      }, {});

      setPromotions(formattedPromotions);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  useEffect(() => {
    refreshPromotions();
  }, []);

  const getPromotionsByCountry = (countryCode: string) => {
    return promotions[countryCode.toLowerCase()] || [];
  };

  const addPromotion = async (promotion: Promotion) => {
    try {
      const { error: insertError } = await supabase
        .from('promotions')
        .insert({
          id: promotion.id || uuidv4(),
          title: promotion.title,
          description: promotion.description,
          terms_and_conditions: promotion.termsAndConditions,
          start_date: promotion.startDate.toISOString(),
          end_date: promotion.endDate.toISOString(),
          country: promotion.country,
          is_active: promotion.isActive,
          highlights: promotion.highlights || [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;
      await refreshPromotions();
    } catch (err) {
      console.error('Error adding promotion:', err);
      throw new Error('An error occurred while adding the promotion');
    }
  };

  const updatePromotion = async (id: string, promotion: Promotion) => {
    try {
      const { error: updateError } = await supabase
        .from('promotions')
        .update({
          title: promotion.title,
          description: promotion.description,
          terms_and_conditions: promotion.termsAndConditions,
          start_date: promotion.startDate.toISOString(),
          end_date: promotion.endDate.toISOString(),
          country: promotion.country,
          is_active: promotion.isActive,
          highlights: promotion.highlights || [],
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) throw updateError;
      await refreshPromotions();
    } catch (err) {
      console.error('Error updating promotion:', err);
      throw new Error('An error occurred while updating the promotion');
    }
  };

  const deletePromotion = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await refreshPromotions();
    } catch (err) {
      console.error('Error deleting promotion:', err);
      throw new Error('An error occurred while deleting the promotion');
    }
  };

  return (
    <PromotionsContext.Provider
      value={{
        promotions,
        getPromotionsByCountry,
        addPromotion,
        updatePromotion,
        deletePromotion,
        refreshPromotions,
      }}
    >
      {children}
    </PromotionsContext.Provider>
  );
};

export const usePromotions = () => {
  const context = useContext(PromotionsContext);
  if (!context) {
    throw new Error('usePromotions must be used within a PromotionsProvider');
  }
  return context;
};