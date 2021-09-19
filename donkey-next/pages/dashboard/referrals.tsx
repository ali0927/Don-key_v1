import BigNumber from "bignumber.js";
import { NavBar } from "components/Navbar";
import { useReferralContext } from "contexts/ReferralContext";
import {
  calculateInitialInvestment,
  calculateUserClaimableAmount,
  captureException,
  fixUrl,
  formatNum,
  getDonPriceWeb3,
  getReferralSystemContract,
  getRewardSystemContract,
  getTokenPrice,
  getTokenSymbol,
  toEther,
} from "helpers";
import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { theme } from "theme";
import Web3 from "web3";
import { IFarmerInter } from "interfaces";
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
import { useHistory } from "react-router-dom";
import { hideAddress } from "components/InvestorListTable/InvestorListTable";
import { gql, useQuery } from "@apollo/client";
import { Footer } from "components/Footer";
import { StyledButton } from "components/StakingInfo";
import { getWeb3, useWeb3Context } from "don-components";
import { NetworkButton } from "components/NetworkButton";
import { ZeroInvestmentBox, ZeroInvestmentContent, ZeroInvestmentInnerBox } from "components/InvestmentPage/InvestmentsPage";


const HeadingTitle = styled.p({
  fontFamily: "ObjectSans-Bold",
  fontSize: 42,
  color: "#070602",
});

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const Head = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 30px 20px;
  height: 100%;
  ${({ color = "white" }: { color?: "black" | "white" }) => {
    if (color === "black") {
      return ` background-color: #171717;`;
    }
    return "";
  }}
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  ${(props: { variant?: "light" }) => {
    return props.variant && `color: rgba(255,255,255,0.7)`;
  }}
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
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
    return {
      profit: profit.toFixed(2),
      don: "0",
      investedAmount: amountInitial,
    };
  }
  const tokenPrice = await getTokenPrice(web3, poolAddress);

  const tokenValueInUsd = profit.multipliedBy(tokenPrice).multipliedBy(0.02);
  return {
    profit: profit.toFixed(6),
    don: tokenValueInUsd.dividedBy(donPrice).toFixed(6),
    investedAmount: amountInitial,
  };
};

