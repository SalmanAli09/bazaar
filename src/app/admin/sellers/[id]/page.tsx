"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  BadgeCheck,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Ban,
  CheckCircle,
  EyeOff,
  Eye,
  Loader2,
  Package,
} from "lucide-react";

interface SellerDetail {
  seller_id: string;
  user_id: string;
  store_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  city: string;
  country: string;
  rating: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  condition: string;
  is_published: boolean;
  is_sold: boolean;
  is_draft: boolean;
  image: string | null;
  created_at: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

function getConditionLabel(c: string) {
  switch (c) {
    case "new": return "Brand New";
    case "like_new": return "Like New";
    case "refurbished": return "Refurbished";
    default: return c;
  }
}

function getStatusBadge(p: ProductItem) {
  if (p.is_sold) return { label: "Sold", cls: "bg-green-100 text-green-600" };
  if (p.is_draft) return { label: "Draft", cls: "bg-slate-100 text-slate-500" };
  if (p.is_published) return { label: "Active", cls: "bg-emerald-100 text-emerald-600" };
  return { label: "Unpublished", cls: "bg-orange-100 text-orange-600" };
}

export default function AdminSellerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [seller, setSeller] = useState<SellerDetail | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingBlock, setTogglingBlock] = useState(false);
  const [togglingProduct, setTogglingProduct] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/sellers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSeller(data.seller || null);
        setProducts(data.products || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const toggleBlock = async () => {
    if (!seller) return;
    setTogglingBlock(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: seller.user_id, is_active: !seller.is_active }),
      });
      if (res.ok) {
        setSeller((prev) => prev ? { ...prev, is_active: !prev.is_active } : prev);
      }
    } catch {}
    finally { setTogglingBlock(false); }
  };

  const togglePublish = async (product: ProductItem) => {
    setTogglingProduct(product.id);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !product.is_published }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, is_published: !p.is_published } : p
          )
        );
      }
    } catch {}
    finally { setTogglingProduct(null); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={28} className="animate-spin text-slate-400" />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-900">Seller not found</h2>
        <Link href="/admin/sellers" className="text-emerald-600 hover:underline mt-2 inline-block">
          Back to sellers
        </Link>
      </div>
    );
  }

  const activeProducts = products.filter((p) => p.is_published && !p.is_sold);
  const soldProducts = products.filter((p) => p.is_sold);

  return (
    <div>
      <Link
        href="/admin/sellers"
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Sellers
      </Link>

      {/* Seller Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-black">
              {(seller.store_name || seller.full_name).charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black text-slate-900">
                  {seller.store_name || seller.full_name}
                </h2>
                {seller.is_verified && <BadgeCheck size={20} className="text-blue-500" />}
                <span className={`ml-2 px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                  seller.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {seller.is_active ? "Active" : "Blocked"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Mail size={14} /> {seller.email}</span>
                {seller.phone_number && <span className="flex items-center gap-1"><Phone size={14} /> {seller.phone_number}</span>}
                {seller.city && <span className="flex items-center gap-1"><MapPin size={14} /> {seller.city}, {seller.country}</span>}
                <span className="flex items-center gap-1"><Calendar size={14} /> Joined {new Date(seller.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Star size={14} className="text-amber-400" /> {seller.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={toggleBlock}
            disabled={togglingBlock}
            className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              seller.is_active
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            }`}
          >
            {togglingBlock ? (
              <Loader2 size={16} className="animate-spin" />
            ) : seller.is_active ? (
              <><Ban size={16} /> Block Seller</>
            ) : (
              <><CheckCircle size={16} /> Unblock Seller</>
            )}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
          <p className="text-3xl font-black text-slate-900">{products.length}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Products</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
          <p className="text-3xl font-black text-emerald-600">{activeProducts.length}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Active</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
          <p className="text-3xl font-black text-blue-600">{soldProducts.length}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sold</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="font-black text-slate-900 uppercase tracking-tight">
            Products ({products.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-100">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <Package size={32} className="mx-auto mb-3 text-slate-300" />
                    This seller has no products
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const status = getStatusBadge(product);
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-100" />
                            )}
                          </div>
                          <span className="font-bold text-sm text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">
                        Rs. {product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                          {getConditionLabel(product.condition)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${status.cls}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(product.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/product/${product.id}`}
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-all"
                            title="View Product"
                          >
                            <Eye size={16} />
                          </Link>
                          {!product.is_sold && (
                            <button
                              onClick={() => togglePublish(product)}
                              disabled={togglingProduct === product.id}
                              className={`p-2 rounded-lg transition-all ${
                                product.is_published
                                  ? "hover:bg-orange-50 text-slate-400 hover:text-orange-600"
                                  : "hover:bg-green-50 text-slate-400 hover:text-green-600"
                              }`}
                              title={product.is_published ? "Unpublish" : "Publish"}
                            >
                              {togglingProduct === product.id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : product.is_published ? (
                                <EyeOff size={16} />
                              ) : (
                                <CheckCircle size={16} />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
