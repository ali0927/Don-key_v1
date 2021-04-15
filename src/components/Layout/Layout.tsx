import { Footer } from "components/Footer/Footer";
import { NavBar } from "components/Navbar/NavBar";

export const Layout = ({
  children,
  variant,
  className = "bgnav",
}: {
  children: React.ReactNode;
  variant?: "landing" | "loggedin" | "default";
  className?: string;
}) => {
  return (
    <div className={className}>
      <NavBar variant={variant} />
      {children}
      <Footer />
    </div>
  );
};
