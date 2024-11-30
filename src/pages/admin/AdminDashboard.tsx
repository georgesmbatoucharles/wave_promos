import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { usePromotions } from '../../contexts/PromotionsContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const AdminDashboard: React.FC = () => {
  const { promotions, deletePromotion } = usePromotions();

  const allPromotions = Object.entries(promotions).flatMap(([country, promos]) =>
    promos.map(promo => ({ ...promo, countryCode: country }))
  );

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
        await deletePromotion(id);
      }
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('Une erreur est survenue lors de la suppression de la promotion.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-wave-secondary">
            Gestion des promotions
          </h1>
          <Link
            to="/admin/promotions/new"
            className="inline-flex items-center px-4 py-2 bg-wave-primary text-white rounded-md hover:bg-wave-primary/90"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle promotion
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pays
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allPromotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {promotion.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {promotion.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {promotion.country}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(promotion.startDate, 'dd MMM yyyy', { locale: fr })} -{' '}
                    {format(promotion.endDate, 'dd MMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      promotion.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {promotion.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/promotions/${promotion.id}/edit`}
                      className="text-wave-primary hover:text-wave-primary/80 mr-4"
                    >
                      <Edit2 className="w-5 h-5 inline" />
                    </Link>
                    <button
                      onClick={() => handleDelete(promotion.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};