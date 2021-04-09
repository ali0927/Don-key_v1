import { Footer } from "components/Footer/Footer";
import { NavBar2 } from "components/Navbar/NavBar";

export const Layout = ({ children, variant }: { children: React.ReactNode; variant?: "loggedin" | "default" }) => {
  return (
    <div className="bgnav">
      <NavBar2 variant={variant} />
      {children}
      <Footer />
    </div>
  );
};
