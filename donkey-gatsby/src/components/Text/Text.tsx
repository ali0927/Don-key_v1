import { createElement } from "react";
import styled, { css } from "styled-components";


const TextComp = ({
  tag = "p",
  className,
  children,
  style
}: {
  tag?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode
}) => {
  return createElement(tag, { className, style },children);
};

export const Text = styled(TextComp)`
  ${({
    fontSize = 24,
    fontFamily = "Poppins",
    fontWeight = 400,
  }: {
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: "Work Sans" | "Poppins";
  }) => {
    return css`
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      font-family: "${fontFamily}", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
        "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";
    `;
  }}
`;
