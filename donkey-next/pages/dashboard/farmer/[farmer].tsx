import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";

export default function Dashboard() {
  return (
    <div>
      <NavBar variant="loggedin" />

      <Footer />
    </div>
  );
}
