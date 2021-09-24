import React from "react";
import styled from "styled-components";
import { theme } from "theme";
import { IContainedButton, IOutlinedButton } from "./interfaces";
import { getContainedCSS } from "./helpers";
import { breakPoints } from "breakponts";

interface IButtonProps {
  varaint: "outlined" | "contained";
  children: React.ReactNode;
  fontSize?: string;
  style?: React.CSSProperties;
  height?: string;
  disabled?: boolean;
  width?: string;
  containedVariantColor?: "black" | "yellow" | "lightYellow" | "gradient";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const CotainedVariant = styled.button`
  
  font-style: normal;
  
  text-align: center;
  border: 0px;
  border-radius: 10px;
  
  ${(props: IContainedButton) => getContainedCSS(props).default};
  font-size: 14px;
  font-weight: 500;
  :hover {
    ${(props: IContainedButton) => getContainedCSS(props).hover};
  }
  :disabled {
    background-color: ${theme.palette.common.lightYellow};
    box-shadow: none;
    opacity: 0.8;
  }
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 16px;
    font-weight: 400;
  }
`;

const OutlineVariant = styled.button`
  font-style: normal;
  font-weight: 500;
  text-align: center;
  background-color: transparent;
  color: ${theme.palette.text.black};
  width: ${(props: IOutlinedButton) => (props.width ? props.width : "100%")};
  height: ${(props: IOutlinedButton) => (props.height ? props.height : "100%")};
  border: 1px solid ${theme.palette.border.main};
  border-radius: 10px;
  
  font-size: 14px;
  transition: background-color .40s;
  :hover {
    background-color: ${theme.palette.common.black}; 
    color: ${theme.palette.text.white};
  }
  :disabled {
    background-color: transparent;
    border: 1px solid ${theme.palette.border.light};
    color: ${theme.palette.text.lightGray};
  }
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: ${(props: IOutlinedButton) =>
    props.fontSize ? props.fontSize : "16px"};
    font-weight: 400;
  }
`;

export const ButtonWidget: React.FC<IButtonProps> = (props) => {
  const {
    varaint,
    width,
    height,
    disabled = false,
    containedVariantColor = "black",
    fontSize,
    style,
  } = props;

  return (
    <>
      {varaint === "contained" && (
        <CotainedVariant
          className={props.className}
          disabled={disabled}
          fontSize={fontSize}
          width={width}
          height={height}
          style={style}
          onClick={props.onClick}
          color={containedVariantColor}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          {props.children}
        </CotainedVariant>
      )}
      {varaint === "outlined" && (
        <OutlineVariant
          className={props.className}
          disabled={disabled}
          fontSize={fontSize}
          width={width}
          height={height}
          style={style}
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          {props.children}
        </OutlineVariant>
      )}
    </>
  );
};
