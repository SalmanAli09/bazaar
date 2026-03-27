"use client";

import React, { useState, useEffect } from "react";
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

interface BuyerRequest {
  id: string;
  buyer_id: string;
  user: string;
  title: string;
  description: string;
  budget_max: number | null;
  category_id: string | null;
  category_name: string;
  is_active: boolean;
  request_reference_image: string | null;
  created_at: string;
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - date.getTime());
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

function RequestSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row gap-8 animate-pulse"
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-2">
                <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-xl" />
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            </div>
            <div className="h-12 w-40 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          </div>
          <div className="w-full md:w-56 h-56 md:h-auto bg-slate-200 dark:bg-slate-700 rounded-[1.5rem]" />
        </div>
      ))}
    </div>
  );
}

export default function RequestFeed() {
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(null);

  useEffect(() => {
    fetch("/api/buyer-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data.requests || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleOpenOffer = (request: BuyerRequest) => {
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
              Browse through active requests from buyers looking for specific
              items in our community.
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
            {loading ? "..." : `${requests.length} Requests Found`}
          </div>
        </div>

        {/* Request Feed */}
        {loading ? (
          <RequestSkeleton />
        ) : requests.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
              No active requests yet
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Check back soon — buyers are always looking for items!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onOpenOffer={() => handleOpenOffer(req)}
              />
            ))}
          </div>
        )}
      </main>

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

function RequestCard({
  request,
  onOpenOffer,
}: {
  request: BuyerRequest;
  onOpenOffer: () => void;
}) {
  const initials = request.user
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold border-2 border-primary/20">
              {initials}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {request.user}
              </h4>
              <span className="text-[11px] text-slate-400 font-bold uppercase">
                {getTimeAgo(request.created_at)}
              </span>
            </div>
          </div>

          {request.budget_max && request.budget_max > 10000 ? (
            <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
              <Bolt size={12} fill="currentColor" /> High Budget
            </span>
          ) : (
            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
              <Clock size={12} /> Active
            </span>
          )}
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 transition-colors">
          {request.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
          {request.description || "No additional details provided."}
        </p>

        <div className="flex flex-wrap gap-3 items-center mb-8">
          {request.budget_max && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
              <Tag size={14} className="text-primary" />
              Up to Rs. {request.budget_max.toLocaleString()}
            </div>
          )}
          {request.category_name && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
              <MapPin size={14} className="text-primary" />
              {request.category_name}
            </div>
          )}
        </div>

        <button
          onClick={onOpenOffer}
          className="w-full md:w-auto bg-[var(--primary-dark)] text-white font-black px-10 py-3.5 rounded-2xl hover:bg-primaryDark transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
        >
          Send an Offer
        </button>
      </div>

      <div className="w-full md:w-56 h-56 md:h-auto shrink-0 rounded-[1.5rem] overflow-hidden relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-50 dark:border-slate-800">
        {request.request_reference_image ? (
          <>
            <img
              src={request.request_reference_image}
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

function FilterButton({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20">
      {icon} {label} <ChevronDown size={14} />
    </button>
  );
}

function MobileNavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      className={`flex flex-col items-center gap-1 ${
        active ? "text-primary" : "text-slate-400"
      }`}
      href="#"
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">
        {label}
      </span>
    </a>
  );
}
