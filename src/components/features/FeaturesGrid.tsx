import React from 'react';
import { Landmark, Coins, Lightbulb, Smartphone, HeadphonesIcon, ShieldCheck } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: Landmark,
      title: "Un compte sans frais de dépôt ou retrait"
    },
    {
      icon: Coins,
      title: "Des transferts d'argent à seulement 1%"
    },
    {
      icon: Lightbulb,
      title: "Le paiement de factures sans frais"
    },
    {
      icon: Smartphone,
      title: "L'achat de crédit instantané tous réseaux"
    },
    {
      icon: HeadphonesIcon,
      title: "Un numéro de contact unique et gratuit"
    },
    {
      icon: ShieldCheck,
      title: "Un système de sécurité aux standards internationaux"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
        />
      ))}
    </div>
  );
};