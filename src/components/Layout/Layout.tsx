import { Footer } from "components/Footer/Footer";
import { NavBar } from "components/Navbar/NavBar";

export const Layout = ({ children, variant }: { children: React.ReactNode; variant?: "landing" | "loggedin" | "default" }) => {
  return (
    <div className="bgnav">
      <NavBar variant={variant} />
      {children}
      <Footer />
    </div>
  );
};
