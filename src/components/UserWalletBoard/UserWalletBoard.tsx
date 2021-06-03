import { PoolAmount } from "components/PoolAmount";
import { useIsInvested } from "hooks/useIsInvested";
import  React,{useState} from "react";
import { IUserWalletProps } from "./interface";
import styled from "styled-components";
import { MyInvestment } from "components/MyInvestment";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { WithDrawPopup } from "components/WithDrawPopup";
import { useWeb3 } from "don-components";
import {
  getLpTokensTotal,
  getPoolContract,
  calculateInitialInvestment,
  calculateWithdrawAmount,
  getTotalPoolValue,
} from "helpers";

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
  const { poolAddress, poolVersion } = props;

  const { isInvested } = useIsInvested(poolAddress);
  const [showInvestmentPopup, setShowInvestmentPopup] = React.useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = React.useState(false);

  const [poolValue, setTotalPoolValue] = useState("0")

  const web3 = useWeb3()

  const onSuccess = async () => {
    // let d = await getTotalPoolValue(web3, poolAddress);
    // setTotalPoolValue(web3.utils.fromWei(d, "ether"));
    // const accounts = await web3.eth.getAccounts();
    // const pool = await getPoolContract(web3, poolAddress);
    // let lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
    // setUserLPTokens(web3.utils.fromWei(lptokensresponse, "ether"));
    // let total = await pool.methods.totalSupply().call();
    // setTotalLPTokens(web3.utils.fromWei(total, "ether"));

    // let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
    // setCurrentHoldings(withdrawAmount);
  };

  return (
    <>
      <InvestmentDisplay className="h-100">
        <div className="row">
          <div className="col-md-6">
            <div>Total Pool Value</div>{" "}
            <h5 className="heading-title">
              {Number(poolValue).toString()}
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
                poolVersion={poolVersion}
                onSuccess={onSuccess}
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
                poolVersion={poolVersion}
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
