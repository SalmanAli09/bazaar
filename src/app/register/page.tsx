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
  User,
  MapPin,
  Phone,
  Upload,
} from 'lucide-react';

export default function RegisterPage() {
  const [isSeller, setIsSeller] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cnic: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    storeName: '',
    storeAddress: '',
    storeBannerImage: null as File | null,
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', { ...formData, role: isSeller ? 'seller' : 'buyer' });
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
          <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <ShoppingBag className="text-white" size={24} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold mb-8">Bazaar</h2>
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

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <Eye size={18} />
                  </button>
                </div>
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
                  placeholder="00000-0000000-0"
                  value={formData.cnic}
                  onChange={(e) => handleInputChange('cnic', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                />
                <p className="mt-1.5 text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#069668]" />
                  Identity verification helps prevent fraud and builds trust.
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Address</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* City and Country */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">City</label>
                  <input
                    type="text"
                    placeholder="Karachi"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Country</label>
                  <input
                    type="text"
                    placeholder="Pakistan"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* Seller Toggle */}
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSeller ? 'bg-[#069668] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                      {isSeller ? <Store size={20} /> : <User size={20} />}
                    </div>
                    <div>
                      <label className="font-medium text-slate-900 dark:text-white">Register as Seller</label>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Sell items on Bazaar marketplace</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSeller(!isSeller)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSeller ? 'bg-[#069668]' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSeller ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                  </button>
                </div>
              </div>

              {/* Seller Specific Fields */}
              {isSeller && (
                <div className="space-y-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <Store size={18} className="text-[#069668]" />
                    Store Information
                  </h3>

                  {/* Store Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Store Name</label>
                    <input
                      type="text"
                      placeholder="Enter your store name"
                      value={formData.storeName}
                      onChange={(e) => handleInputChange('storeName', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                    />
                  </div>

                  {/* Store Address */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Store Address</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Enter store pickup address"
                        value={formData.storeAddress}
                        onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Store Banner Image */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Store Banner Image</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInputChange('storeBannerImage', e.target.files?.[0] || null)}
                        className="hidden"
                        id="store-banner"
                      />
                      <label
                        htmlFor="store-banner"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#069668] dark:text-white transition-all outline-none cursor-pointer flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <span className="text-slate-500 dark:text-slate-400">
                          {formData.storeBannerImage ? formData.storeBannerImage.name : 'Choose banner image'}
                        </span>
                        <Upload size={18} className="text-slate-400" />
                      </label>
                    </div>
                  </div>
                </div>
              )}



              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
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