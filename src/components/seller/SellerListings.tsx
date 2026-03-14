'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { staticProducts } from '@/lib/static-data';

interface SellerListingsProps {
  sellerId: string;
}

export default function SellerListings({ sellerId }: SellerListingsProps) {
  const [statusFilter, setStatusFilter] = useState<'published' | 'sold' | 'all'>('published');

  const allListings = staticProducts.filter(p => p.seller_id === sellerId);
  const listings = statusFilter === 'all'
    ? allListings
    : statusFilter === 'published'
      ? allListings.filter(p => p.is_published && !p.is_sold)
      : allListings.filter(p => p.is_sold);

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

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              statusFilter === 'published'
                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Active ({allListings.filter(p => p.is_published && !p.is_sold).length})
          </button>
          <button
            onClick={() => setStatusFilter('sold')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              statusFilter === 'sold'
                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Sold
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.ad_title}
              price={formatPrice(product.selling_price)}
              originalPrice={product.original_price ? formatPrice(product.original_price) : undefined}
              location={product.city}
              time={getTimeAgo(product.created_at)}
              tag={product.condition}
              featured={product.featured}
              urgent={product.urgent}
              images={product.product_pictures}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            No {statusFilter === 'published' ? 'active' : statusFilter} listings found
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
            This seller hasn't posted any {statusFilter === 'published' ? 'active' : statusFilter} listings yet.
          </p>
        </div>
      )}
    </div>
  );
}
