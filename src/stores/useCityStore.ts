"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CityState {
  selectedCity: string;
  setCity: (city: string) => void;
}

export const useCityStore = create<CityState>()(
  persist(
    (set) => ({
      selectedCity: "all",
      setCity: (city) => set({ selectedCity: city }),
    }),
    { name: "bazaar-city" }
  )
);
