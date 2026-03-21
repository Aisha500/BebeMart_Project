import { Home, Search, PlusCircle, MessageCircle, User, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Browse", path: "/browse" },
    { icon: PlusCircle, label: "Sell", path: user ? "/sell" : "/signin" },
    { icon: MessageCircle, label: "Chat", path: user ? "/messages" : "/signin" },
    { icon: user ? User : LogIn, label: user ? "Profile" : "Sign In", path: user ? "/profile" : "/signin" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          const isSell = label === "Sell";

          return (
            <Link
              key={label}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isSell
                  ? "text-coral"
                  : isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isSell ? "w-7 h-7 -mt-3 bg-coral text-coral-foreground rounded-full p-1" : ""}`} />
              <span className="text-[10px] font-display font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
