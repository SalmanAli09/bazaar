"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  full_name?: string;
  store_name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth cookie on mount
    const checkAuth = () => {
      try {
        const authData = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth_data='))
          ?.split('=')[1];
        
        if (authData) {
          const decodedData = JSON.parse(decodeURIComponent(authData));
          setUser(decodedData);
        }
      } catch (error) {
        console.error('Error parsing auth cookie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Import seller data
      const sellerData = await import('../../data/seller_flow.json');
      const seller = sellerData.default;

      // Check if credentials match seller data
      if (email === seller.email && password === seller.password) {
        const userData: User = {
          id: seller.seller_id,
          email: seller.email,
          role: seller.role,
          full_name: seller.full_name,
          store_name: seller.store_name
        };

        // Set user in state
        setUser(userData);

        // Set auth cookie (expires in 7 days)
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        document.cookie = `auth_data=${encodeURIComponent(JSON.stringify(userData))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // Clear auth cookie
    document.cookie = 'auth_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
