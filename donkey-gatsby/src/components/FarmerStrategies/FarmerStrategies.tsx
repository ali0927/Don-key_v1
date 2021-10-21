import { StrategyTableForInvestor } from "components/StrategyTable";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { ShowMoreContent } from "components/ShowmoreContent";
import { InvestorListTable } from "components/InvestorListTable/InvestorListTable";
import { IFarmerInter } from "interfaces";

import { breakPoints } from "breakponts";
import { WithdrawRequestInfo } from "components/WithdrawRequestInfo";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useWeb3Context } from "don-components";
import {
  calculateInitialInvestment,
  getAmount,
  getPoolContract,
  getPoolToken,
  toEther,
} from "helpers";
import { useRefresh } from "components/LotteryForm";
import BigNumber from "bignumber.js";

const DescriptionTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 0;
  line-height: 35.44px;

  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 14px;
    font-weight: 600;
  }
`;

const P = styled.p`
  font-size: 15px;
  @media only screen and (max-width: ${breakPoints.md}) {
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    color: #666666;
  }
`;

const StrategyTableRoot = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
  @media only screen and (max-width: ${breakPoints.md}) {
    margin-top: 27px;
    margin-bottom: 27px;
  }
`;

const TableHeaderRoot = styled.div`
  margin-bottom: 50px;
`;

const Image = styled.img`
  @media only screen and (min-width: ${breakPoints.lg}) {
    max-width: 800px !important;
    min-width: 400px;
  }
`;

const WITHDRAWALREQUESTS_QUERY = gql`
  query withdrawRequestQuery($poolAddress: String!, $walletAddress: String!) {
    withdrawRequests(
      where: { poolAddress: $poolAddress, walletAddress: $walletAddress }
      limit: 1
      sort: "created_at:desc"
    ) {
      id
      created_at
      profit
      amountInToken
    }
    farmers(where: { poolAddress: $poolAddress }) {
      withdrawTimeFrame
    }
  }
`;

const Loader = (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: 400 }}
  >
    <Spinner animation="border" color="dark" />
  </div>
);

const WithdrawRequest = ({
  poolAddress,
  poolVersion,
}: {
  poolAddress: string;
  poolVersion: number;
}) => {
  const [fetch, { loading, data }] = useLazyQuery(WITHDRAWALREQUESTS_QUERY);

  const { getConnectedWeb3, connected } = useWeb3Context();
  const [isWithdrawRequested, setIsWithdrawRequested] = useState(false);
  const [profit, setProfit] = useState("0");
  const [amountInToken, setAmountInToken] = useState("0");
  const { dependsOn } = useRefresh();
  const [currency, setCurrency] = useState("");
  const fetchWithdrawInfo = async () => {
    const web3 = getConnectedWeb3();
    const [walletAddress] = await web3.eth.getAccounts();
    const pool = await getPoolContract(web3, poolAddress, poolVersion);
    if (poolVersion === 3) {
      const isRequested = await pool.methods
        .isWithdrawalRequested(walletAddress)
        .call();
      if (isRequested) {
        const token = await getPoolToken(web3, poolAddress);

        const currency = await token.methods.symbol().call();
        const amount = await getAmount(
          web3,
          poolAddress,
          walletAddress,
          poolVersion
        );
        const investedAmount = await calculateInitialInvestment(
          web3,
          poolAddress,
          walletAddress
        );
        fetch({ variables: { poolAddress, walletAddress } });
        setCurrency(currency);
        setIsWithdrawRequested(isRequested);
        setAmountInToken(amount);
        setProfit(new BigNumber(amount).minus(investedAmount).toString());
      }
    }
    if (poolVersion === 4) {
      const details = await pool.methods
        .getWithdrawalReqDetails(walletAddress)
        .call();

      if (details.requested) {
        const token = await getPoolToken(web3, poolAddress);
        const decimals = await token.methods.decimals().call();
        const currency = await token.methods.symbol().call();
        fetch({ variables: { poolAddress, walletAddress } });
        const profit = toEther(details.approxProfit, decimals);
        setProfit(profit);
        const investedAmount = toEther(details.amountInToken, decimals);
        setAmountInToken(new BigNumber(investedAmount).plus(profit).toString());
        setCurrency(currency);
      }
      setIsWithdrawRequested(details.requested);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchWithdrawInfo();
    }
  }, [connected, dependsOn]);
  if (!connected) {
    return null;
  }
  if (!isWithdrawRequested) {
    return null;
  }

  if (isWithdrawRequested) {
    if (loading || !data) {

      return Loader;
    } else {
      const createTimer = data.withdrawRequests[0]?.created_at || Date.now();

      const timeframe = data.farmers[0]?.withdrawTimeFrame || "12";

      return (
        <WithdrawRequestInfo
          amount={amountInToken}
          created_on={createTimer}
          duration={timeframe}
          profit={profit}
          currency={currency}
        />
      );
    }
  }
  return null;
};

export const FarmerStrategies = ({
  farmer,
  isLoaded,
}: {
  farmer: IFarmerInter;
  isLoaded?: boolean;
}) => {
  const renderContent = () => {
    if (!isLoaded) {
      return Loader;
    }

    return (
      <>
        <WithdrawRequest
          poolVersion={farmer.poolVersion}
          poolAddress={farmer.poolAddress}
        />
        <div className="my-4">
          <Container>
            <Row>
              <Col sm={12}>
                <TableHeaderRoot>
                  <DescriptionTitle>
                    {farmer.strategies[0].name || "Description"}
                  </DescriptionTitle>
                  <P>
                    <ShowMoreContent
                      length={80}
                      content={
                        farmer.strategies[0].description ||
                        "For my maiden strategy I am looking for high yields on BNB and ETH, as well as picking some BSC proj"
                      }
                    />
                  </P>
                </TableHeaderRoot>
                <StrategyTableForInvestor
                  chainId={farmer.network.chainId}
                  farmerfee={farmer.farmerfee}
                  performancefee={farmer.performancefee}
                  poolAddress={farmer.poolAddress}
                  strategies={farmer.strategies}
                />
                <StrategyTableRoot className="d-flex flex-column justify-content-center">
                  <div className="d-flex justify-content-center">
                    <Image
                      src={farmer.strategies[0].strategyImage.url}
                      className="img-fluid"
                      alt="strategy image"
                    />
                  </div>
                  {farmer.strategies[0].info && (
                    <p style={{ fontSize: 15 }}>{farmer.strategies[0].info}</p>
                  )}
                </StrategyTableRoot>
                {farmer.graphUrl && (
                  <InvestorListTable
                    chainId={farmer.network.chainId}
                    poolAddress={farmer.poolAddress}
                    graphUrl={farmer.graphUrl}
                    poolVersion={farmer.poolVersion}
                    blacklist={farmer.strategies[0].blacklist}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };

  return <div className="py-3">{renderContent()}</div>;
};
