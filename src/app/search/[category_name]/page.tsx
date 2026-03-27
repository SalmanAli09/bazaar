'use client';

import { use, useEffect, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/static-data';

interface PageProps {
  params: Promise<{ category_name: string }>;
}

function getConditionLabel(condition: string) {
  switch (condition) {
    case 'new': return 'Brand New';
    case 'like_new': return 'Like New';
    case 'refurbished': return 'Refurbished';
    default: return condition;
  }
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            <div className="flex justify-between pt-3 border-t border-slate-50 dark:border-slate-700">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchResults({ params }: PageProps) {
  const { category_name } = use(params);
  const categoryName = decodeURIComponent(category_name);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // First resolve category name to ID, then fetch products
  useEffect(() => {
    async function fetchData() {
      try {
        // Get all categories to find the matching one
        const catRes = await fetch('/api/categories');
        const catData = await catRes.json();
        const categories = catData.categories || [];
        const matched = categories.find(
          (c: { name: string }) => c.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (matched) {
          const prodRes = await fetch(`/api/products?category=${matched.category_id}`);
          const prodData = await prodRes.json();
          setProducts(prodData.products || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <nav className="flex text-sm text-slate-500 mb-2 items-center gap-2">
            <a href="/" className="hover:text-[#0FB478]">Home</a>
            <ChevronRight size={14} />
            <span className="text-slate-900 dark:text-slate-300 font-medium">{categoryName}</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-baseline gap-3">
            {categoryName}
            {!loading && (
              <span className="text-sm font-normal text-slate-500">
                ({products.length} item{products.length !== 1 ? 's' : ''} found)
              </span>
            )}
          </h1>
        </div>

        {/* Products */}
        {loading ? (
          <ProductsSkeleton />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
              No products found in {categoryName}
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Check back soon — new items are added daily!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.ad_title}
                price={p.selling_price.toLocaleString()}
                originalPrice={p.original_price ? p.original_price.toLocaleString() : undefined}
                location={p.city}
                time={getTimeAgo(p.created_at)}
                tag={getConditionLabel(p.condition)}
                featured={p.featured}
                urgent={p.urgent}
                images={p.product_pictures}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
