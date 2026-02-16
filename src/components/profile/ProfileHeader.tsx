"use client";

import { BadgeCheck, MapPin, CalendarDays } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/rating/StarRating";
import type { User } from "@/types";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const joinDate = new Date(user.joinedAt).toLocaleDateString("en-PK", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Top section: avatar + info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Large avatar */}
        <Avatar className="size-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center sm:items-start gap-2">
          {/* Name + verified badge */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.isVerified && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 gap-1">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </Badge>
            )}
          </div>

          {/* City + Join date */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 capitalize">
              <MapPin className="h-3.5 w-3.5" />
              {user.city}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              Joined {joinDate}
            </span>
          </div>

          {/* Star rating */}
          <StarRating value={user.rating} showValue size="md" />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Listings" value={user.listingsCount} />
        <StatBox label="Sales" value={user.salesCount} />
        <StatBox label="Reviews" value={user.reviewCount} />
        <StatBox label="Rating" value={user.rating.toFixed(1)} />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
