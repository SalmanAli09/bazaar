'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';

export default function BasicDetails() {
  const [condition, setCondition] = useState('new');

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Basic Details
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Ad Title <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="What are you selling?"
            type="text"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
              <option value="">Select a category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Living</option>
              <option>Mobiles</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Condition <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              checked={condition === 'new'}
              onChange={() => setCondition('new')}
              className="hidden"
              id="cond-new"
              name="condition"
              type="radio"
            />
            <label
              className={`px-5 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all hover:border-primary ${
                condition === 'new' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              htmlFor="cond-new"
            >
              New
            </label>
            
            <input
              checked={condition === 'likenew'}
              onChange={() => setCondition('likenew')}
              className="hidden"
              id="cond-likenew"
              name="condition"
              type="radio"
            />
            <label
              className={`px-5 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all hover:border-primary ${
                condition === 'likenew' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              htmlFor="cond-likenew"
            >
              Like New
            </label>
            
            <input
              checked={condition === 'good'}
              onChange={() => setCondition('good')}
              className="hidden"
              id="cond-good"
              name="condition"
              type="radio"
            />
            <label
              className={`px-5 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all hover:border-primary ${
                condition === 'good' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              htmlFor="cond-good"
            >
              Good
            </label>
            
            <input
              checked={condition === 'fair'}
              onChange={() => setCondition('fair')}
              className="hidden"
              id="cond-fair"
              name="condition"
              type="radio"
            />
            <label
              className={`px-5 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all hover:border-primary ${
                condition === 'fair' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              htmlFor="cond-fair"
            >
              Fair
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Describe your item, include details like brand, size, defects..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