type ReferralTableState = {
  pool_address: string;
  wallet_address: string;
  expired: boolean;
  rewards: string;
  slug: string;
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

const ALL_FARMER_QUERY = gql`
  query allFarmerQuery {
    farmers(where: {   status_in: ["active", "deprecated"] }) {
      name
      description
      farmerImage {
        url
      }
      slug
      active
      twitter
      telegram
      poolAddress
      poolVersion
      network {
        name
        chainId
        symbol
      }
    }
  }
`;

const useTransformedData = () => {
  const [isReady, setIsReady] = useState(false);
  const [{ data }] = useAxios("/api/v2/referrer", {ssr: false});
  const web3 = getWeb3(56);
  const [transformedData, setTransformedData] = useState<ReferralTableState[]>(
    []
  );
  const { data: farmersData } = useQuery(ALL_FARMER_QUERY);

  const { chainId: network } = useWeb3Context();
  const farmers: IFarmerInter[] = useMemo(() => {
    if (farmersData) {
      return farmersData.farmers
        .filter((item: IFarmerInter) => {
          return item?.network?.chainId === network;
        })
        .map((item: IFarmerInter) => {
          return item;
        });
    }
    return [];
  }, [farmersData, network]);
  const transformData = async () => {
    setIsReady(false);
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
            farmerImage: fixUrl(farmer?.farmerImage?.url) || "",
            poolSymbol: symbol,
            pool_address: referrerInfo.poolAddress,
            farmerName: farmer.name,
            referralInvestment: investedAmount,
            referralProfit: profit,
            rewards: don,
            slug: farmer.slug,
            wallet_address,
            GUID: farmer.guid,
          };
          return referralState;
        }
        return null;
      } catch (e) {
        captureException(e, "My Referrals");
        return null;
      }
    });
    const result = await Promise.all(promises);
    setTransformedData(result.filter((item) => !!item) as ReferralTableState[]);
    setIsReady(true);
  };

  useEffect(() => {
    if (farmers.length > 0 && data) {
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

const ReferralCol = styled.div`
  border-right: 1px solid #dedee0;
`;

 const MyReferrals = () => {
  const { referralCount } = useReferralContext();

 
  const { getConnectedWeb3, connected } = useWeb3Context();
  const { isReady, transformedData, transformData } = useTransformedData();

  const totalDon = useMemo(() => {
    if (isReady) {
      return `${transformedData
        .reduce((prev, next) => {
          if (next.expired) {
            return prev;
          }
          return prev.plus(next.rewards);
        }, new BigNumber(0))
        .toFixed(2)} DON`;
    }
    return "-";
  }, [transformedData, isReady]);

  const [availableDon, setAvailable] = useState("-");
  const [rewardsEarned, setEarned] = useState("-");
  const fetchAvailableDon = async () => {
    setAvailable("-");
    const connectedWeb3 = getConnectedWeb3();
    const rewardSystem = await getRewardSystemContract(connectedWeb3);
    const accounts = await connectedWeb3.eth.getAccounts();
    const user = await rewardSystem.methods.userInfo(accounts[0]).call();
    setEarned(toEther(user.totalRewards));
    setAvailable(toEther(user.rewardsDebt));
  };
  useEffect(() => {
    if (connected) {
      fetchAvailableDon();
    }
  }, [transformedData, connected]);

  const hasAvailable =
    availableDon !== "-" ? new BigNumber(availableDon).gt(0) : false;
  const handleWithdraw = async () => {
    const connectedWeb3 = getConnectedWeb3();
    const rewardContract = await getRewardSystemContract(connectedWeb3);
    const accounts = await connectedWeb3.eth.getAccounts();
    await rewardContract.methods.harvestRewards().send({ from: accounts[0] });
    transformData();
  };
  const history = useHistory();
  const RedirectToFarmerProfile = (poolAddress: string) => () => {
    history.push("/dashboard/farmer/" + poolAddress);
  };

  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      <Section>
        <Head className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="row align-items-center">
                  <div className="col-md-9">
                    {" "}
                    <HeadingTitle>My Referrals</HeadingTitle>
                  </div>
                  <div className="col-md">
                    <div className="d-flex justify-content-end">
                      <NetworkButton
                        varaint="outlined"
                        height="50px"
                        width="40%"
                        active
                      >
                        BSC
                      </NetworkButton>
                    </div>
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-md-9">
                    <Card>
                      <div className="row h-100 align-items-center justify-content-center">
                        <ReferralCol className="col-md">
                          <Title>Rewards Accumulated</Title>
                          <Subtitle>{totalDon}</Subtitle>
                        </ReferralCol>
                        <ReferralCol className="col-md">
                          <Title>DON Rewards Available</Title>
                          <Subtitle>
                            {" "}
                            {availableDon === "-" || !isReady
                              ? "-"
                              : `${formatNum(availableDon)} DON`}
                          </Subtitle>
                        </ReferralCol>
                        <div className="col-md">
                          <Title>Rewards Earned</Title>
                          <Subtitle>
                            {rewardsEarned === "-" || !isReady
                              ? "-"
                              : `${formatNum(rewardsEarned)} DON`}
                          </Subtitle>
                        </div>
                        <div className="col-md">
                          <StyledButton
                            varaint="contained"
                            className="py-2 px-5"
                            style={{ borderRadius: 10 }}
                            disabled={!hasAvailable}
                            containedVariantColor="lightYellow"
                            onClick={handleWithdraw}
                          >
                            Claim
                          </StyledButton>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="col-md-3">
                    <Card color="black">
                      <div className="row h-100 align-items-center">
                        <div className="col-md">
                          <Title variant="light">Total Referrals</Title>
                          <Subtitle variant="light">{referralCount}</Subtitle>
                        </div>
                      </div>
                    </Card>
                  </div>
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
                        <CustomTableHeading>
                          Referral Address
                        </CustomTableHeading>
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
                              onClick={RedirectToFarmerProfile(investment.slug)}
                              className="font-weight-bold"
                            >
                              {investment.farmerName}
                            </CustomTableData>
                            <CustomTableData>
                              {hideAddress(investment.wallet_address)}
                            </CustomTableData>
                            <CustomTableData>
                              {investment.referralInvestment}{" "}
                              {investment.poolSymbol}
                            </CustomTableData>
                            <CustomTableData className="bold">
                              {investment.referralProfit}{" "}
                              {investment.poolSymbol}
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
      <Footer />
    </div>
  );
};

export default MyReferrals;