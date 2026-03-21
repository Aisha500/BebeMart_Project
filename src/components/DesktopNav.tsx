import { Home, Search, PlusCircle, MessageCircle, User, Heart, LogIn, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DesktopNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="font-display font-extrabold text-xl text-foreground">
            Bebe<span className="text-coral">Mart</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link to="/">
            <Button variant={location.pathname === "/" ? "default" : "ghost"} size="sm" className="gap-2 font-display">
              <Home className="w-4 h-4" /> Home
            </Button>
          </Link>
          <Link to="/browse">
            <Button variant={location.pathname === "/browse" ? "default" : "ghost"} size="sm" className="gap-2 font-display">
              <Search className="w-4 h-4" /> Browse
            </Button>
          </Link>

          {user ? (
            <>
              <Link to="/messages">
                <Button variant={location.pathname === "/messages" ? "default" : "ghost"} size="sm" className="gap-2 font-display">
                  <MessageCircle className="w-4 h-4" /> Messages
                </Button>
              </Link>
              <Link to="/favorites">
                <Button variant={location.pathname === "/favorites" ? "default" : "ghost"} size="sm" className="gap-2 font-display">
                  <Heart className="w-4 h-4" /> Favorites
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant={location.pathname === "/profile" ? "default" : "ghost"} size="sm" className="gap-2 font-display">
                  <User className="w-4 h-4" /> Profile
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="sm" className="gap-2 font-display bg-coral hover:bg-coral/90 text-coral-foreground ml-2">
                  <PlusCircle className="w-4 h-4" /> Sell Item
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant={location.pathname === "/signin" ? "default" : "ghost"} size="sm" className="gap-2 font-display">
                  <LogIn className="w-4 h-4" /> Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="gap-2 font-display bg-coral hover:bg-coral/90 text-coral-foreground ml-2">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default DesktopNav;
