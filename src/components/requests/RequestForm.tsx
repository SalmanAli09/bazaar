"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { useRequestStore } from "@/stores/useRequestStore";
import { useUserStore } from "@/stores/useUserStore";
import { Plus } from "lucide-react";

export function RequestForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [city, setCity] = useState("");

  const addRequest = useRequestStore((s) => s.addRequest);
  const currentUser = useUserStore((s) => s.currentUser);

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("");
    setBudgetMin("");
    setBudgetMax("");
    setCity("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentUser) {
      toast.error("You must be logged in to post a request.");
      return;
    }

    if (!title.trim() || !category || !city) {
      toast.error("Please fill in all required fields.");
      return;
    }

    addRequest({
      userId: currentUser.id,
      title: title.trim(),
      description: description.trim(),
      category,
      budgetMin: Number(budgetMin) || 0,
      budgetMax: Number(budgetMax) || 0,
      city,
    });

    toast.success("Your buy request has been posted!");
    resetForm();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Post a Request
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Post a Buy Request</DialogTitle>
          <DialogDescription>
            Tell sellers what you are looking for.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="req-title">Title *</Label>
            <Input
              id="req-title"
              placeholder="e.g. Looking for iPhone 14 in good condition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="req-desc">Description</Label>
            <Textarea
              id="req-desc"
              placeholder="Describe what you need, preferred condition, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
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

          {/* Budget */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="req-min">Budget Min (Rs.)</Label>
              <Input
                id="req-min"
                type="number"
                placeholder="0"
                min={0}
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="req-max">Budget Max (Rs.)</Label>
              <Input
                id="req-max"
                type="number"
                placeholder="0"
                min={0}
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label>City *</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities
                  .filter((c) => c.value !== "all")
                  .map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Post Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
