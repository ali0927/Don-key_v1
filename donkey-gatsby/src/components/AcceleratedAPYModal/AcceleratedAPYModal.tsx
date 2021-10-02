import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { captureException, getBSCDon, toEther, toWei } from "helpers";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { Spinner } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import clsx from "clsx";
import BgImage from "images/success-bg.png";
import { DonTokenIcon } from "icons/DonTokenIcon";
import { breakPoints } from "breakponts";
import { useWeb3Context } from "don-components";
import tier1 from "./images/tier1.png";
import tier2 from "./images/tier2.png";
import tier3 from "./images/tier3.png";
import tier4 from "./images/tier4.png";
import tier5 from "./images/tier5.png";

const Heading = styled.h2`
  font-weight: bold;
  font-size: ${(props: { fontSize: string; mobileFontSize: string }) =>
    props.mobileFontSize};
  color: #070602;
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: ${(props: { fontSize: string; mobileFontSize: string }) =>
      props.fontSize};
  }
`;

const SubHeading = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  color: #a3a3a3;
  margin: 0;
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: 14px;
  }
`;

const FooterText = styled(SubHeading)`
  font-size: 12px;
`;

const TierRoot = styled.div`
  & .tierSelected {
    border: 1.67647px solid #000;
    border-radius: 14px;
    min-height: 60px;
    min-width: 55px;
    background-color: #fff037;
    @media only screen and (min-width: ${breakPoints.md}) {
      min-height: 90px;
      min-width: 80px;
    }
  }
  & .tierCaptionSelected {
    color: #000;
    font-weight: 600;
  }
`;

const TierItem = styled.div<{ disabled: boolean }>`
  height: 47px;
  width: 47px;
  border-radius: 7.21192px;
  background: #f1f1f1;
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  @media only screen and (min-width: ${breakPoints.md}) {
    height: 70px;
    width: 70px;
  }
`;

const TierCaption = styled.p`
  margin: 0;
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  color: #a2a2a2;
`;

const StyledStaticImage = styled.img`
  height: 37px;
  width: 37px;
  @media only screen and (min-width: ${breakPoints.md}) {
    height: 62px;
    width: 53px;
  }
`;

const DonInfoRoot = styled.div`
  margin-top: 24px;
`;

const DonAvaliableInput = styled.div`
  height: 48px;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: end;
  @media only screen and (min-width: ${breakPoints.md}) {
    height: 70px;
  }
`;

const HrLine = styled.hr`
  border: none;
  &:before {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    max-width: 100%;
    width: 100%;
    border-top: 1px solid #ececec;
  }
