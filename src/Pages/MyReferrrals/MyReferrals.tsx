import BigNumber from "bignumber.js";
import { ButtonWidget } from "components/Button";
import { NavBar } from "components/Navbar";
import { useReferralContext } from "contexts/ReferralContext";
import {
  calculateInitialInvestment,
  calculateUserClaimableAmount,
  getAmount,
  getDonPrice,
  getDonPriceWeb3,
  getReferralSystemContract,
  getRewardSystemContract,
  getTokenAddress,
  getTokenPrice,
  getTokenSymbol,
  toEther,
} from "helpers";
import { useAxios } from "hooks/useAxios";
import { useSnackbar } from "notistack";
import { NetworkButton } from "Pages/DashboardPage/DashboardPage";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { theme } from "theme";
import { useWeb3 } from "don-components";
import Web3 from "web3";
import { IFarmer, IFarmerInter } from "interfaces";
import { useWeb3Network } from "components/Web3NetworkDetector";
import { GridBackground } from "components/GridBackground";
import {
  TableBody,
  Table,
  TableData,
  TableHead,
  TableHeading,
  TableResponsive,
  TableRow,
} from "components/Table";
import {
  CenteredBox,
  ZeroInvestmentBox,
  ZeroInvestmentContent,
  ZeroInvestmentInnerBox,
} from "Pages/InvestmentsPage/InvestmentsPage";
import { useHistory } from "react-router-dom";
import { hideAddress } from "components/InvestorListTable/InvestorListTable";
import { formatNum } from "Pages/FarmerBioPage/DetailTable";

const HeadingTitle = styled.p({
  fontFamily: "ObjectSans-Bold",
  fontSize: "45px",
  fontStyle: "normal",
  fontWeight: 800,
  letterSpacing: "0em",
  textAlign: "left",
  color: "#070602",
});

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const Head = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const WhiteCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
  height: 100%;
`;

const BlackCard = styled.div`
  background-color: #171717;
  border-radius: 5px;
  padding: 30px;
  height: 100%;
`;

const Title = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  ${(props: { variant?: "light" }) => {
    return props.variant && `color: rgba(255,255,255,0.7)`;
  }}
`;

const Subtitle = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 0;
  ${(props: { variant?: "light" }) => {
    return props.variant && `color: rgba(255,255,255,1)`;
  }}
`;

type ReferrerInfo = {
  expired: boolean;
  poolAddress: string;
  referred: string;
  rewardedToken: string;
  rewardedUSD: string;
  investedAmount: string;
  hasReferred: boolean;
};
const calcDonRewards = async (
  web3: Web3,
  referrerInfo: ReferrerInfo,
  wallet_address: string,
  donPrice: string
) => {
  if (referrerInfo.expired) {
    return {
      profit: "0",
      don: toEther(referrerInfo.rewardedToken),
      investedAmount: "0",
    };
  }
  const poolAddress = referrerInfo.poolAddress;
  const amountWithdraw = await calculateUserClaimableAmount(
    web3,
    poolAddress,
    wallet_address
  );
  const amountInitial = await calculateInitialInvestment(
    web3,
    poolAddress,
    wallet_address
  );
  const profit = new BigNumber(amountWithdraw).minus(amountInitial);
  if (profit.lte("0")) {
    return { profit: profit.toFixed(2), don: "0", investedAmount: amountInitial };
  }
  const tokenPrice = await getTokenPrice(
    web3,
    await getTokenAddress(web3, poolAddress)
  );

  const tokenValueInUsd = profit.multipliedBy(tokenPrice).multipliedBy(0.02);

  return {
    profit: profit.toFixed(2),
    don: tokenValueInUsd.dividedBy(donPrice).toFixed(2),
    investedAmount: amountInitial,
  };
};

type ReferralTableState = {
  pool_address: string;
  wallet_address: string;
  expired: boolean;
  rewards: string;
  poolSymbol: string;
  referralInvestment: string;
  referralProfit: string;
  farmerName: string;
  farmerImage: string;
  GUID: string;
};

const CustomTableHeading = styled(TableHeading)`
  text-align: center;
`;

const CustomTableData = styled(TableData)`
  text-align: center;
  cursor: ${(props: { cursor?: string }) =>
    props.cursor ? props.cursor : "auto"};
