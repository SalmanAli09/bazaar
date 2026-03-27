"use client";

import React, { useState } from 'react';
import {
  X,
  Banknote,
  Send,
  Loader2,
  Camera,
  Plus,
  Image as ImageIcon,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: {
    id: string;
    title: string;
    budget_max?: number | null;
    description?: string;
    request_reference_image?: string | null;
  } | null;
}

export default function OfferModal({ isOpen, onClose, requestData }: OfferModalProps) {
  const { user } = useAuth();
  const [offeredPrice, setOfferedPrice] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<{ preview: string; file: File }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen || !requestData) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length && images.length + i < 4; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        setImages((prev) => [...prev, { preview, file }].slice(0, 4));
      }
    }
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', 'offers');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      return res.ok ? data.url : null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!user?.seller_id) {
      setError('You must be logged in as a seller to send offers.');
      return;
    }
    if (!offeredPrice || parseFloat(offeredPrice) <= 0) {
      setError('Please enter a valid offer price.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload images
      const imageUrls: string[] = [];
      for (const img of images) {
        const url = await uploadImage(img.file);
        if (url) imageUrls.push(url);
      }

      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_id: user.seller_id,
          buyer_request_id: requestData.id,
          offered_price: offeredPrice,
          seller_message: message,
          image_urls: imageUrls,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send offer');
        return;
      }

      setSuccess('Offer sent successfully!');
      setTimeout(() => {
        setSuccess('');
        setOfferedPrice('');
        setMessage('');
        setImages([]);
        onClose();
      }, 1500);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative max-w-[850px] w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Send an Offer</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Respond to the customer&apos;s request with your best match.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">{error}</div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">{success}</div>
          )}

          {/* Request Summary */}
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Customer Request Summary</h3>
            <div className="bg-[#f6f8f6] dark:bg-slate-800/40 rounded-3xl p-6 flex flex-col md:flex-row gap-6 border border-primary/10">
              <div className="flex-1 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-[var(--primary-dark)] uppercase tracking-wider bg-[var(--primary-dark)]/10 px-2 py-0.5 rounded">Requested Item</span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">{requestData.title}</h2>
                </div>
                {requestData.budget_max && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Banknote size={18} className="text-[var(--primary-dark)]" />
                    <span className="text-sm font-medium">Budget: <span className="font-bold text-slate-900 dark:text-white">Up to Rs. {requestData.budget_max.toLocaleString()}</span></span>
                  </div>
                )}
                {requestData.description && (
                  <p className="text-sm text-slate-500 leading-relaxed">{requestData.description}</p>
                )}
              </div>
              {requestData.request_reference_image && (
                <div
                  className="w-full md:w-32 h-32 rounded-2xl bg-center bg-cover border border-slate-200 dark:border-slate-700 shadow-inner shrink-0"
                  style={{ backgroundImage: `url(${requestData.request_reference_image})` }}
                />
              )}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Upload Photos */}
            <div className="lg:col-span-7 space-y-4">
              <label className="block">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Upload Photos of Your Item</span>
                <p className="text-xs text-slate-500 font-medium mb-3 mt-1">Show the buyer what you have (up to 4 photos)</p>
                <div className="group border-2 border-slate-200 dark:border-slate-700 border-dashed rounded-[2rem] p-8 hover:border-primary/50 hover:bg-[var(--primary-dark)]/5 transition-all cursor-pointer text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Camera className="text-[var(--primary-dark)]" size={32} />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Click to upload images</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">PNG, JPG up to 10MB</p>
                  <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                </div>
              </label>

              <div className="grid grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group border border-slate-100 dark:border-slate-800">
                    <img src={img.preview} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1.5 right-1.5 bg-black/50 backdrop-blur-md p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {images.length < 4 && images.length > 0 && (
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary cursor-pointer transition-all">
                    <Plus size={20} />
                    <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                  </label>
                )}
                {[...Array(Math.max(0, (images.length === 0 ? 4 : 3) - images.length))].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300">
                    <ImageIcon size={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pricing & Message */}
            <div className="lg:col-span-5 space-y-8">
              <label className="block">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Your Offer Price (PKR)</span>
                <div className="relative mt-3">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 font-bold">Rs.</div>
                  <input
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-lg font-black dark:text-white transition-all shadow-sm"
                    placeholder="0"
                    type="number"
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Message to Buyer</span>
                <textarea
                  className="mt-3 block w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-medium dark:text-white transition-all min-h-[180px] resize-none"
                  placeholder="Tell the buyer why this item is a great match..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                  Tip: Briefly describe the condition, features, and how fast you can ship.
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-4 text-sm font-black text-white bg-[var(--primary-dark)] hover:bg-emerald-700 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Send size={18} fill="currentColor" />
                Send Offer Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
