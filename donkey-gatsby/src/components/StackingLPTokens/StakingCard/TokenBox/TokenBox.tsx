import React from "react";
import styled from "styled-components";
import { ITokenBoxProps } from "./interfaces";
import { breakPoints } from "breakponts";
import clsx from "clsx";

const Box = styled.div`
  width: 91px;
  min-height: 40px;
  background: #ffffff;
  border: 1px solid #ededf2;
  border-radius: 12px;
  cursor: context-menu;
  padding: 8px 12px 8px 12px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    border: none;
    width: 90px;
    min-height: 40px;
    padding: 5px 13px 5px 13px;
    box-shadow: 0px 5px 20px rgba(0, 18, 80, 0.1);
  }
`;

const Typography = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin: 0;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 16px;
  }
`;

const StyledImage = styled.img`
  height: 20px;
  width: 20px;
`;

export const TokenBox: React.FC<ITokenBoxProps> = (props) => {
  const { image, label } = props;

  return (
    <>
      <Box
        className={clsx(
          "d-flex align-items-center justify-content-center",
          props.className
        )}
      >
        <div className="d-flex justify-content-between align-items-center w-100">
          <StyledImage src={image} alt="Image not found" />
          <Typography>{label}</Typography>
        </div>
      </Box>
    </>
  );
};
