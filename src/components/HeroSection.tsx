import { ArrowRight, Gift, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mint-light via-background to-sky-light">
      <div className="container py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-lemon/80 rounded-full px-4 py-1.5 text-sm font-display font-semibold text-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Escrow-protected payments
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl text-foreground leading-tight">
            Big Love for{" "}
            <span className="text-coral">Little Prices</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-lg mx-auto">
            Quality kids' gear, never more than{" "}
            <span className="font-display font-bold text-foreground">₦5,000</span>.
            Buy, sell, and gift pre-loved items for your little ones.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/browse">
              <Button size="lg" className="font-display font-bold gap-2 rounded-full px-8 bg-coral hover:bg-coral/90 text-coral-foreground">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/browse?filter=gift">
              <Button size="lg" variant="outline" className="font-display font-bold gap-2 rounded-full px-8 border-primary/30 hover:bg-mint-light">
                <Gift className="w-4 h-4 text-coral" />
                Gift-It-Forward
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>500+ Active Listings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span>100+ Free Items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-lemon/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sky/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default HeroSection;
