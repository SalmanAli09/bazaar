import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import StatBox from '@/components/StatBox';
import { ArrowLeft, MessageSquare, Verified, Star, MapPin, Calendar } from 'lucide-react';
 
export default function ProfilePage() {
  const activeListings = [
    { id: 5, title: "Gently Used Khaadi Lawn Suit", price: "2,500", originalPrice: "5,800", location: "Karachi", time: "1w ago", tag: "Like New", featured: true },
    { id: 6, title: "Alchemist + Forty Rules Combo", price: "600", originalPrice: "", location: "Karachi", time: "2w ago", tag: "Like New" },
    { id: 7, title: "Honda CD 70 - 2022 Model", price: "45,000", originalPrice: "78,000", location: "Karachi", time: "1w ago", tag: "Good" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 transition-colors group text-sm font-medium">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Bazaar
        </button>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold dark:text-white">Ahmed Khan</h1>
                <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Verified size={12} /> Verified
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 dark:text-slate-400 text-sm">
                <span className="flex items-center gap-1"><MapPin size={14} /> Karachi</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> Joined March 2024</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm font-bold ml-1 dark:text-white">4.8</span>
              </div>
            </div>
          </div>
          
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
            <MessageSquare size={20} />
            Chat with Ahmed
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatBox value="12" label="Listings" />
          <StatBox value="35" label="Sales" />
          <StatBox value="47" label="Reviews" />
          <StatBox value="4.8" label="Rating" />
        </div>

        {/* Active Listings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold dark:text-white">Active Listings (3)</h2>
            <button className="text-emerald-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeListings.map(item => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold dark:text-white">Reviews (2)</h2>
            <button className="text-slate-500 dark:text-slate-400 text-sm font-semibold flex items-center gap-1 hover:text-emerald-600">
              Filter by: Most Recent
            </button>
          </div>
          <div className="space-y-4">
            <ReviewCard 
              name="Ayesha Siddiqui" 
              initials="AS" 
              color="bg-emerald-500" 
              time="6d ago" 
              content="Excellent seller! The lawn suit was exactly as described. Fabric quality is amazing and it was packed very carefully." 
            />
            <ReviewCard 
              name="Zainab Malik" 
              initials="ZM" 
              color="bg-rose-500" 
              time="1w ago" 
              content="Both novels are in near-perfect condition. Ahmed even threw in a bookmark. Fast meetup in Clifton." 
            />
          </div>
          <button className="w-full mt-6 py-3 text-slate-500 dark:text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl hover:border-emerald-500 hover:text-emerald-500 transition-all">
            View All Reviews
          </button>
        </section>
      </main>
    </div>
  );
}