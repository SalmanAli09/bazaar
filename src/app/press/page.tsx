import { Newspaper, Download, Mail, ExternalLink } from "lucide-react";

const pressReleases = [
  {
    date: "March 2026",
    title: ".بازار Crosses 50,000 Active Users",
    excerpt: "Pakistan's fastest-growing thrift marketplace reaches a major milestone, with over 100,000 items sold across 8 cities.",
  },
  {
    date: "January 2026",
    title: "Secure Payments Launched on .بازار",
    excerpt: "New in-app payment system with buyer protection and escrow ensures safer transactions for all users.",
  },
  {
    date: "November 2025",
    title: ".بازار Expands to 5 New Cities",
    excerpt: "Following success in Lahore and Karachi, the platform now serves Islamabad, Rawalpindi, Peshawar, Faisalabad, and Quetta.",
  },
  {
    date: "August 2025",
    title: ".بازار Launches with CNIC-Verified Sellers",
    excerpt: "Pakistan's first thrift marketplace with mandatory identity verification launches, setting new trust standards.",
  },
];

const mediaKit = [
  { label: "Brand Guidelines", format: "PDF" },
  { label: "Logo Pack", format: "ZIP" },
  { label: "Product Screenshots", format: "ZIP" },
  { label: "Founder Photos", format: "ZIP" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full -mt-80 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Newspaper size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Press & Media</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Latest news, press releases, and media resources from .بازار
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Press Releases</h2>
        <div className="space-y-6">
          {pressReleases.map((pr, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">{pr.date}</p>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">{pr.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{pr.excerpt}</p>
                </div>
                <ExternalLink size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Kit */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Media Kit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaKit.map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.format}</p>
                </div>
                <Download size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Media Inquiries</h2>
        <p className="text-slate-500 mb-6 max-w-lg mx-auto">
          For press inquiries, interviews, or partnership opportunities, reach out to our communications team.
        </p>
        <a href="mailto:press@bazaar.pk" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-all">
          <Mail size={18} /> press@bazaar.pk
        </a>
      </section>
    </div>
  );
}
