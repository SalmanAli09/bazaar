"use client";

import { MessageCircle, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/rating/StarRating";
import { useChatStore } from "@/stores/useChatStore";
import type { User } from "@/types";

interface SellerCardProps {
  seller: User;
}

export function SellerCard({ seller }: SellerCardProps) {
  const openChat = useChatStore((s) => s.openChat);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={seller.avatar} alt={seller.name} />
            <AvatarFallback>
              {seller.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold">{seller.name}</p>
              {seller.isVerified && (
                <ShieldCheck className="h-4 w-4 text-primary fill-primary/20" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating value={seller.rating} size="sm" />
              <span className="text-xs text-muted-foreground">
                ({seller.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
          <div className="bg-muted/50 rounded-lg py-2">
            <p className="font-semibold">{seller.listingsCount}</p>
            <p className="text-xs text-muted-foreground">Listings</p>
          </div>
          <div className="bg-muted/50 rounded-lg py-2">
            <p className="font-semibold">{seller.salesCount}</p>
            <p className="text-xs text-muted-foreground">Sales</p>
          </div>
          <div className="bg-muted/50 rounded-lg py-2">
            <p className="font-semibold">{seller.rating.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 gap-2"
          onClick={() => openChat(seller.id)}
        >
          <MessageCircle className="h-4 w-4" />
          Chat with Seller
        </Button>
      </CardContent>
    </Card>
  );
}