`;

const Header = styled.div``;

export const AcceleratedAPYModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [availableDon, setAvailableDon] = useState("");

  const {
    stakedDon,
    stake,
    getTierInfo,
    getTierList,
    holdingDons,
    coolOffDuration,
    tier,
    refetch,
  } = useStakingContract();
  const [predictedApy, setPredictedApy] = useState("");
  const { getConnectedWeb3 } = useWeb3Context();

  const [btnLoading, setBtnLoading] = useState(false);
  const tiersList = getTierList();
  const tiersListLength = Object.keys(tiersList).length;

  const fetchAvailableDon = async () => {
    const web3 = getConnectedWeb3();
    const accounts = await web3.eth.getAccounts();
    const donContract = await getBSCDon(web3);

    const userBalance = await donContract.methods.balanceOf(accounts[0]).call();
    setAvailableDon(toEther(userBalance));
  };

  const initialTier = tier.tier ? tier.tier + 1 : 1;
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [hasCompleted, setHasCompleted] = useState(false);
  const tierImages = ["", tier1, tier2, tier3, tier4, tier5];
  useEffectOnTabFocus(() => {
    fetchAvailableDon();
  }, []);

  const donAmount = useMemo(() => {
    let currentTier = getTierList()[selectedTier];
    if (getTierList()[selectedTier]) {
      const amount = getTierList()[selectedTier].donRequired;
      return amount;
    } else {
      currentTier = getTierList()[tier.tier];
      if (currentTier) {
        const amount = getTierList()[tier.tier].donRequired;
        return amount;
      }
    }
    return "0";
  }, [selectedTier]);

  const requiredDons = useMemo(() => {
    let selectedTierObj = getTierList()[selectedTier];

    return new BigNumber(selectedTierObj.donRequired)
      .minus(stakedDon)
      .toFixed();
  }, [selectedTier, stakedDon]);

  const showBuyButton = useMemo(() => {
    return new BigNumber(availableDon).lt(requiredDons);
  }, [requiredDons, availableDon]);

  const updatePredictedApy = async () => {
    // setLoading(true);
    try {
      const apyObj = await getTierInfo(donAmount);

      if (apyObj) {
        setPredictedApy(apyObj.apy.toFixed());
      }
    } catch (e) {
      captureException(e, "Update Predicted Apy");
    }
  };

  const stakeDon = async () => {
    if (initialTier < tiersListLength) {
      setBtnLoading(true);
      try {
        await stake(
          toWei(new BigNumber(donAmount).minus(stakedDon).toString())
        );
        setHasCompleted(true);
      } catch (e) {
        captureException(e, "StakeDon");
      } finally {
        setBtnLoading(false);
      }
    }
  };

  useEffect(() => {
    updatePredictedApy();
  }, [donAmount]);

  const [hasCheckedDons, setHasChecked] = useState(false);

  useEffectOnTabFocus(() => {
    (async () => {
      setHasChecked(false);
      try {
        await refetch();
      } catch (e) {
        captureException(e, "UseEffect Accelerated APY Modal");
      } finally {
        setHasChecked(true);
      }
    })();
  }, []);
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);

  const renderContent = () => {
    if (!hasCheckedDons) {
      return (
        <div
          style={{ minHeight: 200 }}
          className="d-flex justify-content-center align-items-center"
        >
          <CircularProgress color="inherit" />
        </div>
      );
    }
    if (hasDons) {
      if (hasCompleted) {
        return (
          <>
            <img
              src={BgImage}
              style={{
                position: "absolute",
                zIndex: 0,
                top: 0,
                left: 0,
                width: "100%",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                marginTop: 80,
                textAlign: "center",
              }}
            >
              <DonTokenIcon style={{ marginBottom: 40 }} />
              <h4>Your now in Tier {tier.tier}</h4>
            </div>
          </>
        );
      }
      return (
        <div style={{ marginTop: -30, marginBottom: -20 }}>
          <Header>
            <Heading fontSize="23px" mobileFontSize="18px" className="mb-2">
              Accelerated APY
            </Heading>
            <SubHeading>Stake DON tokens and get Accelerated APY</SubHeading>
          </Header>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <SubHeading>Your current Tier:</SubHeading>
            <Heading fontSize="20px" mobileFontSize="16px">
              Tier {tier.tier}
            </Heading>
          </div>

          <div className="mt-2">
            <SubHeading style={{ color: "#000" }} className="mb-2">
              Upgrade Tier
            </SubHeading>

            <TierRoot className="d-flex ml-0 mr-0 justify-content-between align-items-center flex-wrap flex-lg-nowrap">
              {Object.keys(tiersList).map((item, index) => {
                const tierItem = tiersList[item];
                const isSelected = selectedTier === tierItem.tier;
                const isTierDisabled = initialTier > tierItem.tier;
                const isAllDisabled = initialTier > tiersListLength;
                const imageSrc = tierImages[index];
                if (index !== 0) {
                  return (
                    <div>
                      <TierItem
                        disabled={isTierDisabled}
                        className={clsx(
                          "d-flex align-items-center justify-content-center",
                          {
                            tierSelected: isSelected && !isAllDisabled,
                          }
                        )}
                        onClick={() => {
                          if (!isTierDisabled && !isAllDisabled) {
                            setSelectedTier(tierItem.tier as number);
                          }
                        }}
                      >
                        <StyledStaticImage
                          src={imageSrc}
                          alt="Tier image not found"
                        />
                      </TierItem>
                      <TierCaption
                        className={clsx("mt-1", {
                          tierCaptionSelected: isSelected && !isAllDisabled,
                        })}
                      >
                        {" "}
                        Tier {tierItem.tier}
                      </TierCaption>
                    </div>
                  );
                }
                return null;
              })}
            </TierRoot>

            <DonInfoRoot>
              {!hasDons && (
                <Heading
                  className="text-center mb-3"
                  fontSize="20px"
                  mobileFontSize="16px"
                >
                  You don’t have DON available in your wallet
                </Heading>
              )}
              {hasDons && (
                <>
                  <SubHeading className="mb-2">Available DON</SubHeading>
                  <DonAvaliableInput>
                    <Heading
                      className="m-0 text-right"
                      fontSize="23px"
                      mobileFontSize="20px"
                    >
                      {new BigNumber(availableDon).toFixed(2)}
                    </Heading>
                  </DonAvaliableInput>
                </>
              )}
            </DonInfoRoot>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <SubHeading>Required DON Stake:</SubHeading>
              <Heading fontSize="20px" mobileFontSize="16px">
                {requiredDons}
              </Heading>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-2">
              <SubHeading>Extra APY will be</SubHeading>
              <Heading fontSize="20px" mobileFontSize="16px">
                +{predictedApy}%
              </Heading>
            </div>

            <div className="d-flex align-items-center justify-content-center mt-4">
              {showBuyButton ? (
                <ButtonWidget
                  varaint="contained"
                  onClick={() => {
                    window.open(
                      "https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255",
                      "_blank"
                    );
                  }}
                  className="py-2 font-weight-bold"
                  style={{ fontSize: 14 }}
                  containedVariantColor="lightYellow"
                  width="205px"
                  height="48px"
                >
                  Buy DON
                </ButtonWidget>
              ) : (
                <ButtonWidget
                  varaint="contained"
                  onClick={stakeDon}
                  style={{ fontSize: 14 }}
                  disabled={initialTier >= tiersListLength}
                  className="py-1 font-weight-bold"
                  containedVariantColor="lightYellow"
                  width="205px"
                  height="48px"
                >
                  {btnLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Lock DON"
                  )}
                </ButtonWidget>
              )}
            </div>

            <HrLine className="mt-3 mt-md-4 mb-0" />

            <FooterText className="pt-3 ">
              Staked DON tokens will be locked for {coolOffDuration} after
              unstaking. DON rewards are claimable on the go.{" "}
              <a
                href="https://don-key-finance.medium.com/introducing-don-key-accelerated-rewards-b27f629cb33b"
                target="_blank"
                className="ml-1"
                style={{ color: "#000" }}
              >
                Read more{" "}
              </a>
            </FooterText>
          </div>
        </div>
      );
    } else {
      return <BuyDonContent />;
    }
  };

  return (
    <DonCommonmodal
      isOpen={open}
      title=""
      variant="common"
      onClose={onClose}
      size="xs"
    >
      {renderContent()}
    </DonCommonmodal>
  );
};
