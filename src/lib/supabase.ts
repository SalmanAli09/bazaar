import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on our schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string
          email: string
          password_hash: string
          full_name: string
          phone_number: string | null
          role: 'buyer' | 'seller' | 'admin'
          city: string | null
          country: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id?: string
          email: string
          password_hash: string
          full_name: string
          phone_number?: string | null
          role?: 'buyer' | 'seller' | 'admin'
          city?: string | null
          country?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          email?: string
          password_hash?: string
          full_name?: string
          phone_number?: string | null
          role?: 'buyer' | 'seller' | 'admin'
          city?: string | null
          country?: string | null
          is_active?: boolean
          updated_at?: string
        }
      }
      sellers: {
        Row: {
          seller_id: string
          user_id: string
          store_name: string
          store_banner_image: string | null
          pickup_address: string | null
          city: string | null
          country: string | null
          rating: number
          review_count: number
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          seller_id?: string
          user_id: string
          store_name: string
          store_banner_image?: string | null
          pickup_address?: string | null
          city?: string | null
          country?: string | null
          rating?: number
          review_count?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          seller_id?: string
          user_id?: string
          store_name?: string
          store_banner_image?: string | null
          pickup_address?: string | null
          city?: string | null
          country?: string | null
          rating?: number
          review_count?: number
          is_verified?: boolean
          updated_at?: string
        }
      }
      categories: {
        Row: {
          category_id: string
          name: string
          icon_name: string | null
          bg_color: string | null
          text_color: string | null
          item_count: number
          created_at: string
        }
        Insert: {
          category_id?: string
          name: string
          icon_name?: string | null
          bg_color?: string | null
          text_color?: string | null
          item_count?: number
          created_at?: string
        }
        Update: {
          category_id?: string
          name?: string
          icon_name?: string | null
          bg_color?: string | null
          text_color?: string | null
          item_count?: number
        }
      }
      products: {
        Row: {
          product_id: string
          seller_id: string
          category_id: string
          product_name: string
          product_description: string | null
          product_actual_price: number
          product_selling_price: number
          condition: 'new' | 'like_new' | 'used_good' | 'used_fair' | 'refurbished'
          is_negotiable: boolean
          is_urgent: boolean
          is_featured: boolean
          is_draft: boolean
          is_published: boolean
          is_sold: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          product_id?: string
          seller_id: string
          category_id: string
          product_name: string
          product_description?: string | null
          product_actual_price: number
          product_selling_price: number
          condition?: 'new' | 'like_new' | 'used_good' | 'used_fair' | 'refurbished'
          is_negotiable?: boolean
          is_urgent?: boolean
          is_featured?: boolean
          is_draft?: boolean
          is_published?: boolean
          is_sold?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          product_id?: string
          seller_id?: string
          category_id?: string
          product_name?: string
          product_description?: string | null
          product_actual_price?: number
          product_selling_price?: number
          condition?: 'new' | 'like_new' | 'used_good' | 'used_fair' | 'refurbished'
          is_negotiable?: boolean
          is_urgent?: boolean
          is_featured?: boolean
          is_draft?: boolean
          is_published?: boolean
          is_sold?: boolean
          updated_at?: string
        }
      }
    }
  }
}
