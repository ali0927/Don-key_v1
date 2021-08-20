import BigNumber from "bignumber.js";
import { ButtonWidget } from "components/Button";
import ButtonComponent from "components/Button/Button";
import React from "react";
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
  padding: 1.5rem 1rem;
`;

const StyledText = styled.p`
  margin-bottom: 0;
  color: #9b9b9b;
  font-size: 12px;
`;

export const StrategyInfo = ({
  strategy: {
    risk: {
      image: { url: riskImage },
    },
    apy,
    farmer: { guid },
  },
}: {
  strategy: IStrategy;
}) => {
  const history = useHistory();
  return (
    <StrategyInfoCard>
      <div className="px-3 py-3">
        <h5>Strategy Risk</h5>
        <div style={{minHeight: 222}} className="d-flex align-items-center justify-content-center">
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
          <StyledText className="text-right">APY for don stakers</StyledText>
        </div>
      </StrategyInfoApy>
      <StrategyInfoApy>
        <ButtonWidget
          onClick={() => {
            history.push(`/dashboard/farmer/${guid}`);
          }}
          varaint="outlined"
          containedVariantColor="black"
        >
          Invest
        </ButtonWidget>
      </StrategyInfoApy>
    </StrategyInfoCard>
  );
};
