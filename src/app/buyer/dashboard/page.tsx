"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBag, Heart, Package, TrendingUp, ArrowLeft } from 'lucide-react';

export default function BuyerDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== 'buyer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">This dashboard is only available to buyers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.full_name}!</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Package className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
              <Heart className="text-red-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">₨15,500</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Saved</p>
                <p className="text-2xl font-bold text-gray-900">₨3,200</p>
              </div>
              <ShoppingBag className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                Browse Products
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                View Orders
              </button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                Manage Wishlist
              </button>
              <button className="w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                Search Sellers
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Order delivered</p>
                  <p className="text-sm text-gray-600">Vintage Camera - Excellent condition</p>
                </div>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Added to wishlist</p>
                  <p className="text-sm text-gray-600">Leather Jacket - Size L</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Order placed</p>
                  <p className="text-sm text-gray-600">Retro Watch - Vintage Collection</p>
                </div>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600 text-sm border-b">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Item</th>
                  <th className="pb-3">Seller</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3">#ORD-001</td>
                  <td className="py-3">Vintage Camera</td>
                  <td className="py-3">Vintage Vibes</td>
                  <td className="py-3">₨8,500</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Delivered
                    </span>
                  </td>
                  <td className="py-3">Dec 20, 2024</td>
                </tr>
                <tr>
                  <td className="py-3">#ORD-002</td>
                  <td className="py-3">Retro Watch</td>
                  <td className="py-3">Time Pieces</td>
                  <td className="py-3">₨12,000</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      In Transit
                    </span>
                  </td>
                  <td className="py-3">Dec 22, 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
