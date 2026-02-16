"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { CitySelector } from "./CitySelector";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 flex h-16 items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="text-2xl font-bold text-primary">Bazaar</span>
        </Link>

        {/* Search - hidden on mobile, visible on md+ */}
        <div className="hidden md:flex flex-1 justify-center">
          <SearchBar />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden sm:block">
            <CitySelector />
          </div>
          <Button asChild size="sm" className="hidden md:inline-flex gap-1">
            <Link href="/post">
              <Plus className="h-4 w-4" />
              Post Ad
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile search bar - visible below header on small screens */}
      <div className="md:hidden px-4 pb-3 flex gap-2">
        <SearchBar />
        <CitySelector />
      </div>
    </header>
  );
}
