import { Heart, Users, Recycle, ShieldCheck, Target, Zap } from "lucide-react";

const values = [
  { icon: Heart, title: "Community First", desc: "We build for the people of Pakistan — connecting neighbors, cities, and communities through commerce." },
  { icon: Recycle, title: "Sustainability", desc: "Every item resold is one less in a landfill. We're making second-hand the smart choice." },
  { icon: ShieldCheck, title: "Trust & Safety", desc: "Verified sellers, secure transactions, and identity checks keep our marketplace safe." },
  { icon: Zap, title: "Simplicity", desc: "List in 60 seconds. Buy in a tap. We remove friction from buying and selling." },
];

const stats = [
  { value: "50k+", label: "Active Users" },
  { value: "100k+", label: "Items Sold" },
  { value: "500+", label: "Verified Sellers" },
  { value: "8", label: "Cities" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Pakistan&apos;s Thrift<br />
            <span className="text-emerald-400">Marketplace</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            .بازار is reimagining how Pakistan buys and sells second-hand. We&apos;re building the most trusted platform for pre-loved goods — where quality meets affordability.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 text-center shadow-lg">
              <p className="text-3xl font-black text-emerald-600">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Our Story</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-4">
          Born in 2025, .بازار started with a simple observation: Pakistan&apos;s second-hand market was scattered across social media groups, lacking trust and structure. We set out to change that.
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
          Today, we&apos;re the fastest-growing thrift marketplace in the country — connecting thousands of buyers and sellers with verified identities, secure payments, and a community-first approach.
        </p>
      </section>

      {/* Values */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">What We Stand For</h2>
            <p className="text-slate-500">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Users size={40} className="text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Join Our Team</h2>
          <p className="text-slate-500 mb-6">We&apos;re always looking for passionate people who want to shape the future of commerce in Pakistan.</p>
          <a href="/careers" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all">
            <Target size={18} /> View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
