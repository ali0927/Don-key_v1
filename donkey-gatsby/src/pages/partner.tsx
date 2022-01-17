import { BecomeAPartnerForm } from "components/BecomeAPartnerForm";
import { HeaderSection } from "components/Earning/HeaderSection";
import { Footer } from "components/Footer";
import { NavBar } from "components/Navbar";
import styled from "styled-components";

const EarningSection = styled.div`
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const Partner = () => {
    return  <div style={{ background: "#F5F5F5" }}>
    <NavBar />

    <EarningSection>
        <HeaderSection hideButton />
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-7">
                    <BecomeAPartnerForm />
                </div>

            </div>
        </div>
      </EarningSection>
    <Footer />
  </div>
}



export default Partner;