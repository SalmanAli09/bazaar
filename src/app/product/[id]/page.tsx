'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import SellerInfo from '@/components/SellerInfo';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface ProductDetail {
  id: string;
  seller_id: string;
  category_id: string;
  ad_title: string;
  city: string;
  condition: string;
  description: string;
  product_pictures: string[];
  selling_price: number;
  original_price: number;
  negotiable_price: boolean;
  featured: boolean;
  urgent: boolean;
  is_draft: boolean;
  is_published: boolean;
  is_sold: boolean;
  created_at: string;
  updated_at: string;
  seller: {
    id: string;
    full_name: string;
    email: string;
    store_name: string;
    phone_number: string;
    is_verified: boolean;
    rating: number;
    review_count: number;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.product || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading Product ...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-[var(--primary-dark)] hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getBadges = () => {
    const badges = [];
    if (product.featured) badges.push('Featured');
    if (product.urgent) badges.push('Urgent');
    return badges;
  };

  const getSellerInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBuyNow = () => {
    sessionStorage.setItem('checkoutProduct', JSON.stringify(product));
    router.push('/checkout');
  };

  const sellerName = product.seller.store_name || product.seller.full_name;

  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--primary-dark)] transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery
            images={product.product_pictures}
            title={product.ad_title}
          />
          <div className="flex flex-col">
            <ProductInfo
              title={product.ad_title}
              price={formatPrice(product.selling_price)}
              originalPrice={product.original_price ? formatPrice(product.original_price) : undefined}
              discount=""
              location={product.city}
              time={getTimeAgo(product.created_at)}
              description={product.description}
              badges={getBadges()}
              category={product.category_id}
              condition={product.condition}
            />
            <SellerInfo
              name={sellerName}
              initials={getSellerInitials(sellerName)}
              rating={product.seller.rating}
              reviews={product.seller.review_count}
              listings={0}
              sales={0}
              sellerId={product.seller.id}
            />
            <div className="mt-auto">
              <button
                onClick={handleBuyNow}
                className="w-full py-5 bg-[var(--primary-dark)] hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                Buy Now - {formatPrice(product.selling_price)}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
