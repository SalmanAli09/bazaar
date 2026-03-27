"use client";

import React, { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Package,
  TicketPercent,
  Pencil,
  Eye,
  ShoppingBag,
  Heart,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/lib/static-data';

export default function SellerHub() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.seller_id) return;
    fetch(`/api/products?seller_id=${user.seller_id}&include_all=true&limit=100`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.seller_id]);

  const activeListings = products.filter(p => p.is_published && !p.is_sold);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

      {/* Stats Overview */}
      <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/[0.02]">
          <div className="flex justify-between items-start mb-6">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Available Balance</p>
            <div className="p-2 bg-[var(--primary-dark)]/10 rounded-xl text-[var(--primary-dark)]"><Wallet size={20}/></div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-black text-[var(--primary-dark)]">Rs. 0</p>
            <span className="text-[var(--primary-dark)] text-xs font-black flex items-center gap-0.5">
              <TrendingUp size={14} /> --
            </span>
          </div>
          <button className="mt-8 w-full py-3 bg-[var(--primary-dark)] text-white font-black rounded-2xl text-xs hover:bg-slate-800 transition-all uppercase tracking-widest">
            Withdraw Funds
          </button>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/[0.02]">
          <div className="flex justify-between items-start mb-6">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Shop Capacity</p>
            <div className="p-2 bg-slate-100 rounded-xl text-slate-400"><Package size={20}/></div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-black text-[var(--primary-dark)]">
              {loading ? <Loader2 size={28} className="animate-spin" /> : activeListings.length}
            </p>
            <span className="text-slate-400 text-xs font-bold uppercase">Active Listings</span>
          </div>
          <div className="mt-8">
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-[var(--primary-dark)] h-full rounded-full shadow-[0_0_10px_rgba(17,212,33,0.4)]" style={{ width: `${Math.min((activeListings.length / 50) * 100, 100)}%` }}></div>
            </div>
            <p className="mt-3 text-[10px] text-slate-400 font-black tracking-widest uppercase">{activeListings.length} / 50 Slots Used</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/[0.02]">
          <div className="flex justify-between items-start mb-6">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Products</p>
            <div className="p-2 bg-orange-100 rounded-xl text-orange-500"><TicketPercent size={20}/></div>
          </div>
          <p className="text-4xl font-black text-[var(--primary-dark)]">
            {loading ? <Loader2 size={28} className="animate-spin" /> : products.length}
          </p>
          <div className="mt-8 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-400">{products.filter(p => p.is_sold).length} Sold</span>
            <span className="text-slate-400">{products.filter(p => p.is_draft).length} Drafts</span>
          </div>
        </div>
      </div>

      <div className="xl:col-span-2">
        {/* Listings Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden mb-10">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-black text-[var(--primary-dark)] uppercase tracking-tight">Active Listings ({activeListings.length})</h3>
            <Link href="/seller/listings" className="text-[var(--primary-dark)] text-xs font-black uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="px-8 py-6">Product</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-slate-400">
                      <Loader2 size={20} className="animate-spin inline-block mr-2" />
                      Loading listings...
                    </td>
                  </tr>
                ) : activeListings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-slate-500">
                      No active listings found. <Link href="/post-ad" className="text-[var(--primary-dark)] hover:underline">Post your first ad</Link>
                    </td>
                  </tr>
                ) : (
                  activeListings.slice(0, 5).map((product) => (
                    <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="size-14 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 group-hover:scale-105 transition-transform">
                            {product.product_pictures && product.product_pictures.length > 0 ? (
                              <img src={product.product_pictures[0]} alt={product.ad_title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-100" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-black text-[var(--primary-dark)]">{product.ad_title}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.condition}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-slate-700">Rs. {product.selling_price.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-[var(--primary-dark)]/10 text-[var(--primary-dark)] text-[10px] font-black rounded-lg uppercase tracking-widest">
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/post-ad/${product.id}`} className="p-2.5 hover:bg-[var(--primary-dark)]/10 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                            <Pencil size={18} />
                          </Link>
                          <Link href={`/product/${product.id}`} className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                            <Eye size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] flex flex-col">
        <div className="px-8 py-6 border-b border-slate-50">
          <h3 className="font-black text-[var(--primary-dark)] uppercase tracking-tight">Recent Activity</h3>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto max-h-[420px]">
          {[
            { title: "New Order!", desc: "Sold '90s Tee' to @alex_m", icon: ShoppingBag, color: "bg-[var(--primary-dark)]/10 text-[var(--primary-dark)]", time: "2m ago" },
            { title: "New Offer", desc: "$75 offer on 'Red Sneakers'", icon: TicketPercent, color: "bg-blue-50 text-blue-500", time: "45m ago" },
            { title: "New Like", desc: "5 people saved your item", icon: Heart, color: "bg-pink-50 text-pink-500", time: "2h ago" }
          ].map((notif, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50 rounded-3xl transition-all flex gap-4 cursor-pointer">
              <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
                <notif.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[var(--primary-dark)]">{notif.title}</p>
                <p className="text-xs font-medium text-slate-500 leading-tight mt-0.5">{notif.desc}</p>
                <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-widest">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto p-6 border-t border-slate-50 text-center">
          <button className="flex items-center justify-center gap-2 w-full text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-[var(--primary-dark)] transition-colors">
            <Check size={14} /> Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
