'use client';

import Link from 'next/link';
import { ArrowRight, Heart, MapPin, Loader2, Sparkles } from 'lucide-react';
import { Product } from '@/lib/supabase-database';

interface LatestArrivalsProps {
  products: Product[];
  loading?: boolean;
}

export default function LatestArrivals({ products, loading = false }: LatestArrivalsProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Like New':
      case 'Brand New':
        return 'bg-emerald-500 text-white';
      case 'Used':
      case 'Gently Used':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Arrivals</h2>
              <p className="text-slate-500">Recently added treasures just for you</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 h-full">
                  <div className="aspect-square bg-slate-200 dark:bg-slate-700" />
                  <div className="p-6">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-3/4" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Latest Arrivals</h2>
            <p className="text-slate-500 mb-8">No products available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Arrivals</h2>
            <p className="text-slate-500">Recently added treasures just for you</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all cursor-pointer h-full">
                <div className="relative aspect-square overflow-hidden">
                  {product.product_pictures && product.product_pictures.length > 0 ? (
                    <img
                      alt={product.ad_title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={product.product_pictures[0]}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600" />
                  )}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.featured && (
                      <span className="flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold rounded-full uppercase">
                        <Sparkles size={12} fill="currentColor" /> Featured
                      </span>
                    )}
                    {product.urgent && (
                      <span className="bg-orange-500 text-white text-[10px] font-bold rounded-full uppercase">
                        Urgent
                      </span>
                    )}
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-1 ${getConditionColor(product.condition)} text-[10px] font-bold rounded-full uppercase`}>
                      {product.condition}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1 truncate">{product.ad_title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-extrabold text-xl">{formatPrice(product.selling_price)}</span>
                    {product.original_price && product.original_price > 0 && (
                      <span className="text-slate-400 line-through text-sm">{formatPrice(product.original_price)}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {product.city}
                    </div>
                    <span>{getTimeAgo(product.created_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div> 
      </div>
    </section>
  );
}
