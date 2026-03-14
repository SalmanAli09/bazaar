"use client";

import React, { useState } from "react";
import {
  Store,
  LayoutDashboard,
  Tag,
  MessageCircle,
  Wallet,
  Bell,
  PlusCircle,
  TrendingUp,
  Package,
  TicketPercent,
  Pencil,
  Eye,
  ShoppingBag,
  Heart,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { staticProducts } from '@/lib/static-data';

export default function SellerHub() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { user } = useAuth();

  const products = staticProducts.filter(p => p.seller_id === (user?.id || 'user-1'));
  const activeListings = products.filter(product => product.is_published && !product.is_sold);

  // Sidebar items definition
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Listings", icon: Tag },
    { label: "Chats", icon: MessageCircle, badge: 3 },
    { label: "Earnings", icon: Wallet },
    { label: "Notifications", icon: Bell },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6f8f6] font-sans text-white transition-colors duration-300">

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-[#11d421]/20">
              <Store size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-primary text-base font-black leading-tight">Bazaar</h1>
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.15em]">Seller Hub</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  activeTab === item.label
                  ? "bg-primary/10 text-primary"
                  : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <Link href='/post-ad'  className="w-full bg-primary text-white font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-xl shadow-[#11d421]/20 hover:scale-[1.02] active:scale-95 transition-all">
            <PlusCircle size={18} />
            New Listing
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-10">

        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-primary tracking-tight">Seller Dashboard</h2>
            <p className="text-slate-500 font-medium mt-1" >Welcome back, <span className="text-primary font-bold">Vintage Vibes</span>! Your shop is trending today.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white pl-1.5 pr-4 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="size-9 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vintage" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <Link href="/seller/edit-profile" className="text-sm font-black text-slate-700">Vintage Vibes</Link>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/[0.02]">
            <div className="flex justify-between items-start mb-6">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Available Balance</p>
              <div className="p-2 bg-primary/10 rounded-xl text-primary"><Wallet size={20}/></div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-primary">$1,240.50</p>
              <span className="text-primary text-xs font-black flex items-center gap-0.5">
                <TrendingUp size={14} /> +12%
              </span>
            </div>
            <button className="mt-8 w-full py-3 bg-primary text-white font-black rounded-2xl text-xs hover:bg-slate-800 transition-all uppercase tracking-widest">
              Withdraw Funds
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/[0.02]">
            <div className="flex justify-between items-start mb-6">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Shop Capacity</p>
              <div className="p-2 bg-slate-100 rounded-xl text-slate-400"><Package size={20}/></div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-primary">{activeListings.length}</p>
              <span className="text-slate-400 text-xs font-bold uppercase">Active Listings</span>
            </div>
            <div className="mt-8">
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[70%] rounded-full shadow-[0_0_10px_rgba(17,212,33,0.4)]"></div>
              </div>
              <p className="mt-3 text-[10px] text-slate-400 font-black tracking-widest uppercase">70% Storage Used</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/[0.02]">
            <div className="flex justify-between items-start mb-6">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Active Offers</p>
              <div className="p-2 bg-orange-100 rounded-xl text-orange-500"><TicketPercent size={20}/></div>
            </div>
            <p className="text-4xl font-black text-primary">5</p>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="size-10 rounded-xl border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Offer${i}`} alt="Buyer" />
                  </div>
                ))}
                <div className="size-10 rounded-xl border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-sm">+2</div>
              </div>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Needs Response</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

          {/* Listings Table */}
          <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-black text-primary uppercase tracking-tight">Active Listings ({activeListings.length})</h3>
              <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">View All</button>
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
                  {activeListings.slice(0, 5).map((product) => (
                    <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="size-14 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 group-hover:scale-105 transition-transform">
                            {product.product_pictures && product.product_pictures.length > 0 ? (
                              <img
                                src={product.product_pictures[0]}
                                alt={product.ad_title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-100" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-black text-primary">{product.ad_title}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.condition}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-slate-700">Rs. {product.selling_price}</td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest">
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2.5 hover:bg-primary/10 rounded-xl text-slate-400 hover:text-primary transition-all">
                            <Pencil size={18} />
                          </button>
                          <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all">
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeListings.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-12 text-center text-slate-500">
                        No active listings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] flex flex-col">
            <div className="px-8 py-6 border-b border-slate-50">
              <h3 className="font-black text-primary uppercase tracking-tight">Recent Activity</h3>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto max-h-[420px]">
              {[
                { title: "New Order!", desc: "Sold '90s Tee' to @alex_m", icon: ShoppingBag, color: "bg-primary/10 text-primary", time: "2m ago" },
                { title: "New Offer", desc: "$75 offer on 'Red Sneakers'", icon: TicketPercent, color: "bg-blue-50 text-blue-500", time: "45m ago" },
                { title: "New Like", desc: "5 people saved your item", icon: Heart, color: "bg-pink-50 text-pink-500", time: "2h ago" }
              ].map((notif, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 rounded-3xl transition-all flex gap-4 cursor-pointer">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
                    <notif.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary">{notif.title}</p>
                    <p className="text-xs font-medium text-slate-500 leading-tight mt-0.5">{notif.desc}</p>
                    <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-widest">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto p-6 border-t border-slate-50 text-center">
              <button className="flex items-center justify-center gap-2 w-full text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors">
                <Check size={14} /> Mark all as read
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
