import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import styled from "styled-components";
import { theme } from "theme";
import { Navigate } from "components/Navigate";
import { ShowMoreContent } from "components/ShowmoreContent";
import { GridBackground } from "components/GridBackground";
import { InactiveNetworkCard } from "components/InactiveNetworkCard";
import { IFarmerInter, IStrapiToken, IStrategy } from "interfaces";

import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import { fixUrl } from "helpers";
import BigNumber from "bignumber.js";
import { PoolAmount } from "components/PoolAmount";
import { InvestorCountContract } from "components/InvestorCountGraphql";
import { useState } from "react";
import { useWeb3Context } from "don-components";
import { navigate } from "gatsby-link";
import { Link } from "gatsby";
import { BackArrowButton } from "components/BackArrowButton";
const Section = styled.section`
  background-color: ${theme.palette.background.yellow};
  padding-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: "" Work Sans ",-apple-system,BlinkMacSystemFont," Segoe UI
    ",Roboto," Helvetica Neue ",Arial," Noto Sans "," Liberation Sans
    ",sans-serif," Apple Color Emoji "," Segoe UI Emoji "," Segoe UI Symbol ","
    Noto Color Emoji "";
  font-weight: 900;
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

type IFarmerBio = IStrategy & { farmer: IFarmerInter };
export const FarmerBioShort = ({
  item,
  isShown,
  onShowLess,
  onShowMore,
  tokenObj,
}: {
  item: IFarmerBio;
  isShown: boolean;
  onShowMore: () => void;
  onShowLess: () => void;
  tokenObj?: any;
}) => {
  const url = `/dashboard/farmer/${item.farmer.slug}`;

  const handleLeaderClick = () => {
    navigate(url);
  };

  return (
    <div className="col-md-4 py-3">
      <PopularStrategy
        apy={item.apy + "%"}
        isCardComingsoon={item.farmer.status === "comingsoon"}
        comingsoon={item.farmer.status === "comingsoon"}
        icon={<Image src={fixUrl(item?.farmer?.farmerImage?.url)} />}
        contentTitle={item.name}
        title={item.farmer.name}
        content={item.description}
        risk={item.risk.Title.toLowerCase()}
        imageRisk={item.risk.image.url}
        onCardClick={handleLeaderClick}
        onButtonClick={handleLeaderClick}
        showOnRight={!tokenObj.boostApy}
        buttonLabel="Open"
        extraApy={
          tokenObj.boostApy && new BigNumber(item.apy).plus(40).toFixed() + "%"
        }
        disabled={!!item.farmer.hideInvestButton}
        impermanentLoss={!!item.farmer.impermanentLoss}
        totalValue={
          <>
            {" "}
            <Link
              to={url}
              style={{
                opacity: "0",
                width: 0,
                height: 0,
                display: "inline-block",
              }}
            >
              Invest
            </Link>
            <PoolAmount
              chainId={item.farmer.network.chainId}
              poolAddress={item.farmer.poolAddress}
            />
          </>
        }
        onShowLessClick={onShowLess}
        onShowMoreClick={onShowMore}
        showAllContent={isShown}
        investers={
          <InvestorCountContract
            chainId={item.farmer.network.chainId}
            poolAddresses={[item.farmer.poolAddress]}
          />
        }
        strategyImage={item.strategyImage.url}
        network={{
          chainId: item.farmer.network.chainId,
          networkName: item.farmer.network.name,
          networkSymbol: item.farmer.network.symbol,
        }}
      />
    </div>
  );
};

export default function TokenPage({
  pageContext: { tokens, strategies },
}: {
  pageContext: { tokens: IStrapiToken[]; strategies: IFarmerBio[] };
}) {
  // return <div />
  const { chainId, connected } = useWeb3Context();
  const tokenObj = tokens[0];
  const network = tokenObj.network;
  const subtitle = tokenObj.subtitle;
  const description = tokenObj.description;
  const isActiveNetwork = network.chainId === chainId;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <NavBar variant="loggedin" />
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <BackArrowButton to="/dashboard" />
              <Title className="mb-5">{subtitle || "Description"}</Title>
              <div className="row">
                <div className="col-md-8">
                  <p className="mb-5">
                    <ShowMoreContent
                      isShowLinks
                      content={
                        description ||
                        `We will run 2 main strategies:1) a long and short algo on BTC, w/ a Sortino of 5.5 (will post new backtest chart shortly, but it performs better).
2) Active discretionary trading both long / short across all synthetic assets combining fundamental, technical `
                      }
                      length={150}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <GridBackground className="py-5">
        <div className="container">
          {!isActiveNetwork && connected && (
            <div className="row mb-5">
              <div className="col-12">
                <InactiveNetworkCard variant="white" correctNetwork={network} />
              </div>
            </div>
          )}
          <div className="row">
            {strategies.map((item) => {
              return (
                <FarmerBioShort
                  key={item.id}
                  isShown={isOpen}
                  onShowLess={() => setIsOpen(false)}
                  onShowMore={() => setIsOpen(true)}
                  tokenObj={tokenObj}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      </GridBackground>
      <Footer />
    </div>
  );
}
