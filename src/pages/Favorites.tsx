import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ListingCard from "@/components/ListingCard";
import { mockListings } from "@/data/mockListings";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    if (user) fetchFavorites();
  }, [user, authLoading]);

  const fetchFavorites = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("favorites")
      .select("listing_id")
      .eq("user_id", user.id);

    setFavoriteIds(data?.map((f) => f.listing_id) || []);
    setLoading(false);
  };

  const favListings = mockListings.filter((l) => favoriteIds.includes(l.id));

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground font-display">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-coral" />
        <h1 className="font-display font-black text-2xl text-foreground">Your Favorites</h1>
      </div>

      {favListings.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {favListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <p className="text-4xl">💛</p>
          <p className="font-display font-bold text-lg text-foreground">No favorites yet!</p>
          <p className="text-muted-foreground">
            Browse listings and tap the heart to save items you love.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
