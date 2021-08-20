import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import { ButtonWidget } from "components/Button";
import { useStakingContract } from "hooks";
import { useState } from "react";
import styled from "styled-components";
import { useToggle } from "don-hooks";
import { UnstakeDonModal } from "components/UnstakeDonModal/UnstakeDonModal";
import BigNumber from "bignumber.js";
import { Spinner } from "react-bootstrap";

const TotalInvestedAmount = styled.span`
  font-size: 50px;
  font-weight: 700;
`;

const StakingCard = styled.div`
  background-color: #fff;
  box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.12),
    0px 10px 32px -4px rgba(24, 39, 75, 0.1);
  border-radius: 10px;
  padding-top: 55px;
  padding-bottom: 10px;
`;

const StakingCol = styled.div`
  /* &:not(:last:child) { */
  /* position: relative; */
  &:after {
    content: "";
    display: block;
    width: 1px;
    height: 42px;
    background-color: #000d09;
    opacity: 0.3;
    position: absolute;
    right: 0;
    top: 3px;
  }
  &.hide:after {
    display: none;
  }
`;

const StakingTitle = styled.h3`
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #000d09;
`;

const StakingSubtitle = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 0;
  text-align: center;
  color: #000d09;
`;

const StyledButton = styled(ButtonWidget)`
  width: initial !important;
  font-size: 14px;
`;

export const StakingInfo = () => {
  const { stakedDon, tier, pendingReward, investedAmount, isStaked, harvest } =
    useStakingContract();

  const [isStakeModalOpen, setisModalOpen] = useState(false);
  const [unstake, openUnstake, closeUnstake] = useToggle();

  const [loading,enableLoading,disableLoading] = useToggle();

  const harvestDon = async () => {
    enableLoading()
    try {
      await harvest();
    }finally {
      disableLoading();
    }
  }

  return (
    <>
      <p className="mb-0">Total Investment</p>
      <TotalInvestedAmount>${investedAmount}</TotalInvestedAmount>
      {isStakeModalOpen && (
        <AcceleratedAPYModal
          open={isStakeModalOpen}
          onClose={() => setisModalOpen(false)}
        />
      )}
      {unstake && <UnstakeDonModal open={unstake} onClose={closeUnstake}  />}
      <StakingCard className="row mt-3 mb-4">
        <div className="col-12">
          <div className="row">
            <div className="col-md-8 d-flex flex-column align-items-center justify-content-between position-relative">
              <div className="row w-100">
                <StakingCol className="col-md-4">
                  <StakingTitle>DON Staked</StakingTitle>
                  <StakingSubtitle>{stakedDon} DON</StakingSubtitle>
                </StakingCol>
                <StakingCol className="col-md-4">
                  <StakingTitle>Tier</StakingTitle>
                  <StakingSubtitle>{tier.donRequired} DON</StakingSubtitle>
                </StakingCol>
                <StakingCol className="col-md-4">
                  <StakingTitle>Extra APY</StakingTitle>
                  <StakingSubtitle>{tier.apy} %</StakingSubtitle>
                </StakingCol>
              </div>
              <div className="d-flex">
                <StyledButton
                  onClick={() => setisModalOpen(true)}
                  varaint="contained"
                  className="py-1 px-3 mr-3"
                >
                  Stake
                </StyledButton>
                {isStaked && (
                  <StyledButton
                    varaint="outlined"
                    onClick={openUnstake}
                    className="py-1 px-3 rounded"
                  >
                    Unstake
                  </StyledButton>
                )}
              </div>
            </div>
            <div
              className="col-md-2 d-flex flex-column align-items-center justify-content-between position-relative"
              style={{ minHeight: 140 }}
            >
              <StakingCol>
                <StakingTitle>Don Rewards</StakingTitle>
                <StakingSubtitle>{pendingReward} DON</StakingSubtitle>
              </StakingCol>
              <StyledButton
                varaint="contained"
                disabled={new BigNumber(pendingReward).isEqualTo(0)}
                containedVariantColor="lightYellow"
                className="py-1 px-3"
                onClick={harvestDon}
              >
                {loading ? <Spinner animation="border" size="sm" />: "Harvest"}
              </StyledButton>
            </div>
          
           
          </div>
        </div>
          {}
      </StakingCard>
    </>
  );
};
