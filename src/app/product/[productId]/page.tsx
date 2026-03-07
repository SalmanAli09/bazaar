"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MessageCircle, 
  Star, 
  MapPin, 
  Shield,
  Package,
  Tag,
  Clock,
  User
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

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await import('../../../../data/product_listing.json');
        const products: Product[] = productData.default;
        const foundProduct = products.find(p => p.product_id === params.productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          router.push('/products');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    if (params.productId) {
      loadProduct();
    }
  }, [params.productId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products" className="text-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.product_actual_price > product.product_selling_price 
    ? Math.round(((product.product_actual_price - product.product_selling_price) / product.product_actual_price) * 100)
    : 0;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'}
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&q=80'}
                    alt={`${product.product_name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.product_name}</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-primary">${product.product_selling_price.toFixed(2)}</span>
                    {product.product_actual_price > product.product_selling_price && (
                      <>
                        <span className="text-xl text-gray-500 line-through">${product.product_actual_price.toFixed(2)}</span>
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                          {discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.is_featured && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    Featured
                  </span>
                )}
                {product.is_urgent && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    Urgent
                  </span>
                )}
                {product.is_negotiable && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    Negotiable
                  </span>
                )}
                {product.is_sold && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    Sold
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="flex items-center gap-2 text-gray-600">
                <Tag size={16} />
                <span>{product.category}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.product_description}</p>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-semibold">
                      {product.seller.full_name.charAt(0)}
                    </div>
                    <div>
                      <Link 
                        href={`/seller/${product.seller.seller_id}`}
                        className="font-semibold text-gray-900 hover:text-primary transition-colors flex items-center gap-2"
                      >
                        {product.seller.store_name}
                        {product.seller.is_verified && (
                          <Shield size={16} className="text-blue-500" />
                        )}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span>{product.seller.rating.toFixed(1)}</span>
                        <span>•</span>
                        <MapPin size={14} />
                        <span>{product.seller.city}, {product.seller.country}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/seller/${product.seller.seller_id}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button 
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                  product.is_sold 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
                disabled={product.is_sold}
              >
                {product.is_sold ? 'Sold' : 'Make Offer'}
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
