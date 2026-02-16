"use client";

import { MapPin } from "lucide-react";
import { useCityStore } from "@/stores/useCityStore";
import { cities } from "@/data/cities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CitySelector() {
  const { selectedCity, setCity } = useCityStore();

  return (
    <Select value={selectedCity} onValueChange={setCity}>
      <SelectTrigger className="w-[140px] h-10 border-0 bg-muted/50 focus:ring-1 focus:ring-primary">
        <MapPin className="h-4 w-4 text-primary mr-1" />
        <SelectValue placeholder="All Cities" />
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city.value} value={city.value}>
            {city.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
