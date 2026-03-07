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

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  ad_title: string;
  city: string;
  condition: string;
  description: string;
  product_pictures: string[];
  selling_price: number;
  original_price: number;
  negotiable_price: boolean;
  featured: boolean;
  urgent: boolean;
  is_draft: boolean;
  is_published: boolean;
  is_sold: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithSeller extends Product {
  seller: {
    id: string;
    full_name: string;
    email: string;
    store_name?: string;
    phone_number?: string;
    is_verified: boolean;
  };
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

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Product;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
}

export async function getProductByIdWithSeller(id: string): Promise<ProductWithSeller | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller:users(
          id,
          full_name,
          email,
          store_name,
          phone_number,
          is_verified
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return data as ProductWithSeller;
  } catch (error) {
    console.error('Error fetching product with seller by id:', error);
    return null;
  }
}

export async function createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return null;
    }

    return data as Product;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by seller:', error);
      return [];
    }

    return data as Product[];
  } catch (error) {
    console.error('Error fetching products by seller:', error);
    return [];
  }
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  bg_color?: string;
  text_color?: string;
  created_at: string;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getSellerStats(sellerId: string): Promise<{
  listings: number;
  sales: number;
  rating: number;
  reviews: number;
}> {
  try {
    // Get total listings
    const { count: listings, error: listingsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('seller_id', sellerId)
      .eq('is_published', true);

    // Get total sales (sold products)
    const { count: sales, error: salesError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('seller_id', sellerId)
      .eq('is_sold', true);

    // Get reviews and calculate rating
    const { data: reviews, error: reviewsError } = await supabase
      .from('product_reviews')
      .select('rating')
      .eq('seller_id', sellerId);

    const totalReviews = reviews?.length || 0;
    const avgRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    return {
      listings: listings || 0,
      sales: sales || 0,
      rating: Number(avgRating.toFixed(1)),
      reviews: totalReviews
    };
  } catch (error) {
    console.error('Error fetching seller stats:', error);
    return {
      listings: 0,
      sales: 0,
      rating: 0,
      reviews: 0
    };
  }
}
