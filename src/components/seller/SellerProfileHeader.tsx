'use client';

import { CheckCircle, MapPin, Phone, Calendar, MessageCircle } from 'lucide-react';

interface SellerProfileHeaderProps {
  seller: {
    id: string;
    full_name: string;
    store_name?: string;
    store_address?: string;
    pickup_address?: string;
    phone_number?: string;
    is_verified: boolean;
    created_at: string;
  };
}

export default function SellerProfileHeader({ seller }: SellerProfileHeaderProps) {
  const getSellerInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-slate-800 shadow-lg">
            {getSellerInitials(seller.store_name || seller.full_name)}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {seller.store_name || seller.full_name}
              </h1>
              {seller.is_verified && (
                <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle className="w-4 h-4" />
                  Verified
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
              {seller.store_address && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {seller.store_address}
                </span>
              )}
              {seller.phone_number && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {seller.phone_number}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {getJoinDate(seller.created_at)}
              </span>
            </div>

            {seller.pickup_address && (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">Pickup Address:</span> {seller.pickup_address}
              </div>
            )}
          </div>
        </div>
        
        <button className="bg-primary hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
          <MessageCircle className="w-5 h-5" />
          Chat with Seller
        </button>
      </div>
    </div>
  );
}
