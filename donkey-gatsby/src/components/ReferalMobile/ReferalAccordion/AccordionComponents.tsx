import { breakPoints } from "breakponts";
import styled from "styled-components";

export const Typography = styled.div<{ fontSize: string; bold?: boolean }>`
  
  font-weight: ${(props) => props.bold ? 600: 400};
  font-size: ${(props) => props.fontSize};
  color: #000000;
`;

export const MobileHeading = styled.div`
  
  font-weight: 600;
  font-size: 14px;
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 16px;
  }
`;

export const MobileCaption = styled.div`
  
  font-size: 12px;
  font-weight: 600;
  color: #c4c4c4;
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 14px;
  }
`;


export const StyledMobileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 5px;
`;