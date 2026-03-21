import { categories, ageRanges, locations, type ListingCategory, type AgeRange } from "@/data/mockListings";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  selectedCategory: ListingCategory | null;
  selectedAge: AgeRange | null;
  selectedLocation: string | null;
  onCategoryChange: (cat: ListingCategory | null) => void;
  onAgeChange: (age: AgeRange | null) => void;
  onLocationChange: (loc: string | null) => void;
}

const FilterBar = ({
  selectedCategory,
  selectedAge,
  selectedLocation,
  onCategoryChange,
  onAgeChange,
  onLocationChange,
}: FilterBarProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground font-display font-semibold">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className={`cursor-pointer transition-all text-xs ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-mint-light"
          }`}
          onClick={() => onCategoryChange(null)}
        >
          All
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className={`cursor-pointer transition-all text-xs ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "hover:bg-mint-light"
            }`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Age */}
      <div className="flex flex-wrap gap-2">
        {ageRanges.map((age) => (
          <Badge
            key={age}
            variant={selectedAge === age ? "default" : "outline"}
            className={`cursor-pointer transition-all text-xs ${
              selectedAge === age
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-sky-light"
            }`}
            onClick={() => onAgeChange(selectedAge === age ? null : age)}
          >
            {age}
          </Badge>
        ))}
      </div>

      {/* Location */}
      <div className="flex flex-wrap gap-2">
        {locations.map((loc) => (
          <Badge
            key={loc}
            variant={selectedLocation === loc ? "default" : "outline"}
            className={`cursor-pointer transition-all text-xs ${
              selectedLocation === loc
                ? "bg-accent text-accent-foreground border-lemon-dark"
                : "hover:bg-lemon/50"
            }`}
            onClick={() => onLocationChange(selectedLocation === loc ? null : loc)}
          >
            {loc}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
