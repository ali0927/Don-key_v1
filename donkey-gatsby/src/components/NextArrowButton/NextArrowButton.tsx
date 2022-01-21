import React from "react";
import styled from "styled-components";
import { Navigate } from "components/Navigate";
import { INextArrowButtonProps } from "./interfaces";
import { RightSliderArrow } from "icons";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`
const StyledLink = styled(Navigate)`
  color: rgba(34, 34, 34, 1);
  display: inline-block;
  margin-bottom: 2rem;
  &:hover {
    color: rgba(34, 34, 34, 1);
    opacity: 0.8;
    text-decoration: none;
  }
`;

const NormalBackButton = styled.div`
  color: rgba(34, 34, 34, 1);
  display: inline-block;
  margin-bottom: 2rem;
  &:hover {
    color: rgba(34, 34, 34, 1);
    opacity: 0.8;
    text-decoration: none;
    cursor:pointer;
  }
`;

export const NextArrowButton: React.FC<INextArrowButtonProps> = (props) => {
  return (
    <Container>
      {!props.onClick && (
        <StyledLink to={props.to}>
          <RightSliderArrow />
        </StyledLink>
      )}
      {props.onClick && (
        <NormalBackButton onClick={props.onClick}>
          <RightSliderArrow />
        </NormalBackButton>
      )}
    </Container>
  );
};
