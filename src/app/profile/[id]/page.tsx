'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, MessageSquare } from 'lucide-react';
import SellerProfileHeader from '@/components/seller/SellerProfileHeader';
import SellerStats from '@/components/seller/SellerStats';
import SellerListings from '@/components/seller/SellerListings';
import SellerReviews from '@/components/seller/SellerReviews';

interface SellerProfile {
  id: string;
  full_name: string;
  email: string;
  store_name: string;
  store_banner_image: string;
  store_address: string;
  pickup_address: string;
  phone_number: string;
  city: string;
  country: string;
  is_verified: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  stats: {
    listings: number;
    sales: number;
    rating: number;
    reviews: number;
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

function ProfileSkeleton() {
  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button skeleton */}
        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-8 animate-pulse" />

        {/* Header skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 shadow-sm mb-8 animate-pulse">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-3">
                <div className="h-8 w-56 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                <div className="flex gap-4">
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
            <div className="h-12 w-44 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 animate-pulse">
              <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded mx-auto mb-3" />
              <div className="h-7 w-12 bg-slate-200 dark:bg-slate-700 rounded mx-auto mb-1" />
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Tabs skeleton */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex space-x-8">
            <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Listings skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-pulse">
              <div className="aspect-square bg-slate-200 dark:bg-slate-700" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                <div className="flex justify-between">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function SellerProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings');

  useEffect(() => {
    fetch(`/api/seller/${id}`)
      .then(res => res.json())
      .then(data => setSeller(data.seller || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seller Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The seller profile you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="px-6 py-2 bg-[var(--primary-dark)] hover:bg-emerald-700 text-white rounded-lg transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--primary-dark)] transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>

        <SellerProfileHeader seller={seller} />
        <SellerStats stats={seller.stats} />

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'listings'
                  ? 'border-primary text-[var(--primary-dark)]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Listings ({seller.stats.listings})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reviews'
                  ? 'border-primary text-[var(--primary-dark)]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Reviews ({seller.stats.reviews})
              </div>
            </button>
          </nav>
        </div>

        {activeTab === 'listings' && <SellerListings sellerId={seller.id} />}
        {activeTab === 'reviews' && <SellerReviews sellerId={seller.id} />}
      </main>
    </div>
  );
}
