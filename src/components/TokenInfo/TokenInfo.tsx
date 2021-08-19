import { IStrapiToken } from "interfaces";
import React from "react";
import styled from "styled-components";

const InfoWrapper = styled.div`
  background: #ffffff;
  border-radius: 10px;
  position: relative;
  z-index: 10;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 35px;
  padding-bottom: 25px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const GreenText = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: #31c77f;
  margin-bottom: 0;
`;

const GreyText = styled.p`
  font-weight: 300;
  font-size: 12px;
  color: #b0b7c3;
  margin-bottom: 0.5rem;
`;

export const TokenInfo = ({
  token: { image, symbol },
}: {
  token: IStrapiToken;
}) => {
  return (
    <InfoWrapper>
      <div className="row">
        <div className="col-6">
          <h5>Deposit in</h5>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <img style={{ width: 24 }} src={image.url} alt="token" />{" "}
          <h5 className="ml-2 mb-0">{symbol}</h5>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6">
          <h6>Up to 120% APY</h6>
          <GreenText>For Don Stakers 240% APY</GreenText>
        </div>
        <div className="col-6 d-flex flex-column align-items-end">
          <GreyText>Total investors</GreyText>
          <h6>11</h6>
        </div>
      </div>
    </InfoWrapper>
  );
};