'use client';

import { useState } from 'react';
import { Sparkles, Crown, Zap } from 'lucide-react';

interface FormData {
  featured: boolean;
  urgent: boolean;
}

interface BoostListingProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function BoostListing({ formData, updateFormData }: BoostListingProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        Boost Your Listing
      </h2>
      <div className="space-y-3">
        <label className="flex items-center p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 cursor-pointer hover:border-primary transition-all">
          <div className="flex-1 flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Featured Listing</h4>
              <p className="text-xs text-slate-500">Ad appears at top of category for 7 days.</p>
              <p className="text-sm font-bold text-primary mt-1">Rs. 150</p>
            </div>
          </div>
          <input
            checked={formData.featured}
            onChange={(e) => updateFormData({ featured: e.target.checked })}
            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
            type="checkbox"
          />
        </label>
        
        <label className="flex items-center p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 cursor-pointer hover:border-primary transition-all">
          <div className="flex-1 flex items-start gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Urgent Ad</h4>
              <p className="text-xs text-slate-500">Highlighted label to attract quick buyers.</p>
              <p className="text-sm font-bold text-primary mt-1">Rs. 200</p>
            </div>
          </div>
          <input
            checked={formData.urgent}
            onChange={(e) => updateFormData({ urgent: e.target.checked })}
            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
            type="checkbox"
          />
        </label>
      </div>
    </div>
  );
}
