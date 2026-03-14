"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { staticUser } from '@/lib/static-data';

interface User {
  id: string;
  full_name: string;
  email: string;
  cnic_number: string;
  role: 'buyer' | 'seller';
  store_name?: string;
  store_address?: string;
  pickup_address?: string;
  phone_number?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(staticUser);
  const isLoading = false;

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
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
