"use client";

import { create } from "zustand";
import { Product } from "@/types";
import { useProductStore } from "@/stores/useProductStore";

interface CartState {
  selectedProduct: Product | null;
  isCheckoutOpen: boolean;
  isPurchaseComplete: boolean;
  openCheckout: (product: Product) => void;
  closeCheckout: () => void;
  confirmPurchase: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  selectedProduct: null,
  isCheckoutOpen: false,
  isPurchaseComplete: false,

  openCheckout: (product) =>
    set({
      selectedProduct: product,
      isCheckoutOpen: true,
      isPurchaseComplete: false,
    }),

  closeCheckout: () =>
    set({
      selectedProduct: null,
      isCheckoutOpen: false,
      isPurchaseComplete: false,
    }),

  confirmPurchase: () => {
    const { selectedProduct } = get();
    if (selectedProduct) {
      useProductStore.getState().markAsSold(selectedProduct.id);
      set({ isPurchaseComplete: true });
    }
  },
}));
