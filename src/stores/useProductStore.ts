"use client";

import { create } from "zustand";
import { Product } from "@/types";
import { products } from "@/data/products";

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt" | "status">) => void;
  markAsSold: (productId: string) => void;
  getFiltered: (city: string, category?: string) => Product[];
}

export const useProductStore = create<ProductState>()((set, get) => ({
  products: products,

  addProduct: (product) =>
    set((state) => ({
      products: [
        {
          ...product,
          id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          status: "active" as const,
          createdAt: new Date().toISOString(),
        },
        ...state.products,
      ],
    })),

  markAsSold: (productId) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, status: "sold" as const } : p
      ),
    })),

  getFiltered: (city, category) => {
    const { products } = get();
    return products.filter((p) => {
      if (p.status !== "active") return false;
      if (city !== "all" && p.city !== city) return false;
      if (category && p.categorySlug !== category) return false;
      return true;
    });
  },
}));
