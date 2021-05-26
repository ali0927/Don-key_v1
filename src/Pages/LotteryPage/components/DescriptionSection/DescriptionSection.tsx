import { ContainedButton } from "components/Button";
import { InfoOvalIcon } from "icons";
import * as React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { theme } from "theme";
import DonImage from "./donkeyimg.png";

const Root = styled.div`
  min-height: 580px;
`;

const DescriptionBlock = styled.div`
  width: 100%;
  min-height: 380px;
  background:${theme.palette.background.yellow};
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

const ImageIconWrraper = styled.div`
  height: 72px;
  width: 72px;
  background: #FFF471;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
  
`;
const ImageIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

export const DescriptionSection: React.FC = () => {
  return (
    <>
      <Root>
        <Container className="d-flex justify-content-center h-100 pt-5 pb-5">
          <div className="row justify-content-center">
            <DescriptionBlock className="col-md-10  m-5">
              <OvalWrapper>
                <ImageIconWrraper>
                  <ImageIcon src={DonImage} alt="donkeyImageNotFount" />
                </ImageIconWrraper>
              </OvalWrapper>
              <ContentWrapper>
                <DescriptionTitle>How it works</DescriptionTitle>
                <Content
                  className="p-5"
                  style={{ lineHeight: "132%", fontSize: 20 }}
                >
                  Don-key will open its DAPP with a group of some of the best
                  yield farmers and their strategies. 600 happy Don-key holders,
                  will be able to enter, explore and follow the farmers and
                  their strategies gaining access to passive yield and
                  accelerated $DON token airdrops. Participating in the lottery
                  requires staking $DON tokens in the upcoming lottery pool. The
                  more $DON tokens you stake, the more lottery tickets you get,
                  and higher chance of following Don-key's farmers.
                </Content>
                {/* <div className="d-flex justify-content-center">
                <CallToAction>Call To Action</CallToAction>
              </div> */}
              </ContentWrapper>
            </DescriptionBlock>
          </div>
        </Container>
      </Root>
    </>
  );
};
