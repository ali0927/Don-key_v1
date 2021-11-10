import { breakPoints } from "../../breakponts";
import styled from "styled-components";

const BannerRoot = styled.div`
  overflow: hidden;
  border-radius: 10px;
  width: 100%;

`;

const BannerImage = styled.img`
  width: 100%;
  overflow: hidden;
`;

const Heading = styled.h2`
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  @media only screen and (min-width: ${breakPoints.sm}) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.p`
  font-family: Poppins;
  font-size: 9px;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 0px;
  @media only screen and (min-width: ${breakPoints.sm}) {
    font-size: 14px;
  }
`;

const Value = styled(SubHeading)`
  font-weight: 500;
`;

const BannerContentRoot = styled.div`
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.1) 0,
    #000000 100%
  );
  top: -1px;
  position: absolute;
  height: 100%;
  width: 100%;
  /* border-radius: 15px; */
`;


const HighLight = styled.div`
  width: 22px;
  height: 12px;
  background: #fdd700;
  font-family: Poppins;
  font-size: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: ${breakPoints.sm}) {
    font-size: 12px;
    width: 39px;
    height: 22px;
  }
`;

const Divider = styled.div`
  border-right: 2px solid #fff;
  height: 33px;
  margin-top: 10px;
`;

const Wordhighlight = styled.span`
  background: #fdd700;
`;

const StyledSubHeading = styled.div`
  /* padding: 28px 1px 0px 28px; */
`;

export const ReferralImage = ({
  bgImage,
  farmerName,
  tvl,
  apy,
}: {
  bgImage: string;
  farmerName: string;
  tvl: string;
  apy: string;
}) => {
  return (
    <BannerRoot id="shareEarnImage" className="position-relative">
      <BannerContentRoot className="p-3 p-md-4 d-flex flex-column justify-content-between">
        <Heading>Don-Key</Heading>
        <div>
          <div className="row">
            <StyledSubHeading className="col mt-3 mt-md-4">
              <SubHeading className="mb-2 mb-md-3">
                Don - {farmerName}
              </SubHeading>
            </StyledSubHeading>
          </div>

          <div className="d-flex">
            <div className="d-flex align-items-end">
              <div className="d-flex flex-column align-items-center">
                <HighLight>TVL</HighLight>
                <Value className="mt-2">{"$" + tvl}</Value>
              </div>
              <Divider className="ml-3 mr-3" />
              <div className="d-flex flex-column align-items-center">
                <HighLight>APY</HighLight>
                <Value className="mt-2">{apy}</Value>
              </div>
            </div>

            <div className="d-flex align-items-end ml-3 ml-md-5">
              <Value>
                Invest in <Wordhighlight>farmers</Wordhighlight> and make the
                best yield
              </Value>
            </div>
          </div>
        </div>
      </BannerContentRoot>
      <BannerImage src={bgImage} alt="Banner image not found" />
    </BannerRoot>
  );
};
