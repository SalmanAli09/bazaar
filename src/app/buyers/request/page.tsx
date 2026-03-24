"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Tag,
  Bolt,
  Clock,
  ChevronDown,
  ImageOff,
  Home,
  PlusCircle,
  User,
  Zap,
  List,
} from "lucide-react";
import OfferModal from "@/components/modals/offerModal";

// Mock Data for Requests
const REQUESTS = [
  {
    id: 1,
    user: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    posted: "2 hours ago",
    urgency: "high",
    title: "Looking for Vintage Leather Jacket",
    desc: "I am looking for a worn-in 90s style leather jacket, preferably black or dark brown. Size Medium. Needed for a themed birthday event next weekend!",
    budget: "$100 - $150",
    location: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5ded1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    user: "Marcus Lee",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    posted: "5 hours ago",
    urgency: "regular",
    title: "Original 1970s Band Tees",
    desc: "Collector looking for authentic 70s rock band tour shirts. Must be genuine vintage, not reprints. Size Large or XL. Looking for Led Zeppelin or Pink Floyd.",
    budget: "$200 - $500",
    location: "Austin, TX",
    image: null,
  },
  {
    id: 3,
    user: "David Rossi",
    avatar: "https://i.pravatar.cc/150?u=david",
    posted: "1 day ago",
    urgency: "high",
    title: "Retro Game Boy Color (Atomic Purple)",
    desc: "In search of a working Game Boy Color in Atomic Purple. Minimal scratches on screen preferred. Needed for a gift by Friday!",
    budget: "$75 - $100",
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=400&auto=format&fit=crop",
  },
];

export default function RequestFeed() {
  // --- 1. Move Modal State to Parent ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleOpenOffer = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102212] transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-12">
        {/* Hero Banner */}
        <section className="mb-8 rounded-[2rem] overflow-hidden relative min-h-[180px] flex items-center bg-primary/10 dark:bg-primary/5 border border-primary/10">
          <div className="relative z-10 p-8 md:p-12 w-full">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white max-w-lg leading-tight">
              Help customers find what they need and{" "}
              <span className="text-primary">make a sale!</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm font-medium max-w-md">
              Browse through active requests from buyers looking for specific items in our community.
            </p>
          </div>
          <div className="absolute right-[-5%] top-[-10%] opacity-10 select-none">
            <Zap size={200} className="text-primary" fill="currentColor" />
          </div>
        </section>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterButton label="Category" icon={<Tag size={16} />} />
            <FilterButton label="Budget" icon={<Tag size={16} />} />
            <FilterButton label="Location" icon={<MapPin size={16} />} />
          </div>
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider pr-2">
            124 Requests Found
          </div>
        </div>

        {/* Request Feed */}
        <div className="space-y-6">
          {REQUESTS.map((req) => (
            // --- 2. Pass handleOpenOffer to the Card ---
            <RequestCard 
              key={req.id} 
              request={req} 
              onOpenOffer={() => handleOpenOffer(req)} 
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-10 py-4 rounded-full border-2 border-primary text-primary font-extrabold hover:bg-primary hover:text-white transition-all transform active:scale-95">
            Load More Requests
          </button>
        </div>
      </main>

      {/* --- 3. Render Modal Once at Root Level --- */}
      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        requestData={selectedRequest}
      />

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-around py-4 px-2 z-50">
        <MobileNavItem icon={<Home size={20} />} label="Home" />
        <MobileNavItem icon={<Search size={20} />} label="Browse" active />
        <MobileNavItem icon={<PlusCircle size={20} />} label="List" />
        <MobileNavItem icon={<List size={20} />} label="My Items" />
        <MobileNavItem icon={<User size={20} />} label="Profile" />
      </nav>
    </div>
  );
}

function RequestCard({ request, onOpenOffer }: { request: any; onOpenOffer: () => void }) {
  // Destructure from request object
  const { user, avatar, posted, urgency, title, desc, budget, location, image } = request;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={user}
              className="size-11 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {user}
              </h4>
              <span className="text-[11px] text-slate-400 font-bold uppercase">
                {posted}
              </span>
            </div>
          </div>

          {urgency === "high" ? (
            <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
              <Bolt size={12} fill="currentColor" /> High Urgency
            </span>
          ) : (
            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
              <Clock size={12} /> Regular
            </span>
          )}
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2  transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
          {desc}
        </p>

        <div className="flex flex-wrap gap-3 items-center mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
            <Tag size={14} className="text-primary" />
            {budget}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
            <MapPin size={14} className="text-primary" />
            {location}
          </div>
        </div>

        <button
          onClick={onOpenOffer} // Calls the parent function
          className="w-full md:w-auto bg-[var(--primary-dark)] text-white font-black px-10 py-3.5 rounded-2xl hover:bg-primaryDark transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
        >
          Send an Offer
        </button>
      </div>

      <div className="w-full md:w-56 h-56 md:h-auto shrink-0 rounded-[1.5rem] overflow-hidden relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-50 dark:border-slate-800">
        {image ? (
          <>
            <img
              src={image}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Ref"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
              Reference Photo
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ImageOff size={32} strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase">No Image</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper components remain the same
function FilterButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20">
      {icon} {label} <ChevronDown size={14} />
    </button>
  );
}

function MobileNavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-slate-400"}`} href="#">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </a>
  );
}