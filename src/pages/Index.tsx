import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import { mockListings, type ListingCategory, type AgeRange } from "@/data/mockListings";
import { Gift, TrendingUp } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | null>(null);
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredListings = mockListings.filter((listing) => {
    if (selectedCategory && listing.category !== selectedCategory) return false;
    if (selectedAge && listing.ageRange !== selectedAge) return false;
    if (selectedLocation && !listing.sellerLocation.includes(selectedLocation)) return false;
    return true;
  });

  const giftItems = mockListings.filter((l) => l.isGiftItForward);

  return (
    <div className="pb-20 md:pb-8">
      <HeroSection />

      {/* Gift-It-Forward Section */}
      <section className="container py-8">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-coral" />
          <h2 className="font-display font-extrabold text-xl text-foreground">
            Gift-It-Forward
          </h2>
          <span className="text-sm text-muted-foreground font-body">
            — Free items, just pay ₦500 platform fee
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {giftItems.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Browse All */}
      <section className="container py-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-display font-extrabold text-xl text-foreground">
            Fresh Finds
          </h2>
        </div>

        <FilterBar
          selectedCategory={selectedCategory}
          selectedAge={selectedAge}
          selectedLocation={selectedLocation}
          onCategoryChange={setSelectedCategory}
          onAgeChange={setSelectedAge}
          onLocationChange={setSelectedLocation}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
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
      </section>

      {/* Seller CTA */}
      <section className="container py-8">
        <div className="bg-gradient-to-r from-mint-light to-sky-light rounded-2xl p-6 md:p-10 text-center space-y-4">
          <p className="text-3xl">👶</p>
          <h2 className="font-display font-extrabold text-2xl text-foreground">
            Your child grew up, but their clothes don't have to go to waste.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Turn clutter into ₦5k today. List in under 2 minutes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
