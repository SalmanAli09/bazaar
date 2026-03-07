'use client';

import { useState } from 'react';
import { Images, Camera, Plus, Ban, CloudUpload, X } from "lucide-react";

interface FormData {
  product_pictures: string[];
}

interface PhotoUploadProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function PhotoUpload({ formData, updateFormData }: PhotoUploadProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPictures = [...formData.product_pictures];
    
    for (let i = 0; i < files.length && newPictures.length < 5; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result && typeof event.target.result === 'string') {
            const updatedPictures = [...newPictures, event.target.result].slice(0, 5);
            updateFormData({ product_pictures: updatedPictures });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removePicture = (index: number) => {
    const updatedPictures = formData.product_pictures.filter((_, i) => i !== index);
    updateFormData({ product_pictures: updatedPictures });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Images className="w-5 h-5 text-primary" />
        Upload Photos
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Add up to 5 photos. First photo is your main thumbnail.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {formData.product_pictures.map((picture, index) => (
          <div key={index} className="aspect-square rounded-xl overflow-hidden relative group">
            <img 
              src={picture} 
              alt={`Upload ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePicture(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            {index === 0 && (
              <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                Cover
              </div>
            )}
          </div>
        ))}
        
        {formData.product_pictures.length < 5 && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-primary bg-primary/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors group">
            <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
              {formData.product_pictures.length === 0 ? 'Cover' : 'Add'}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}
        
        {[...Array(5 - formData.product_pictures.length - 1)].map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
            <Plus className="w-6 h-6" />
          </div>
        ))}
        
        {formData.product_pictures.length === 5 && (
          <div className="aspect-square rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-slate-300">
            <Ban className="w-4 h-4" />
            <span className="text-[10px]">Max 5</span>
          </div>
        )}
      </div>
      <label className="w-full mt-6 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
        <CloudUpload className="w-5 h-5" />
        Bulk Upload
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
