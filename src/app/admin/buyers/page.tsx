"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Ban,
  CheckCircle,
  Loader2,
  Users,
} from "lucide-react";

interface Buyer {
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  city: string;
  country: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users?role=buyer")
      .then((res) => res.json())
      .then((data) => setBuyers(data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleBlock = async (buyer: Buyer) => {
    setTogglingId(buyer.user_id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: buyer.user_id, is_active: !buyer.is_active }),
      });
      if (res.ok) {
        setBuyers((prev) =>
          prev.map((b) =>
            b.user_id === buyer.user_id ? { ...b, is_active: !b.is_active } : b
          )
        );
      }
    } catch {}
    finally { setTogglingId(null); }
  };

  const filtered = buyers.filter(
    (b) =>
      b.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Buyers</h1>
          <p className="text-slate-500 mt-1">Manage all registered buyers</p>
        </div>
        <div className="text-sm font-bold text-slate-400">{buyers.length} total buyers</div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
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
                <th className="px-6 py-5">Buyer</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5">Location</th>
                <th className="px-6 py-5">Joined</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <Loader2 size={24} className="animate-spin inline-block mr-2" />
                    Loading buyers...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <Users size={32} className="mx-auto mb-3 text-slate-300" />
                    {searchTerm ? "No buyers match your search" : "No buyers found"}
                  </td>
                </tr>
              ) : (
                filtered.map((buyer) => (
                  <tr key={buyer.user_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                          {buyer.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-900">{buyer.full_name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{buyer.email}</p>
                      <p className="text-xs text-slate-400">{buyer.phone_number || "—"}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {buyer.city || buyer.country || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(buyer.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                        buyer.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}>
                        {buyer.is_active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleBlock(buyer)}
                        disabled={togglingId === buyer.user_id}
                        className={`p-2 rounded-lg transition-all ${
                          buyer.is_active
                            ? "hover:bg-red-50 text-slate-400 hover:text-red-600"
                            : "hover:bg-green-50 text-slate-400 hover:text-green-600"
                        }`}
                        title={buyer.is_active ? "Block Buyer" : "Unblock Buyer"}
                      >
                        {togglingId === buyer.user_id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : buyer.is_active ? (
                          <Ban size={16} />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                      </button>
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
