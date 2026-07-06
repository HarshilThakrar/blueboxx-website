import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompanyProfile {
  name: string;
  about: string;
  industry: string;
  size: string;
  website: string;
  location: string;
  email: string;
  phone: string;
  logo: string;
}

interface CompanyStore {
  profile: CompanyProfile;
  updateProfile: (updates: Partial<CompanyProfile>) => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      profile: {
        name: "Acme Corp",
        about: "We are a leading technology company focused on building innovative products for the modern web.",
        industry: "Technology",
        size: "51-200",
        website: "https://acme.com",
        location: "San Francisco, CA",
        email: "hr@acme.com",
        phone: "+1 (555) 123-4567",
        logo: ""
      },
      updateProfile: (updates) => set((state) => ({ 
        profile: { ...state.profile, ...updates } 
      })),
    }),
    {
      name: 'company-profile-storage',
    }
  )
);
