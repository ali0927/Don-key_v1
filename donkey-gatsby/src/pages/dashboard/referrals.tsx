import BigNumber from "bignumber.js";
import { NavBar } from "components/Navbar";
import { useReferralContext } from "contexts/ReferralContext";
import {
  calculateInitialInvestment,
  captureException,
  fixUrl,
  formatNum,
  getAmount,
  getDonPriceWeb3,
  getPoolContract,
  getReferralSystemContract,
  getRewardSystemContract,
  getTokenPrice,
  getTokenSymbol,
  toEther,
} from "helpers";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { hideAddress } from "components/InvestorListTable/InvestorListTable";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Footer } from "components/Footer";
import { useWeb3Context } from "don-components";
import { useStakingContract } from "hooks";
import { NetworkButton } from "components/NetworkButton";
import {
  ZeroInvestmentBox,
  ZeroInvestmentInnerBox,
} from "components/InvestmentPage/InvestmentsPage";

import { thegraphClient } from "apolloClient";
import { ButtonWidget } from "components/Button";
import { breakPoints } from "breakponts";
import { USDViewProvider } from "contexts/USDViewContext";
import { ReferalAccordion } from "components/ReferalMobile/ReferalAccordion";
import { ShowAmount } from "components/ReferalMobile/ShowAmount";
import { RewardsEarnPopOver } from "components/Referal";
import { HeadingToolTip } from "components/Referal/RewardsEarn/HeadingToolTip/HeadingToolTip";
import { useMediaQuery } from "@material-ui/core";
import {
  IPastReferrals,
  IUserRewards,
  PastReferrals,
  RedirectToFarmerProfile,
} from "components/PastReferrals";
import { PastReferralAccordion } from "components/PastReferralAccordion";
import { Text } from "components/Text";

const HeadingTitle = styled.p`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  color: #070602;
  margin-bottom: 20px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 45px;
    margin-bottom: 30px;
  }
`;

const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const Head = styled.section`
  background-color: ${theme.palette.background.yellow};
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px 20px;
  min-height: 134px;
  ${({ color = "white" }: { color?: "black" | "white" }) => {
    if (color === "black") {
      return ` background-color: #171717;`;
    }
    return "";
  }}
  @media only screen and (min-width: ${breakPoints.lg}) {
    padding: 30px 20px;
  }
`;

const TotalReferalCard = styled(Card)`
  padding: 15px 20px;
  width: 100%;
  @media only screen and (min-width: ${breakPoints.lg}) {
    padding: 30px 20px;
    width: 237px;
  }
`;

export const Title = styled.p`
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 400;
  margin-top: 7px;
  margin-bottom: 12px;
  text-align: center;
  ${(props: { variant?: "light" | string }) => {
    return props.variant && `color: #9B9B9B`;
  }}
`;

const Subtitle = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0;
  ${(props: { variant?: "light" }) => {
    return props.variant && `color: rgba(255,255,255,1)`;
  }}
`;

const TierCommission = styled(Subtitle)`
text-decoration: underline;
&:hover {
  text-decoration: none;
}
`;

const ZeroInvestmentContent = styled.div`
  font-style: normal;
  font-weight: 800;
  text-align: center;
  font-size: 30px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 50px;
  }
`;

export const StyledButton = styled(ButtonWidget)`
  height: 40px;
  width: 100%;
  font-size: 12px;
  border-radius: 10px !important;
  margin-top: 20px;
  &:disabled {
    ${(props) => {
      if (
        props.varaint === "contained" &&
        props.containedVariantColor === "lightYellow"
      ) {
        return `background-color: rgba(255, 236, 92, 0.5);`;
      }
    }}
  }
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: 159px;
    margin-top: 0px;
  }
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
  tier: number,
  donPrice: string,
  getTierCommission: (tier: number) => number
) => {
  if (referrerInfo.expired) {
    return {
      profit: "0",
      don: toEther(referrerInfo.rewardedToken),
      investedAmount: "0",
    };
  }
  const poolAddress = referrerInfo.poolAddress;

  const amountWithdraw = await getAmount(
    web3,
    poolAddress,
    wallet_address,
    4,
    100
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

  const tokenValueInUsd = profit
    .multipliedBy(tokenPrice)
    .multipliedBy(getTierCommission(tier))
    .dividedBy(100);
  return {
    profit: profit.toFixed(6),
    don: tokenValueInUsd.dividedBy(donPrice).toFixed(6),
    investedAmount: amountInitial,
  };
};

export type ReferralTableState = {
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
    farmers(where: { status_in: ["active", "deprecated"] }) {
      name
      description
      farmerImage {
        url
      }
      slug
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

const REFERRERS_INFO = gql`
  query fetchReferrers($walletAddress: String!) {
    referrerAddeds(where: { to: $walletAddress }) {
      from
      pool
    }
  }
