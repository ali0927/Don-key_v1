import { breakPoints } from "breakponts";
import styled from "styled-components";

export const Typography = styled.div<{ fontSize: string; bold?: boolean }>`
  font-family: Poppins;
  font-weight: ${(props) => props.bold ? 600: 400};
  font-size: ${(props) => props.fontSize};
  color: #000000;
`;

export const MobileHeading = styled.div`
  font-family: Poppins;
  font-weight: 600;
  font-size: 14px;
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 16px;
  }
`;


export const MobileCaption1 = styled.div`
font-family: Poppins;
font-size: 14px;
font-weight: 600;
color: #c4c4c4;
margin: 0px;
@media only screen and (min-width: ${breakPoints.md}) {
  font-size: 14px;
  margin-bottom:5px;
}
`;

export const MobileCaption = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  color: #c4c4c4;
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 14px;
  }
`;

export const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

export const StyledMobileImage = styled(StyledImage)`
  width: 36px;
  height: 36px;
`;
