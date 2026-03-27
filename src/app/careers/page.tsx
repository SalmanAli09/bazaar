"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send,
  Sparkles,
  Heart,
} from "lucide-react";

interface Job {
  job_id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  created_at: string;
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return "Today";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

const deptColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Design: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Marketing: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Operations: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const perks = [
  { icon: Sparkles, title: "Flexible Hours", desc: "Work when you're most productive" },
  { icon: Heart, title: "Health Benefits", desc: "Medical coverage for you and family" },
  { icon: Building2, title: "Hybrid Work", desc: "Office + remote flexibility" },
  { icon: Briefcase, title: "Growth Budget", desc: "Annual learning & development fund" },
];

function JobsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-6 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              <div className="flex gap-3">
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
            <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterDept, setFilterDept] = useState("all");

  useEffect(() => {
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const departments = ["all", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const filtered = filterDept === "all" ? jobs : jobs.filter((j) => j.department === filterDept);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full -ml-48 -mb-48 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-bold mb-6">
            <Briefcase size={16} /> We&apos;re Hiring
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Build the Future of<br />
            <span className="text-emerald-400">Commerce in Pakistan</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Join a passionate team that&apos;s reimagining how millions buy and sell. We move fast, think big, and care deeply.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {perks.map((perk, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 text-center shadow-lg">
              <perk.icon size={22} className="text-emerald-600 mx-auto mb-2" />
              <p className="font-bold text-sm text-slate-900 dark:text-white">{perk.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Open Positions</h2>
            <p className="text-slate-500 mt-1">
              {loading ? "Loading..." : `${filtered.length} role${filtered.length !== 1 ? "s" : ""} available`}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterDept === dept
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {dept === "all" ? "All" : dept}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <JobsSkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <Briefcase size={40} className="text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-bold text-slate-500">No open positions right now</p>
            <p className="text-sm text-slate-400 mt-1">Check back soon — we&apos;re growing fast!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job) => {
              const isExpanded = expandedId === job.job_id;
              const deptColor = deptColors[job.department] || "bg-slate-100 text-slate-600";

              return (
                <div
                  key={job.job_id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all ${
                    isExpanded
                      ? "border-emerald-200 dark:border-emerald-800 shadow-lg shadow-emerald-500/5"
                      : "border-slate-100 dark:border-slate-800 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : job.job_id)}
                    className="w-full p-6 flex items-start justify-between text-left"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${deptColor}`}>
                          {job.department}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock size={14} /> {job.type}
                        </span>
                        <span className="text-slate-300 text-xs">
                          Posted {getTimeAgo(job.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={20} className="text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                            About the Role
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                            {job.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                            Requirements
                          </h4>
                          <ul className="space-y-2">
                            {(job.requirements || "").split("\n").filter(Boolean).map((req, i) => (
                              <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-400">
                          Send your resume and a short cover letter
                        </p>
                        <a
                          href={`mailto:careers@bazaar.pk?subject=Application: ${job.title}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all text-sm"
                        >
                          <Send size={16} /> Apply Now
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
          Don&apos;t see your role?
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto mb-6">
          We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future openings.
        </p>
        <a
          href="mailto:careers@bazaar.pk?subject=General Application"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-all"
        >
          <Send size={18} /> Send General Application
        </a>
      </section>
    </div>
  );
}
