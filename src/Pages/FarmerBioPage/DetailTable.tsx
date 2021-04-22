import { Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { shortenAddress } from "don-utils";
import { useMediaQuery } from "@material-ui/core";
import { PoolAmount } from "components/PoolAmount";
import { MyInvestment } from "components/MyInvestment";
import { useIsInvested } from "hooks/useIsInvested";
import { WithDrawPopup } from "components/WithDrawPopup";

const Poolinfo = styled.div`
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.2rem;
`;

const InvestmentDisplay = styled.div`
  background: #000;
  color: #fff;
  padding: 1.5rem;
  border-radius: 4px;
`;

const InvestCardButton = styled.button`
  padding: 0.5rem 2rem;
  width: 100%;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  border: 0;
  background-color: rgba(245, 242, 144, 1);
  transition: all 0.3s linear;
  color: #000;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
`;

export const DetailTable = ({ poolAddress }: { poolAddress: string }) => {
  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);

  const isSmall = useMediaQuery(`@media screen and (max-width:400px)`);

  const { isInvested } = useIsInvested(poolAddress);

  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);

  return (
    <>
      <Col className="my-4 my-lg-0" lg={6}>
        <Poolinfo className="bg-white h-100">
          <div className="list-box">
            <h5 className="heading-title">Pool address</h5>
            <div>{isSmall ? shortenAddress(poolAddress) : poolAddress}</div>
          </div>
        </Poolinfo>
      </Col>
      <Col lg={4}>
        <InvestmentDisplay className="h-100">
          <div className="row">
            <div className="col-md-6">
              <div>Total Pool Value</div>{" "}
              <h5 className="heading-title">
                <PoolAmount poolAddress={poolAddress} />
              </h5>
              {isInvested && (
                <>
                  <div>My Investment</div>{" "}
                  <h5 className="heading-title">
                    <MyInvestment poolAddress={poolAddress} />
                  </h5>
                </>
              )}
            </div>
            <div className="col-md-6">
              {showInvestmentPopup && (
                <InvestmentPopup
                  poolAddress={poolAddress}
                  onClose={() => setShowInvestmentPopup(false)}
                />
              )}
              <InvestCardButton
                className="mb-3"
                onClick={() => setShowInvestmentPopup(true)}
              >
                Invest
              </InvestCardButton>
              {isInvested && (
                <InvestCardButton onClick={() => setShowWithdrawPopup(true)}>
                  Withdraw
                </InvestCardButton>
              )}
              {showWithdrawPopup && (
                <WithDrawPopup
                  open
                  onClose={() => setShowWithdrawPopup(false)}
                  onError={() => {}}
                  onSuccess={() => {}}
                  poolAddress={poolAddress}
                />
              )}
            </div>
          </div>
        </InvestmentDisplay>
      </Col>
    </>
  );
};
