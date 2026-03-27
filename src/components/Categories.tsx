"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Shirt, Laptop, Armchair, Book, Watch, Tag, Package, Smartphone, Car, Bike, Gem, Home, Gamepad2, Music, Camera, Baby, Dumbbell, UtensilsCrossed, Paintbrush, Wrench, Dog, Flower2, GraduationCap, HeartPulse, Footprints } from "lucide-react";

interface Category {
  category_id: string;
  name: string;
  icon_name: string;
  bg_color: string;
  text_color: string;
  item_count: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shirt: Shirt,
  laptop: Laptop,
  smartphone: Smartphone,
  armchair: Armchair,
  book: Book,
  watch: Watch,
  car: Car,
  bike: Bike,
  gem: Gem,
  home: Home,
  gamepad2: Gamepad2,
  music: Music,
  camera: Camera,
  baby: Baby,
  dumbbell: Dumbbell,
  "utensils-crossed": UtensilsCrossed,
  paintbrush: Paintbrush,
  wrench: Wrench,
  dog: Dog,
  flower2: Flower2,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  footprints: Footprints,
  tag: Tag,
  package: Package,
};

function getIcon(iconName: string) {
  return iconMap[iconName?.toLowerCase()] || Tag;
}

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
            <p className="text-slate-500">Explore curated collections from top categories</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl text-center animate-pulse">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
                  <div className="h-4 w-20 mx-auto bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-3 w-14 mx-auto bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              ))
            : categories.map((category) => {
                const Icon = getIcon(category.icon_name);
                return (
                  <div
                    key={category.category_id}
                    onClick={() => router.push(`/search/${encodeURIComponent(category.name)}`)}
                    className="group p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all cursor-pointer text-center"
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                      style={{
                        backgroundColor: category.bg_color || undefined,
                        color: category.text_color || undefined,
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold mb-1">{category.name}</h3>
                    <p className="text-slate-400 text-sm">{category.item_count} items</p>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
