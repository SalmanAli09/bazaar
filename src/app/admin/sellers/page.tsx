"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Ban,
  CheckCircle,
  Star,
  BadgeCheck,
  Loader2,
  Store,
} from "lucide-react";

interface Seller {
  seller_id: string;
  user_id: string;
  store_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  city: string;
  rating: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  products_total: number;
  products_active: number;
  products_sold: number;
}

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data.sellers || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleBlock = async (seller: Seller) => {
    setTogglingId(seller.user_id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: seller.user_id, is_active: !seller.is_active }),
      });
      if (res.ok) {
        setSellers((prev) =>
          prev.map((s) =>
            s.seller_id === seller.seller_id ? { ...s, is_active: !s.is_active } : s
          )
        );
      }
    } catch {}
    finally { setTogglingId(null); }
  };

  const filtered = sellers.filter(
    (s) =>
      s.store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Sellers</h1>
          <p className="text-slate-500 mt-1">Manage all registered sellers</p>
        </div>
        <div className="text-sm font-bold text-slate-400">
          {sellers.length} total sellers
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by store name, name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-100">
                <th className="px-6 py-5">Seller</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5">Products</th>
                <th className="px-6 py-5">Rating</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <Loader2 size={24} className="animate-spin inline-block mr-2" />
                    Loading sellers...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <Store size={32} className="mx-auto mb-3 text-slate-300" />
                    {searchTerm ? "No sellers match your search" : "No sellers found"}
                  </td>
                </tr>
              ) : (
                filtered.map((seller) => (
                  <tr key={seller.seller_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                          {(seller.store_name || seller.full_name).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-900">{seller.store_name || seller.full_name}</span>
                            {seller.is_verified && <BadgeCheck size={14} className="text-blue-500" />}
                          </div>
                          <p className="text-xs text-slate-400">{seller.full_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{seller.email}</p>
                      <p className="text-xs text-slate-400">{seller.city || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-700">{seller.products_total} total</div>
                      <div className="text-xs text-slate-400">{seller.products_active} active · {seller.products_sold} sold</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-400" />
                        <span className="text-sm font-bold text-slate-700">{seller.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                        seller.is_active
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {seller.is_active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/sellers/${seller.seller_id}`}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => toggleBlock(seller)}
                          disabled={togglingId === seller.user_id}
                          className={`p-2 rounded-lg transition-all ${
                            seller.is_active
                              ? "hover:bg-red-50 text-slate-400 hover:text-red-600"
                              : "hover:bg-green-50 text-slate-400 hover:text-green-600"
                          }`}
                          title={seller.is_active ? "Block Seller" : "Unblock Seller"}
                        >
                          {togglingId === seller.user_id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : seller.is_active ? (
                            <Ban size={16} />
                          ) : (
                            <CheckCircle size={16} />
                          )}
                        </button>
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
  );
}
