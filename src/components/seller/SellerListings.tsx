'use client';

import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/static-data';

interface SellerListingsProps {
  sellerId: string;
}

function ListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-pulse">
          <div className="aspect-square bg-slate-200 dark:bg-slate-700" />
          <div className="p-6 space-y-3">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            <div className="flex justify-between">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SellerListings({ sellerId }: SellerListingsProps) {
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?seller_id=${sellerId}`)
      .then(res => res.json())
      .then(data => setListings(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sellerId]);

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
    return <ListingsSkeleton />;
  }

  return (
    <div>
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
            No active listings found
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
            This seller hasn&apos;t posted any active listings yet.
          </p>
        </div>
      )}
    </div>
  );
}
