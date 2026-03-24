"use client";
import { SlidersHorizontal, ChevronUp, ChevronDown, X } from 'lucide-react';

export default function FilterSidebar() {
  return (
    <div className="sticky top-24 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
          <SlidersHorizontal size={18} className="text-[var(--primary-dark)]" />
          Filters
        </h2>
      </div>

      {/* Sort Section */}
      <FilterSection title="Sort By">
        <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm p-3 focus:ring-2 focus:ring-[#0FB478] outline-none dark:text-slate-200">
          <option>Newest First</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range (PKR)">
        <div className="space-y-4">
          <div className="relative h-1 bg-slate-200 dark:bg-slate-700 rounded-full">
            <div className="absolute left-[20%] right-[30%] h-full bg-[var(--primary-dark)]" />
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[var(--primary-dark)] rounded-full cursor-pointer" />
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[var(--primary-dark)] rounded-full cursor-pointer" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" placeholder="Min" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-3 py-2 dark:text-white" />
            <input type="number" placeholder="Max" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-3 py-2 dark:text-white" />
          </div>
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Condition">
        <div className="flex flex-wrap gap-2">
          {["New", "Like New", "Good", "Fair"].map((c) => (
            <button key={c} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              c === "New" 
              ? "bg-[var(--primary-dark)] text-white" 
              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-[#0FB478] hover:text-[#0FB478]"
            }`}>
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      <button className="w-full flex items-center justify-center py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-2">
        <X size={16} />
        Clear All Filters
      </button>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
      <div className="flex items-center justify-between w-full text-sm font-bold mb-4 dark:text-slate-200">
        <span>{title}</span>
        <ChevronUp size={16} className="text-slate-400" />
      </div>
      {children}
    </div>
  );
}