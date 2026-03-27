"use client";

import React, { useEffect, useState } from 'react';
import {
  X,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  Loader2,
  MessageSquare,
  ImageIcon,
} from 'lucide-react';

interface Offer {
  id: string;
  seller_id: string;
  seller_name: string;
  store_name: string;
  seller_city: string;
  seller_rating: number;
  seller_verified: boolean;
  offered_price: number;
  seller_message: string;
  offer_status: string;
  images: string[];
  created_at: string;
}

interface ViewOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string | null;
  requestTitle: string;
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - date.getTime());
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'accepted':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'rejected':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'expired':
      return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
    default:
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  }
}

export default function ViewOffersModal({ isOpen, onClose, requestId, requestTitle }: ViewOffersModalProps) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !requestId) return;
    setLoading(true);
    fetch(`/api/offers?buyer_request_id=${requestId}`)
      .then((res) => res.json())
      .then((data) => setOffers(data.offers || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isOpen, requestId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative max-w-[700px] w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Offers Received
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 truncate max-w-md">
              For: {requestTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                    </div>
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  </div>
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              ))}
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                No offers yet
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Sellers haven&apos;t responded to this request yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {offers.length} offer{offers.length !== 1 ? 's' : ''} received
              </div>
              {offers.map((offer) => {
                const initials = (offer.store_name || offer.seller_name)
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={offer.id}
                    className="rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:border-primary/30 transition-all"
                  >
                    {/* Seller Info Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                          {initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {offer.store_name || offer.seller_name}
                            </span>
                            {offer.seller_verified && (
                              <BadgeCheck className="text-blue-500 w-4 h-4" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            {offer.seller_city && (
                              <span className="flex items-center gap-0.5">
                                <MapPin size={10} /> {offer.seller_city}
                              </span>
                            )}
                            {offer.seller_rating > 0 && (
                              <span className="flex items-center gap-0.5">
                                <Star size={10} className="text-amber-400" /> {offer.seller_rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${getStatusStyle(offer.offer_status)}`}>
                          {offer.offer_status}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-[var(--primary-dark)]/5 rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Offered Price</span>
                      <span className="text-lg font-black text-[var(--primary-dark)]">
                        Rs. {offer.offered_price.toLocaleString()}
                      </span>
                    </div>

                    {/* Message */}
                    {offer.seller_message && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        &ldquo;{offer.seller_message}&rdquo;
                      </p>
                    )}

                    {/* Images */}
                    {offer.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {offer.images.map((img, i) => (
                          <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                            <img src={img} alt={`Offer ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {getTimeAgo(offer.created_at)}
                      </span>
                      {offer.offer_status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                            Decline
                          </button>
                          <button className="px-4 py-2 text-xs font-black text-white bg-[var(--primary-dark)] hover:bg-emerald-700 rounded-xl transition-all">
                            Accept Offer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
