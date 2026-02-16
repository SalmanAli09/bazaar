export type ProductCondition = "new" | "like-new" | "good" | "fair";
export type ListingStatus = "active" | "sold" | "reserved";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: ProductCondition;
  categorySlug: string;
  city: string;
  images: string[];
  sellerId: string;
  status: ListingStatus;
  isFeatured: boolean;
  isUrgent: boolean;
  createdAt: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  productCount: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  city: string;
  joinedAt: string;
  rating: number;
  reviewCount: number;
  listingsCount: number;
  salesCount: number;
  isVerified: boolean;
  phone?: string;
}

export interface BuyRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  budgetMin: number;
  budgetMax: number;
  city: string;
  createdAt: string;
  responses: number;
}

export interface Review {
  id: string;
  reviewerId: string;
  sellerId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface City {
  value: string;
  label: string;
}
