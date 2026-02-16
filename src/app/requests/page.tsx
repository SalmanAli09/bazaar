"use client";

import { RequestCard } from "@/components/requests/RequestCard";
import { RequestForm } from "@/components/requests/RequestForm";
import { useRequestStore } from "@/stores/useRequestStore";
import { useCityStore } from "@/stores/useCityStore";
import { Megaphone } from "lucide-react";

export default function RequestsPage() {
  const requests = useRequestStore((s) => s.requests);
  const selectedCity = useCityStore((s) => s.selectedCity);

  const filtered =
    selectedCity === "all"
      ? requests
      : requests.filter((r) => r.city === selectedCity);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Request Board</h1>
          <p className="text-muted-foreground mt-1">
            Browse buy requests from other users or post your own to find what
            you need.
          </p>
        </div>
        <RequestForm />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Megaphone className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="font-semibold text-lg">No requests yet</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Be the first to post a buy request in this city!
          </p>
        </div>
      )}
    </div>
  );
}
