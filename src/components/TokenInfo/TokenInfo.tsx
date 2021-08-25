import { IStrapiToken } from "interfaces";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import comingsoon from "images/comingsoonupdated.svg";
import BigNumber from "bignumber.js";
import { InvestorCount } from "components/InvestorCount/InvestorCount";
import {
  InvestorCountContract,
  InvestorCountGraphql,
} from "components/InvestorCountGraphql";
const InfoWrapper = styled.div`
  background: #ffffff;
  border-radius: 10px;
  position: relative;
  z-index: 10;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 27px;
  padding-bottom: 25px;
  margin-bottom: 20px;

  ${(props: { disabled?: boolean }) =>
    props.disabled ? `cursor: default;` : `cursor: pointer;`}
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

const DONApy = styled.h6`
  color: #ffc406;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 0;
`;

const SubText = styled.span({ fontSize: 12, fontWeight: "bold" });

export const TokenInfo = ({
  token: { image, symbol, status, maxApy, RiskStrategy },
}: {
  token: IStrapiToken;
}) => {
  const history = useHistory();
  const disabled = status === "commingsoon";

  return (
    <InfoWrapper
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          history.push("/dashboard/" + symbol.toLowerCase());
        }
      }}
    >
      {disabled && (
        <img className="coming-soon" alt="coming" src={comingsoon} />
      )}
      <div className="row">
        <div className="col-6 d-flex align-items-center">
          <div className="mr-2">
            <img style={{ width: 40 }} src={image.url} alt="token" />{" "}
          </div>
          <div>
            <SubText>Deposit with</SubText>
            <h5 style={{ fontSize: 18, fontWeight: 900 }}>{symbol}</h5>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end"></div>
      </div>
      <div className="row mt-5">
        <div className="col-7">
          <DONApy>{new BigNumber(maxApy).plus(100).toFixed()}%</DONApy>
          <SubText>APY for DON stakers</SubText>
        </div>
        <div className="col-5 d-flex flex-column align-items-end justify-content-end">
          <h5 style={{ fontSize: 18, fontWeight: 900 }}>{maxApy}%</h5>
          <SubText>Upto APY</SubText>
        </div>
      </div>
    </InfoWrapper>
  );
};
