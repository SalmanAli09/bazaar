"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  ChevronDown, 
  LogOut, 
  LayoutDashboard, 
  Eye,
  Store
} from 'lucide-react';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="w-8 h-8 bg-[#069668] text-white rounded-full flex items-center justify-center text-sm font-semibold">
          {user.full_name ? getInitials(user.full_name) : 'U'}
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
          {user.full_name}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-slate-500 transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {user.full_name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user.role === 'seller' ? 'Seller' : 'Buyer'}
            </p>
            {user.email && (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user.email}
              </p>
            )}
          </div>

          {user.role === 'seller' && <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Eye size={16} />
            View Profile
          </Link>}

          <Link
            href={user.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard'}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            {user.role === 'seller' ? (
              <Store size={16} />
            ) : (
              <LayoutDashboard size={16} />
            )}
            Dashboard
          </Link>

          <button
            onClick={() => {
              logout();
              setIsDropdownOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
