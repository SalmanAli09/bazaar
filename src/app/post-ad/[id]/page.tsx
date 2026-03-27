'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import BasicDetails from '@/components/BasicDetails';
import Pricing from '@/components/Pricing';
import PhotoUpload from '@/components/PhotoUpload';
import BoostListing from '@/components/BoostListing';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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
    product_pictures: [],
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.product) {
          const p = data.product;
          setFormData({
            ad_title: p.ad_title || '',
            category_id: p.category_id || '',
            city: p.city || '',
            condition: p.condition || 'new',
            description: p.description || '',
            selling_price: String(p.selling_price || ''),
            original_price: String(p.original_price || ''),
            negotiable_price: p.negotiable_price || false,
            featured: p.featured || false,
            urgent: p.urgent || false,
            product_pictures: p.product_pictures || [],
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!formData.ad_title || !formData.selling_price) {
      setError('Title and selling price are required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: formData.ad_title,
          category_id: formData.category_id || undefined,
          product_description: formData.description,
          product_actual_price: formData.original_price ? parseFloat(formData.original_price) : 0,
          product_selling_price: parseFloat(formData.selling_price),
          condition: formData.condition,
          is_negotiable: formData.negotiable_price,
          is_urgent: formData.urgent,
          is_featured: formData.featured,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update product');
        return;
      }

      router.push('/seller/listings');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-[var(--primary-dark)] transition-colors font-medium mb-6"
        >
          <ArrowLeft size={18} /> Back to Listings
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-bold dark:text-white">Edit Product</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Update your product details below.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
          <div className="lg:col-span-7 space-y-8">
            <BasicDetails formData={formData} updateFormData={updateFormData} />
            <Pricing formData={formData} updateFormData={updateFormData} />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <PhotoUpload formData={formData} updateFormData={updateFormData} />
            <BoostListing formData={formData} updateFormData={updateFormData} />
          </div>
        </div>
      </main>

      {/* Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-full text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-12 py-3 bg-[var(--primary-dark)] text-white rounded-full font-bold shadow-lg shadow-primary/25 hover:bg-[var(--primary-dark)]/90 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
