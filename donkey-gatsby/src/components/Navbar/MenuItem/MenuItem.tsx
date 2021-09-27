import { DonGatsbyLink, IDonGatsbyLinkProps } from "components/DonGatsbyLink";
import styled, { keyframes } from "styled-components";
import { theme } from "theme";

export type IMenuItemProps = IDonGatsbyLinkProps;

const moveInAnimation = keyframes`
  0%   {
    border: 2px solid #222222;
    width: calc(50% - 3em);
  }
  100% {
    border: 2px solid #222222;
    width: calc(100% - 4.5em);
  }`;
export const MenuItem = styled(DonGatsbyLink)`
  display: flex;
  padding: 1rem;
  color: #070602;
  &:hover {
    color: #070602;
  }
  font-weight: 500;
  align-items: center;
  text-decoration: none !important;
  ${theme.mediaQueries.lg.up} {
    font-size: 14px;

    padding: 0.5rem 1rem;
    padding-left: 0px;

    background-color: transparent;
    cursor: pointer;
    position: relative;
    padding-left: 1rem;

    padding-right: 3rem !important;
    :hover:after {
      cursor: pointer;
      position: absolute;
      content: "";
      bottom: -6px;
      background: #222222;
      animation-name: ${moveInAnimation};
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    .active:before {
      border: 2px solid #222222;
      position: absolute;
      content: "";
      bottom: -6px;
      width: 16px;
      background: #222222;
    }
    .active {
      font-weight: bold;
      position: relative;
    }
  }
`;