import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Tag, 
  Maximize2, 
  CreditCard, 
  CheckCircle2, 
  Flag 
} from 'lucide-react';

export default function ChatProductDetails() {
  return (
    <div className="p-6">
      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-6">
        Transaction Tools
      </h4>

      {/* Product Summary Card */}
      <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white mb-8 shadow-sm">
        <div className="relative h-44 group cursor-pointer">
          <img
            alt="Product"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1583394838336-acd977730f90?q=80&w=500&auto=format&fit=crop" 
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#11d421] border border-[#11d421]/20 shadow-sm">
            Excellent Condition
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="text-white" size={24} />
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-[15px] text-slate-800 mb-1 truncate">
            Gently Used Khaadi Lawn Suit
          </h3>
          <p className="text-xl font-bold text-[#11d421] mb-4">Rs. 3,500</p>
          
          <div className="space-y-2.5">
            <DetailRow icon={<Tag size={14} />} label="Category" value="Ethnic Wear" />
            <DetailRow icon={<ShieldCheck size={14} />} label="Size" value="Medium" />
            <DetailRow icon={<MapPin size={14} />} label="Location" value="Karachi" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full py-3.5 bg-[#11d421] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0fa31a] transition-all shadow-lg shadow-[#11d421]/20">
          <CreditCard size={18} />
          Make an Offer
        </button>
        
        <button className="w-full py-3 bg-white text-[#11d421] border-2 border-[#11d421]/20 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#11d421]/5 hover:border-[#11d421]/40 transition-all">
          <CheckCircle2 size={18} />
          Mark as Sold
        </button>

        <div className="pt-6 mt-6 border-t border-slate-100">
          <button className="w-full py-3 text-slate-400 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 transition-all">
            <Flag size={18} />
            Report User
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
            All transactions are monitored to keep the <br /> Bazaar community safe.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable row for product specifications
 */
function DetailRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-semibold text-slate-700">{value}</span>
    </div>
  );
}