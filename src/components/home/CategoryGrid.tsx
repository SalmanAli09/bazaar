"use client";

import Link from "next/link";
import {
  Shirt,
  Smartphone,
  Footprints,
  Sofa,
  BookOpen,
  Dumbbell,
  CookingPot,
  Baby,
  Car,
  Watch,
} from "lucide-react";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shirt,
  Smartphone,
  Footprints,
  Sofa,
  BookOpen,
  Dumbbell,
  CookingPot,
  Baby,
  Car,
  Watch,
};

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon];
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border bg-card hover:bg-primary/5 hover:border-primary/20 transition-colors group"
              >
                {Icon && (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                )}
                <div className="text-center">
                  <p className="text-sm font-medium">{category.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.productCount} items
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
