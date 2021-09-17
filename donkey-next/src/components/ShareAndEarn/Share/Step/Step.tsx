import React from "react";
import { IStepProps } from "./interfaces/IStepProps";
import styled from "styled-components";
import { breakPoints } from "breakponts";

const TypographyHeading = styled.span`
  font-family: "Poppins";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: #000;
`;

const SubTitle = styled.span`
  font-family: "Poppins";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  color: #666666;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 14px;
  }
`;

const Hr = styled.hr`
  border-top: 1px solid #d0cdcd;
  margin-left: 15px;
  margin-right: 15px;
  :last-child {
    display: none !important;
  }
`;

export const Step: React.FC<IStepProps> = (props) => {
  const { title, image, content } = props;

  return (
    <>
      <div className="col-lg-4 d-flex flex-row-reverse align-items-center justify-content-between d-lg-block">
        <div className="d-flex align-items-center justify-content-center">
          <img src={image} alt="Share image not found" />
        </div>
        <div className="d-flex mt-lg-5">
          <p className="d-flex flex-column d-lg-block">
            <TypographyHeading className="mr-2 mb-1 mb-lg-0">
              {title}
            </TypographyHeading>

            <SubTitle className="w-75">{content}</SubTitle>
          </p>
        </div>
      </div>
      <Hr className="d-block d-lg-none w-100" />
    </>
  );
};
