import React from "react";
import { BoostApyWhiteIcon } from "icons";
import { navigate } from "gatsby-link";
import { IDonAccordionProps } from "./interfaces/IDonAccordionProps";
import { ButtonWidget } from "components/Button";
import { fixUrl, formatNum } from "helpers";
import { MyInitialInvestment } from "components/MyInvestment";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";
import moment from "moment";
import { useStakingContract } from "hooks";
import BigNumber from "bignumber.js";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import clsx from "clsx";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import styled from "styled-components";
import { useUSDViewBool } from "contexts/USDViewContext";
import {
  Accordion,
  AccordionCard,
  AccordionCardHeader,
  AccordionHeaderRow,
  StyledMobileImage,
  AccordionDetails,
  AccordionHeadingText,
  AccordionCaptionText,
} from "don-components";

const StyledApyIcon = styled(BoostApyWhiteIcon)`
  margin-right: 6px;
`;

export const DonAccordion: React.FC<IDonAccordionProps> = (props) => {
  const {
    accordionId,
    investments,
    poolAddresses,
    refresh,
    donPrice,
    investedAmountInfo = <></>,
    lastCycleInfo = <></>,
    profitInfo = <></>,
    showLastCycle = false,
    donRewardInfo = <></>,
  } = props;
  const { chainId: network } = useWeb3Context();
  const { isUSD: isInUsd } = useUSDViewBool();
  const {
    tier,
    pendingReward,
    investedAmount: investAmount,
  } = useStakingContract();
  const [openBoast, setBoast] = React.useState(false);

  const RedirectToFarmerProfile =
    (poolAddress: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      navigate("/dashboard/farmer/" + poolAddress);
    };

  const getRewards = (initialInvestmentinUSD: any) => {
    const dons = new BigNumber(pendingReward)
      .multipliedBy(initialInvestmentinUSD)
      .dividedBy(investAmount);

    if (isInUsd) {
      if (!dons.isNaN()) {
        return donPrice.isReady
          ? `$${dons.multipliedBy(donPrice.price).toFixed(2)}`
          : "-";
      }
      return "$ 0";
    } else {
      if (dons.isNaN()) {
        return "0 DON";
      }
      return `${dons.toFixed(2)} DON`;
    }
  };

  const isTierZero = tier.tier === 0;

  return (
    <>
      <Accordion id={accordionId} className=" d-md-block d-lg-none">
        {investments.map((investment, index) => {
          let poolAddressFinal = poolAddresses.find((item: any) => {
            return investment.name === item.name;
          });
          let initialInvestmentinUSD =
            poolAddressFinal?.initialInvestmentinUSD || "0";

          const isWithdrawRequested = false;

          return (
            <>
              <AccordionCard>
                <AccordionCardHeader index={index}>
                  <div
                    className="d-flex"
                    onClick={RedirectToFarmerProfile(investment.slug)}
                  >
                    <div className="d-flex align-items-center">
                      <StyledMobileImage
                        src={fixUrl(investment?.farmerImage?.url)}
                      />
                    </div>

                    <div className="d-flex align-items-center ml-4">
                      <AccordionHeadingText>
                        {investment.name}
                      </AccordionHeadingText>
                    </div>
                  </div>
                </AccordionCardHeader>
                <AccordionHeaderRow>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <AccordionCaptionText>
                      Invested
                      {investedAmountInfo}
                    </AccordionCaptionText>
                    <AccordionHeadingText>
                      {isInUsd && !!poolAddressFinal ? (
                        `$${formatNum(initialInvestmentinUSD)}`
                      ) : (
                        <MyInitialInvestment
                          chainId={network}
                          poolAddress={investment.poolAddress}
                        />
                      )}
                    </AccordionHeadingText>
                  </div>
                  <div className="d-flex align-items-center justify-content-between  mb-2">
                    <AccordionCaptionText>
                      Total Profit
                      {profitInfo}
                    </AccordionCaptionText>
                    <AccordionHeadingText>
                      <TotalProfitLoss
                        chainId={network}
                        refresh={refresh}
                        poolAddress={investment.poolAddress}
                      />
                    </AccordionHeadingText>
                  </div>
                </AccordionHeaderRow>

                <AccordionDetails accordionId={accordionId} index={index}>
                  <div className="d-block w-100">
                    {showLastCycle && <div className="d-flex align-items-center justify-content-between mb-2">
                      <AccordionCaptionText>
                        Last Cycle
                        {lastCycleInfo}
                      </AccordionCaptionText>
                      <AccordionHeadingText>
                        {moment
                          .duration(
                            moment().diff(moment(investment.last_cycle))
                          )
                          .humanize()}{" "}
                        ago
                      </AccordionHeadingText>
                    </div>}
                    {BINANCE_CHAIN_ID === network && tier.tier > 0 && (
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <AccordionCaptionText>
                          Don Rewards
                          {donRewardInfo}
                        </AccordionCaptionText>
                        <AccordionHeadingText>
                          {getRewards(initialInvestmentinUSD)}
                        </AccordionHeadingText>
                      </div>
                    )}

                    <div className="row mt-4">
                      {isTierZero && (
                        <div className={"col-6"}>
                          <ButtonWidget
                            varaint="contained"
                            fontSize="14px"
                            containedVariantColor="black"
                            height="34px"
                            onClick={() => setBoast(true)}
                          >
                            <StyledApyIcon />
                            BOOST APY
                          </ButtonWidget>
                        </div>
                      )}
                      <div
                        className={clsx({
                          "col-6": isTierZero,
                          "col-12": !isTierZero,
                        })}
                      >
                        <ButtonWidget
                          varaint="contained"
                          height="34px"
                          width="100%"
                          fontSize="14px"
                          containedVariantColor="lightYellow"
                          onClick={() =>
                            !isWithdrawRequested
                              ? props.onWithDrawClick(
                                  investment.name,
                                  investment.poolAddress,
                                  investment.poolVersion
                                    ? investment.poolVersion
                                    : 1
                                )()
                              : RedirectToFarmerProfile(investment.guid)
                          }
                        >
                          {isWithdrawRequested ? "PENDING" : "WITHDRAW"}
                        </ButtonWidget>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </AccordionCard>
            </>
          );
        })}
      </Accordion>
      {openBoast && (
        <AcceleratedAPYModal open={openBoast} onClose={() => setBoast(false)} />
      )}
    </>
  );
};
