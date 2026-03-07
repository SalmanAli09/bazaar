"use client";
import { useRouter } from "next/navigation";
import { Star, CheckCircle, List, ShoppingCart, Trophy, MessageCircle } from "lucide-react";

interface SellerInfoProps {
  name: string;
  initials: string;
  rating: number;
  reviews: number;
  listings: number;
  sales: number;
  sellerId?: string; // Add sellerId for navigation
}

export default function SellerInfo({
  name,
  initials,
  rating,
  reviews,
  listings,
  sales,
  sellerId,
}: SellerInfoProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4" />
      );
    }

    return stars;
  };
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold border-2 border-white dark:border-slate-800 shadow-sm">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h4 
                onClick={() => sellerId && router.push(`/profile/${sellerId}`)} 
                className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-primary transition-colors"
              >
                {name}
              </h4>
              <CheckCircle className="w-[18px] h-[18px] text-emerald-500 fill-current" />
            </div>
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {renderStars(rating)}
              </div>
              <span className="text-xs text-slate-400">({reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 text-center">
          <List className="w-5 h-5 text-slate-400 mb-1 mx-auto" />
          <div className="text-sm font-bold">{listings}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Listings</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 text-center">
          <ShoppingCart className="w-5 h-5 text-slate-400 mb-1 mx-auto" />
          <div className="text-sm font-bold">{sales}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Sales</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 text-center">
          <Trophy className="w-5 h-5 text-slate-400 mb-1 mx-auto" />
          <div className="text-sm font-bold">{rating}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Rating</div>
        </div>
      </div>
      <button className="w-full py-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 text-slate-900 dark:text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-800">
        <MessageCircle className="w-5 h-5" />
        Chat with Seller
      </button>
    </div>
  );
}
