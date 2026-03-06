"use client";

import { useRouter } from "next/navigation";
import { Plus } from 'lucide-react';

 

export default function RequestSection() {
  const router = useRouter();
  return (
    <section className="py-12 bg-emerald-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl shadow-emerald-500/10 border border-emerald-100 dark:border-slate-700">
          <div className="lg:max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6">
              New Feature
            </span>
            <h2 className="text-4xl font-extrabold mb-6">Can't find what you're looking for?</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
              Post a "Request" and let our community of sellers find it for you. From vintage collectibles to specific tech, someone might have exactly what you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => router.push('/requests')} className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" /> Post a Request
              </button>
              <button onClick={() => router.push('/buyers/request')} className="px-8 py-4 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
                View All Requests
              </button>
            </div>
          </div>
          <div className="relative w-full lg:w-1/3">
            <div className="relative z-10 p-6 bg-white dark:bg-slate-700 rounded-3xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform border border-slate-100 dark:border-slate-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-24 h-3 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-16 h-2 bg-slate-100 rounded animate-pulse"></div>
                </div>
              </div>
              <p className="text-slate-800 dark:text-white font-bold text-lg mb-3">
                Looking for: Vintage 90s Polaroid Camera
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-bold">
                  Willing to pay: Rs. 5,000
                </span>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-full h-full bg-primary/20 rounded-[2.5rem] -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
