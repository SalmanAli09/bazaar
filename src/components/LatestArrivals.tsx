"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
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

export default function LatestArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await import('../../data/product_listing.json');
        setProducts(productData.default);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    
    loadProducts();
  }, []);

  const getConditionColor = (product: Product) => {
    if (product.is_sold) return 'bg-slate-500 text-white';
    if (product.is_draft) return 'bg-orange-500 text-white';
    if (product.is_urgent) return 'bg-red-500 text-white';
    if (product.is_featured) return 'bg-blue-500 text-white';
    return 'bg-emerald-500 text-white';
  };

  const getConditionText = (product: Product) => {
    if (product.is_sold) return 'Sold';
    if (product.is_draft) return 'Draft';
    if (product.is_urgent) return 'Urgent';
    if (product.is_featured) return 'Featured';
    return 'Available';
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Arrivals</h2>
            <p className="text-slate-500">Recently added treasures just for you</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.product_id} href={`/product/${product.product_id}`}>
              <div className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all cursor-pointer h-full">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    alt={product.product_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={product.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'}
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.product_actual_price > product.product_selling_price && (
                      <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase">
                        {Math.round(((product.product_actual_price - product.product_selling_price) / product.product_actual_price) * 100)}% OFF
                      </span>
                    )}
                    {product.is_negotiable && (
                      <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase">
                        Negotiable
                      </span>
                    )}
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-1 ${getConditionColor(product)} text-[10px] font-bold rounded-full uppercase`}>
                      {getConditionText(product)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1 truncate">{product.product_name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-extrabold text-xl">${product.product_selling_price.toFixed(2)}</span>
                    {product.product_actual_price > product.product_selling_price && (
                      <span className="text-slate-400 line-through text-sm">${product.product_actual_price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span> {product.seller.city}
                    </div>
                    <span>{product.category}</span>
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
