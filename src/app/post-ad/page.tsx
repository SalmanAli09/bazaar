'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import BasicDetails from '@/components/BasicDetails';
import Pricing from '@/components/Pricing';
import PhotoUpload from '@/components/PhotoUpload';
import BoostListing from '@/components/BoostListing';
import PostAdFooter from '@/components/PostAdFooter';

interface FormData {
  ad_title: string;
  category_id: string;
  city: string;
  condition: string;
  description: string;
  selling_price: string;
  original_price: string;
  negotiable_price: boolean;
  featured: boolean;
  urgent: boolean;
  product_pictures: string[];
}

export default function PostAdPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ad_title: '',
    category_id: '',
    city: '',
    condition: 'new',
    description: '',
    selling_price: '',
    original_price: '',
    negotiable_price: false,
    featured: false,
    urgent: false,
    product_pictures: []
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to post an ad');
      router.push('/login');
      return;
    }

    if (!isDraft && (!formData.ad_title || !formData.category_id || !formData.city || !formData.selling_price)) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_id: user.seller_id,
          category_id: formData.category_id || null,
          product_name: formData.ad_title,
          product_description: formData.description,
          product_actual_price: formData.original_price,
          product_selling_price: formData.selling_price,
          condition: formData.condition,
          is_negotiable: formData.negotiable_price,
          is_urgent: formData.urgent,
          is_featured: formData.featured,
          is_draft: isDraft,
          product_pictures: formData.product_pictures,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to post ad');
        return;
      }

      alert(isDraft ? 'Draft saved successfully!' : 'Ad posted successfully!');
      router.push('/seller/dashboard');
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold dark:text-white">Post an Ad</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Fill in details below to reach thousands of potential buyers.
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e, false)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
          <div className="lg:col-span-7 space-y-8">
            <BasicDetails formData={formData} updateFormData={updateFormData} />
            <Pricing formData={formData} updateFormData={updateFormData} />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <PhotoUpload formData={formData} updateFormData={updateFormData} />
            <BoostListing formData={formData} updateFormData={updateFormData} />
          </div>
        </form>
      </main>
      <PostAdFooter
        isSubmitting={isSubmitting}
        onSubmit={(e) => handleSubmit(e, false)}
        onSaveDraft={(e) => handleSubmit(e, true)}
      />
    </div>
  );
}
