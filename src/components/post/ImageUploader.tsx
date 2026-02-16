"use client";

import React, { useRef } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const MAX_IMAGES = 5;

export default function ImageUploader({
  images,
  onImagesChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const remaining = MAX_IMAGES - images.length;
    const selected = Array.from(files).slice(0, remaining);
    const newUrls = selected.map((file) => URL.createObjectURL(file));

    onImagesChange([...images, ...newUrls]);

    // Reset input so the same file can be selected again if removed
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleRemove(index: number) {
    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
  }

  return (
    <div className="space-y-3">
      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((src, index) => (
            <div
              key={src}
              className="relative h-24 w-24 overflow-hidden rounded-lg border"
            >
              <img
                src={src}
                alt={`Upload ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {index === 0 && (
                <span className="bg-primary text-primary-foreground absolute bottom-0 left-0 w-full text-center text-[10px] font-medium">
                  Primary
                </span>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                className="absolute top-1 right-1 rounded-full"
                onClick={() => handleRemove(index)}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone / upload trigger */}
      {images.length < MAX_IMAGES && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="border-input hover:bg-accent/50 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-8 transition-colors"
        >
          <Camera className="text-muted-foreground size-8" />
          <span className="text-muted-foreground text-sm">
            {images.length === 0
              ? "Add up to 5 photos"
              : `Add more photos (${images.length}/${MAX_IMAGES})`}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
