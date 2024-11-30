import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { usePromotions } from '../../contexts/PromotionsContext';
import { v4 as uuidv4 } from 'uuid';

const promotionSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  termsAndConditions: z.string().min(1, 'Les conditions générales sont requises'),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().min(1, 'La date de fin est requise'),
  country: z.enum(['SN', 'CI'], { required_error: 'Le pays est requis' }),
  isActive: z.boolean(),
  highlights: z.array(z.object({
    value: z.string().min(1, 'Le point clé est requis')
  }))
});

type PromotionFormData = z.infer<typeof promotionSchema>;

export const AdminPromotionEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { promotions, addPromotion, updatePromotion } = usePromotions();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<PromotionFormData>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      isActive: true,
      highlights: [{ value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'highlights'
  });

  useEffect(() => {
    if (id) {
      // Find the promotion in all countries
      const promotion = Object.values(promotions)
        .flat()
        .find(p => p.id === id);

      if (promotion) {
        reset({
          ...promotion,
          startDate: promotion.startDate.toISOString().split('T')[0],
          endDate: promotion.endDate.toISOString().split('T')[0],
          highlights: promotion.highlights?.map(h => ({ value: h })) || [{ value: '' }]
        });
      }
    }
  }, [id, promotions, reset]);

  const onSubmit = async (data: PromotionFormData) => {
    const promotionData = {
      id: id || uuidv4(),
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      highlights: data.highlights.map(h => h.value).filter(Boolean)
    };

    try {
      if (id) {
        await updatePromotion(id, promotionData);
      } else {
        await addPromotion(promotionData);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert('Une erreur est survenue lors de la sauvegarde de la promotion.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center text-wave-primary hover:text-wave-primary/80">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-wave-secondary mb-8">
            {id ? 'Modifier la promotion' : 'Nouvelle promotion'}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                {...register('title')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-wave-primary focus:ring-wave-primary"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-wave-primary focus:ring-wave-primary"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays
              </label>
              <select
                {...register('country')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-wave-primary focus:ring-wave-primary"
              >
                <option value="">Sélectionnez un pays</option>
                <option value="SN">Sénégal</option>
                <option value="CI">Côte d'Ivoire</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-wave-primary focus:ring-wave-primary"
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <input
                  type="date"
                  {...register('endDate')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-wave-primary focus:ring-wave-primary"
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points clés
              </label>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`highlights.${index}.value`)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-wave-primary focus:ring-wave-primary"
                      placeholder="Ajouter un point clé"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ value: '' })}
                  className="inline-flex items-center text-sm text-wave-primary hover:text-wave-primary/80"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter un point clé
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conditions générales
              </label>
              <textarea
                {...register('termsAndConditions')}
                rows={10}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-wave-primary focus:ring-wave-primary"
              />
              {errors.termsAndConditions && (
                <p className="mt-1 text-sm text-red-600">{errors.termsAndConditions.message}</p>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isActive')}
                className="h-4 w-4 text-wave-primary focus:ring-wave-primary border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Promotion active
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-wave-primary text-white rounded-md hover:bg-wave-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wave-primary"
              >
                {id ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};