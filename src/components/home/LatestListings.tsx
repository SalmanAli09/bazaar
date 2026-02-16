"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductStore } from "@/stores/useProductStore";
import { useCityStore } from "@/stores/useCityStore";

export function LatestListings() {
  const products = useProductStore((s) => s.products);
  const selectedCity = useCityStore((s) => s.selectedCity);

  const filteredProducts = products
    .filter((p) => p.status === "active")
    .filter((p) => selectedCity === "all" || p.city === selectedCity)
    .slice(0, 12);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Latest Listings</h2>
        <Button variant="ghost" size="sm" asChild className="text-primary">
          <Link href="/category/clothing">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No listings found</p>
          <p className="text-sm mt-1">Try selecting a different city</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
