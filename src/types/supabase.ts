export interface Database {
  public: {
    Tables: {
      promotions: {
        Row: {
          id: string;
          title: string;
          description: string;
          terms_and_conditions: string;
          start_date: string;
          end_date: string;
          country: 'SN' | 'CI';
          is_active: boolean;
          highlights: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          terms_and_conditions: string;
          start_date: string;
          end_date: string;
          country: 'SN' | 'CI';
          is_active?: boolean;
          highlights?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          terms_and_conditions?: string;
          start_date?: string;
          end_date?: string;
          country?: 'SN' | 'CI';
          is_active?: boolean;
          highlights?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}