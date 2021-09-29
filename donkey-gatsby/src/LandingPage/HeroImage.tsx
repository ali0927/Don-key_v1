import { useIsomorphicEffect } from "hooks";
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "theme";
import loadable from "@loadable/component"

const AnimationWrapper = styled.div`
  min-height: 360px;
  ${theme.mediaQueries.lg.up} {
    min-height: 450px;
  }
`;

const LottieImage = loadable(() => import("./LotterImage"));

export const HeroImage = () => {
 
  const [isShown, setIsShown] = useState(false);

  useIsomorphicEffect(() => {
    setIsShown(true)
  }, [])
  return (
    <AnimationWrapper>
      {isShown && <LottieImage  />}
    </AnimationWrapper>
  );
};
