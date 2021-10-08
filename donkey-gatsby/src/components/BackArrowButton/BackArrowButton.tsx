import React from "react";
import styled from "styled-components";
import { Navigate } from "components/Navigate";
import { IBackArrowButtonProps } from "./interfaces";
import { BackArrow } from "icons";

const StyledLink = styled(Navigate)`
  color: rgba(34, 34, 34, 1);
  display: inline-block;
  margin-bottom: 4rem;
  &:hover {
    color: rgba(34, 34, 34, 1);
    opacity: 0.8;
    text-decoration: none;
  }
`;

const NormalBackButton = styled.div`
  color: rgba(34, 34, 34, 1);
  display: inline-block;
  margin-bottom: 4rem;
  &:hover {
    color: rgba(34, 34, 34, 1);
    opacity: 0.8;
    text-decoration: none;
    cursor:pointer;
  }
`;

export const BackArrowButton: React.FC<IBackArrowButtonProps> = (props) => {
  const { to } = props;

  return (
    <>
      {!props.onClick && (
        <StyledLink to={to}>
          <BackArrow /> <span className="ml-2">Back</span>
        </StyledLink>
      )}
      {props.onClick && (
        <NormalBackButton onClick={props.onClick}>
          <BackArrow /> <span className="ml-2">Back</span>
        </NormalBackButton>
      )}
    </>
  );
};
