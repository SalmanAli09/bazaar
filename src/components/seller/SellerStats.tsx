'use client';

import { Package, ShoppingBag, Star, MessageSquare } from 'lucide-react';

interface SellerStatsProps {
  stats: {
    listings: number;
    sales: number;
    rating: number;
    reviews: number;
  };
}

export default function SellerStats({ stats }: SellerStatsProps) {
  const statItems = [
    {
      icon: Package,
      value: stats.listings.toString(),
      label: 'Active Listings',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: ShoppingBag,
      value: stats.sales.toString(),
      label: 'Total Sales',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      icon: Star,
      value: stats.rating.toFixed(1),
      label: 'Average Rating',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      icon: MessageSquare,
      value: stats.reviews.toString(),
      label: 'Total Reviews',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700`}
        >
          <item.icon className={`w-6 h-6 ${item.color} mb-3 mx-auto`} />
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {item.value}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
