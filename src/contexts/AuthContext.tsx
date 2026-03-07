"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type User = Database['public']['Tables']['users']['Row'] & {
  sellers?: Database['public']['Tables']['sellers']['Row'];
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  isSeller: boolean;
  storeName?: string;
  storeAddress?: string;
  storeBannerImage?: File | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch user data from our database
          const { data: userData } = await supabase
            .from('users')
            .select('*, sellers(*)')
            .eq('user_id', session.user.id)
            .single();
          
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (session?.user) {
          // Fetch user data from our database
          const { data: userData } = await supabase
            .from('users')
            .select('*, sellers(*)')
            .eq('user_id', session.user.id)
            .single();
          
          if (userData) {
            setUser(userData);
          }
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // User data will be fetched by the auth state listener
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Create Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
          },
        },
      });

      if (authError || !authData.user) {
        return { success: false, error: authError?.message || 'Failed to create account' };
      }

      // 2. Create user record in our database
      const { error: userError } = await supabase
        .from('users')
        .insert({
          user_id: authData.user.id,
          email: userData.email,
          password_hash: '', // Not storing password hash, Supabase handles this
          full_name: userData.fullName,
          phone_number: userData.phone,
          role: userData.isSeller ? 'seller' : 'buyer',
          city: userData.city,
          country: userData.country,
        });

      if (userError) {
        return { success: false, error: 'Failed to create user profile' };
      }

      // 3. If seller, create seller record
      if (userData.isSeller && userData.storeName) {
        let storeBannerUrl = null;
        
        // Upload store banner image if provided
        if (userData.storeBannerImage) {
          const fileExt = userData.storeBannerImage.name.split('.').pop();
          const fileName = `store-banner-${authData.user.id}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('store-banners')
            .upload(fileName, userData.storeBannerImage);
          
          if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage
              .from('store-banners')
              .getPublicUrl(fileName);
            storeBannerUrl = publicUrl;
          }
        }

        const { error: sellerError } = await supabase
          .from('sellers')
          .insert({
            user_id: authData.user.id,
            store_name: userData.storeName,
            store_banner_image: storeBannerUrl,
            pickup_address: userData.storeAddress,
            city: userData.city,
            country: userData.country,
          });

        if (sellerError) {
          return { success: false, error: 'Failed to create seller profile' };
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
