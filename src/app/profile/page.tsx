"use client";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { UserListings } from "@/components/profile/UserListings";
import { UserReviews } from "@/components/profile/UserReviews";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/stores/useUserStore";

export default function ProfilePage() {
  const currentUser = useUserStore((s) => s.currentUser);

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <ProfileHeader user={currentUser} />
      <Separator />
      <UserListings />
      <Separator />
      <UserReviews />
    </div>
  );
}
