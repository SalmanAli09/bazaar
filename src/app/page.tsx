import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import RequestSection from '@/components/RequestSection';
import LatestArrivals from '@/components/LatestArrivals';
import products from '../../data/products';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Hero />
      <Categories />
      <RequestSection />
      <LatestArrivals products={products} />
    </div>
  );
}
