"use client";

import { create } from "zustand";
import { BuyRequest } from "@/types";
import { buyRequests as requests } from "@/data/requests";

interface RequestState {
  requests: BuyRequest[];
  addRequest: (request: Omit<BuyRequest, "id" | "createdAt" | "responses">) => void;
  incrementResponse: (requestId: string) => void;
}

export const useRequestStore = create<RequestState>()((set) => ({
  requests: requests,

  addRequest: (request) =>
    set((state) => ({
      requests: [
        {
          ...request,
          id: `r-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: new Date().toISOString(),
          responses: 0,
        },
        ...state.requests,
      ],
    })),

  incrementResponse: (requestId) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === requestId ? { ...r, responses: r.responses + 1 } : r
      ),
    })),
}));
