import * as React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { theme } from "theme";

const Root = styled.div`
  min-height: 250px;
  background: ${theme.palette.background.yellow};
`;

const Heading = styled.p`

  font-size: 35px;
  font-style: normal;
  font-weight: 800;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: left;
`;

// const SubHeading = styled.p`
// 
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 32px;
//   letter-spacing: 0em;
//   text-align: left;
// `;

export const CatchLuckSection: React.FC = () => {
  return (
    <>
      <Root>
        <Container>
          <Heading>
            {" "}
            New lottery coming soon for the next batch of super star farmers{" "}
          </Heading>
          {/* <SubHeading>
          Follow our best farmers and gain passive
          </SubHeading> */}
        </Container>
      </Root>
    </>
  );
};
