import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
      <Icon className="w-12 h-12 text-wave-primary mb-4" />
      <h3 className="text-xl font-bold text-wave-secondary">{title}</h3>
    </div>
  );
};