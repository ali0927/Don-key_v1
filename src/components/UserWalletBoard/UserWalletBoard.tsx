import { PoolAmount } from "components/PoolAmount";
import { useIsInvested } from "hooks/useIsInvested";
import * as React from "react";
import { IUserWalletProps } from "./interface";
import styled from "styled-components";
import { MyInvestment } from "components/MyInvestment";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { WithDrawPopup } from "components/WithDrawPopup";

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

export const UserWalletBoard: React.FC<IUserWalletProps> = (props) => {
  const { poolAddress } = props;

  const { isInvested } = useIsInvested(poolAddress);
  const [showInvestmentPopup, setShowInvestmentPopup] = React.useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = React.useState(false);

  return (
    <>
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
                {/* <p style={{ fontSize: 10 }}>
                            LP Tokens: {userLPTokens} out of {totalLPTokens}{" "}
                            total
                          </p> */}
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
    </>
  );
};
