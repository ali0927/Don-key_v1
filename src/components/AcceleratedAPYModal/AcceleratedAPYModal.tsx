import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { getBSCDon, toEther, toWei } from "helpers";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { Spinner } from "react-bootstrap";
import { CircularProgress, Slider, withStyles } from "@material-ui/core";
import { theme } from "theme";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";

const StyledH2 = styled.h2`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #070602;
`;

const Info = styled.p`
  font-size: 12px;
  line-height: 20px;
  padding: 0 50px;
  text-align: center;

  color: #656565;
`;
const MaxButton = styled.span`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 12px;
  color: #0d6efd;
  &:hover,
  &:focus {
    color: #0a58ca;
  }
`;
const DonInputWrapper = styled.div`
  border: 1px solid #3e3e3e;
  border-radius: 10px;
  position: relative;
  margin-bottom: 40px;
`;
const DonInputLabel = styled.label`
  position: absolute;
  top: 0;
  background-color: #fff;
  padding-left: 5px;
  padding-right: 5px;
  left: 0;
  transform: translate(15px, -60%);
  font-size: 12px;
  color: #c6c6c6;
  margin-bottom: 0%;
`;
const DonHTMLInput = styled.input`
  text-align: right;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 14px 1rem;
  &:focus {
    outline: none;
  }
`;

const Header = styled.div``;

const DonInput = ({
  label,
  placeholder,
  value,
  max,
  showMaxButton,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  max?: string;
  showMaxButton?: boolean;
  onChange: (e: string) => void;
}) => {
  return (
    <DonInputWrapper>
      <DonInputLabel>{label}</DonInputLabel>
      <DonHTMLInput
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {max && (
        <MaxButton className="link-primary" onClick={() => onChange(max)}>
          Max
        </MaxButton>
      )}
    </DonInputWrapper>
  );
};

const DonSlider = withStyles({
  root: {
    color: theme.palette.common.yellow,
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  mark: {
    width: 1,
    height: 5,
    marginTop: 7,
    backgroundColor: "#b0b0b0",
    '&[data-index="4"]': {
      left: "98% !important",
    },
  },
  markLabel: {
    '&[data-index="4"]': {
      left: "97% !important",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const ApyForm = styled.div`
  margin-top: 4rem;
`;

const marks = [
  {
    value: 20,
    label: "Tier 1",
  },
  {
    value: 40,
    label: "Tier 2",
  },
  {
    value: 60,
    label: "Tier 3",
  },
  {
    value: 80,
    label: "Tier 4",
  },
  {
    value: 100,
    label: "Tier 5",
  },
];
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
  const web3 = useWeb3();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const fetchAvailableDon = async () => {
    const accounts = await web3.eth.getAccounts();
    const donContract = await getBSCDon(web3);

    const userBalance = await donContract.methods.balanceOf(accounts[0]).call();
    setAvailableDon(toEther(userBalance));
  };

  const [selectedTier, setSelectedTier] = useState(tier.tier || 1);

  useEffect(() => {
    fetchAvailableDon();
  }, []);

  const donAmount = useMemo(() => {
    const amount = getTierList()[selectedTier].donRequired;
    return amount;
  }, [selectedTier]);

  const updatePredictedApy = async () => {
    setLoading(true);
    try {
      const apyObj = await getTierInfo(donAmount);

      if (apyObj) {
        setPredictedApy(apyObj.apy.toFixed());
      }
    } finally {
      setLoading(false);
    }
  };



  const stakeDon = async () => {
    setBtnLoading(true);
    try {
      await stake(toWei(new BigNumber(donAmount).minus(stakedDon).toString()));
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setBtnLoading(false);
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
      return (
        <div style={{ marginTop: -30, marginBottom: -20 }}>
          <Header className="d-flex align-items-center justify-content-center">
            {/* <div style={{ width: 100 }}>
          <img
            src="/assets/images/token.png"
            className="d-inline-block img-fluid"
            alt="Don Token Logo"
          />
        </div> */}
            <StyledH2 className="mb-0">Accelerated APY</StyledH2>
          </Header>
          <ApyForm>
            <DonInput
              label="Available DON"
              value={new BigNumber(availableDon).toFixed(2)}
              placeholder="Amount"
              onChange={() => {}}
            />
            <span>Choose Tier</span>
            <DonSlider
              disabled={btnLoading}
              value={selectedTier * 20}
              onChange={(e, val) => {
                const currentVal = tier.tier * 20;
                const valBn = new BigNumber(val as number);
                if (valBn.lt(currentVal)) {
                  return setSelectedTier(tier.tier as number);
                } else {
                  setSelectedTier(Math.round((val as number) / 20));
                }
              }}
              marks={marks}
              step={20}
              min={0}
              max={100}
            />
            <p className="mb-1 text-center">Your DON Stake:</p>
            <h5 className="text-center">{donAmount}</h5>
            <p className="text-center font-weight-bold px-5">
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : predictedApy !== "0" && predictedApy !== "" ? (
                <>Extra APY Will Be: +{predictedApy}%</>
              ) : (
                <>Minimum 1000 DON's Required To Get Extra APY</>
              )}
            </p>

            <Info>
              Staked DON tokens will be locked for {coolOffDuration} days after
              unstaking. DON rewards are claimable on the go.
              <a
                href="https://don-key-finance.medium.com/accelerated-apy-d31d5accbb51"
                target="_blank"
                className="ml-1"
              >
                Read more{" "}
              </a>
            </Info>
            <div className="d-flex align-items-center">
              <ButtonWidget
                varaint="contained"
                onClick={stakeDon}
                className="py-2 font-weight-bold"
                containedVariantColor="lightYellow"
                height="40px"
              >
                {btnLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Lock DON"
                )}
              </ButtonWidget>
            </div>
          </ApyForm>
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
