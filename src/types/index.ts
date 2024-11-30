export interface Promotion {
  id: string;
  title: string;
  description: string;
  termsAndConditions: string;
  startDate: Date;
  endDate: Date;
  country: 'SN' | 'CI';
  isActive: boolean;
  highlights?: string[];
}

export interface Country {
  code: 'SN' | 'CI';
  name: string;
  flagUrl: string;
}