`;
const useTransformedData = () => {
  const [isReady, setIsReady] = useState(false);
  const [{ data }] = useAxios("/api/v2/referrer");
  const web3 = useWeb3();
  const [transformedData, setTransformedData] = useState<ReferralTableState[]>(
    []
  );
  const [{ data: farmerData }] = useAxios("/api/v2/farmer");
  const { chainId: network } = useWeb3Network();
  const farmers: IFarmer[] = useMemo(() => {
    if (farmerData) {
      return farmerData.data
        .filter((item: IFarmerInter) => {
          return item.strategy?.network?.chainId === network;
        })
        .map((item: IFarmerInter) => {
          const farmer: IFarmer = {
            GUID: item.GUID,
            name: `Don - ${item.name}`,
            description: item.description,
            picture: item.picture,
            pool_version: item.pool_version,
            poolAddress: item.poolAddress,
            profit24hours: item.profit24hours || "-",
            profit7days: item.profit7days || "-",
            telegram: item.telegram,
            twitter: item.twitter,
            profit: item.profit || "-",
            descriptionTitle: item.descriptionTitle,
            risk: item.risk,
            network: item.strategy?.network,
            riskDescription: item.riskDescription,
            status: item.status,
            apy: item?.strategy?.apy,
            strategyImage: item?.strategy?.strategyImage,
            investors: item.investors,
          };
          return farmer;
        });
    }
    return [];
  }, [farmerData, network]);
  const transformData = async () => {
    const donPrice = await getDonPriceWeb3(web3);

    const promises = data.map(async ({ wallet_address }: any) => {
      try {
        const referralContract = await getReferralSystemContract(web3);
        const referrerInfo: ReferrerInfo = await referralContract.methods
          .referrerInfo(wallet_address)
          .call();
        const symbol = await getTokenSymbol(web3, referrerInfo.poolAddress);
        const { profit, don, investedAmount } = await calcDonRewards(
          web3,
          referrerInfo,
          wallet_address,
          donPrice
        );
        const farmer = farmers.find(
          (item) => item.poolAddress === referrerInfo.poolAddress
        );
        if (farmer) {
          const referralState: ReferralTableState = {
            expired: referrerInfo.expired,
            farmerImage: farmer.picture,
            poolSymbol: symbol,
            pool_address: referrerInfo.poolAddress,
            farmerName: farmer.name,
            referralInvestment: investedAmount,
            referralProfit: profit,
            rewards: don,
            wallet_address,
            GUID: farmer.GUID,
          };
          return referralState;
        }
        return null;
      } catch (e) {
        return null;
      }
    });
    const result = await Promise.all(promises);
    setTransformedData(result.filter((item) => !!item) as ReferralTableState[]);
    setIsReady(true);
  };

  useEffect(() => {
    console.log(farmers.length, data, "Data");
    if (farmers.length > 0 && data) {
      console.log("called");
      transformData();
    }
  }, [farmers.length, data ? data.length : 0]);

  return { transformedData, isReady, transformData };
};
const AnimationDiv = styled.div({
  minHeight: 500,
});
const StyledImage = styled.img`
  width: 45px;
  height: 45px;
`;
const EmptyTableHeading = styled(TableHeading)`
  min-width: 75px;
