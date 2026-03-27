import { Leaf, Recycle, TreePine, Droplets, TrendingDown, Globe } from "lucide-react";

const impacts = [
  { icon: TrendingDown, value: "120 tons", label: "Textile Waste Prevented", color: "text-emerald-600 bg-emerald-50" },
  { icon: Droplets, value: "5M liters", label: "Water Saved", color: "text-blue-600 bg-blue-50" },
  { icon: TreePine, value: "8,500", label: "CO₂ kg Offset", color: "text-green-600 bg-green-50" },
  { icon: Recycle, value: "100k+", label: "Items Given Second Life", color: "text-amber-600 bg-amber-50" },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 rounded-full -ml-48 -mb-48 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Leaf size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Sustainability at .بازار</h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">
            Every item resold is a step toward a greener Pakistan. We&apos;re building a circular economy, one transaction at a time.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impacts.map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 text-center shadow-lg">
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}>
                <item.icon size={22} />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{item.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Our Green Mission</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            Pakistan generates millions of tons of textile and electronic waste annually. By enabling second-hand commerce, .بازار directly reduces waste going to landfills while making quality goods affordable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-800">
            <Globe size={28} className="text-emerald-600 mb-4" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Circular Economy</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We keep products in circulation longer. When you sell on .بازار instead of discarding, you extend the lifecycle of goods and reduce demand for new manufacturing.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-8 border border-blue-100 dark:border-blue-800">
            <Droplets size={28} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Resource Conservation</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Making a single cotton t-shirt uses 2,700 liters of water. Every second-hand clothing purchase on our platform saves precious resources.
            </p>
          </div>
        </div>
      </section>

      {/* Pledge */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Leaf size={40} className="text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Join the Movement</h2>
          <p className="text-slate-500 mb-6">
            Every transaction on .بازار contributes to a sustainable future. List your unused items today and be part of the change.
          </p>
          <a href="/post-ad" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all">
            <Recycle size={18} /> Start Selling
          </a>
        </div>
      </section>
    </div>
  );
}
