'use client';

import { useEffect, useState } from 'react';
import LatestArrivals from '@/components/LatestArrivals';
import { Product } from '@/lib/static-data';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <LatestArrivals products={products} loading={loading} />
    </div>
  );
}
