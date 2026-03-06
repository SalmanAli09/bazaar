"use client";

import React from 'react';
import { 
  X, 
  Banknote, 
  SquareStack, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  Camera, 
  Image as ImageIcon,
  Send,
  Minimize2
} from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: any;
}

export default function OfferModal({ isOpen, onClose, requestData }: OfferModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative max-w-[850px] w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Send an Offer</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Respond to the customer's request with your best match.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Summary Section */}
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Customer Request Summary</h3>
            <div className="bg-[#f6f8f6] dark:bg-slate-800/40 rounded-3xl p-6 flex flex-col md:flex-row gap-6 border border-[#11d421]/10">
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-[#11d421] uppercase tracking-wider bg-[#11d421]/10 px-2 py-0.5 rounded">Requested Item</span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">{requestData?.title || "Vintage 90s Denim Jacket"}</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Banknote size={18} className="text-[#11d421]" />
                    <span className="text-sm font-medium">Budget: <span className="font-bold text-slate-900 dark:text-white">{requestData?.budget || "$40 - $60"}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Minimize2 size={18} className="text-[#11d421]" />
                    <span className="text-sm font-medium">Size: <span className="font-bold text-slate-900 dark:text-white">Large</span></span>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-bold text-[#11d421] hover:text-[#0fa31a] transition-colors group">
                  View Original Request 
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <div 
                className="w-full md:w-32 h-32 rounded-2xl bg-center bg-cover border border-slate-200 dark:border-slate-700 shadow-inner shrink-0" 
                style={{ backgroundImage: `url(${requestData?.image || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=200&auto=format&fit=crop'})` }}
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Item Selection */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Select from My Listings</span>
                  <p className="text-xs text-slate-500 font-medium mb-3 mt-1">Pick an active item to link to this offer</p>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-[#11d421] text-sm font-medium dark:text-white transition-all" 
                      placeholder="Search your inventory..." 
                      type="text"
                    />
                  </div>
                </label>
                
                {/* Selected Item Preview */}
                <div className="border-2 border-[#11d421] bg-[#11d421]/5 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                  <div className="w-14 h-14 bg-slate-200 rounded-xl bg-cover bg-center border border-white dark:border-slate-700 shadow-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=150&auto=format&fit=crop')" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Classic Levi's Denim Jacket</p>
                    <p className="text-xs text-[#11d421] font-bold mt-0.5">In stock • $45.00</p>
                  </div>
                  <ChevronDown className="text-slate-400" size={20} />
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                <span className="flex-shrink mx-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">OR</span>
                <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
              </div>

              {/* Upload Section */}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Upload Fresh Photos</span>
                  <p className="text-xs text-slate-500 font-medium mb-3 mt-1">Upload photos directly if the item isn't listed yet</p>
                  <div className="group border-2 border-slate-200 dark:border-slate-700 border-dashed rounded-[2rem] p-8 hover:border-[#11d421]/50 hover:bg-[#11d421]/5 transition-all cursor-pointer text-center bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Camera className="text-[#11d421]" size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Click or drag images to upload</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">PNG, JPG up to 10MB</p>
                  </div>
                </label>
                
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300">
                      <ImageIcon size={20} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Message */}
            <div className="lg:col-span-5 space-y-8">
              <label className="block">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Your Offer Price</span>
                <div className="relative mt-3">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 font-bold">$</div>
                  <input 
                    className="block w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-[#11d421] text-lg font-black dark:text-white transition-all shadow-sm" 
                    placeholder="0.00" 
                    type="number" 
                    defaultValue="45.00"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Message to Buyer</span>
                <textarea 
                  className="mt-3 block w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-[#11d421] text-sm font-medium dark:text-white transition-all min-h-[220px] resize-none" 
                  placeholder="Tell the buyer why this item is a great match..."
                />
                <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                  Tip: Briefly describe the condition, features, and how fast you can ship.
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel Offer
          </button>
          <button className="px-10 py-4 text-sm font-black text-white bg-[#11d421] hover:bg-[#0fa31a] rounded-2xl shadow-xl shadow-[#11d421]/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
            <Send size={18} fill="currentColor" />
            Send Offer Now
          </button>
        </div>
      </div>
    </div>
  );
}