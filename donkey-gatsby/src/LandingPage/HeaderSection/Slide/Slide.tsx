import React from "react";
import { ISlideProps } from "./interfaces";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";

const DarkBorder = styled.div`
  width: 29px;
  height: 5px;
  background: #000;
`;

const FooterHeading = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

const FooterSubHeading = styled.h1`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-top: 13px;
`;

export const Slide: React.FC<ISlideProps> = (props) => {
  const { isLoading, label, value } = props;

  return (
    <div className="col-md-2 mb-4 position-relative d-flex flex-column align-items-start">
      <DarkBorder />
      <FooterHeading className="mt-4">{label}</FooterHeading>
      <FooterSubHeading>
        {isLoading ? <Skeleton variant="text" width={100} /> : `$${value}`}
      </FooterSubHeading>
    </div>
  );
};
