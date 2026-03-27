"use client";

import { useEffect, useState } from "react";
import { Users, Store, Package, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";

interface Stats {
  totalBuyers: number;
  totalSellers: number;
  totalProducts: number;
  totalActive: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalBuyers: 0, totalSellers: 0, totalProducts: 0, totalActive: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, sellersRes] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/sellers"),
        ]);
        const usersData = await usersRes.json();
        const sellersData = await sellersRes.json();

        const buyers = (usersData.users || []).filter((u: { role: string }) => u.role === "buyer");
        const sellers = sellersData.sellers || [];
        const totalProducts = sellers.reduce((sum: number, s: { products_total: number }) => sum + s.products_total, 0);
        const totalActive = sellers.reduce((sum: number, s: { products_active: number }) => sum + s.products_active, 0);

        setStats({
          totalBuyers: buyers.length,
          totalSellers: sellers.length,
          totalProducts,
          totalActive,
        });
      } catch {}
      finally { setLoading(false); }
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Buyers", value: stats.totalBuyers, icon: Users, color: "bg-blue-500", href: "/admin/buyers" },
    { label: "Total Sellers", value: stats.totalSellers, icon: Store, color: "bg-emerald-500", href: "/admin/sellers" },
    { label: "Total Products", value: stats.totalProducts, icon: Package, color: "bg-purple-500", href: "/admin/sellers" },
    { label: "Active Listings", value: stats.totalActive, icon: ShoppingBag, color: "bg-amber-500", href: "/admin/sellers" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your marketplace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color} text-white`}>
                <card.icon size={22} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">
              {loading ? <Loader2 size={24} className="animate-spin" /> : card.value}
            </p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
