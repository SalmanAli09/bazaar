'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-100 dark:border-slate-800 group">
        <img
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          src={images[currentImageIndex]}
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-xs font-bold rounded-full backdrop-blur">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
              index === currentImageIndex
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <img
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              src={image}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
