import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { LatestListings } from "@/components/home/LatestListings";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <LatestListings />
    </>
  );
}
