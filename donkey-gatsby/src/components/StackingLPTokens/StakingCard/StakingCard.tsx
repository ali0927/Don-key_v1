import React from "react";
import styled from "styled-components";
import { TokenBox } from "./TokenBox";
import { ButtonWidget } from "components/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionHeaderRow,
  AccordionHeadingText,
  AccordionCaptionText,
  useWeb3Context,
  BINANCE_CHAIN_ID,
  AccordionCard,
  AccordionCardHeader,
} from "don-components";
import { IStakingCardProps } from "./interfaces";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { captureException, formatNum, getStakingContract } from "helpers";
import { useRefresh } from "components/LotteryForm";
import { LotteryPopupForm } from "components/LotteryForm/LotteryPopupForm";

const Typography = styled.p<{
  fontSize?: string;
  color?: string;
  alignCenter?: boolean;
}>`
  font-family: "Poppins";
  font-size: ${(props) => (props.fontSize ? props.fontSize : "23px")};
  font-weight: 600;
  margin: 0;
  text-align: ${(props) => (props.alignCenter ? "center" : "left")};
  color: ${(props) => (props.color ? props.color : "#000D09")};
`;

const GetMoreLink = styled.a`
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #000;
  text-decoration: underline;
  :hover {
    color: #000;
    text-decoration: none;
  }
`;

const WhiteCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.12),
    0px 10px 32px -4px rgba(24, 39, 75, 0.1);
  border-radius: 14px;
  min-height: 203px;
  width: 77%;
  padding: 25px 30px 25px 30px;
`;

const BlackCard = styled.div`
  background: #171717;
  border-radius: 14px;
  min-height: 203px;
  width: 20%;
  padding: 32px;
`;

const Col = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;

const ColWithBorder = styled(Col)`
  position: relative;
  :after {
    content: "";
    height: 76%;
    position: absolute;
    border: 0.1px solid #dedee0;
    top: 12%;
    right: 40%;
    opacity: 0.4;
  }
`;

const HarvestButton = styled(ButtonWidget)`
  &:disabled {
    background-color: rgba(255, 236, 92, 0.5) !important;
  }
`;

const HrLine = styled.hr`
  border-top: 1px solid #ededf2;
