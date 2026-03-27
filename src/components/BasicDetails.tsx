'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

interface FormData {
  ad_title: string;
  category_id: string;
  city: string;
  condition: string;
  description: string;
}

interface BasicDetailsProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

interface Category {
  category_id: string;
  name: string;
}

export default function BasicDetails({ formData, updateFormData }: any) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(() => {});
  }, []);
  const conditionOptions = [
    { value: 'new', label: 'Brand New' },
    { value: 'like_new', label: 'Like New' },
    { value: 'refurbished', label: 'Refurbished' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-[var(--primary-dark)]" />
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
            value={formData.ad_title}
            onChange={(e) => updateFormData({ ad_title: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              value={formData.category_id}
              onChange={(e) => updateFormData({ category_id: e.target.value })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
            >
              <option value="">Select a city</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Condition <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {conditionOptions.map((option) => (
              <input
                key={option.value}
                checked={formData.condition === option.value}
                onChange={() => updateFormData({ condition: option.value })}
                className="hidden"
                id={`cond-${option.value.toLowerCase().replace(' ', '-')}`}
                name="condition"
                type="radio"
              />
            ))}
            {conditionOptions.map((option) => (
              <label
                key={option.value}
                className={`px-5 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all hover:border-primary ${
                  formData.condition === option.value
                    ? 'bg-[var(--primary-dark)] text-white border-primary'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
                htmlFor={`cond-${option.value.toLowerCase().replace(' ', '-')}`}
              >
                {option.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Describe your item, include details like brand, size, defects..."
            rows={4}
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
