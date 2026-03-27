import { ShieldCheck, MapPin, CreditCard, MessageCircle, AlertTriangle, Eye } from "lucide-react";

const tips = [
  {
    icon: MapPin,
    title: "Meet in Public Places",
    desc: "Always meet buyers or sellers in well-lit, busy public locations. Police stations, malls, and coffee shops are ideal meeting spots.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Eye,
    title: "Inspect Before You Pay",
    desc: "Thoroughly check the item's condition, authenticity, and functionality before completing the transaction. Don't rush.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: CreditCard,
    title: "Use Secure Payments",
    desc: "Prefer in-app payments or bank transfers with receipts. Avoid sending money to unknown accounts or via untraceable methods.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: MessageCircle,
    title: "Communicate on Platform",
    desc: "Keep all conversations within .بازار. This protects you with a record of agreements if any disputes arise.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: AlertTriangle,
    title: "Trust Your Instincts",
    desc: "If a deal seems too good to be true, it probably is. Watch for red flags like pressure to pay quickly or refusal to meet in person.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: ShieldCheck,
    title: "Verify Seller Profiles",
    desc: "Check seller ratings, reviews, and verification badges before buying. Established sellers with good track records are safer.",
    color: "bg-teal-50 text-teal-600",
  },
];

export default function SafeTradingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Safe Trading Tips</h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">
            Your safety is our priority. Follow these guidelines to have a secure trading experience on .بازار
          </p>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 hover:shadow-xl transition-all group">
              <div className={`w-14 h-14 rounded-2xl ${tip.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <tip.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{tip.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Report Suspicious Activity</h2>
        <p className="text-slate-500 max-w-lg mx-auto mb-6">
          If you encounter fraudulent behavior or feel unsafe, contact our support team immediately.
        </p>
        <a href="mailto:support@bazaar.pk" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all">
          <MessageCircle size={18} /> Contact Support
        </a>
      </section>
    </div>
  );
}
