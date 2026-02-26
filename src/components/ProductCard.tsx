import React from 'react';
import { Heart, MapPin, Sparkles } from 'lucide-react';

interface ProductProps {
  title: string;
  price: string;
  originalPrice?: string;
  location: string;
  time: string;
  tag?: string;      // e.g., "Like New", "Used"
  discount?: string; // e.g., "-50%"
  featured?: boolean;
  urgent?: boolean;
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  location,
  time,
  tag,
  discount,
  featured,
  urgent,
}: ProductProps) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
        {/* Placeholder for Next.js Image Component */}
        <div className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600" />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {featured && (
            <div className="flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
              <Sparkles size={12} fill="currentColor" /> Featured
            </div>
          )}
          {discount && (
            <div className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
              {discount}
            </div>
          )}
          {urgent && (
            <div className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
              Urgent
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors">
          <Heart size={18} />
        </button>

        {/* Condition Tag */}
        {tag && (
          <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
            {tag}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 truncate group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
            Rs. {price}
          </span>
          {originalPrice && (
            <span className="text-slate-400 text-sm line-through">
              Rs. {originalPrice}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-slate-400 text-xs">
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-slate-300" /> {location}
          </span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}