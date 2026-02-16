"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import { Package } from "lucide-react";

export function UserListings() {
  const currentUser = useUserStore((s) => s.currentUser);
  const products = useProductStore((s) => s.products);

  if (!currentUser) return null;

  const userProducts = products.filter((p) => p.sellerId === currentUser.id);
  const active = userProducts.filter((p) => p.status === "active");
  const sold = userProducts.filter((p) => p.status === "sold");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Listings</h2>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="sold">Sold ({sold.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {active.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-4">
              {active.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState message="You have no active listings." />
          )}
        </TabsContent>

        <TabsContent value="sold">
          {sold.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-4">
              {sold.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState message="No sold listings yet." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Package className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
