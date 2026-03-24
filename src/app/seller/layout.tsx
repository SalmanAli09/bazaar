"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Store,
  LayoutDashboard,
  Tag,
  MessageCircle,
  Wallet,
  Bell,
  PlusCircle,
  ChevronDown,
  ExternalLink,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SellerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const pathname = usePathname();
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const storeDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (storeDropdownRef.current && !storeDropdownRef.current.contains(event.target as Node)) {
        setShowStoreDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/seller/dashboard" },
    { label: "Listings", icon: Tag, href: "/seller/listings", badge: 8 },
    { label: "Chats", icon: MessageCircle, href: "/seller/chats", badge: 3 },
    { label: "Earnings", icon: Wallet, href: "/seller/earnings" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f6] font-sans text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">

            <div>
              <h2 className="text-3xl font-black text-[var(--primary-dark)] tracking-tight">Seller Dashboard</h2>
              <p className="text-slate-500 font-medium mt-1">Welcome back, <span className="text-[var(--primary-dark)] font-bold">Vintage Vibes</span>! Your shop is trending today.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 bg-white pl-1.5 pr-4 py-1.5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="size-9 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vintage" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-black text-slate-700">Vintage Vibes</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden z-50">

                  <div className="py-2">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all text-slate-700 hover:text-[var(--primary-dark)]"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <Settings size={16} />
                      <span className="text-sm font-bold">Visit Website</span>
                    </Link>
                    <Link
                      href="/seller/edit-profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all text-slate-700 hover:text-[var(--primary-dark)]"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <User size={16} />
                      <span className="text-sm font-bold">Edit Profile</span>
                    </Link>

                    <Link
                      href="/seller/help"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all text-slate-700 hover:text-[var(--primary-dark)]"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <HelpCircle size={16} />
                      <span className="text-sm font-bold">Help & Support</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 p-2">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all text-red-500 hover:text-red-600"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <LogOut size={16} />
                      <span className="text-sm font-bold">Logout</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 mb-8">
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-bold text-sm ${pathname === item.href
                    ? "bg-[var(--primary-dark)] text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-[var(--primary-dark)]"
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${pathname === item.href
                      ? "bg-white text-[var(--primary-dark)]"
                      : "bg-[var(--primary-dark)] text-white"
                    }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>


        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
