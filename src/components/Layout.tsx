import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import DesktopNav from "./DesktopNav";
import MobileHeader from "./MobileHeader";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />
      <main className="pb-16 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
