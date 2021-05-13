import { useEffect } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { shortenAddress } from "don-utils";
import { useMediaQuery } from "@material-ui/core";
import { PoolAmount } from "components/PoolAmount";
import { PoolReserveAmount } from "components/PoolReserveAmount";
import { MyInvestment } from "components/MyInvestment";
import { MyInitialInvestment } from "components/MyInitialInvestment";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { useIsInvested } from "hooks/useIsInvested";
import { WithDrawPopup } from "components/WithDrawPopup";
import {
  getLpTokensTotal,
  getPoolContract,
  calculateInitialInvestment,
  calculateWithdrawAmount,
  getTotalPoolValue,
} from "helpers";
import { useWeb3 } from "don-components";

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
  const [totalLPTokens, setTotalLPTokens] = useState("0");
  const [userLPTokens, setUserLPTokens] = useState("0");
  const [totalPoolValue, setTotalPoolValue] = useState("0");
  const [initialInvestment, setInitialInvestment] = useState("0");
  const [currentHoldings, setCurrentHoldings] = useState("0");
  const web3 = useWeb3();

  const isSmall = useMediaQuery(`@media screen and (max-width:400px)`);

  const { isInvested, getIsInvested } = useIsInvested(poolAddress);

  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);

  useEffect(() => {
    async function apiCall() {
      const accounts = await web3.eth.getAccounts();
      const pool = await getPoolContract(web3, poolAddress);
      let lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
      setUserLPTokens(web3.utils.fromWei(lptokensresponse, "ether"));
      let total = await pool.methods.totalSupply().call();
      setTotalLPTokens(web3.utils.fromWei(total, "ether"));

      let poolValue = await getTotalPoolValue(web3, poolAddress);
      setTotalPoolValue(web3.utils.fromWei(poolValue, "ether"));

      let amount = await calculateInitialInvestment(web3, poolAddress);
      setInitialInvestment(amount);

      let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
      setCurrentHoldings(withdrawAmount);
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSuccess = async () => {

    let d = await getTotalPoolValue(web3, poolAddress);
    setTotalPoolValue(web3.utils.fromWei(d, "ether"));
    const accounts = await web3.eth.getAccounts();
    const pool = await getPoolContract(web3, poolAddress);
    let lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
    setUserLPTokens(web3.utils.fromWei(lptokensresponse, "ether"));
    let total = await pool.methods.totalSupply().call();
    setTotalLPTokens(web3.utils.fromWei(total, "ether"));

    let amount = await calculateInitialInvestment(web3, poolAddress);
    setInitialInvestment(amount);
    let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);
    setCurrentHoldings(withdrawAmount);

    await getIsInvested();
  };
  return (
    <>
      <Col className="my-4 my-lg-0" lg={6}>
        <Poolinfo className="bg-white h-100">
          <div className="list-box">
            <h5 className="heading-title">Pool address</h5>
            <div>{isSmall ? shortenAddress(poolAddress) : poolAddress}</div>
            <br />
            <h5 className="heading-title">APY: 25%</h5>
          </div>
        </Poolinfo>
      </Col>
      <Col lg={4}>
        <InvestmentDisplay className="h-100">
          <div className="row">
            <div className="col-md-6">
              <div>Total Pool Value</div>{" "}
              <h5 className="heading-title">
                {Number(totalPoolValue).toFixed(2)}
              </h5>
              <div>Total Reserve Value</div>{" "}
              <h5 className="heading-title">
                <PoolReserveAmount poolAddress={poolAddress} />
              </h5>
              {isInvested && (
                <>
                  <div>My Initial Investment</div>{" "}
                  <h5 className="heading-title">
                    {Number(initialInvestment).toFixed(2)}
                  </h5>
                  <div>My Current Holdings</div>{" "}
                  <h5 className="heading-title">
                    {Number(currentHoldings).toFixed(8)}
                  </h5>
                  <div>Total Profit/Loss</div>{" "}
                  <h5 className="heading-title">
                    <TotalProfitLoss poolAddress={poolAddress} />
                  </h5>
                  <p style={{ fontSize: 10 }}>
                    LP Tokens: {userLPTokens} out of {totalLPTokens} total
                  </p>
                </>
              )}
            </div>
            <div className="col-md-6">
              {showInvestmentPopup && (
                <InvestmentPopup
                  poolAddress={poolAddress}
                  onClose={() => setShowInvestmentPopup(false)}
                  onSuccess={onSuccess}
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
                  onSuccess={onSuccess}
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
