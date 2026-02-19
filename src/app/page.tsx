import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import RequestSection from '@/components/RequestSection';
import LatestArrivals from '@/components/LatestArrivals';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Categories />
      <RequestSection />
      <LatestArrivals />
      <Footer />
    </div>
  );
}
