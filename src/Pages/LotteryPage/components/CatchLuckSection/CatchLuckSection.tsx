import * as React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Root = styled.div`
  min-height: 250px;
  background: #f4e41c;
`;

const Heading = styled.p`
  font-family: Roboto;
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: left;
`;

const SubHeading = styled.p`
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;



export const CatchLuckSection: React.FC = () => {
  return (
    <>
      <Root>
        <Container>
          <Heading>Catch your luck by the tail</Heading>
          <SubHeading>
            Our achievement in the journey depicted in numbers
          </SubHeading>

        
        </Container>
      </Root>
    </>
  );
};
