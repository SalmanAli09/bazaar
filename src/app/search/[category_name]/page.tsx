 
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function SearchResults() {
  const products = [
    { id: "search-1", title: "Wedding Sherwani - Maroon Embroidered", price: "12,000", originalPrice: "35,000", location: "Islamabad", time: "6d ago", tag: "Like New", featured: true },
    { id: "search-2", title: "Gently Used Khaadi Lawn Suit", price: "2,500", originalPrice: "5,800", location: "Karachi", time: "1w ago", tag: "Like New", featured: true },
    { id: "search-3", title: "Men's Shalwar Kameez - White Cotton", price: "1,800", originalPrice: "3,200", location: "Lahore", time: "1w ago", tag: "New" },
  ];

  const subCategories = ["Ethnic Wear", "Western", "Footwear", "Outerwear", "Accessories"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumb & Header */}
            <div className="mb-6">
              <nav className="flex text-sm text-slate-500 mb-2 items-center gap-2">
                <a href="/" className="hover:text-[#0FB478]">Home</a>
                <ChevronRight size={14} />
                <span className="text-slate-900 dark:text-slate-300 font-medium">Clothing</span>
              </nav>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-baseline gap-3">
                Clothing
                <span className="text-sm font-normal text-slate-500">(3,420 items found)</span>
              </h1>
            </div>

            {/* Sub-category pills */}
            <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
              {subCategories.map((cat) => (
                <button key={cat} className="flex-shrink-0 px-6 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-[#0FB478] hover:text-[#0FB478] transition-all font-medium text-sm dark:text-slate-200">
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-xl shadow-sm -space-x-px overflow-hidden border border-slate-200 dark:border-slate-700">
                <PaginationButton icon={<ChevronLeft size={18} />} />
                <PaginationButton label="1" active />
                <PaginationButton label="2" />
                <PaginationButton label="3" />
                <span className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-400">...</span>
                <PaginationButton icon={<ChevronRight size={18} />} />
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PaginationButton({ label, icon, active }: { label?: string; icon?: React.ReactNode; active?: boolean }) {
  return (
    <button className={`px-4 py-2 text-sm font-medium transition-colors ${
      active 
      ? "bg-[#0FB478]/10 text-[#0FB478] border-y border-[#0FB478]" 
      : "bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-slate-400"
    }`}>
      {label || icon}
    </button>
  );
}