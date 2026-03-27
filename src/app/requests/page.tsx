"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  Plus,
  X,
  ShieldCheck,
  Share2,
  MessageSquare,
  ShieldAlert,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Category {
  category_id: string;
  name: string;
}

export default function RequestItemPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    budget_max: "",
    description: "",
  });
  const [referenceImages, setReferenceImages] = useState<{ preview: string; file: File }[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length && referenceImages.length + i < 4; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        setReferenceImages((prev) => [...prev, { preview, file }].slice(0, 4));
      }
    }
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setReferenceImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "requests");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      return res.ok ? data.url : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login to post a request");
      router.push("/login");
      return;
    }

    if (!formData.title) {
      setError("Please enter what you're looking for");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Upload first image if present
      let imageUrl: string | null = null;
      if (referenceImages.length > 0) {
        imageUrl = await uploadImage(referenceImages[0].file);
      }

      const res = await fetch("/api/buyer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_id: user.user_id,
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id || null,
          budget_max: formData.budget_max || null,
          request_reference_image: imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to post request");
        return;
      }

      setSuccess("Request posted successfully! Sellers will be notified.");
      setFormData({ title: "", category_id: "", budget_max: "", description: "" });
      setReferenceImages([]);
      setTimeout(() => router.push("/buyers/request"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102212] transition-colors duration-300">
      {/* Hero Section */}
      <section className="w-full bg-primary/10 dark:bg-primary/5 py-16 px-6 border-b border-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Post a request and let our community of sellers find it for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 lg:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm font-medium">
              {success}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Form Fields */}
            <div className="flex-1 space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Request Details
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Help sellers understand exactly what&apos;s missing from your collection.
                </p>
              </div>

              {/* Item Title */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  What are you looking for?
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Vintage 90s Levi's Denim Jacket"
                  className="w-full rounded-xl border-primary border focus:ring-2 focus:ring-primary focus:border-transparent h-14 px-5 dark:text-white transition-all outline-none"
                />
              </div>

              {/* Category & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category_id: e.target.value }))}
                      className="w-full rounded-xl border-primary border focus:ring-2 focus:ring-primary h-14 px-5 appearance-none dark:text-white outline-none"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Maximum Budget (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.budget_max}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget_max: e.target.value }))}
                    placeholder="e.g. 5000"
                    className="w-full rounded-xl border-primary border focus:ring-2 focus:ring-primary h-14 px-5 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Details Textarea */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Details & Requirements
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Mention size, color preference, or any specific details..."
                  className="w-full rounded-xl border-primary border focus:ring-2 focus:ring-primary p-5 dark:text-white outline-none resize-none"
                />
              </div>
            </div>

            {/* Right: Upload Area */}
            <div className="w-full lg:w-80 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Reference Photos
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Upload up to 4 images of similar items so sellers know exactly what you&apos;re looking for.
                </p>
              </div>

              {referenceImages.length === 0 ? (
                <label className="aspect-square border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={28} />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Upload Reference
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    PNG, JPG up to 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {referenceImages.map((img, index) => (
                    <div key={index} className="aspect-square rounded-2xl overflow-hidden relative group border border-slate-100 dark:border-slate-800">
                      <img
                        src={img.preview}
                        alt={`Reference ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {referenceImages.length < 4 && (
                    <label className="aspect-square border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary transition-all cursor-pointer">
                      <Plus size={24} />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
              <ShieldCheck className="text-[var(--primary-dark)]" size={20} />
              <span>Broadcast visible to vetted sellers for 30 days.</span>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => router.back()}
                className="flex-1 md:flex-none px-8 py-4 font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 md:flex-none px-12 py-4 bg-[var(--primary-dark)] text-white font-extrabold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "Post Request"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureItem
            icon={<Share2 size={32} />}
            title="Reach 500+ Sellers"
            desc="Your request is broadcasted to our network of professional vintage curators and thrift experts."
          />
          <FeatureItem
            icon={<MessageSquare size={32} />}
            title="Direct Offers"
            desc="Sellers will message you with pictures and prices for items they have that match your request."
          />
          <FeatureItem
            icon={<ShieldAlert size={32} />}
            title="Secure Buy"
            desc="Once you find the perfect item, complete the purchase through .بازار's protected checkout."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center md:text-left">
      <div className="text-primary mb-5 flex justify-center md:justify-start">
        {icon}
      </div>
      <h4 className="font-extrabold text-xl text-slate-900 dark:text-white mb-3">
        {title}
      </h4>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}
