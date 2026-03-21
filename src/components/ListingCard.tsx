import { Heart, MapPin, Star, Gift } from "lucide-react";
import { Listing } from "@/data/mockListings";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }: { listing: Listing }) => {
  const formatPrice = (price: number) => {
    if (price === 0) return "FREE";
    return `₦${price.toLocaleString()}`;
  };

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group block rounded-lg overflow-hidden bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <Heart className="w-4 h-4 text-coral" />
        </button>
        {listing.isGiftItForward && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-lemon text-foreground border-0 font-display text-xs gap-1">
              <Gift className="w-3 h-3" />
              Gift-It-Forward
            </Badge>
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground border-0 text-xs">
            {listing.condition}
          </Badge>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-display font-bold text-sm text-foreground truncate">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className={`font-display font-extrabold text-lg ${listing.isGiftItForward ? "text-coral" : "text-foreground"}`}>
            {formatPrice(listing.price)}
          </span>
          <Badge variant="outline" className="text-[10px] border-primary/30 text-muted-foreground">
            {listing.ageRange}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate max-w-[80px]">{listing.sellerLocation}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-lemon-dark text-lemon-dark" />
            <span>{listing.sellerRating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
