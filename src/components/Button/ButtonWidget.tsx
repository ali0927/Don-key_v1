import React from "react";
import styled from "styled-components";
import { theme } from "theme";


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

const getBgColor= (color: "black" | "yellow" | "lightYellow") => {
    if(color === "black"){
        return theme.palette.common.black; 
    }
    else if(color === "yellow"){
        return theme.palette.common.yellow; 
    }

    return theme.palette.common.lightYellow; 
}

const getForeColor= (color: "black" | "yellow" | "lightYellow") => {
    if(color === "black"){
        return theme.palette.text.white; 
    }
    else if(color === "yellow"){
        return theme.palette.text.black; 
    }

    return  theme.palette.text.black; 
}

const CotainedVariant = styled.button`
    font-family: Roboto;
    font-size:  ${(props: { color: "black" | "yellow" | "lightYellow", width?: string; height?: string;fontSize?: string }) => props.fontSize ? props.fontSize : "16px"};
    font-style: normal;
    font-weight: 400;
    text-align: center;
    border: 0px;
    border-radius: 5px;
    background-color: ${(props: { color: "black" | "yellow" | "lightYellow", width?: string; height?: string;fontSize?: string }) => getBgColor(props.color)};
    width: ${(props: { color: "black" | "yellow" | "lightYellow", width?: string; height?: string;fontSize?: string }) => props.width ?  props.width :"100%" };
    height: ${(props: { color: "black" | "yellow" | "lightYellow", width?: string; height?: string;fontSize?: string }) => props.height ?  props.height :"100%" };
    color:${(props: { color: "black" | "yellow" | "lightYellow", width?: string; height?: string;fontSize?: string }) => getForeColor(props.color)};
    :hover {
        background-color: ${(props: { color: "black" | "yellow" | "lightYellow", width?: string }) => props.color==="lightYellow" ? theme.palette.common.darkYellow : getBgColor(props.color)};
    };
    :disabled {
        background-color: ${theme.palette.disabled};
        color: ${theme.palette.text.white};
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
        background-color: ${theme.palette.common.black};
        color:  ${theme.palette.text.white};
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