'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, CheckCircle, Star, Package, ShoppingBag, MessageSquare, Loader2 } from 'lucide-react';
import SellerProfileHeader from '@/components/seller/SellerProfileHeader';
import SellerStats from '@/components/seller/SellerStats';
import SellerListings from '@/components/seller/SellerListings';
import SellerReviews from '@/components/seller/SellerReviews';

interface SellerProfile {
  id: string;
  full_name: string;
  email: string;
  store_name?: string;
  store_address?: string;
  pickup_address?: string;
  phone_number?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  stats: {
    listings: number;
    sales: number;
    rating: number;
    reviews: number;
  };
}

export default function SellerProfilePage() {
  const params = useParams();
  const sellerId = params.id as string;
  
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings');

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/sellers/${sellerId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch seller profile');
        }
        
        setSeller(data.seller);
      } catch (err) {
        console.error('Error fetching seller profile:', err);
        setError('Failed to load seller profile');
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) {
      fetchSellerProfile();
    }
  }, [sellerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-slate-600 dark:text-slate-400">Loading seller profile...</p>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seller Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error || 'This seller does not exist or has been removed.'}</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

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