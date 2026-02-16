"use client";

import { use, useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters, SortOption } from "@/components/product/ProductFilters";
import { useProductStore } from "@/stores/useProductStore";
import { useCityStore } from "@/stores/useCityStore";
import { categories } from "@/data/categories";
import type { ProductCondition } from "@/types";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const products = useProductStore((s) => s.products);
  const selectedCity = useCityStore((s) => s.selectedCity);

  const category = categories.find((c) => c.slug === slug);

  const [conditions, setConditions] = useState<ProductCondition[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const filteredProducts = useMemo(() => {
    let filtered = products
      .filter((p) => p.status === "active")
      .filter((p) => p.categorySlug === slug)
      .filter((p) => selectedCity === "all" || p.city === selectedCity);

    if (conditions.length > 0) {
      filtered = filtered.filter((p) => conditions.includes(p.condition));
    }
    if (priceMin) {
      filtered = filtered.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax) {
      filtered = filtered.filter((p) => p.price <= Number(priceMax));
    }

    switch (sort) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [products, slug, selectedCity, conditions, priceMin, priceMax, sort]);

  const handleClear = () => {
    setConditions([]);
    setPriceMin("");
    setPriceMax("");
    setSort("newest");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {category?.name || "Category"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} items found
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters */}
        <ProductFilters
          conditions={conditions}
          onConditionsChange={setConditions}
          priceMin={priceMin}
          onPriceMinChange={setPriceMin}
          priceMax={priceMax}
          onPriceMaxChange={setPriceMax}
          sort={sort}
          onSortChange={setSort}
          onClear={handleClear}
          resultCount={filteredProducts.length}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {/* Mobile sort/filter bar */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <ProductFilters
              conditions={conditions}
              onConditionsChange={setConditions}
              priceMin={priceMin}
              onPriceMinChange={setPriceMin}
              priceMax={priceMax}
              onPriceMaxChange={setPriceMax}
              sort={sort}
              onSortChange={setSort}
              onClear={handleClear}
              resultCount={filteredProducts.length}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-muted-foreground">
                No items found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or city selection
              </p>
              <Button variant="outline" className="mt-4" onClick={handleClear}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
