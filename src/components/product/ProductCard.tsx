"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPKR, timeAgo } from "@/lib/format";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden group hover:shadow-md transition-shadow py-0 gap-0">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFeatured && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] px-1.5 py-0.5">
                <Sparkles className="h-3 w-3 mr-0.5" />
                Featured
              </Badge>
            )}
            {product.isUrgent && (
              <Badge className="bg-rose-100 text-rose-800 border-rose-300 text-[10px] px-1.5 py-0.5">
                <Zap className="h-3 w-3 mr-0.5" />
                Urgent
              </Badge>
            )}
          </div>

          {/* Sold overlay */}
          {product.status === "sold" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-red-600 px-4 py-1 rounded-full">
                SOLD
              </span>
            </div>
          )}

          {/* Condition badge */}
          <Badge
            variant="secondary"
            className={cn(
              "absolute bottom-2 right-2 text-[10px] px-1.5 py-0.5",
              product.condition === "new" && "bg-emerald-100 text-emerald-800",
              product.condition === "like-new" && "bg-blue-100 text-blue-800",
              product.condition === "good" && "bg-gray-100 text-gray-800",
              product.condition === "fair" && "bg-orange-100 text-orange-800"
            )}
          >
            {product.condition === "like-new"
              ? "Like New"
              : product.condition.charAt(0).toUpperCase() +
                product.condition.slice(1)}
          </Badge>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <p className="text-primary font-bold text-base mt-1">
            {formatPKR(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPKR(product.originalPrice)}
            </p>
          )}
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3" />
              {product.city}
            </span>
            <span>{timeAgo(product.createdAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
