import { supabase } from './supabase';

export interface User {
  id: string;
  full_name: string;
  email: string;
  password: string;
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

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return null;
    }

    return data as User;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

export async function createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    return data as User;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }

    return data as User;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}