`;

const useTransformedData = () => {
  const [isReady, setIsReady] = useState(false);
  const [fetch, { data, error }] = useLazyQuery(REFERRERS_INFO, {
    client: thegraphClient,
  });
  const { getConnectedWeb3, connected, address } = useWeb3Context();
  const web3 = getConnectedWeb3();
  const [transformedData, setTransformedData] = useState<ReferralTableState[]>(
    []
  );
  const { getTierCommission } = useReferralContext();
  useEffect(() => {
    if (connected) {
      fetch({ variables: { walletAddress: address } });
    }
  }, [connected, address]);
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
  const { tier } = useStakingContract();
  const transformData = async () => {
    setIsReady(false);
    const donPrice = await getDonPriceWeb3(web3);

    const promises = data.referrerAddeds.map(
      async ({ pool, from: wallet_address }: any) => {
        try {
          const referralContract = await getReferralSystemContract(web3);
          const referrerInfo: ReferrerInfo = await referralContract.methods
            .referrerInfo(pool, wallet_address)
            .call();
          const contract = await getPoolContract(
            web3,
            referrerInfo.poolAddress,
            2
          );

          const isInvested = await contract.methods
            .isInvestor(wallet_address)
            .call();
          if (!isInvested) {
            return null;
          }
          const symbol = await getTokenSymbol(web3, referrerInfo.poolAddress);
          const { profit, don, investedAmount } = await calcDonRewards(
            web3,
            referrerInfo,
            wallet_address,
            tier.tier,
            donPrice,
            getTierCommission
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
      }
    );
    const result = await Promise.all(promises);
    setTransformedData(result.filter((item) => !!item) as ReferralTableState[]);
    setIsReady(true);
  };

  useEffect(() => {
    if (farmers.length > 0 && data && !error && tier) {
      if (connected) {
        transformData();
      }
    }
  }, [farmers.length, data, connected, address, tier]);

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
  padding-left: 5px !important;
  padding-right: 5px !important;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${theme.mediaQueries.md.down} {
    margin-bottom: 15px;
    &:not(:last-of-type)::after {
      content: "";
      width: 82%;
      height: 1px;
      position: absolute;
      background-color: #dedee0;
      left: 50%;
      transform: translateX(-50%) translateY(15px);
      bottom: 5px;
      opacity: 0.4;
    }
  }
  ${theme.mediaQueries.md.up} {
    &:not(:last-of-type)::after {
      content: "";
      height: 82%;
      position: absolute;
      border: 0.1px solid #dedee0;
      top: 50%;
      transform: translateY(-50%) translateX(15px);
      right: 0;
      opacity: 0.4;
    }
  }
`;

export const Heading = styled.div`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 500;
  font-size: 20x;
  color: #000000;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 42px;
  }
`;

export const SubHeading = styled(Heading)`
  font-size: 18px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 16px;
  }
`;

export const Column = styled.div<{ width: string }>`
  width: 100%;
  @media only screen and (min-width: ${breakPoints.lg}) {
    width: ${(props) => props.width};
    padding-right: 15px;
  }
`;

const PAST_EARNINGS = gql`
  query UserRewards($affiliateAddress: String!) {
    userRewardeds(
      where: { to: $affiliateAddress }
      orderBy: timeStamp
      orderDirection: desc
    ) {
      from
      to
      tierPer
      pool
      profitValue
      timeStamp
      rewardAmountInUSD
      tier
      rewardAmountInDon
    }
  }
`;

