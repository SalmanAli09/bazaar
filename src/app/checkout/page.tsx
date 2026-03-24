"use client";

import React, { useState, useEffect } from "react";
import {
  Truck,
  CreditCard,

  MapPin,
  Phone,
  User,
  Handshake,
  Landmark,
  Wallet,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutProduct {
  id: string;
  ad_title: string;
  selling_price: number;
  original_price: number;
  condition: string;
  product_pictures: string[];
  city: string;
  seller?: {
    name: string;
  };
}

const SHIPPING_FEE = 250;

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [product, setProduct] = useState<CheckoutProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("checkoutProduct");
    if (stored) {
      setProduct(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102212] flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag size={48} className="mx-auto text-slate-400" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">No item selected</h2>
          <p className="text-slate-500 dark:text-slate-400">Browse products and click "Buy Now" to checkout.</p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 px-6 py-3 bg-[var(--primary-dark)] text-white font-bold rounded-xl hover:bg-[#0fa31a] transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const subtotal = product.selling_price;
  const total = subtotal + SHIPPING_FEE;

  return (
    <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#102212] transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Checkout
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Complete your purchase from the .بازار marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-8">
            {/* Shipping Section */}
            <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-primary/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-[var(--primary-dark)]/10 rounded-lg text-[var(--primary-dark)]">
                  <Truck size={24} />
                </div>
                <h2 className="text-xl font-bold dark:text-white">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Full Name"
                  placeholder="Enter your full name"
                  icon={<User size={18} />}
                />
                <InputGroup
                  label="Phone Number"
                  placeholder="03xx-xxxxxxx"
                  icon={<Phone size={18} />}
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                    City
                  </label>
                  <select className="w-full h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white appearance-none">
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Faisalabad</option>
                  </select>
                </div>

                <InputGroup
                  label="Shipping Address"
                  placeholder="Street, Apartment, etc."
                  icon={<MapPin size={18} />}
                />
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-primary/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-[var(--primary-dark)]/10 rounded-lg text-[var(--primary-dark)]">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-xl font-bold dark:text-white">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <PaymentOption
                  id="cod"
                  title="Cash on Delivery"
                  desc="Pay when you receive your package"
                  icon={<Handshake />}
                  selected={paymentMethod === "cod"}
                  onSelect={() => setPaymentMethod("cod")}
                />
                <PaymentOption
                  id="bank"
                  title="Bank Transfer"
                  desc="Directly from your bank account"
                  icon={<Landmark />}
                  selected={paymentMethod === "bank"}
                  onSelect={() => setPaymentMethod("bank")}
                />
                <PaymentOption
                  id="wallet"
                  title="EasyPaisa / JazzCash"
                  desc="Mobile wallet payment"
                  icon={<Wallet />}
                  selected={paymentMethod === "wallet"}
                  onSelect={() => setPaymentMethod("wallet")}
                />
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <h2 className="text-xl font-bold mb-8 dark:text-white">
                Order Summary
              </h2>

              {/* Item Card */}
              <div className="flex gap-5 pb-8 border-b border-slate-100 dark:border-slate-800 mb-8">
                <div className="w-24 h-28 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-50 dark:border-slate-800">
                  <img
                    alt={product.ad_title}
                    className="w-full h-full object-cover"
                    src={product.product_pictures?.[0] || "/placeholder.png"}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                    {product.ad_title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-medium">
                    Condition: <span className="text-[var(--primary-dark)]">{product.condition}</span>
                  </p>
                  <p className="font-extrabold text-[var(--primary-dark)] text-lg mt-3">
                    Rs. {subtotal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Price Table */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-900 dark:text-slate-200">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
                  <span>Shipping Fee</span>
                  <span className="text-slate-900 dark:text-slate-200">
                    Rs. {SHIPPING_FEE}
                  </span>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-lg font-bold dark:text-white">
                    Total Amount
                  </span>
                  <span className="text-3xl font-black text-[var(--primary-dark)]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button className="w-full bg-[var(--primary-dark)] hover:bg-emerald-700 text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                <span>Place Order</span>
                <ArrowRight size={20} />
              </button>

              <p className="text-center text-[10px] text-slate-400 mt-6 leading-relaxed px-4">
                By placing your order, you agree to .بازار's
                <span className="underline ml-1 cursor-pointer hover:text-slate-600">
                  Terms of Service
                </span>{" "}
                and
                <span className="underline ml-1 cursor-pointer hover:text-slate-600">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/**
 * Reusable Form Input
 */
function InputGroup({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
        />
      </div>
    </div>
  );
}

/**
 * Reusable Payment Radio Option
 */
function PaymentOption({ id, title, desc, icon, selected, onSelect }: any) {
  return (
    <label
      onClick={onSelect}
      className={`relative flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
        selected
          ? "border-primary bg-[var(--primary-dark)]/5 shadow-md shadow-primary/5"
          : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/30"
      }`}
    >
      <div className="flex-1 flex items-center gap-5">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            selected
              ? "bg-[var(--primary-dark)] text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
          }`}
        >
          {/* Cast icon to React.ReactElement<LucideProps> */}
          {React.isValidElement(icon) &&
            React.cloneElement(icon as React.ReactElement<any>, {
              size: 24,
            })}
        </div>
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {desc}
          </p>
        </div>
      </div>
      {selected && <CheckCircle2 className="text-[var(--primary-dark)]" size={20} />}
    </label>
  );
}
