import { NavBar } from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import styled from "styled-components";
import { TeamBoard } from "./TeamBoard";
import { TeamJSON } from "./TeamsData";

const Root = styled.div`
  background-color: #f4e41c;
`;

const Paragraph = styled.p`
  font-size: 20px;
  text-align: center;
`;

export const TeamPage = () => {
  return (
    <Root>
      <NavBar variant="landing" hideWallet />
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row">
            <div className="col">
              <h1 className="text-center mt-md-3">Our Team</h1>
            </div>
          </div>
          <div className="row mt-5 justify-content-center">
            {TeamJSON.map((team) => {
              return <TeamBoard key={team.name} {...team} />;
            })}
          </div>
          <Paragraph>
            No pre-sales. Team member will never sell tokens directly. All token
            sales and launches will be announced through our official Telegram
            and Twitter account.
          </Paragraph>
        </Container>
      </div>
      {/*  footer */}
      <Footer />
    </Root>
  );
};

export default TeamPage;
