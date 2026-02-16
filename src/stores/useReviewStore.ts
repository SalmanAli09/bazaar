"use client";

import { create } from "zustand";
import { Review } from "@/types";
import { reviews } from "@/data/reviews";

interface ReviewState {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "createdAt">) => void;
  getReviewsForSeller: (sellerId: string) => Review[];
  getAverageRating: (sellerId: string) => number;
}

export const useReviewStore = create<ReviewState>()((set, get) => ({
  reviews: reviews,

  addReview: (review) =>
    set((state) => ({
      reviews: [
        {
          ...review,
          id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: new Date().toISOString(),
        },
        ...state.reviews,
      ],
    })),

  getReviewsForSeller: (sellerId) => {
    return get().reviews.filter((r) => r.sellerId === sellerId);
  },

  getAverageRating: (sellerId) => {
    const sellerReviews = get().reviews.filter((r) => r.sellerId === sellerId);
    if (sellerReviews.length === 0) return 0;
    const total = sellerReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / sellerReviews.length;
  },
}));
