"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  max?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-6 w-6",
};

export function StarRating({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const iconClass = sizeMap[size];

  if (interactive) {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(i + 1)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                iconClass,
                i < value
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300 hover:text-amber-300"
              )}
            />
          </button>
        ))}
        {showValue && (
          <span className="ml-1 text-sm font-medium">{value}/{max}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      <div className="relative inline-flex">
        {/* Empty stars background */}
        <div className="flex">
          {Array.from({ length: max }, (_, i) => (
            <Star key={i} className={cn(iconClass, "text-gray-200")} />
          ))}
        </div>
        {/* Filled stars overlay */}
        <div
          className="absolute top-0 left-0 flex overflow-hidden"
          style={{ width: `${(value / max) * 100}%` }}
        >
          {Array.from({ length: max }, (_, i) => (
            <Star
              key={i}
              className={cn(iconClass, "fill-amber-400 text-amber-400 shrink-0")}
            />
          ))}
        </div>
      </div>
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
