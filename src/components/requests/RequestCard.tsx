"use client";

import { MapPin, MessageSquare, Clock, Hand } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR, timeAgo } from "@/lib/format";
import { useRequestStore } from "@/stores/useRequestStore";
import { users } from "@/data/users";
import type { BuyRequest } from "@/types";

interface RequestCardProps {
  request: BuyRequest;
}

export function RequestCard({ request }: RequestCardProps) {
  const incrementResponse = useRequestStore((s) => s.incrementResponse);
  const user = users.find((u) => u.id === request.userId);

  return (
    <Card>
      <CardContent className="space-y-3">
        {/* Title */}
        <h3 className="font-semibold leading-snug">{request.title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {request.description}
        </p>

        {/* Budget range */}
        <p className="text-primary font-bold text-sm">
          {formatPKR(request.budgetMin)} - {formatPKR(request.budgetMax)}
        </p>

        {/* Category badge + City */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="capitalize">
            {request.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {request.city}
          </span>
        </div>

        {/* Footer row: time, responses, action */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(request.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {request.responses} responses
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => incrementResponse(request.id)}
          >
            <Hand className="h-3.5 w-3.5" />
            I Have This
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
