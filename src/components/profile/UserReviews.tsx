"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StarRating } from "@/components/rating/StarRating";
import { useReviewStore } from "@/stores/useReviewStore";
import { useUserStore } from "@/stores/useUserStore";
import { users } from "@/data/users";
import { timeAgo } from "@/lib/format";
import { MessageSquare } from "lucide-react";

export function UserReviews() {
  const currentUser = useUserStore((s) => s.currentUser);
  const getReviewsForSeller = useReviewStore((s) => s.getReviewsForSeller);

  if (!currentUser) return null;

  const reviews = getReviewsForSeller(currentUser.id);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Reviews ({reviews.length})
      </h2>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => {
            const reviewer = users.find((u) => u.id === review.reviewerId);
            const initials = reviewer
              ? reviewer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "?";

            return (
              <div
                key={review.id}
                className="rounded-lg border p-4 space-y-3"
              >
                {/* Reviewer info */}
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    {reviewer && (
                      <AvatarImage
                        src={reviewer.avatar}
                        alt={reviewer.name}
                      />
                    )}
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {reviewer?.name ?? "Unknown User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(review.createdAt)}
                    </p>
                  </div>

                  <StarRating value={review.rating} size="sm" />
                </div>

                {/* Comment */}
                {review.comment && (
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MessageSquare className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            No reviews received yet.
          </p>
        </div>
      )}
    </div>
  );
}
