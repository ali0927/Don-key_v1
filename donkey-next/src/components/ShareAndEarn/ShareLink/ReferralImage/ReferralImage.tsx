import styled from "styled-components";

const BannerRoot = styled.div`
  min-height: 227px;
  /* border-radius: 15px; */
  overflow: hidden;
  /* border-radius: 10px; */
  max-width: 500px;
`;

const BannerImage = styled.img`
  width: 100%;
  overflow: hidden;
`;

const Heading = styled.h2`
  color: #fff;
  font-weight: 800;
`;

const SubHeading = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 0px;
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
  height: 101%;
  width: 100%;

  /* border-radius: 15px; */
`;

const BannerLeftFooter = styled.div`
  /* margin-top: 32px;
  padding: 28px 1px 0px 28px; */
`;

const HighLight = styled.div`
  width: 39px;
  height: 22px;
  background: #fdd700;
  font-family: Poppins;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
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
      <BannerImage src={bgImage} alt="Banner image not found" />

      <BannerContentRoot className="p-4 d-flex flex-column justify-content-between">
        <Heading>Don-Key</Heading>
        <div>
          <div className="row">
            <StyledSubHeading className="col mt-4">
              <SubHeading className="mb-3">Don - {farmerName}</SubHeading>
            </StyledSubHeading>
          </div>
          <div className="row">
            <div className="col-5">
              <BannerLeftFooter>
                <div className="row">
                  <div className="col-5">
                    <HighLight>TVL</HighLight>
                    <Value className="mt-2">{"$" + tvl}</Value>
                  </div>

                  <div className="col-2 d-flex justify-content-center">
                    <Divider />
                  </div>

                  <div className="col-5">
                    <HighLight>APY</HighLight>
                    <Value className="mt-2">{apy}%</Value>
                  </div>
                </div>
              </BannerLeftFooter>
            </div>
            <div className="col-7 d-flex align-items-end justify-content-center pl-0">
              <Value>
                Invest in <Wordhighlight>strategies</Wordhighlight> and make the
                best yield
              </Value>
            </div>
          </div>
        </div>
      </BannerContentRoot>
    </BannerRoot>
  );
};
