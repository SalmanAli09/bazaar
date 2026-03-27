'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import RequestSection from '@/components/RequestSection';
import LatestArrivals from '@/components/LatestArrivals';
import { Product } from '@/lib/static-data';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?limit=8')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Hero />
      <Categories />
      <RequestSection />
      <LatestArrivals products={products} loading={loading} />
    </div>
  );
}
