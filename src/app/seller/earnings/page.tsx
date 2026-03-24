"use client";

import React, { useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  DollarSign,
  ShoppingBag,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { staticProducts } from '@/lib/static-data';

export default function EarningsPage() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("month");
  const [showFilters, setShowFilters] = useState(false);

  // Mock earnings data
  const totalEarnings = 12450.50;
  const availableBalance = 8240.75;
  const pendingEarnings = 3209.75;
  const totalSales = 156;

  const earningsData = [
    { month: "Jan", earnings: 2100, sales: 28 },
    { month: "Feb", earnings: 2800, sales: 35 },
    { month: "Mar", earnings: 3200, sales: 42 },
    { month: "Apr", earnings: 2900, sales: 38 },
    { month: "May", earnings: 3500, sales: 45 },
    { month: "Jun", earnings: 4150, sales: 52 },
  ];

  const recentTransactions = [
    { 
      id: "TRX001", 
      product: "Vintage Leather Jacket", 
      amount: 450.00, 
      date: "2024-06-15", 
      status: "completed",
      type: "sale"
    },
    { 
      id: "TRX002", 
      product: "Retro Sneakers", 
      amount: 125.00, 
      date: "2024-06-14", 
      status: "completed",
      type: "sale"
    },
    { 
      id: "TRX003", 
      product: "90s Band T-Shirt", 
      amount: 85.00, 
      date: "2024-06-13", 
      status: "pending",
      type: "sale"
    },
    { 
      id: "TRX004", 
      product: "Antique Watch", 
      amount: 320.00, 
      date: "2024-06-12", 
      status: "completed",
      type: "sale"
    },
    { 
      id: "TRX005", 
      product: "Withdrawal", 
      amount: -500.00, 
      date: "2024-06-10", 
      status: "completed",
      type: "withdrawal"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--primary-dark)]/10 rounded-xl text-[var(--primary-dark)]">
              <DollarSign size={20} />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
              <ArrowUpRight size={16} />
              +12%
            </div>
          </div>
          <p className="text-2xl font-black text-[var(--primary-dark)]">${totalEarnings.toLocaleString()}</p>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Earnings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-xl text-green-500">
              <Wallet size={20} />
            </div>
            <span className="text-2xl font-black text-green-500">${availableBalance.toLocaleString()}</span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Balance</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
              <Calendar size={20} />
            </div>
            <span className="text-2xl font-black text-orange-500">${pendingEarnings.toLocaleString()}</span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Pending Earnings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-slate-100 rounded-xl text-slate-400">
              <ShoppingBag size={20} />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
              <ArrowUpRight size={16} />
              +8%
            </div>
          </div>
          <p className="text-2xl font-black text-slate-400">{totalSales}</p>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Sales</p>
        </div>
      </div>

      {/* Chart and Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-black text-[var(--primary-dark)] uppercase tracking-tight">Earnings Overview</h3>
            <p className="text-slate-500 text-sm mt-1">Track your earnings performance over time</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-slate-50 rounded-xl p-1">
              {["week", "month", "year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
                    timeRange === range
                      ? "bg-[var(--primary-dark)] text-white"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-500 hover:bg-slate-100 transition-all"
            >
              <Filter size={16} />
              <span className="text-sm font-bold">Filters</span>
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Simple Chart Representation */}
        <div className="h-64 flex items-end justify-between gap-4 mb-6">
          {earningsData.map((data, index) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-[var(--primary-dark)] rounded-t-xl transition-all hover:opacity-80"
                style={{ height: `${(data.earnings / 4500) * 100}%` }}
              />
              <span className="text-xs font-bold text-slate-400">{data.month}</span>
            </div>
          ))}
        </div>

        {showFilters && (
          <div className="pt-6 border-t border-slate-100">
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-[var(--primary-dark)] text-white rounded-xl text-sm font-bold">
                All Transactions
              </button>
              <button className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-100">
                Sales Only
              </button>
              <button className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-100">
                Withdrawals
              </button>
              <button className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-100">
                Pending
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-black text-[var(--primary-dark)] uppercase tracking-tight">Recent Transactions</h3>
          <button className="flex items-center gap-2 text-[var(--primary-dark)] text-xs font-black uppercase tracking-widest hover:underline">
            <Download size={14} />
            Export
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-6">Transaction ID</th>
                <th className="px-8 py-6">Product</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-[var(--primary-dark)]">{transaction.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        transaction.type === 'sale' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                      }`}>
                        {transaction.type === 'sale' ? <ShoppingBag size={16} /> : <Wallet size={16} />}
                      </div>
                      <span className="text-sm font-black text-[var(--primary-dark)]">{transaction.product}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-sm font-bold ${
                      transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-500' 
                        : 'bg-orange-100 text-orange-500'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-[var(--primary-dark)] text-xs font-black uppercase tracking-widest hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Button */}
      <div className="flex justify-center">
        <button className="bg-[var(--primary-dark)] text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
          <Wallet size={20} />
          Withdraw Funds
        </button>
      </div>
    </div>
  );
}
