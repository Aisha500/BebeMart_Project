import { useParams, Link } from "react-router-dom";
import { mockListings } from "@/data/mockListings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, Heart, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";

const ListingDetail = () => {
  const { id } = useParams();
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="container py-20 text-center space-y-4">
        <p className="text-4xl">🧸</p>
        <p className="font-display font-bold text-xl">Listing not found</p>
        <Link to="/">
          <Button variant="outline" className="font-display">Go back home</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price === 0) return "FREE";
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="pb-24 md:pb-8">
      {/* Back button */}
      <div className="container pt-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-display">
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>
      </div>

      <div className="container py-4 md:py-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-muted">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.isGiftItForward && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-lemon text-foreground border-0 font-display gap-1">
                  <Gift className="w-3 h-3" />
                  Gift-It-Forward
                </Badge>
              </div>
            )}
            <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
              <Heart className="w-5 h-5 text-coral" />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">{listing.category}</Badge>
                <Badge variant="outline" className="text-xs">{listing.ageRange}</Badge>
                <Badge variant="secondary" className="text-xs">{listing.condition}</Badge>
              </div>
              <h1 className="font-display font-black text-2xl md:text-3xl text-foreground">
                {listing.title}
              </h1>
              <p className={`font-display font-black text-3xl mt-2 ${listing.isGiftItForward ? "text-coral" : "text-foreground"}`}>
                {formatPrice(listing.price)}
              </p>
              {listing.isGiftItForward && (
                <p className="text-sm text-muted-foreground mt-1">
                  + ₦500 platform fee + delivery
                </p>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{listing.description}</p>

            {/* Escrow badge */}
            <div className="flex items-center gap-2 bg-mint-light rounded-lg px-4 py-3">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-sm">
                <p className="font-display font-bold text-foreground">Escrow Protected</p>
                <p className="text-muted-foreground">Payment held until you confirm receipt</p>
              </div>
            </div>

            {/* Seller info */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary">
                {listing.sellerName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-sm text-foreground">{listing.sellerName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-lemon-dark text-lemon-dark" />
                    {listing.sellerRating}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {listing.sellerLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 font-display font-bold rounded-full bg-coral hover:bg-coral/90 text-coral-foreground gap-2">
                {listing.isGiftItForward ? (
                  <>
                    <Gift className="w-4 h-4" />
                    Grab this for ₦0 (Gift-It-Forward)
                  </>
                ) : (
                  <>Buy Now – {formatPrice(listing.price)}</>
                )}
              </Button>
              <Button size="lg" variant="outline" className="font-display font-bold rounded-full gap-2 border-primary/30">
                <MessageCircle className="w-4 h-4" />
                Message Seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
