"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  Tag,
  X,
  Shirt,
  Laptop,
  Armchair,
  Book,
  Watch,
  Package,
  Smartphone,
  Car,
  Bike,
  Gem,
  Home,
  Gamepad2,
  Music,
  Camera,
  Baby,
  Dumbbell,
  UtensilsCrossed,
  Paintbrush,
  Wrench,
  Dog,
  Flower2,
  GraduationCap,
  HeartPulse,
  Footprints,
} from "lucide-react";

interface Category {
  category_id: string;
  name: string;
  icon_name: string;
  bg_color: string;
  text_color: string;
  item_count: number;
}

const iconOptions = [
  { value: "shirt", label: "Clothing" },
  { value: "laptop", label: "Electronics" },
  { value: "smartphone", label: "Phone" },
  { value: "armchair", label: "Furniture" },
  { value: "book", label: "Books" },
  { value: "watch", label: "Watch" },
  { value: "car", label: "Car" },
  { value: "bike", label: "Bike" },
  { value: "gem", label: "Accessories" },
  { value: "home", label: "Home" },
  { value: "gamepad2", label: "Gaming" },
  { value: "music", label: "Music" },
  { value: "camera", label: "Camera" },
  { value: "baby", label: "Kids" },
  { value: "dumbbell", label: "Sports" },
  { value: "utensils-crossed", label: "Kitchen" },
  { value: "paintbrush", label: "Art" },
  { value: "wrench", label: "Tools" },
  { value: "dog", label: "Pets" },
  { value: "flower2", label: "Garden" },
  { value: "graduation-cap", label: "Education" },
  { value: "heart-pulse", label: "Health" },
  { value: "footprints", label: "Footwear" },
  { value: "tag", label: "Other" },
  { value: "package", label: "General" },
];

const colorPresets = [
  { bg: "#fee2e2", text: "#ef4444", label: "Red" },
  { bg: "#dbeafe", text: "#3b82f6", label: "Blue" },
  { bg: "#dcfce7", text: "#22c55e", label: "Green" },
  { bg: "#fef3c7", text: "#f59e0b", label: "Amber" },
  { bg: "#f3e8ff", text: "#a855f7", label: "Purple" },
  { bg: "#ffedd5", text: "#f97316", label: "Orange" },
  { bg: "#e0f2fe", text: "#0ea5e9", label: "Sky" },
  { bg: "#fce7f3", text: "#ec4899", label: "Pink" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
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

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("tag");
  const [newColorIdx, setNewColorIdx] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleAdd = async () => {
    if (!newName.trim()) {
      setError("Category name is required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const color = colorPresets[newColorIdx];
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          icon_name: newIcon,
          bg_color: color.bg,
          text_color: color.text,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create category");
        return;
      }

      setCategories((prev) => [...prev, { ...data.category, item_count: 0 }]);
      setNewName("");
      setNewIcon("tag");
      setNewColorIdx(0);
      setShowForm(false);
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Delete "${cat.name}"? This cannot be undone.`)) return;

    setDeletingId(cat.category_id);
    setError("");

    try {
      const res = await fetch(`/api/categories?id=${cat.category_id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete category");
        return;
      }

      setCategories((prev) => prev.filter((c) => c.category_id !== cat.category_id));
    } catch {
      setError("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Categories</h1>
          <p className="text-slate-500 mt-1">Manage marketplace categories</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Add Category Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
          <h3 className="font-bold text-slate-900 mb-4">New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Sports & Outdoors"
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Icon
              </label>
              <select
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {colorPresets.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setNewColorIdx(idx)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      newColorIdx === idx ? "border-slate-900 scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.bg }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-4 mb-4 p-4 bg-slate-50 rounded-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preview:</span>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: colorPresets[newColorIdx].bg,
                color: colorPresets[newColorIdx].text,
              }}
            >
              {(() => {
                const Icon = iconMap[newIcon] || Tag;
                return <Icon size={24} />;
              })()}
            </div>
            <span className="font-bold text-slate-900">{newName || "Category Name"}</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={submitting}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all disabled:opacity-60 flex items-center gap-2"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Create Category
          </button>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <Tag size={40} className="mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 font-medium">No categories yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon_name] || Tag;
            return (
              <div
                key={cat.category_id}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center justify-between group hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: cat.bg_color || "#f1f5f9",
                      color: cat.text_color || "#64748b",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{cat.name}</h3>
                    <p className="text-xs text-slate-400">{cat.item_count} products</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(cat)}
                  disabled={deletingId === cat.category_id}
                  className="p-2 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                  title="Delete category"
                >
                  {deletingId === cat.category_id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
