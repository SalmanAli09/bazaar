"use client";

import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/useCartStore";
import { useUserStore } from "@/stores/useUserStore";
import { formatPKR, calculatePlatformFee, calculateTotal } from "@/lib/format";
import { PLATFORM_FEE_PERCENT } from "@/lib/constants";

export function BuyFlow() {
  const { selectedProduct, isCheckoutOpen, isPurchaseComplete, closeCheckout, confirmPurchase } =
    useCartStore();
  const addPurchase = useUserStore((s) => s.addPurchase);

  if (!selectedProduct) return null;

  const fee = calculatePlatformFee(selectedProduct.price);
  const total = calculateTotal(selectedProduct.price);

  const handleConfirm = () => {
    confirmPurchase();
    addPurchase(selectedProduct.id);
  };

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && closeCheckout()}>
      <DialogContent className="sm:max-w-md">
        {isPurchaseComplete ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold">Purchase Complete!</h2>
            <p className="text-muted-foreground mt-2">
              You have successfully purchased{" "}
              <span className="font-medium text-foreground">
                {selectedProduct.title}
              </span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              The seller will be notified. You can rate this purchase from your
              profile.
            </p>
            <Button className="mt-6 w-full" onClick={closeCheckout}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Confirm Purchase
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Product summary */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden relative shrink-0">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm line-clamp-2">
                    {selectedProduct.title}
                  </p>
                  <p className="text-primary font-bold">
                    {formatPKR(selectedProduct.price)}
                  </p>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item Price</span>
                  <span>{formatPKR(selectedProduct.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Platform Fee ({PLATFORM_FEE_PERCENT}%)
                  </span>
                  <span>{formatPKR(fee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPKR(total)}</span>
                </div>
              </div>

              {/* Payment method */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">
                  Cash on Delivery (COD)
                </p>
              </div>

              {/* Confirm button */}
              <Button className="w-full" size="lg" onClick={handleConfirm}>
                Confirm Purchase - {formatPKR(total)}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
