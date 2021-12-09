import * as React from "react";
import { TierInfo } from "./TierInfo";
import { useState } from "react";
import { useStakingContract } from "hooks";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal";
import { Banner } from "./StakePage";
import styled from "styled-components";
import { theme } from "theme";
import { breakPoints } from "breakponts";

const BannerHeading = styled.h1`
  font-weight: 800;
  font-size: 46px;
  line-height: 54px;

  ${theme.mediaQueries.xl.down} {
    font-size: 30px;
    line-height: 35px;
  }
`;

const MainDiv = styled.div`
  @media only screen and (max-width: ${breakPoints.md}) {
    padding-left: 15px;
  }
`;

const StyledText = styled.p`
  max-width: 70%;
  font-size: 16px;
  line-height: 24px;
  ${theme.mediaQueries.xl.down} {
    font-size: 12px;
    max-width: 100%;
  }
`;
export const StakePageBanner = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { tier } = useStakingContract();
  const [isModelOpen, setIsModalOpen] = useState(false);
  return (
    <Banner className="w-100 px-lg-3 pb-5">
      <MainDiv className="main w-100  py-1 py-lg-4 d-flex justify-content-between">
        <div className="row w-100">
          <div className="col-12 col-lg-6 pt-3 pb-2 pb-lg-5 py-lg-4">
            <BannerHeading>{title}</BannerHeading>
            <StyledText>{description}</StyledText>
          </div>
          {tier && (
            <div className="col-12 col-lg-6 d-block d-lg-flex justify-content-end">
              <TierInfo onClick={() => setIsModalOpen(true)} tier={tier} />
            </div>
          )}
        </div>
      </MainDiv>
      {isModelOpen && (
        <AcceleratedAPYModal
          open={isModelOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Banner>
  );
};
