"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  Plus,
  X,
  ShieldCheck,
  Share2,
  MessageSquare,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";
 

export default function RequestItemPage() {
  const [condition, setCondition] = useState("New with Tags");

  const conditions = [
    "New with Tags",
    "Like New",
    "Good Used",
    "Any Condition",
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102212] transition-colors duration-300">
   

      {/* Hero Section */}
      <section className="w-full bg-[#11d421]/10 dark:bg-[#11d421]/5 py-16 px-6 border-b border-[#11d421]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Post a request and let our community of sellers find it for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Form Fields */}
            <div className="flex-1 space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Request Details
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Help sellers understand exactly what's missing from your
                  collection.
                </p>
              </div>

              {/* Item Title */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  What are you looking for?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vintage 90s Levi's Denim Jacket"
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-[#11d421] focus:border-transparent h-14 px-5 dark:text-white transition-all outline-none"
                />
              </div>

              {/* Category & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <div className="relative">
                    <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-[#11d421] h-14 px-5 appearance-none dark:text-white outline-none">
                      <option>Select a category</option>
                      <option>Men's Clothing</option>
                      <option>Women's Clothing</option>
                      <option>Accessories</option>
                      <option>Footwear</option>
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Budget Range (PKR)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-[#11d421] h-14 px-5 dark:text-white outline-none"
                    />
                    <span className="text-slate-300 font-bold">—</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-[#11d421] h-14 px-5 dark:text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Condition Select */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Preferred Condition
                </label>
                <div className="flex flex-wrap gap-3">
                  {conditions.map((item) => (
                    <button
                      key={item}
                      onClick={() => setCondition(item)}
                      className={`px-5 py-2.5 rounded-full border text-sm font-bold transition-all ${
                        condition === item
                          ? "border-[#11d421] bg-[#11d421]/10 text-[#11d421]"
                          : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-[#11d421]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details Textarea */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Details & Requirements
                </label>
                <textarea
                  rows={5}
                  placeholder="Mention size, color preference, or any specific flaws to avoid..."
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-[#11d421] p-5 dark:text-white outline-none resize-none"
                />
              </div>
            </div>

            {/* Right: Upload Area */}
            <div className="w-full lg:w-80 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Reference Photos
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Upload images of similar items so sellers know exactly what
                  you're looking for.
                </p>
              </div>

              <div className="aspect-square border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[#11d421]/10 flex items-center justify-center text-[#11d421] mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud size={28} />
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Upload Reference
                </p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">
                  PNG, JPG up to 10MB
                </p>
              </div>

              {/* Uploaded Previews */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden relative group border border-slate-100 dark:border-slate-800">
                  <img
                    alt="Preview"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop"
                  />
                  <button className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
                <button className="aspect-square border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-300 hover:text-[#11d421] hover:border-[#11d421] transition-all">
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
              <ShieldCheck className="text-[#11d421]" size={20} />
              <span>Broadcast visible to vetted sellers for 30 days.</span>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-8 py-4 font-bold text-slate-500 hover:text-slate-900 transition-colors">
                Cancel
              </button>
              <button className="flex-1 md:flex-none px-12 py-4 bg-[#11d421] text-white font-extrabold rounded-xl shadow-xl shadow-[#11d421]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Post Request
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureItem
            icon={<Share2 size={32} />}
            title="Reach 500+ Sellers"
            desc="Your request is broadcasted to our network of professional vintage curators and thrift experts."
          />
          <FeatureItem
            icon={<MessageSquare size={32} />}
            title="Direct Offers"
            desc="Sellers will message you with pictures and prices for items they have that match your request."
          />
          <FeatureItem
            icon={<ShieldAlert size={32} />}
            title="Secure Buy"
            desc="Once you find the perfect item, complete the purchase through Bazaar's protected checkout."
          />
        </div>
      </main> 
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center md:text-left">
      <div className="text-[#11d421] mb-5 flex justify-center md:justify-start">
        {icon}
      </div>
      <h4 className="font-extrabold text-xl text-slate-900 dark:text-white mb-3">
        {title}
      </h4>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}
