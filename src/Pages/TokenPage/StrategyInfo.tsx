import BigNumber from "bignumber.js";
import clsx from "clsx";
import { ButtonWidget } from "components/Button";
import ButtonComponent from "components/Button/Button";
import {
  InvestorCountContract,
  InvestorCountGraphql,
} from "components/InvestorCountGraphql";
import { USDViewProvider } from "contexts/USDViewContext";
import { useTVL } from "hooks";
import { DollarView } from "Pages/FarmerBioPage/DollarView";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

type IStrategy = {
  risk: {
    Title: string;
    image: {
      url: string;
    };
  };
  name: string;
  apy: string;
  active: boolean;
  farmer: {
    name: string;
    farmerImage: {
      url: string;
    };
    active: boolean;
    guid: string;
    poolVersion: number;
    poolAddress: string;
  };
};

const StrategyInfoCard = styled.div`
  background: #ffffff;
  border-radius: 17px;
  overflow: hidden;
`;

const StrategyInfoApy = styled.div`
  border-top: 1px solid #fbfbfb;
  border-bottom: 1px solid #fbfbfb;
  padding: 1rem 25px;
`;

const StyledText = styled.p`
  margin-bottom: 0;
  color: #9b9b9b;
  font-size: 12px;
`;


const FarmerImage = styled.img`
width: 20px;
height: 20px;
border-radius: 100%;
overflow: hidden;
object-fit: contain;
margin-right: 10px;
`;


export const StrategyInfo = ({
  strategy: {
    risk: {
      image: { url: riskImage },
    },
    apy,
    farmer: { guid, poolAddress, name, farmerImage: {url: image} },
  },
  isOpen,
  setIsOpen,
}: {
  strategy: IStrategy;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const history = useHistory();

  const { tvl } = useTVL(poolAddress);

  return (
    <USDViewProvider value={{ isUSD: true, toggle: () => {} }}>
      <StrategyInfoCard>
        <div className="px-3 py-3">
          <h5>Strategy Risk</h5>
          <div
            style={{ minHeight: 222 }}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={riskImage}
              style={{ marginTop: "4rem" }}
              className="img-fluid"
              alt="Risk"
            />
          </div>
        </div>
        <StrategyInfoApy className="d-flex align-items-center justify-content-between">
          <div>
            <h4>+{apy}%</h4>
            <StyledText>APY</StyledText>
          </div>
          <div>
            <h4 className="text-right">
              +{new BigNumber(apy).plus(100).toFixed(1)}%
            </h4>
            <StyledText className="text-right">APY for DON stakers</StyledText>
          </div>
        </StrategyInfoApy>
        <StrategyInfoApy>
          <ButtonWidget
            onClick={() => {
              history.push(`/dashboard/farmer/${guid}`);
            }}
            varaint="outlined"
            className="py-2"
            containedVariantColor="black"
          >
            Invest
          </ButtonWidget>
        </StrategyInfoApy>
        <div style={{ padding: `10px 25px ` }}>
          <div
            onClick={() => setIsOpen((val) => !val)}
            style={{ cursor: "pointer", fontSize: 16 }}
          >
            <StyledText
              className={clsx({ "font-weight-bold text-dark mb-4": isOpen })}
            >
              See data
            </StyledText>
          </div>

          <div
            style={{
              maxHeight: isOpen ? "initial" : 0,
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <StyledText className="mb-3">Investors</StyledText>
              <StyledText className="mb-3 font-weight-bold text-dark">
                <InvestorCountContract poolAddresses={[poolAddress]} />
              </StyledText>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <StyledText className="mb-3">TVL</StyledText>
              <StyledText className="mb-3 font-weight-bold text-dark">
                <DollarView poolAddress={poolAddress} tokenAmount={tvl} />
              </StyledText>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <StyledText className="mb-3">Current Farmer</StyledText>
              <StyledText className="mb-3 font-weight-bold text-dark d-flex align-items-center">
                <FarmerImage src={image} />  Don - {name}
              </StyledText>
            </div>
          </div>
        </div>
      </StrategyInfoCard>
    </USDViewProvider>
  );
};
