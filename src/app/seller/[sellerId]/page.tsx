"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Shield, 
  Mail, 
  Phone, 
  Store, 
  Package,
  Heart,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_actual_price: number;
  product_selling_price: number;
  is_negotiable: boolean;
  is_urgent: boolean;
  is_featured: boolean;
  is_draft: boolean;
  is_published: boolean;
  is_sold: boolean;
  category: string;
  images: string[];
  seller: {
    seller_id: string;
    store_name: string;
    full_name: string;
    city: string;
    country: string;
    rating: number;
    is_verified: boolean;
  };
}

interface SellerInfo {
  seller_id: string;
  store_name: string;
  full_name: string;
  city: string;
  country: string;
  rating: number;
  is_verified: boolean;
}

export default function SellerProfile() {
  const params = useParams();
  const router = useRouter();
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSellerData = async () => {
      try {
        const productData = await import('../../../../data/product_listing.json');
        const allProducts: Product[] = productData.default;
        
        // Find products by this seller
        const sellerProducts = allProducts.filter(p => p.seller.seller_id === params.sellerId);
        
        if (sellerProducts.length > 0) {
          // Extract seller info from first product
          const sellerInfo = sellerProducts[0].seller;
          setSeller(sellerInfo);
          setProducts(sellerProducts);
        } else {
          router.push('/products');
        }
      } catch (error) {
        console.error('Error loading seller data:', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    if (params.sellerId) {
      loadSellerData();
    }
  }, [params.sellerId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seller not found</h1>
          <Link href="/products" className="text-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const activeProducts = products.filter(p => p.is_published && !p.is_sold);
  const soldProducts = products.filter(p => p.is_sold);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>

      {/* Seller Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {seller.full_name.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{seller.store_name}</h1>
                    {seller.is_verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        <Shield size={16} />
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{seller.full_name}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{seller.rating.toFixed(1)}</span>
                      <span>Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{seller.city}, {seller.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package size={16} />
                      <span>{products.length} Items</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <MessageCircle size={20} />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{activeProducts.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Store size={24} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sold Items</p>
                <p className="text-2xl font-bold text-gray-900">{soldProducts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{seller.rating.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Products */}
        {activeProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeProducts.map((product) => (
                <Link
                  key={product.product_id}
                  href={`/product/${product.product_id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80'}
                      alt={product.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.product_name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">${product.product_selling_price.toFixed(2)}</span>
                      {product.is_urgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sold Products */}
        {soldProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sold Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {soldProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 opacity-75"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80'}
                      alt={product.product_name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.product_name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-500">${product.product_selling_price.toFixed(2)}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        Sold
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-600">This seller hasn't listed any products.</p>
          </div>
        )}
      </div>
    </div>
  );
}