const usePastReferrals = (address: string) => {
  const [fetch, { data, loading }] = useLazyQuery<{
    userRewardeds: IUserRewards[];
  }>(PAST_EARNINGS, {
    client: thegraphClient,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (address) {
      fetch({ variables: { affiliateAddress: address } });
    }
  }, [address]);

  const [transformedData, setTransformedData] = useState<IPastReferrals[]>([]);
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
  const transformData = () => {
    if (data?.userRewardeds) {
      const result: IPastReferrals[] = data.userRewardeds.map((reward) => {
        const farmer = farmers.find(
          (item) => item.poolAddress.toLowerCase() === reward.pool.toLowerCase()
        );

        return {
          ...reward,
          farmerImage: fixUrl(farmer?.farmerImage?.url) as string,
          farmerName: farmer?.name as string,
          slug: farmer?.slug as string,
        };
      });

      setTransformedData(result);
    }
  };
  console.log(data, "Past Referrals");
  useEffect(() => {
    if (data && farmers.length > 0) {
      transformData();
    }
  }, [loading, data, farmers]);
  return { pastReferrals: transformedData, loading };
};

const RefContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${theme.mediaQueries.md.up} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const MyReferrals = () => {
  const { getConnectedWeb3, connected, address } = useWeb3Context();
  const { isReady, transformedData, transformData } = useTransformedData();
  const { tier } = useStakingContract();
  const { referralCount, getTierCommission } = useReferralContext();
  const { pastReferrals, loading: pastLoading } = usePastReferrals(address);
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
  const [isInUsd, setIsInUsd] = useState(false);

  const toggleCurrency = useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);

  const isDesktop = useMediaQuery(theme.mediaQueries.md.up);

  const fetchAvailableDon = async () => {
    setAvailable("-");
    const connectedWeb3 = getConnectedWeb3();
    const rewardSystem = await getRewardSystemContract(connectedWeb3);

    const accounts = await connectedWeb3.eth.getAccounts();

    const user = await rewardSystem.methods.userInfo(accounts[0]).call();

    const rewardsEarned = new BigNumber(user.totalRewards)
      .minus(user.rewardsDebt)
      .toFixed(0);
    setEarned(toEther(rewardsEarned));
    setAvailable(toEther(user.rewardsDebt));
  };
  useEffect(() => {
    if (connected) {
      fetchAvailableDon();
    }
  }, [transformedData, connected, address]);

  const hasAvailable =
    availableDon !== "-" ? new BigNumber(availableDon).gt(0) : false;

  const [claimLoading, setClaimLoading] = useState(false);
  const handleWithdraw = async () => {
    try {
      setClaimLoading(true);
      const connectedWeb3 = getConnectedWeb3();
      const rewardContract = await getRewardSystemContract(connectedWeb3);
      const accounts = await connectedWeb3.eth.getAccounts();
      await rewardContract.methods.harvestRewards().send({ from: accounts[0] });
      transformData();
      setClaimLoading(false);
    } catch (e) {
      setClaimLoading(false);
    }
  };

  const renderActiveReferrals = () => {
    if (!(isReady && transformedData.length > 0)) {
      return null;
    }
    if (isDesktop) {
      return (
        <>
          <USDViewProvider
            value={{
              isUSD: isInUsd,
              toggle: toggleCurrency,
            }}
          >
            <Text tag="h4" fontWeight={800} fontSize={36} className="my-4" fontFamily="Work Sans">Active</Text>
            <TableResponsive>
              <Table>
                <TableHead>
                  <TableRow isHoverOnRow={false}>
                    <CustomTableHeading className="py-4">#</CustomTableHeading>
                    <EmptyTableHeading></EmptyTableHeading>
                    <CustomTableHeading>FARMER NAME</CustomTableHeading>
                    <CustomTableHeading>Referral Address</CustomTableHeading>
                    <CustomTableHeading>INVESTED AMOUNT</CustomTableHeading>
                    <CustomTableHeading>TOTAL PROFIT</CustomTableHeading>
                    <CustomTableHeading>Rewards</CustomTableHeading>
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
                          {hideAddress(investment.wallet_address, {mask: "xxxxx", size: 10})}
                        </CustomTableData>
                        <CustomTableData>
                          <ShowAmount
                            amount={investment.referralInvestment}
                            poolAddress={investment.pool_address}
                            poolSymbol={investment.poolSymbol}
                          />
                        </CustomTableData>
                        <CustomTableData className="bold">
                          <ShowAmount
                            amount={investment.referralProfit}
                            poolAddress={investment.pool_address}
                            poolSymbol={investment.poolSymbol}
                          />
                        </CustomTableData>
                        <CustomTableData>
                          <ShowAmount
                            amount={investment.rewards}
                            poolAddress={investment.pool_address}
                            poolSymbol={"DON"}
                            isDon
                          />
                        </CustomTableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableResponsive>
          </USDViewProvider>
        </>
      );
    } else {
      return <ReferalAccordion referalState={transformedData} />;
    }
  };

  const renderPastReferrals = () => {
    if (address) {
      if (isDesktop) {
        return (
          <PastReferrals pastReferrals={pastReferrals} loading={pastLoading} />
        );
      } else {
        return (
          <PastReferralAccordion
            pastReferrals={pastReferrals}
            loading={pastLoading}
          />
        );
      }
    }
  };

  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      {/* <RewardsEarnMobilePopup open={true} onClose={()=>{}}/> */}
      <Section>
        <Head className="navbanHead rounded-0 pt-3 pt-lg-5 pb-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="row align-items-center">
                  <div className="col-8">
                    {" "}
                    <HeadingTitle>My Referrals</HeadingTitle>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-end pr-3">
                      <NetworkButton
                        varaint="outlined"
                        height="50px"
                        width="92px"
                        className="mt-5 mt-sm-0"
                        active
                      >
                        BSC
                      </NetworkButton>
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-4 mt-lg-5 justify-content-between flex-wrap">
                  <Column width="82%" className="mb-4 mb-lg-0">
                    <Card>
                      <RefContainer>
                        <ReferralCol>
                          <HeadingToolTip
                            label="Rewards Accumulated"
                            message="Total amount of rewards based on non materialized profits."
                          />
                          <Subtitle>{totalDon}</Subtitle>
                        </ReferralCol>
                        <ReferralCol>
                          <HeadingToolTip
                            label="DON Rewards Available"
                            iconClassName="ml-1"
                            message="Total amount of rewards available to claim  based on materialized profit."
                          />
                          <Subtitle>
                            {" "}
                            {availableDon === "-" || !isReady
                              ? "-"
                              : `${formatNum(availableDon)} DON`}
                          </Subtitle>
                        </ReferralCol>

                        <ReferralCol>
                          <HeadingToolTip
                            label="Rewards Earned"
                            iconClassName="ml-1"
                            message="Total amount of rewards claimed."
                          />
                          <Subtitle>
                            {rewardsEarned === "-" || !isReady
                              ? "-"
                              : `${formatNum(rewardsEarned)} DON`}
                          </Subtitle>
                        </ReferralCol>
                        <ReferralCol>
                          <Title variant="light">Comission</Title>
                          <RewardsEarnPopOver>
                            <TierCommission >
                              {getTierCommission(tier.tier)}%
                            </TierCommission>
                          </RewardsEarnPopOver>
                        </ReferralCol>
                        <ReferralCol className=" px-1 d-flex justify-content-center">
                          <StyledButton
                            varaint="contained"
                            className="py-2 px-5"
                            style={{ borderRadius: 10 }}
                            disabled={!hasAvailable}
                            containedVariantColor="lightYellow"
                            onClick={handleWithdraw}
                          >
                            {claimLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Claim"
                            )}
                          </StyledButton>
                        </ReferralCol>
                      </RefContainer>
                    </Card>
                  </Column>
                  <Column width="18%" className="d-flex justify-content-center">
                    <TotalReferalCard color="black">
                      <div className="row h-100 align-items-center">
                        <div className="col-md">
                          <Title style={{ color: "#fff" }}>
                            Total Referrals
                          </Title>
                          <Subtitle variant="light">{referralCount}</Subtitle>
                        </div>
                      </div>
                    </TotalReferalCard>
                  </Column>
                </div>
              </Col>
            </Row>
          </Container>
        </Head>
      </Section>
      <GridBackground className="py-3 py-lg-5">
        <div className="mt-lg-5 mb-5 tablebgHead">
          <Container>
            {!isReady && (
              <>
                <AnimationDiv className="d-flex align-items-center justify-content-center">
                  <Spinner animation="border" />
                </AnimationDiv>
              </>
            )}

            {renderActiveReferrals()}
            {renderPastReferrals()}
            {isReady &&
              !pastLoading &&
              transformedData.length === 0 &&
              pastReferrals.length === 0 && (
                <>
                  <ZeroInvestmentBox>
                    <ZeroInvestmentInnerBox>
                      <ZeroInvestmentContent>
                        You have no referrals
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
