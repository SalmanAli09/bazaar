"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ImageUploader from "@/components/post/ImageUploader";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import type { ProductCondition } from "@/types";

const conditionOptions: { value: ProductCondition; label: string }[] = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export default function PostAdForm() {
  const router = useRouter();
  const addProduct = useProductStore((s) => s.addProduct);
  const currentUser = useUserStore((s) => s.currentUser);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [condition, setCondition] = useState<ProductCondition | "">("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [city, setCity] = useState(currentUser?.city ?? "");
  const [images, setImages] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate required fields
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!categorySlug) {
      toast.error("Please select a category");
      return;
    }
    if (!condition) {
      toast.error("Please select a condition");
      return;
    }
    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (!city) {
      toast.error("Please select a city");
      return;
    }

    addProduct({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      condition: condition as ProductCondition,
      categorySlug,
      city,
      images,
      sellerId: currentUser?.id ?? "user-1",
      isFeatured,
      isUrgent,
    });

    toast.success("Your listing has been posted!");
    router.push("/");
  }

  // Filter out "All Cities" from the dropdown for posting
  const postCities = cities.filter((c) => c.value !== "all");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="What are you selling?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your item, include details like brand, size, defects..."
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>
          Category <span className="text-destructive">*</span>
        </Label>
        <Select value={categorySlug} onValueChange={setCategorySlug}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label>
          Condition <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={condition}
          onValueChange={(val) => setCondition(val as ProductCondition)}
          className="flex flex-wrap gap-4"
        >
          {conditionOptions.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem value={opt.value} id={`condition-${opt.value}`} />
              <Label
                htmlFor={`condition-${opt.value}`}
                className="cursor-pointer font-normal"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">
            Price (PKR) <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              Rs.
            </span>
            <Input
              id="price"
              type="number"
              min={0}
              placeholder="0"
              className="pl-10"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price (optional)</Label>
          <div className="relative">
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              Rs.
            </span>
            <Input
              id="originalPrice"
              type="number"
              min={0}
              placeholder="0"
              className="pl-10"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label>
          City <span className="text-destructive">*</span>
        </Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your city" />
          </SelectTrigger>
          <SelectContent>
            {postCities.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label>Photos</Label>
        <ImageUploader images={images} onImagesChange={setImages} />
      </div>

      {/* Boost options */}
      <div className="space-y-3 rounded-lg border p-4">
        <p className="text-sm font-medium">Boost your listing</p>

        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Featured</p>
            <p className="text-muted-foreground text-xs">
              Boost visibility - Rs. 150
            </p>
          </div>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="accent-primary h-4 w-4"
          />
        </label>

        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Urgent</p>
            <p className="text-muted-foreground text-xs">
              Mark as urgent - Rs. 200
            </p>
          </div>
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
            className="accent-primary h-4 w-4"
          />
        </label>
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full">
        Post Listing
      </Button>
    </form>
  );
}
