import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import { mockListings, type ListingCategory, type AgeRange } from "@/data/mockListings";
import { Gift, Search } from "lucide-react";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const isGiftFilter = searchParams.get("filter") === "gift";

  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | null>(null);
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredListings = mockListings.filter((listing) => {
    if (isGiftFilter && !listing.isGiftItForward) return false;
    if (selectedCategory && listing.category !== selectedCategory) return false;
    if (selectedAge && listing.ageRange !== selectedAge) return false;
    if (selectedLocation && !listing.sellerLocation.includes(selectedLocation)) return false;
    return true;
  });

  return (
    <div className="pb-20 md:pb-8">
      <div className="container py-6 space-y-6">
        <div className="flex items-center gap-2">
          {isGiftFilter ? (
            <>
              <Gift className="w-6 h-6 text-coral" />
              <h1 className="font-display font-extrabold text-2xl text-foreground">Gift-It-Forward</h1>
              <span className="text-sm text-muted-foreground">— Free items, just pay ₦500 platform fee</span>
            </>
          ) : (
            <>
              <Search className="w-6 h-6 text-primary" />
              <h1 className="font-display font-extrabold text-2xl text-foreground">Browse All</h1>
            </>
          )}
        </div>

        <FilterBar
          selectedCategory={selectedCategory}
          selectedAge={selectedAge}
          selectedLocation={selectedLocation}
          onCategoryChange={setSelectedCategory}
          onAgeChange={setSelectedAge}
          onLocationChange={setSelectedLocation}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredListings.map((listing, i) => (
            <div key={listing.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-4xl">🧸</p>
            <p className="font-display font-bold text-lg text-foreground">
              Your nursery looks a bit empty!
            </p>
            <p className="text-muted-foreground">
              Browse our 5k finds or try different filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
