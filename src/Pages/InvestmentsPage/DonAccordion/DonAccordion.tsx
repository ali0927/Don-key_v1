import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { useAccordionStyles } from "./styles";
import { LeftArrow, BoostApyWhiteIcon } from "icons";
import { useHistory } from "react-router";
import {
  MobileHeading,
  MobileCaption,
  StyledMobileImage,
  Typography,
} from "./AccordionComponents";
import { IDonAccordionProps } from "./interfaces/IDonAccordionProps";
import { ButtonWidget } from "components/Button";
import { fixUrl } from "helpers";
import { MyInitialInvestment } from "components/MyInvestment";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";
import moment from "moment";
import { useStakingContract } from "hooks";
import BigNumber from "bignumber.js";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import clsx from "clsx";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import styled from "styled-components";
import { Switch } from "./Switch";
import { USDViewProvider } from "contexts/USDViewContext";
import { formatNum } from "Pages/FarmerBioPage/DetailTable";

const StyledApyIcon = styled(BoostApyWhiteIcon)`
  margin-right: 6px;
`;

export const DonAccordion: React.FC<IDonAccordionProps> = (props) => {
  const { investments, poolAddresses, refresh, donPrice } = props;
  const { chainId: network } = useWeb3Context();
  const {
    tier,
    pendingReward,
    investedAmount: investAmount,
  } = useStakingContract();
  const [isInUsd, setIsInUsd] = React.useState(true);
  const [openBoast, setBoast] = React.useState(false);
  const history = useHistory();

  const classes = useAccordionStyles();

  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    history.push("/dashboard/farmer/" + poolAddress);
  };

  const getRewards = (initialInvestmentinUSD: any) => {
    const dons = new BigNumber(pendingReward)
      .multipliedBy(initialInvestmentinUSD)
      .dividedBy(investAmount);
    if (isInUsd) {
      return donPrice.isReady
        ? `$${dons.multipliedBy(donPrice.price).toFixed(2)}`
        : "-";
    } else {
      return `${dons.toFixed(2)} DON`;
    }
  };

  const toggleCurrency = React.useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);

  const isTierZero = tier.tier === 0;

  return (
    <USDViewProvider
      value={{
        isUSD: isInUsd,
        toggle: toggleCurrency,
      }}
    >
      <div className="d-block d-lg-none">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <Typography fontSize="18px" bold>
            Farmer`s list
          </Typography>

          <div className="d-flex align-items-center">
            <Typography className="mr-3" fontSize="14px" bold>
              Show in USD
            </Typography>
            <Switch checked={isInUsd} onChange={() => setIsInUsd(!isInUsd)} />
          </div>
        </div>
        {investments.map((investment, index) => {
          let poolAddressFinal = poolAddresses.find((item: any) => {
            return investment.name === item.name;
          });
          let initialInvestmentinUSD =
            poolAddressFinal?.initialInvestmentinUSD || "0";

          const name = investment.name.split(" ");
          const finalName = name.length > 0 ? name[0] + " DON" : "";
          const isWithdrawRequested = false;

          return (
            <>
              <Accordion
                classes={{ root: classes.root, rounded: classes.rounded }}
              >
                <AccordionSummary
                  expandIcon={<LeftArrow className={classes.arrow} />}
                  aria-controls={`panel${index}a-content`}
                  id={`panel${index}a-header`}
                >
                  <div className="d-flex w-100">
                    <div className="d-flex align-items-center">
                      <StyledMobileImage
                        onClick={RedirectToFarmerProfile(investment.guid)}
                        src={fixUrl(investment?.farmerImage?.url)}
                      />
                    </div>

                    <div className="d-flex align-items-center ml-4">
                      <MobileHeading>{finalName}</MobileHeading>
                    </div>
                  </div>
                </AccordionSummary>

                <AccordionDetails classes={{ root: classes.accordionDetails }}>
                  <div className="d-block w-100">
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
                </AccordionDetails>
              </Accordion>
              {openBoast && (
                <AcceleratedAPYModal
                  open={openBoast}
                  onClose={() => setBoast(false)}
                />
              )}
            </>
          );
        })}
      </div>
    </USDViewProvider>
  );
};
