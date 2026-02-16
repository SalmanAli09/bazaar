"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/rating/StarRating";
import { useReviewStore } from "@/stores/useReviewStore";
import { useUserStore } from "@/stores/useUserStore";

interface ReviewFormProps {
  sellerId: string;
  productId: string;
  onClose: () => void;
}

export function ReviewForm({ sellerId, productId, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addReview = useReviewStore((s) => s.addReview);
  const currentUser = useUserStore((s) => s.currentUser);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentUser) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    addReview({
      reviewerId: currentUser.id,
      sellerId,
      productId,
      rating,
      comment: comment.trim(),
    });

    toast.success("Review submitted successfully!");
    onClose();
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this seller.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <StarRating
              value={rating}
              interactive
              onChange={setRating}
              size="lg"
              showValue
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="review-comment">Comment</Label>
            <Textarea
              id="review-comment"
              placeholder="Tell others about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Review</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
