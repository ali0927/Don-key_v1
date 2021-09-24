import React from "react";
import { BoostApyWhiteIcon } from "icons";
import { useHistory } from "react-router";
import {
  MobileHeading,
  MobileCaption,
  StyledMobileImage,
} from "./AccordionComponents";
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
import {  useUSDViewBool } from "contexts/USDViewContext";

const StyledApyIcon = styled(BoostApyWhiteIcon)`
  margin-right: 6px;
`;

const HeaderRow = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const AccordionItem = styled.div`
  padding: 5px;
  :first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  :last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  }
`;

const AccordionHeader = styled.div`
  background: unset !important;
  box-shadow: none !important;
  color: inherit !important;
  //margin-bottom: 19px !important;
`;

const AccordionBody = styled.div`
  padding-top: 0;
`;

export const DonAccordion: React.FC<IDonAccordionProps> = (props) => {
  const { investments, poolAddresses, refresh, donPrice } = props;
  const { chainId: network } = useWeb3Context();
  const {isUSD: isInUsd} = useUSDViewBool();
  const {
    tier,
    pendingReward,
    investedAmount: investAmount,
  } = useStakingContract();
  const [openBoast, setBoast] = React.useState(false);
  const history = useHistory();

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    history.push("/dashboard/farmer/" + poolAddress);
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

      <div className="d-block d-lg-none">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {investments.map((investment, index) => {
            let poolAddressFinal = poolAddresses.find((item: any) => {
              return investment.name === item.name;
            });
            let initialInvestmentinUSD =
              poolAddressFinal?.initialInvestmentinUSD || "0";

            const isWithdrawRequested = false;

            return (
              <>
                <AccordionItem className="accordion-item">
                  <div
                    className="accordion-header"
                    id={`flush-heading` + index}
                  >
                    <AccordionHeader
                      className="d-flex w-100 accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={"#flush-collapse-" + index}
                      aria-expanded="false"
                      aria-controls={"flush-collapse-" + index}
                    >
                      <div className="d-flex align-items-center">
                        <StyledMobileImage
                          onClick={RedirectToFarmerProfile(investment.guid)}
                          src={fixUrl(investment?.farmerImage?.url)}
                        />
                      </div>

                      <div className="d-flex align-items-center ml-4">
                        <MobileHeading>{investment.name}</MobileHeading>
                      </div>
                    </AccordionHeader>
                    <HeaderRow>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <MobileCaption>Invested</MobileCaption>
                        <MobileHeading>
                          {isInUsd && !!poolAddressFinal ? (
                            `$${formatNum(initialInvestmentinUSD)}`
                          ) : (
                            <MyInitialInvestment
                              chainId={network}
                              poolAddress={investment.poolAddress}
                            />
                          )}
                        </MobileHeading>
                      </div>
                      <div className="d-flex align-items-center justify-content-between  mb-2">
                        <MobileCaption>Total Profit</MobileCaption>
                        <MobileHeading>
                          <TotalProfitLoss
                            chainId={network}
                            refresh={refresh}
                            poolAddress={investment.poolAddress}
                          />
                        </MobileHeading>
                      </div>
                 
                    </HeaderRow>
                  </div>
                  <div
                    id={"flush-collapse-" + index}
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <AccordionBody className="accordion-body">
                      <div className="d-block w-100">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <MobileCaption>Last Cycle</MobileCaption>
                        <MobileHeading>
                          {moment
                            .duration(
                              moment().diff(moment(investment.last_cycle))
                            )
                            .humanize()}{" "}
                          ago
                        </MobileHeading>
                      </div>
                        {BINANCE_CHAIN_ID === network && tier.tier > 0 && (
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <MobileCaption>Don Rewards</MobileCaption>
                            <MobileHeading>
                              {getRewards(initialInvestmentinUSD)}
                            </MobileHeading>
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
                    </AccordionBody>
                  </div>
                </AccordionItem>
              </>
            );
          })}
        </div>
        {openBoast && (
          <AcceleratedAPYModal
            open={openBoast}
            onClose={() => setBoast(false)}
          />
        )}
      </div>
  );
};
