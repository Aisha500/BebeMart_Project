import { Link } from "react-router-dom";

const MobileHeader = () => {
  return (
    <header className="md:hidden sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-center h-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">🛒</span>
          <span className="font-display font-extrabold text-lg text-foreground">
            Bebe<span className="text-coral">Mart</span>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default MobileHeader;
