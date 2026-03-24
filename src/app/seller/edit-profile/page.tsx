"use client";

import React, { useState } from "react";
import {
  Store,
  LayoutDashboard,
  Package,
  FileText,
  BarChart3,
  Search,
  Bell,
  Camera,
  Pencil,
  BadgeCheck,
  User,
  MapPin,
  Share2,
  AtSign,
  Globe,
  Save,
  Lightbulb,
  Star,
  X
} from "lucide-react";

export default function SellerProfileEditor() {
  // --- State Management ---
  const [formData, setFormData] = useState({
    storeName: "Vintage Vault",
    personalName: "Alex Rivera",
    bio: "Curated vintage collection from the 90s and early 2000s. Based in NYC. Sustainable fashion is the future!",
    phone: "+1 (555) 0123-4567",
    city: "New York City",
    address: "123 Brooklyn St, Apartment 4B",
    instagram: "@vintagevault_nyc",
    facebook: "facebook.com/vintagevault",
  });

  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Alex");
  const [cover, setCover] = useState("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const bioLimit = 160;

  return (
    <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102212] font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
     

      <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-10">
        <div className="mb-10">
          <h2 className="text-4xl font-black tracking-tight">Edit Store Profile</h2>
          <p className="text-slate-500 font-medium mt-1">Manage your shop presence and how buyers see you.</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-8 pb-32">
            
            {/* Branding Section */}
            <div className="overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-xl shadow-black/5 border border-primary/5">
              <div 
                className="relative h-56 w-full bg-cover bg-center group transition-all duration-500"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${cover}')` }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-black shadow-2xl hover:scale-105 transition-transform text-slate-900">
                    <Camera className="size-4" /> Change Cover
                  </button>
                </div>
              </div>
              <div className="relative px-8 pb-8">
                <div className="absolute -top-16 left-8 size-32 rounded-[2rem] border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden group/avatar bg-white">
                  <img src={avatar} className="h-full w-full object-cover" alt="Profile" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 bg-black/40 transition-opacity cursor-pointer text-white">
                    <Pencil className="size-6" />
                  </div>
                </div>
                <div className="pt-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black">{formData.storeName}</h3>
                      <BadgeCheck className="text-blue-500 size-6 fill-blue-500/10" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">Update your shop images to build brand trust.</p>
                  </div>
                  <button className="rounded-xl border-2 border-slate-100 dark:border-slate-800 px-6 py-2.5 text-sm font-black hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    Upload New Avatar
                  </button>
                </div>
              </div>
            </div>

            {/* General Info */}
            <section className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl shadow-black/5 border border-primary/5 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <User className="size-6" />
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">General Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Store Name</label>
                  <input name="storeName" value={formData.storeName} onChange={handleInputChange} className="w-full rounded-xl border-none bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary transition-all font-bold h-12 px-4" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Personal Name</label>
                  <input name="personalName" value={formData.personalName} onChange={handleInputChange} className="w-full rounded-xl border-none bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary transition-all font-bold h-12 px-4" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Store Bio</label>
                    <span className={`text-[10px] font-bold ${formData.bio.length > bioLimit ? 'text-red-500' : 'text-slate-400'}`}>
                      {formData.bio.length}/{bioLimit}
                    </span>
                  </div>
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full rounded-xl border-none bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary transition-all font-medium p-4" />
                </div>
              </div>
            </section>

            {/* Contact & Location */}
            <section className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl shadow-black/5 border border-primary/5 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="size-6" />
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Contact & Location</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">City</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-xl border-none bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary h-12 px-4 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pickup Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} className="w-full rounded-xl border-none bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary h-12 px-4 font-bold" />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - Live Preview */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 shadow-2xl border border-primary/5">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.2em]">Live Preview</h3>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
                </div>
                
                {/* Search Result Card Preview */}
                <div className="rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-lg bg-white dark:bg-slate-900">
                  <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url('${cover}')` }}></div>
                  <div className="px-5 pb-5">
                    <div className="flex justify-between items-start -mt-8">
                      <div className="size-16 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-200 overflow-hidden shadow-md">
                        <img src={avatar} className="h-full w-full object-cover" alt="Preview" />
                      </div>
                      <div className="mt-10 flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                        <Star className="text-yellow-500 fill-yellow-500" size={12} />
                        <span className="text-[10px] font-black">4.9 (24)</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-1">
                        <h4 className="font-black text-sm">{formData.storeName || "Your Store"}</h4>
                        <BadgeCheck className="text-blue-500 size-4 fill-blue-500/10" />
                      </div>
                      <p className="text-[11px] font-medium text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {formData.bio || "No bio yet..."}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-16 w-1/3 rounded-xl bg-slate-50 dark:bg-slate-800 animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tip Card */}
              <div className="rounded-3xl bg-primary/5 p-6 border border-primary/10 flex gap-4">
                <div className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-primary mb-1 uppercase tracking-tight">Pro Tip</h4>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                    Personalizing your city and bio increases local pickup requests by nearly 40%!
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-slate-100 dark:border-slate-800 bg-white/90 backdrop-blur-xl dark:bg-[#102212]/90 px-4 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6">
          <button className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-red-500 transition-colors">
            <X size={16} /> Discard
          </button>
          <button className="flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-black text-slate-900 shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}