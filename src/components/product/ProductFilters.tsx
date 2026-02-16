"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductCondition } from "@/types";
import { cn } from "@/lib/utils";

export type SortOption = "newest" | "price-low" | "price-high";

interface ProductFiltersProps {
  conditions: ProductCondition[];
  onConditionsChange: (conditions: ProductCondition[]) => void;
  priceMin: string;
  onPriceMinChange: (value: string) => void;
  priceMax: string;
  onPriceMaxChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
  resultCount: number;
}

const conditionOptions: { value: ProductCondition; label: string }[] = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

function FilterContent({
  conditions,
  onConditionsChange,
  priceMin,
  onPriceMinChange,
  priceMax,
  onPriceMaxChange,
  sort,
  onSortChange,
  onClear,
}: ProductFiltersProps) {
  const toggleCondition = (condition: ProductCondition) => {
    if (conditions.includes(condition)) {
      onConditionsChange(conditions.filter((c) => c !== condition));
    } else {
      onConditionsChange([...conditions, condition]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Sort By</Label>
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Price Range (PKR)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="flex-1"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      {/* Condition */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Condition</Label>
        <div className="flex flex-wrap gap-2">
          {conditionOptions.map((option) => (
            <Badge
              key={option.value}
              variant={conditions.includes(option.value) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                conditions.includes(option.value)
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-muted"
              )}
              onClick={() => toggleCondition(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear */}
      <Button variant="outline" className="w-full" onClick={onClear}>
        <X className="h-4 w-4 mr-1" />
        Clear Filters
      </Button>
    </div>
  );
}

export function ProductFilters(props: ProductFiltersProps) {
  const [open, setOpen] = useState(false);
  const hasFilters =
    props.conditions.length > 0 || props.priceMin || props.priceMax;

  return (
    <>
      {/* Mobile: Sheet trigger */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasFilters && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto">
              <FilterContent {...props} />
            </div>
            <div className="mt-4">
              <Button className="w-full" onClick={() => setOpen(false)}>
                Show {props.resultCount} Results
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Inline sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 space-y-2">
          <h3 className="font-semibold text-sm">Filters</h3>
          <FilterContent {...props} />
        </div>
      </div>
    </>
  );
}
