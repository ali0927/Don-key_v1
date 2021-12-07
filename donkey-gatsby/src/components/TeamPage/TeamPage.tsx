import { NavBar } from "../../components/Navbar/NavBar";
import { Container } from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import styled from "styled-components";
import { TeamBoard } from "./TeamBoard";
import { TeamJSON } from "./TeamsData";
import { theme } from "theme";
import { breakPoints } from "breakponts";

const Root = styled.div`
  background-color: ${theme.palette.background.yellow};
`;

const TeamHeading = styled.p`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-style: normal;
  margin-bottom: 63px;
  font-weight: 800;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 45px;
  }
`;

const RootTeam= styled.div`
   .gap {
      margin-bottom: 90px;
   }
`;

export const TeamPage = () => {
  return (
    <Root>
      <NavBar variant="landing" hideWallet />
      <div className="pt-0 pt-md-5 pb-5">
        <Container>
          <div className="row">
            <div className="col">
              <TeamHeading className="mt-md-3">Our Team</TeamHeading>
            </div>
          </div>
          <RootTeam className="row mt-3 mt-md-5 justify-content-center">
            <TeamBoard key={TeamJSON[0].name} {...TeamJSON[0]} />
          </RootTeam>
          <div className="row mt-3 mt-md-5">
            {TeamJSON.slice(1).map((team) => {
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
