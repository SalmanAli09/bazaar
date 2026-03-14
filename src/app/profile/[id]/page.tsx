'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, MessageSquare } from 'lucide-react';
import SellerProfileHeader from '@/components/seller/SellerProfileHeader';
import SellerStats from '@/components/seller/SellerStats';
import SellerListings from '@/components/seller/SellerListings';
import SellerReviews from '@/components/seller/SellerReviews';
import { staticSellerProfile } from '@/lib/static-data';

export default function SellerProfilePage() {
  const seller = staticSellerProfile;
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings');

  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>

        {/* Seller Profile Header */}
        <SellerProfileHeader seller={seller} />

        {/* Seller Stats */}
        <SellerStats stats={seller.stats} />

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'listings'
                  ? 'border-primary text-primary'
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
                  ? 'border-primary text-primary'
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

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <SellerListings sellerId={seller.id} />
        )}

        {activeTab === 'reviews' && (
          <SellerReviews sellerId={seller.id} />
        )}
      </main>
    </div>
  );
}
