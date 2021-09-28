
import styled from "styled-components";

export const Typography = styled.div<{ fontSize: string; bold?: boolean }>`
  
  font-weight: ${(props) => props.bold ? 600: 400};
  font-size: ${(props) => props.fontSize};
  color: #000000;
`;



export const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

