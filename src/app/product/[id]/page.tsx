'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import SellerInfo from '@/components/SellerInfo';
import { ProductWithSeller } from '@/lib/supabase-database';
import { ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<ProductWithSeller | null>(null);
  const [sellerStats, setSellerStats] = useState<{
    listings: number;
    sales: number;
    rating: number;
    reviews: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch product with seller details
        const productResponse = await fetch(`/api/products/${params.id}`);
        const productData = await productResponse.json();
        
        if (!productResponse.ok) {
          throw new Error(productData.error || 'Failed to fetch product');
        }
        
        setProduct(productData.product);
        
        // Fetch seller stats
        if (productData.product?.seller?.id) {
          const statsResponse = await fetch(`/api/sellers/${productData.product.seller.id}/stats`);
          const statsData = await statsResponse.json();
          
          if (statsResponse.ok) {
            setSellerStats(statsData.stats);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-slate-600 dark:text-slate-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error || 'This product does not exist or has been removed.'}</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
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

  const getBadges = (product: ProductWithSeller) => {
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

  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium mb-8"
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
              badges={getBadges(product)}
              category={product.category_id}
              condition={product.condition}
            />
            <SellerInfo
              name={product.seller.store_name || product.seller.full_name}
              initials={getSellerInitials(product.seller.store_name || product.seller.full_name)}
              rating={sellerStats?.rating || 0}
              reviews={sellerStats?.reviews || 0}
              listings={sellerStats?.listings || 0}
              sales={sellerStats?.sales || 0}
              sellerId={product.seller.id}
            />
            <div className="mt-auto">
              <button className="w-full py-5 bg-primary hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3">
                <ShoppingBag className="w-5 h-5 fill-current" />
                Buy Now - {formatPrice(product.selling_price)}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
