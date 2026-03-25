"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Info,
  ShieldCheck,
  Eye,
  ArrowRight,
  HeadphonesIcon,
  Store,
} from 'lucide-react';

export default function RegisterPage() {
  const [isSeller, setIsSeller] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cnic: '',
    password: '',
    storeName: '',
    pickupAddress: '',
    address: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <main className="flex min-h-screen bg-white dark:bg-[#0f172a]">
      {/* Left Side: Brand & Mesh Background */}
      <div className="hidden lg:flex flex-1 bg-[#069668] p-16 flex-col justify-center text-white relative overflow-hidden"
           style={{
             backgroundImage: `radial-gradient(at 0% 0%, hsla(161, 91%, 35%, 1) 0, transparent 50%),
                               radial-gradient(at 50% 0%, hsla(160, 84%, 39%, 1) 0, transparent 50%),
                               radial-gradient(at 100% 0%, hsla(158, 80%, 45%, 1) 0, transparent 50%)`
           }}>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-8">.بازار</h2>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Pakistan's Thrift Marketplace
          </h1>
          <p className="text-lg text-emerald-50 mb-12 leading-relaxed">
            Join a community of thousands. Buy and sell quality second-hand items with confidence through our verified identity system.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <StatCard value="500+" label="Sellers" />
            <StatCard value="10k+" label="Deals" />
            <StatCard value="8" label="Cities" />
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h2>
              <p className="text-slate-500 dark:text-slate-400">Join the marketplace today</p>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                {success}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  required
                />
              </div>

              {/* CNIC with Tooltip */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">CNIC Number</label>
                  <div className="group relative flex items-center">
                    <Info size={16} className="text-slate-400 cursor-help" />
                    <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Your CNIC is required for identity verification to ensure a safe experience for everyone.
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  placeholder="00000-0000000-0"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  required
                />
                <p className="mt-1.5 text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#069668]" />
                  Identity verification helps prevent fraud and builds trust.
                </p>
              </div>

              {/* Seller Toggle */}
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Store size={20} className="text-[#069668]" />
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Register as Seller</label>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Sell products on .بازار marketplace</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSeller(!isSeller)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isSeller ? 'bg-[#069668]' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isSeller ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Seller Fields - Only show when isSeller is true */}
              {isSeller && (
                <div className="space-y-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
                    <Store size={16} />
                    Seller Information
                  </h3>

                  {/* Store Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleInputChange}
                      placeholder="Enter your store name"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                      required={isSeller}
                    />
                  </div>

                  {/* Pickup Address */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Pickup Address</label>
                    <input
                      type="text"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      placeholder="Where customers can pick up items"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                      required={isSeller}
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Complete address"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                      required={isSeller}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                      required={isSeller}
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 rounded text-[#069668] focus:ring-[#069668] border-slate-300 bg-slate-50"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  By registering, I agree to the <Link href="#" className="text-[#069668] hover:underline font-medium">Terms of Service</Link> and <Link href="#" className="text-[#069668] hover:underline font-medium">Privacy Policy</Link>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#069668] hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group"
              >
                Create Account
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-[#069668] font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Floating Button */}
      <button className="fixed bottom-6 right-6 bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#069668] transition-transform hover:scale-110">
        <HeadphonesIcon size={24} />
      </button>
    </main>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-emerald-100 text-sm">{label}</div>
    </div>
  );
}
