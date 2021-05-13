import { ContainedButton } from "components/Button";
import { InfoOvalIcon } from "icons";
import * as React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Root = styled.div`
  min-height: 580px;
`;

const DescriptionBlock = styled.div`
  min-width: 770px;
  width: 100%;
  min-height: 380px;
  background: #f4e41c;
  border-radius: 5px;
`;

const OvalWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translateY(-32px);
`;

const ContentWrapper = styled.div``;

const DescriptionTitle = styled.div`
  font-family: Roboto;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: -1px;
  text-align: center;
`;

const Content = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
`;

const CallToAction = styled(ContainedButton)`
  background: #000000;
  color: #f3f3f3;
  width: 207px;
  &:hover {
    background: #000000;
    color: #f3f3f3;
  }
`;

export const DescriptionSection: React.FC = () => {
  return (
    <>
      <Root>
        <Container className="d-flex justify-content-center h-100 pt-5 pb-5">
          <DescriptionBlock className="m-5">
            <OvalWrapper>
              <InfoOvalIcon />
            </OvalWrapper>
            <ContentWrapper>
              <DescriptionTitle>Description</DescriptionTitle>
              <Content className="p-5">
                To participate in the lottery, you need to buy a token, and then
                invest on their website, after that you become part of the
                lottery, where after one week it will be announced who won it.
                The winner will have access to the platform
              </Content>
              <div className="d-flex justify-content-center">
                <CallToAction>Call To Action</CallToAction>
              </div>
            </ContentWrapper>
          </DescriptionBlock>
        </Container>
      </Root>
    </>
  );
};
