import { NavBar2 } from "../../components/Navbar/NavBar";
import { Container, Form } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import ButtonComponent from "components/Button/Button";
const TeamPage = () => {
  return (
    <div className="bgnav">
      <NavBar2 hideWallet />
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row">
            <div className="col">
              <h1 className="text-center mt-md-3">Our Team</h1>
            </div>
          </div>
        </Container>
      </div>
      {/*  footer */}
      <Footer />
    </div>
  );
};

export default TeamPage;
