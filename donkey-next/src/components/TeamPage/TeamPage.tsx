import { NavBar } from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import styled from "styled-components";
import { TeamBoard } from "./TeamBoard";
import { TeamJSON } from "./TeamsData";
import { theme } from "theme";


const Root = styled.div`
  background-color: ${theme.palette.background.yellow};
`;


const TeamHeading = styled.p`
  font-family: ObjectSans-Bold;
  font-size: 45px;
  font-style: normal;
  margin-bottom: 63px;
`;

export const TeamPage = () => {
  return (
    <Root>
      <NavBar variant="landing" hideWallet />
      <div className=" pt-5 pb-5">
        <Container>
          <div className="row">
            <div className="col">
              <TeamHeading className="mt-md-3">Our Team</TeamHeading>
            </div>
          </div>
          <div className="row mt-5">
            {TeamJSON.map((team) => {
              return <TeamBoard key={team.name} {...team} />;
            })}
          </div>
          {/* <Paragraph>
            No pre-sales. Team member will never sell tokens directly. All token
            sales and launches will be announced through our official Telegram
            and Twitter account.
          </Paragraph> */}
        </Container>
      </div>
      {/*  footer */}
      <Footer />
    </Root>
  );
};


export default TeamPage;
