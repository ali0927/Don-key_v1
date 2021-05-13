import {
  DonKeyLeftToRightFace,
  LargeEllipse,
  MeadiumEllipse,
} from "icons";
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

const DonkeyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
        <DonKeyLeftToRightFace />
      </DonkeyWrapper>
    </>
  );
};