`;

export const StakingCard: React.FC<IStakingCardProps> = (props) => {
  const { networkData } = props;
  const { chainId } = networkData;
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const [disableButtons, setDisableButtons] = React.useState(false);
  const { refresh } = useRefresh();
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();

  const {
    getConnectedWeb3,
    connectDapp,
    connected,
    chainId: connectedChainId,
    switchNetwork,
  } = useWeb3Context();

  const hasStakedAmount = new BigNumber(networkData.stakedLp).gt(0);

  const finalTvl =
    networkData.tvl !== "-"
      ? new BigNumber(networkData.tvl).toNumber().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "-";

  const handleHarvest = async () => {
    const web3 = getConnectedWeb3();
    const staking = await getStakingContract(
      web3,
      chainId === BINANCE_CHAIN_ID
    );
    setDisableButtons(true);
    try {
      showProgress("Harvesting Rewards");
      const accounts = await web3.eth.getAccounts();
      await staking.methods.getReward().send({ from: accounts[0] });
      showSuccess("Rewards Harvested");
    } catch (e) {
      captureException(e, "LotteryForm:handleHarvest");
      showFailure("Transaction Failed");
    } finally {
      refresh();
      setDisableButtons(false);
    }
  };

  const handleUnstake = async () => {
    const web3 = getConnectedWeb3();
    const staking = await getStakingContract(
      web3,
      chainId === BINANCE_CHAIN_ID
    );
    setDisableButtons(true);
    try {
      showProgress("Unstaking Amount and Harvesting Rewards");
      const accounts = await web3.eth.getAccounts();
      await staking.methods.exit().send({ from: accounts[0] });
      showSuccess("Transaction Successfull");
    } catch (e) {
      captureException(e, "handleUnstake");
      showFailure("Transaction Failed");
    } finally {
      refresh();
      setDisableButtons(false);
    }
  };

  const handleConnect = async () => {
    await connectDapp();
    const web3 = getConnectedWeb3();
    const currentChainId = await web3.eth.getChainId();
    if (currentChainId !== chainId) {
      switchNetwork(chainId);
    }
  };

  const handleSwitch = async () => {
    switchNetwork(chainId);
  };

  return (
    <>
      <div className="d-none d-lg-flex justify-content-between position-relative">
        <WhiteCard>
          <div className="row mb-2">
            <div className="col-lg-12">
              <Typography className="mb-3">
                {networkData.networkName}
              </Typography>
              <div className="d-flex mt-4">
                <Col
                  width="35%"
                  className="d-flex flex-column justify-content-between"
                >
                  <Typography className="mb-3" fontSize="14px" color="#9B9B9B">
                    ASSETS
                  </Typography>
                  <div className="d-flex justify-content-between">
                    {networkData.buttons.map((stakeButton) => {
                      return (
                        <TokenBox
                          key={stakeButton.label}
                          label={stakeButton.label}
                          image={stakeButton.imageSrc}
                        />
                      );
                    })}
                  </div>
                </Col>
                <ColWithBorder
                  width="4%"
                  className="d-flex justify-content-center"
                />
                <Col
                  width="32%"
                  className="d-flex flex-column align-items-center"
                >
                  <Typography className="mb-3" fontSize="14px" color="#9B9B9B">
                    Available LP Tokens
                  </Typography>

                  <Typography fontSize="15px" alignCenter>
                    {formatNum(networkData.availableLp)} {networkData.tokenSymbol}
                  </Typography>
                  <GetMoreLink
                    className="d-none d-lg-block"
                    href={props.buyLink}
                    target="_blank"
                  >
                    Get more
                  </GetMoreLink>
                </Col>
                <ColWithBorder
                  width="4%"
                  className="d-flex justify-content-center"
                />
                <Col
                  width="32%"
                  className="d-flex flex-column  align-items-center"
                >
                  <Typography className="mb-3" fontSize="14px" color="#9B9B9B">
                    Staked LP Tokens
                  </Typography>

                  <Typography fontSize="15px" alignCenter>
                    {formatNum(networkData.stakedLp)} {networkData.tokenSymbol}
                  </Typography>
                </Col>
                <ColWithBorder
                  width="4%"
                  className="d-flex justify-content-center"
                />
                <Col
                  width="22%"
                  className="d-flex flex-column align-items-center"
                >
                  <Typography className="mb-3" fontSize="14px" color="#9B9B9B">
                    TVL
                  </Typography>

                  <Typography fontSize="15px" alignCenter>
                    {finalTvl}
                  </Typography>
                </Col>
                <ColWithBorder
                  width="4%"
                  className="d-flex justify-content-center"
                />
                <Col
                  width="10%"
                  className="d-flex flex-column align-items-center"
                >
                  <Typography className="mb-3" fontSize="14px" color="#9B9B9B">
                    APY
                  </Typography>
                  <Typography fontSize="15px" color="#FFC406" alignCenter>
                    {networkData.apy}%
                  </Typography>
                </Col>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-2" />
            <div className="col-8 d-flex justify-content-around">
              {connected ? (
                chainId === connectedChainId ? (
                  <ButtonWidget
                    varaint="contained"
                    height="33px"
                    width="45%"
                    disabled={disableButtons}
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Stake
                  </ButtonWidget>
                ) : (
                  <ButtonWidget
                    varaint="contained"
                    height="33px"
                    width="45%"
                    disabled={disableButtons}
                    onClick={handleSwitch}
                  >
                    Switch Network
                  </ButtonWidget>
                )
              ) : (
                <ButtonWidget
                  varaint="contained"
                  height="33px"
                  width="45%"
                  onClick={handleConnect}
                >
                  Connect
                </ButtonWidget>
              )}
              {hasStakedAmount && (
                <ButtonWidget
                  varaint="outlined"
                  disabled={disableButtons}
                  onClick={handleUnstake}
                  height="33px"
                  width="45%"
                >
                  Unstake
                </ButtonWidget>
              )}
            </div>

            <div className="col-2" />
          </div>
        </WhiteCard>
        <BlackCard
          className={clsx("d-flex flex-column align-items-center", {
            "justify-content-between": hasStakedAmount,
            "justify-content-center": !hasStakedAmount,
          })}
        >
          <Typography fontSize="16px" color="#fff">
            Rewards
          </Typography>
          <Typography fontSize="42px" color="#fff">
            {new BigNumber(networkData.rewards).toFixed(4)}
          </Typography>
          {connected && chainId === connectedChainId && (
            <HarvestButton
              varaint="contained"
              height="30px"
              className="mt-3"
              containedVariantColor="lightYellow"
              disabled={!hasStakedAmount || disableButtons}
              onClick={handleHarvest}
            >
              Harvest
            </HarvestButton>
          )}
          {/* {hasStakedAmount && (

          )} */}
        </BlackCard>
      </div>

      <div className="d-block d-lg-none position-relative">
        <Accordion id={networkData.chainId + "accodion"}>
          <AccordionCard>
            <AccordionCardHeader index={networkData.chainId}>
              <AccordionHeadingText smFontSize="20px" mdFontSize="20px">
                {networkData.networkName}
              </AccordionHeadingText>
            </AccordionCardHeader>
            <AccordionHeaderRow>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <AccordionCaptionText>Assets</AccordionCaptionText>
                <div className="d-flex">
                  {networkData.buttons.map((stakeButton, index) => {
                    return (
                      <TokenBox
                        className={clsx({ "mr-1": index === 0 })}
                        key={stakeButton.label}
                        label={stakeButton.label}
                        image={stakeButton.imageSrc}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <AccordionCaptionText>Available LP Tokens</AccordionCaptionText>
                <AccordionHeadingText smFontSize="16px" mdFontSize="16px">
                  {formatNum(networkData.availableLp)} {networkData.tokenSymbol}
                </AccordionHeadingText>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <AccordionCaptionText> Staked LP Tokens</AccordionCaptionText>
                <AccordionHeadingText smFontSize="16px" mdFontSize="16px">
                  {formatNum(networkData.stakedLp)} {networkData.tokenSymbol}
                </AccordionHeadingText>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <AccordionCaptionText>Total liquidity</AccordionCaptionText>
                <AccordionHeadingText smFontSize="16px" mdFontSize="16px">
                  {finalTvl}
                </AccordionHeadingText>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <AccordionCaptionText>APY</AccordionCaptionText>
                <AccordionHeadingText
                  smFontSize="16px"
                  mdFontSize="16px"
                  color="#FFC406"
                >
                  {networkData.apy}%
                </AccordionHeadingText>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <AccordionCaptionText>Rewards</AccordionCaptionText>
                <AccordionHeadingText smFontSize="16px" mdFontSize="16px">
                  {new BigNumber(networkData.rewards).toFixed(4)}
                </AccordionHeadingText>
              </div>
            </AccordionHeaderRow>
            <AccordionDetails
              accordionId={networkData.chainId + "accodion"}
              index={networkData.chainId}
            >
              <HrLine className="mb-4" />
              {connected ? (
                chainId === connectedChainId ? (
                  <ButtonWidget
                    className="mb-3"
                    varaint="contained"
                    height="40px"
                    disabled={disableButtons}
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Stake
                  </ButtonWidget>
                ) : (
                  <ButtonWidget
                    varaint="contained"
                    className="mb-3"
                    height="40px"
                    disabled={disableButtons}
                    onClick={handleSwitch}
                  >
                    Switch Network
                  </ButtonWidget>
                )
              ) : (
                <ButtonWidget
                  varaint="contained"
                  className="mb-3"
                  height="40px"
                  onClick={handleConnect}
                >
                  Connect
                </ButtonWidget>
              )}

              {hasStakedAmount && (
                <ButtonWidget
                  className="mb-."
                  varaint="outlined"
                  disabled={disableButtons}
                  onClick={handleUnstake}
                  height="40px"
                >
                  Unstake
                </ButtonWidget>
              )}
              {connected && chainId === connectedChainId && (
                <HarvestButton
                  varaint="contained"
                  height="40px"
                  containedVariantColor="lightYellow"
                  disabled={!hasStakedAmount || disableButtons}
                  onClick={handleHarvest}
                >
                  Harvest
                </HarvestButton>
              )}
            </AccordionDetails>
          </AccordionCard>
        </Accordion>
      </div>

      {isPopupOpen && (
        <LotteryPopupForm
          availableAmount={networkData.availableLp || "0"}
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
          }}
          onSuccess={() => {
            setIsPopupOpen(false);
          }}
        />
      )}
    </>
  );
};
