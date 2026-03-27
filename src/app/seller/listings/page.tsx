"use client";

import React, { useEffect, useState } from "react";
import {
  Tag,
  Pencil,
  Eye,
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/lib/static-data';

function getConditionLabel(condition: string) {
  switch (condition) {
    case 'new': return 'Brand New';
    case 'like_new': return 'Like New';
    case 'refurbished': return 'Refurbished';
    default: return condition;
  }
}

export default function ListingsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!user?.seller_id) return;
    fetch(`/api/products?seller_id=${user.seller_id}&include_all=true&limit=100`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.seller_id]);

  const activeListings = products.filter(p => p.is_published && !p.is_sold);
  const soldListings = products.filter(p => p.is_sold);
  const draftListings = products.filter(p => p.is_draft);

  const getDisplayListings = () => {
    let list = products;
    if (filterStatus === 'active') list = activeListings;
    else if (filterStatus === 'sold') list = soldListings;
    else if (filterStatus === 'draft') list = draftListings;

    if (searchTerm) {
      list = list.filter(p => p.ad_title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return list;
  };

  const filteredListings = getDisplayListings();

  const markAsSold = async (productId: string) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_sold: true, is_published: false }),
      });
      if (res.ok) {
        setProducts(prev => prev.map(p =>
          p.id === productId ? { ...p, is_sold: true, is_published: false } : p
        ));
      }
    } catch {}
  };

  const getStatusBadge = (product: Product) => {
    if (product.is_sold) return { label: 'Sold', cls: 'bg-green-100 text-green-600' };
    if (product.is_draft) return { label: 'Draft', cls: 'bg-slate-100 text-slate-500' };
    if (product.is_published) return { label: 'Active', cls: 'bg-[var(--primary-dark)]/10 text-[var(--primary-dark)]' };
    return { label: 'Inactive', cls: 'bg-slate-100 text-slate-400' };
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--primary-dark)]/10 rounded-xl text-[var(--primary-dark)]">
              <Tag size={20} />
            </div>
            <span className="text-2xl font-black text-[var(--primary-dark)]">
              {loading ? <Loader2 size={20} className="animate-spin" /> : activeListings.length}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Listings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-xl text-green-500">
              <PlusCircle size={20} />
            </div>
            <span className="text-2xl font-black text-green-500">
              {loading ? <Loader2 size={20} className="animate-spin" /> : soldListings.length}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sold</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-slate-100 rounded-xl text-slate-400">
              <Filter size={20} />
            </div>
            <span className="text-2xl font-black text-slate-400">
              {loading ? <Loader2 size={20} className="animate-spin" /> : draftListings.length}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Drafts</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
              <Tag size={20} />
            </div>
            <span className="text-2xl font-black text-orange-500">
              {loading ? <Loader2 size={20} className="animate-spin" /> : products.length}
            </span>
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
              {[
                { key: 'all', label: 'All Listings' },
                { key: 'active', label: 'Active' },
                { key: 'sold', label: 'Sold' },
                { key: 'draft', label: 'Drafts' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    filterStatus === f.key
                      ? "bg-[var(--primary-dark)] text-white"
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-black text-[var(--primary-dark)] uppercase tracking-tight">
            {filterStatus === 'all' ? 'All' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Listings ({filteredListings.length})
          </h3>
          <div className="text-sm text-slate-400">
            Showing {filteredListings.length} of {products.length} listings
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-6">Product</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6">Condition</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-400">
                    <Loader2 size={20} className="animate-spin inline-block mr-2" />
                    Loading listings...
                  </td>
                </tr>
              ) : filteredListings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                    {searchTerm ? "No listings found matching your search" : "No listings found"}
                  </td>
                </tr>
              ) : (
                filteredListings.map((product) => {
                  const status = getStatusBadge(product);
                  return (
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
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-slate-700">Rs. {product.selling_price.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                          {getConditionLabel(product.condition)}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${status.cls}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {!product.is_sold && product.is_published && (
                            <button
                              onClick={() => markAsSold(product.id)}
                              className="p-2.5 hover:bg-green-50 rounded-xl text-slate-400 hover:text-green-600 transition-all"
                              title="Mark as Sold"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <Link href={`/post-ad/${product.id}`} className="p-2.5 hover:bg-[var(--primary-dark)]/10 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                            <Pencil size={18} />
                          </Link>
                          <Link href={`/product/${product.id}`} className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                            <Eye size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
