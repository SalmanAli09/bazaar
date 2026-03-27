'use client';

import { CreditCard } from 'lucide-react';

interface FormData {
  selling_price: string;
  original_price: string;
  negotiable_price: boolean;
}

interface PricingProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Pricing({ formData, updateFormData }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[var(--primary-dark)]" />
          Pricing
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500">Negotiable</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              checked={formData.negotiable_price}
              onChange={(e) => updateFormData({ negotiable_price: e.target.checked })}
              className="sr-only peer"
              type="checkbox"
            />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-dark)]"></div>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Selling Price (PKR) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 font-medium">
              Rs.
            </span>
            <input
              className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="0"
              type="number"
              value={formData.selling_price}
              onChange={(e) => updateFormData({ selling_price: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Original Price <span className="text-slate-400 text-xs font-normal">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 font-medium">
              Rs.
            </span>
            <input
              className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="0"
              type="number"
              value={formData.original_price}
              onChange={(e) => updateFormData({ original_price: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
