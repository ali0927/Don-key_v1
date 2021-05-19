import { DonKeyLeftToRightFace, LargeEllipse, MeadiumEllipse } from "icons";
import { SmallEllipse } from "icons/SmallEllipse";
import React from "react";
import styled from "styled-components";
import {
  Ellipsce1,
  Ellipsce2,
  Ellipsce3,
  Ellipsce4,
  Ellipsce5,
} from "../HeaderSection/Ellipses";
import donkeySvg from "../../../../Pages/LotteryPage/Donkey.svg";
import DonkeyRightToLeft from "../../../../Pages/LotteryPage/DonkeyRightToLeft.svg";

const DonkeyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  position: absolute;
  right: -50px;
  top: -50px;
  max-width: 100%;
  z-index: 0;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  @media (max-width: 400px) {
    transform: scale(0.6);
  }
`;

export const DonkeyLeftPanel: React.FC = () => {
  return (
    <>
      <Ellipsce1>
        <LargeEllipse />
      </Ellipsce1>
      <Ellipsce2>
        <LargeEllipse />
      </Ellipsce2>
      <Ellipsce3>
        <MeadiumEllipse />
      </Ellipsce3>
      <Ellipsce4>
        <MeadiumEllipse />
      </Ellipsce4>

      <Ellipsce5>
        <SmallEllipse />
      </Ellipsce5>

      <DonkeyWrapper>
        <StyledImage src={donkeySvg} />
        {/* <DonKeyLeftToRightFace /> */}
      </DonkeyWrapper>
    </>
  );
};
