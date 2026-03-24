"use client";

import React, { useState } from "react";
import {
  Tag,
  Pencil,
  Eye,
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { staticProducts } from '@/lib/static-data';

export default function ListingsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const products = staticProducts.filter(p => p.seller_id === (user?.id || 'user-1'));
  const activeListings = products.filter(product => product.is_published && !product.is_sold);
  const soldListings = products.filter(product => product.is_sold);
  const draftListings = products.filter(product => !product.is_published);

  const filteredListings = activeListings.filter(product =>
    product.ad_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--primary-dark)]/10 rounded-xl text-[var(--primary-dark)]">
              <Tag size={20} />
            </div>
            <span className="text-2xl font-black text-[var(--primary-dark)]">{activeListings.length}</span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Listings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-xl text-[var(--primary-dark)]">
              <PlusCircle size={20} />
            </div>
            <span className="text-2xl font-black text-[var(--primary-dark)]">{soldListings.length}</span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sold</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-slate-100 rounded-xl text-slate-400">
              <Filter size={20} />
            </div>
            <span className="text-2xl font-black text-slate-400">{draftListings.length}</span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Drafts</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
              <Tag size={20} />
            </div>
            <span className="text-2xl font-black text-orange-500">{products.length}</span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Listings</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl text-[var(--primary-dark)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-all"
            >
              <Filter size={18} />
              <span className="text-sm font-bold">Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterStatus === "all"
                    ? "bg-[var(--primary-dark)] text-white"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                All Listings
              </button>
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterStatus === "active"
                    ? "bg-[var(--primary-dark)] text-white"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus("sold")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterStatus === "sold"
                    ? "bg-[var(--primary-dark)] text-white"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                Sold
              </button>
              <button
                onClick={() => setFilterStatus("draft")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterStatus === "draft"
                    ? "bg-[var(--primary-dark)] text-white"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                Drafts
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-black text-[var(--primary-dark)] uppercase tracking-tight">
            Active Listings ({filteredListings.length})
          </h3>
          <div className="text-sm text-slate-400">
            Showing {filteredListings.length} of {activeListings.length} listings
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-6">Product</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6">Condition</th>
                <th className="px-8 py-6">Views</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredListings.map((product) => (
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
                        <p className="text-sm font-black text-[var(--primary-dark)]">{product.ad_title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {/* {product.category} • {product.subcategory} */}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">Rs. {product.selling_price}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                      {product.condition}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-400">
                    {Math.floor(Math.random() * 100) + 10}
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-[var(--primary-dark)]/10 text-[var(--primary-dark)] text-[10px] font-black rounded-lg uppercase tracking-widest">
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2.5 hover:bg-[var(--primary-dark)]/10 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                        <Pencil size={18} />
                      </button>
                      <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredListings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-slate-500">
                    {searchTerm ? "No listings found matching your search" : "No active listings found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