`;

export const MyReferrals = () => {
  const { referralCount, code } = useReferralContext();
  const [isCopied, setCopied] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    enqueueSnackbar("Referral Code Copied to Clipboard", {
      variant: "success",
      onClose: () => {
        setCopied(false);
      },
    });
  };
  const web3 = useWeb3();

  const { isReady, transformedData } = useTransformedData();

  const totalDon = useMemo(() => {
    if (isReady) {
      return transformedData
        .reduce((prev, next) => {
          if (next.expired) {
            return prev;
          }
          return prev.plus(next.rewards);
        }, new BigNumber(0))
        .toFixed(2);
    }
    return "-";
  }, [transformedData, isReady]);

  const [availableDon, setAvailable] = useState("-");
  const fetchAvailableDon = async () => {
    const rewardSystem = await getRewardSystemContract(web3);
    const accounts = await web3.eth.getAccounts();
    const user = await rewardSystem.methods.userInfo(accounts[0]).call();
    setAvailable(toEther(user.rewardsDebt));
  };
  useEffect(() => {
    fetchAvailableDon();
  }, [transformedData]);

  const hasAvailable =
    availableDon !== "-" ? new BigNumber(availableDon).gt(0) : false;
  const handleWithdraw = async () => {
    const rewardContract = await getRewardSystemContract(web3);
    const accounts = await web3.eth.getAccounts();
    await rewardContract.methods.harvestRewards().send({ from: accounts[0] });
  };
  const history = useHistory();
  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    history.push("/dashboard/farmer/" + poolAddress);
  };
  console.log(transformedData);
  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      <Section>
        <Head className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <Col lg={12}>
                <HeadingTitle>My Referrals</HeadingTitle>
                <div className="row">
                  <div className="col-md-6">
                    <WhiteCard>
                      <div className="row h-100 align-items-center">
                        <div className="col-md-4">
                          <Title>Total Referrals</Title>
                          <Subtitle>{referralCount}</Subtitle>
                        </div>
                        <div className="col-md-4">
                          <Title>Referral Code</Title>
                          <Subtitle>{code.toUpperCase()}</Subtitle>
                        </div>
                        <div className="col-md-4">
                          <ButtonWidget
                            varaint="contained"
                            fontSize="14px"
                            containedVariantColor="lightYellow"
                            height="30px"
                            onClick={() => handleCopy()}
                          >
                            {isCopied ? "Copied" : "Copy"}
                          </ButtonWidget>
                        </div>
                      </div>
                    </WhiteCard>
                  </div>
                  <div className="col-md-6">
                    <BlackCard>
                      <div className="row h-100 align-items-center">
                        <div className="col-md">
                          <Title variant="light">Rewards Accumulated</Title>
                          <Subtitle variant="light">{totalDon}</Subtitle>
                        </div>
                        <div className="col-md">
                          <Title variant="light">Rewards Available</Title>
                          <Subtitle variant="light">{formatNum(availableDon)}</Subtitle>
                        </div>
                        {hasAvailable && (
                          <div className="col-md-4">
                            <ButtonWidget
                              varaint="contained"
                              fontSize="14px"
                              containedVariantColor="lightYellow"
                              height="30px"
                              onClick={handleWithdraw}
                            >
                              Withdraw
                            </ButtonWidget>
                          </div>
                        )}
                      </div>
                    </BlackCard>
                  </div>
                </div>

                <div className="d-flex px-2 mt-3">
                  <NetworkButton
                    active
                    // onClick={() => setStrategyNetworkFilter(BSCChainId)}
                  >
                    BSC
                  </NetworkButton>
                </div>
              </Col>
            </Row>
          </Container>
        </Head>
      </Section>
      <GridBackground className="py-5">
        <div className="mt-5 mb-5 tablebgHead">
          <Container>
            {!isReady && (
              <>
                <AnimationDiv className="d-flex align-items-center justify-content-center">
                  <Spinner animation="border" />
                </AnimationDiv>
              </>
            )}
            {isReady && transformedData.length > 0 && (
              <>
                <TableResponsive>
                  <Table>
                    <TableHead>
                      <TableRow isHoverOnRow={false}>
                        <CustomTableHeading className="py-4">
                          #
                        </CustomTableHeading>
                        <EmptyTableHeading></EmptyTableHeading>
                        <CustomTableHeading>FARMER NAME</CustomTableHeading>
                        <CustomTableHeading>Referral Address</CustomTableHeading>
                        <CustomTableHeading>INVESTED AMOUNT</CustomTableHeading>
                        <CustomTableHeading>TOTAL PROFIT</CustomTableHeading>
                        <CustomTableHeading>Rewards</CustomTableHeading>
                        <CustomTableHeading>Earned</CustomTableHeading>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transformedData.map((investment, index) => {
                        return (
                          <TableRow key={investment.GUID}>
                            <CustomTableData>{index + 1}</CustomTableData>
                            <CustomTableData>
                              <StyledImage src={investment.farmerImage} />
                            </CustomTableData>
                            <CustomTableData
                              cursor="pointer"
                              onClick={RedirectToFarmerProfile(investment.GUID)}
                              className="font-weight-bold"
                            >
                              {investment.farmerName}
                            </CustomTableData>
                            <CustomTableData>
                              {hideAddress(investment.wallet_address)}  
                            </CustomTableData>
                            <CustomTableData>
                              {investment.referralInvestment}  {investment.poolSymbol}
                            </CustomTableData>
                            <CustomTableData className="bold">
                              {investment.referralProfit} {investment.poolSymbol}
                            </CustomTableData>
                            <CustomTableData>
                              {formatNum(investment.rewards)} DON
                            </CustomTableData>
                            <CustomTableData>
                              {investment.expired ? "Yes" : "No"}
                            </CustomTableData>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableResponsive>
              </>
            )}

            {isReady && transformedData.length === 0 && (
              <>
                <ZeroInvestmentBox>
                  <ZeroInvestmentInnerBox>
                    <ZeroInvestmentContent>
                      You have no Referrals
                    </ZeroInvestmentContent>
                  </ZeroInvestmentInnerBox>
                </ZeroInvestmentBox>
              </>
            )}
          </Container>
        </div>
      </GridBackground>
    </div>
  );
};
