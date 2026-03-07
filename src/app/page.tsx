'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import RequestSection from '@/components/RequestSection';
import LatestArrivals from '@/components/LatestArrivals';
import { getProducts, Product } from '@/lib/supabase-database';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        // Filter for published and not sold products
        const availableProducts = allProducts.filter(product => product.is_published && !product.is_sold);
        setProducts(availableProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Hero />
      <Categories />
      <RequestSection />
      <LatestArrivals products={products} loading={loading} />
    </div>
  );
}
