import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ProfileContextType } from '../types/profile';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main Street',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94102',
  country: 'United States'
};

const STORAGE_KEY = 'buynow_profile';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setIsLoading(true);
    setTimeout(() => {
      const updated = { ...profile, ...updates };
      setProfile(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsLoading(false);
    }, 500);
  };

  const value: ProfileContextType = {
    profile,
    updateProfile,
    isLoading
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
