"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Sparkles, Zap, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SellerCard } from "@/components/product/SellerCard";
import { BuyFlow } from "@/components/product/BuyFlow";
import { useProductStore } from "@/stores/useProductStore";
import { useCartStore } from "@/stores/useCartStore";
import { users } from "@/data/users";
import { categories } from "@/data/categories";
import { formatPKR, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const products = useProductStore((s) => s.products);
  const openCheckout = useCartStore((s) => s.openCheckout);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">
          This product may have been removed.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const seller = users.find((u) => u.id === product.sellerId);
  const category = categories.find((c) => c.slug === product.categorySlug);
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Gallery */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Right: Info */}
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isFeatured && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {product.isUrgent && (
                <Badge className="bg-rose-100 text-rose-800 border-rose-300">
                  <Zap className="h-3 w-3 mr-1" />
                  Urgent
                </Badge>
              )}
              {product.status === "sold" && (
                <Badge variant="destructive">SOLD</Badge>
              )}
              {category && (
                <Badge variant="secondary">
                  <Link href={`/category/${category.slug}`}>{category.name}</Link>
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

            {/* Price */}
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">
                {formatPKR(product.price)}
              </p>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPKR(product.originalPrice)}
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                    {savings}% off
                  </Badge>
                </div>
              )}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {product.city.charAt(0).toUpperCase() + product.city.slice(1)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {timeAgo(product.createdAt)}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  product.condition === "new" && "border-emerald-300 text-emerald-700",
                  product.condition === "like-new" && "border-blue-300 text-blue-700",
                  product.condition === "good" && "border-gray-300 text-gray-700",
                  product.condition === "fair" && "border-orange-300 text-orange-700"
                )}
              >
                {product.condition === "like-new"
                  ? "Like New"
                  : product.condition.charAt(0).toUpperCase() +
                    product.condition.slice(1)}
              </Badge>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Seller Card */}
            {seller && <SellerCard seller={seller} />}

            {/* Buy Button */}
            {product.status === "active" && (
              <div className="sticky bottom-20 md:bottom-0 bg-background pt-4">
                <Button
                  size="lg"
                  className="w-full gap-2 text-base"
                  onClick={() => openCheckout(product)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Buy Now - {formatPKR(product.price)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BuyFlow />
    </>
  );
}
