"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      login(data.user);
      window.location.href = data.user.role === 'admin' ? '/admin' : '/';
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F3F4F6] antialiased">
      {/* Left Side: Brand & Info */}
      <div className="lg:w-1/2 relative bg-gradient-to-br from-[#0D8B5F] via-[#0A6D4B] to-[#064E3B] p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full -ml-48 -mb-48 blur-3xl" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-16 group">
            <span className="text-3xl font-extrabold tracking-tight text-white">.بازار</span>
          </Link>

          <div className="max-w-lg">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Pakistan's <br />
              <span className="text-emerald-300">Thrift</span> Marketplace
            </h1>
            <p className="text-emerald-50/80 text-lg leading-relaxed mb-12">
              Buy and sell quality second-hand items. Join thousands of verified sellers and smart buyers across Pakistan.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard value="500+" label="Sellers" />
              <StatCard value="10k+" label="Deals" />
              <StatCard value="8" label="Cities" />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 text-emerald-100/40 text-xs font-medium uppercase tracking-[0.2em]">
          © 2026 .بازار Marketplace
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sm:p-10 border border-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h2>
              <p className="text-slate-500">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0D8B5F]/20 focus:bg-white transition-all outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-sm font-bold text-slate-700">Password</label>
                  <Link href="#" className="text-xs font-bold text-[#0D8B5F] hover:text-emerald-700 transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-11 pr-12 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0D8B5F]/20 focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#0D8B5F] hover:bg-emerald-700 disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-4">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-1 gap-4">
                <SocialButton
                  label="Google"
                  icon={<img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />}
                />
              </div>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link href="/register" className="font-bold text-[#0D8B5F] hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
      <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
      <div className="text-emerald-200/70 text-sm font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm"
    >
      {icon}
      {label}
    </button>
  );
}
