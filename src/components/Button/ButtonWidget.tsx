import React from "react";
import styled from "styled-components";
import { theme } from "theme";
import { IContainedButton } from "./interfaces";
import {getContainedCSS} from "./helpers";


interface IButtonProps {
    varaint: "outlined" | "contained";
    children: React.ReactNode;
    fontSize?: string;
    height?: string;
    disabled?: boolean;
    width?: string;
    containedVariantColor?: "black" | "yellow" | "lightYellow";
    onClick?: () => void;
    className?: string;
    
}


const CotainedVariant = styled.button`
    font-family: Roboto;
   
    font-style: normal;
    font-weight: 400;
    text-align: center;
    border: 0px;
    border-radius: 5px;
    ${(props: IContainedButton)=> getContainedCSS(props).default};
    :hover {
             ${(props: IContainedButton)=> getContainedCSS(props).hover};
          };
    :disabled {
        background-color:background-color:#ffec5c;

        color: ${theme.palette.text.white};
        box-shadow: none;
    }

`;


const OutlineVariant = styled.button`
    font-family: Roboto;
    font-size:  ${(props: { width?: string; height?: string; fontSize?: string }) => props.fontSize ? props.fontSize : "16px"};
    font-style: normal;
    font-weight: 400;
    text-align: center;
    background-color: transparent;
    color:  ${theme.palette.text.black};
    width: ${(props: { width?: string; height?: string;fontSize?: string }) => props.width ?  props.width :"100%" };
    height: ${(props: { width?: string; height?: string;fontSize?: string }) => props.height ?  props.height :"100%" };
    border: 1px solid ${theme.palette.border.main};
    :hover {
        background-color: ${theme.palette.common.yellow};
        color:  ${theme.palette.text.black};
    };
    :disabled {
        background-color: transparent;
        border: 1px solid ${theme.palette.border.light};
        color:  ${theme.palette.text.lightGray};
    }

`;



export const ButtonWidget: React.FC<IButtonProps> = (props) => {
    const {varaint,width,height,disabled=false, containedVariantColor= "black",fontSize} = props;
    
    return(
        <>
            {varaint ==="contained" &&
                 <CotainedVariant className={props.className} disabled={disabled} fontSize={fontSize} width={width} height={height} color={containedVariantColor}
                 onClick={props.onClick}>{props.children}</CotainedVariant>
            }
             {varaint ==="outlined" &&
                 <OutlineVariant className={props.className} disabled={disabled} fontSize={fontSize}   width={width} height={height}  onClick={props.onClick}>{props.children}</OutlineVariant>
            }
        </>
    )
}