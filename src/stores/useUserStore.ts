"use client";

import { create } from "zustand";
import { User } from "@/types";
import { users } from "@/data/users";

interface UserState {
  currentUser: User | null;
  purchases: string[];
  addPurchase: (productId: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  currentUser: users[0] ?? null,
  purchases: [],

  addPurchase: (productId) =>
    set((state) => ({
      purchases: [...state.purchases, productId],
    })),
}));
