'use client';

import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import RequestSection from '@/components/RequestSection';
import LatestArrivals from '@/components/LatestArrivals';
import { staticProducts } from '@/lib/static-data';

export default function Home() {
  const products = staticProducts.filter(product => product.is_published && !product.is_sold);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Hero />
      <Categories />
      <RequestSection />
      <LatestArrivals products={products} loading={false} />
    </div>
  );
}
