"use client";
import Link from 'next/link';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import SellerInfo from '@/components/SellerInfo';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProductData = (id: string) => {
  const products = {
    '1': {
      title: 'Gently Used Khaadi Lawn Suit',
      price: 'Rs. 2,500',
      originalPrice: 'Rs. 5,800',
      discount: '57% OFF',
      location: 'Karachi',
      time: '1w ago',
      description: 'Beautiful unstitched Khaadi lawn 3-piece suit from last summer collection. Worn only once for an event. Fabric is in excellent condition with no stains or tears. Original price was Rs. 5,800. Perfect for casual wear or festive gatherings.',
      badges: ['Featured'],
      category: 'Clothing',
      condition: 'Like New',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PoFCt7oeigGyCvRkMCLmTRPx9LyEuB6fRKFc8fon72hrDBjF-gJNC1z4Pa9Ls9H4qXGcUja7hfMx6QX2OV-uasTPXg4hi_x4OSuTvb7nW5uDVHNZDZTWmOAGJlawCvfBFQR7Kc3M6c7q_xIrUfhwzXZ-jWVYICL_Jz5ENKoN4qm-n2qgcz2FG36fKxQDaJGS4VVzd3KI7lv1PEWeSHVWUxmr5gmAntm2Lh7nwan_I_613XrJ8gGNV8S4bvI45foFztweFo_69C02',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PoFCt7oeigGyCvRkMCLmTRPx9LyEuB6fRKFc8fon72hrDBjF-gJNC1z4Pa9Ls9H4qXGcUja7hfMx6QX2OV-uasTPXg4hi_x4OSuTvb7nW5uDVHNZDZTWmOAGJlawCvfBFQR7Kc3M6c7q_xIrUfhwzXZ-jWVYICL_Jz5ENKoN4qm-n2qgcz2FG36fKxQDaJGS4VVzd3KI7lv1PEWeSHVWUxmr5gmAntm2Lh7nwan_I_613XrJ8gGNV8S4bvI45foFztweFo_69C02',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PoFCt7oeigGyCvRkMCLmTRPx9LyEuB6fRKFc8fon72hrDBjF-gJNC1z4Pa9Ls9H4qXGcUja7hfMx6QX2OV-uasTPXg4hi_x4OSuTvb7nW5uDVHNZDZTWmOAGJlawCvfBFQR7Kc3M6c7q_xIrUfhwzXZ-jWVYICL_Jz5ENKoN4qm-n2qgcz2FG36fKxQDaJGS4VVzd3KI7lv1PEWeSHVWUxmr5gmAntm2Lh7nwan_I_613XrJ8gGNV8S4bvI45foFztweFo_69C02'
      ],
      seller: {
        name: 'Ahmed Khan',
        initials: 'AK',
        rating: 4.8,
        reviews: 47,
        listings: 12,
        sales: 35
      }
    },
    '2': {
      title: 'Samsung S23 Ultra - 256GB',
      price: 'Rs. 48,000',
      originalPrice: 'Rs. 95,000',
      discount: '49% OFF',
      location: 'Lahore',
      time: '4 days ago',
      description: 'Samsung Galaxy S23 Ultra in excellent condition. 256GB storage, 12GB RAM. No scratches or dents. Battery health is excellent. Comes with original box, charger, and all accessories. Perfect for anyone looking for a flagship phone at a great price.',
      badges: ['Urgent'],
      category: 'Electronics',
      condition: 'Used',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC7zIbxm0rG2MWXNCGNENKI3d_bcQddY2HU3TVnPhfzj6elfsLpgAX6FayxtXtKwHnUFgkLp9phNrJMPSHaWP33lij35DgZXYq_DBBIZ1d8aFAxGtVGO1jCtAyXAZxyboPA0-8RIs5X0ozqnBvLg-vgXFdndsxvCWGIa0ZdiTQR9fQe0IWe5Kst8GIFQ_eaoDIBAYleyiuzNvnUla0gisUViPn5ir9GE8Q4j6BUIR22IjuiRK6LAJUnge6-9AXbMF5TCFnh9UY6emhp'
      ],
      seller: {
        name: 'Sarah Ahmed',
        initials: 'SA',
        rating: 4.6,
        reviews: 23,
        listings: 8,
        sales: 19
      }
    },
    '3': {
      title: 'Premium Leather Watch',
      price: 'Rs. 3,200',
      originalPrice: 'Rs. 5,000',
      discount: '36% OFF',
      location: 'Islamabad',
      time: '2 hours ago',
      description: 'Genuine leather strap watch with premium movement. Water resistant and scratch resistant glass. Perfect condition, barely worn. Original price Rs. 5,000. A timeless piece for any collection.',
      badges: ['New Arrival'],
      category: 'Accessories',
      condition: 'Brand New',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWb3WDuxxBcI0T2RJewm7LG2-kpFQJqxp3LZXXN36st6_gWAOpknMls6GLZPK_SZ2RhweGK53gJZus9lMf2KYSyovqXjRi_ZeDd6RsFyzoW5L-s5ppDPz6804bUAMexyk9SA4iwokeIVYl_3o3-ZWpJE8kNC3-GSGpv8B89LgA51sYYcH9THTju9s1Eb7H9rFVETZOfIWPz73W3d8WZJzfHwPVTW4OqsXi8oPwqOtfrjZ2UoHeHR-5JRzi1sNYGroSCZqzzMAXMhm'
      ],
      seller: {
        name: 'Michael Raza',
        initials: 'MR',
        rating: 4.9,
        reviews: 156,
        listings: 45,
        sales: 89
      }
    },
    '4': {
      title: 'Handcrafted Table Lamp',
      price: 'Rs. 1,800',
      originalPrice: 'Rs. 2,600',
      discount: '31% OFF',
      location: 'Lahore',
      time: '3 weeks ago',
      description: 'Beautiful handcrafted table lamp with unique design. Perfect for living room or bedroom. Warm lighting creates cozy atmosphere. Made with high-quality materials. Original price Rs. 2,600.',
      badges: [],
      category: 'Home',
      condition: 'Gently Used',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxtp6AVLU7-sHnJV8wQxB-tTbVNtpSaUQrfYRZyTFn9OAVVAeguNyDtw6BWX-LvpmuNC-xAhCxszGlkyAoH2bSFSn83pnla3nSFjIijBsgoVX58DHgEF3fw7sUjI_9HS8IDEDh5hnPBK1KCNn8_54cfYYjFRcQIq9qai8rKX16afwti9r2Ltf_fX6ha69TEEj_S2gldezhR9HZQuqISMjDdek0qLXR9goH8U1u0lS7MPo55uoqCesDAMW15AVpVUVp8g6X2S6vJsMD'
      ],
      seller: {
        name: 'Fatima Sheikh',
        initials: 'FS',
        rating: 4.7,
        reviews: 89,
        listings: 23,
        sales: 67
      }
    }
  };

  return products[id as keyof typeof products] || products['1'];
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductData(params.id);
  const router = useRouter();
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
          <ProductImageGallery images={product.images} title={product.title} />
          <div className="flex flex-col">
            <ProductInfo
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              location={product.location}
              time={product.time}
              description={product.description}
              badges={product.badges}
              category={product.category}
              condition={product.condition}
            />
            <SellerInfo
              name={product.seller.name}
              initials={product.seller.initials}
              rating={product.seller.rating}
              reviews={product.seller.reviews}
              listings={product.seller.listings}
              sales={product.seller.sales}
            />
            <div className="mt-auto">
              <button onClick={() => router.push('/checkout')} className="w-full py-5 bg-primary hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3">
                <ShoppingBag className="w-5 h-5 fill-current" />
                Buy Now - {product.price}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
