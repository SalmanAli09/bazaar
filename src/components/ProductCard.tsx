"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, MapPin, Sparkles } from 'lucide-react';

interface ProductProps {
  product_id: string;
  product_name: string;
  product_description: string;
  product_actual_price: number;
  product_selling_price: number;
  is_negotiable: boolean;
  is_urgent: boolean;
  is_featured: boolean;
  is_draft: boolean;
  is_published: boolean;
  is_sold: boolean;
  category: string;
  images: string[];
  seller: {
    seller_id: string;
    store_name: string;
    full_name: string;
    city: string;
    country: string;
    rating: number;
    is_verified: boolean;
  };
}

export default function ProductCard(product: ProductProps) {
  const discount = product.product_actual_price > product.product_selling_price 
    ? Math.round(((product.product_actual_price - product.product_selling_price) / product.product_actual_price) * 100)
    : 0;

  const getStatusBadge = () => {
    if (product.is_sold) return { text: 'Sold', color: 'bg-slate-500' };
    if (product.is_draft) return { text: 'Draft', color: 'bg-orange-500' };
    if (product.is_urgent) return { text: 'Urgent', color: 'bg-red-500' };
    if (product.is_featured) return { text: 'Featured', color: 'bg-blue-500' };
    return { text: 'Available', color: 'bg-emerald-500' };
  };

  const statusBadge = getStatusBadge();

  return (
    <Link href={`/product/${product.product_id}`} className="block">
      <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.is_featured && (
              <div className="flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                <Sparkles size={12} fill="currentColor" /> Featured
              </div>
            )}
            {discount > 0 && (
              <div className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                {discount}% OFF
              </div>
            )}
            {product.is_negotiable && (
              <div className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                Negotiable
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <button 
            className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Handle favorite logic here
            }}
          >
            <Heart size={18} />
          </button>

          {/* Status Badge */}
          <div className={`absolute bottom-3 right-3 ${statusBadge.color} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md`}>
            {statusBadge.text}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 truncate group-hover:text-emerald-600 transition-colors">
            {product.product_name}
          </h3>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
              ${product.product_selling_price.toFixed(2)}
            </span>
            {product.product_actual_price > product.product_selling_price && (
              <span className="text-slate-400 text-sm line-through">
                ${product.product_actual_price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-auto pt-3 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-slate-300" /> {product.seller.city}
            </span>
            <span>{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}