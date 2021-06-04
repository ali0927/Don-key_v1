import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import * as React from "react";
import { ITopThreeFarmerProps } from "./interfaces";
import styled from "styled-components";
import { IFarmer } from "interfaces";
import { Loader } from "don-components";
import { useHistory } from "react-router";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { PoolAmount } from "components/PoolAmount";
import BigNumber from "bignumber.js";
import { ComingSoonFarmer } from "../ComingSoonFarmer/ComingSoonFarmer";
import { InvestorCount } from "components/InvestorCount/InvestorCount";

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
`;

export const TopThreeFarmers: React.FC<ITopThreeFarmerProps> = (props) => {
  const { isReady } = props;

  const leaders = props.leaders;
  const [openInvestment, setOpenInvestment] = React.useState(false);
  const [openShowMoreLess, setShowMoreLess] = React.useState(false);
  const [state, setState] = React.useState({
    farmerName: "",
    poolAddress: "",
    poolVersion: 0
  });

  const history = useHistory();

  const handleLeaderClick = (id: string) => () => {
    history.push(`/dashboard/farmer/${id}`);
  };

  const openInvestmentDialog =
    (farmerName: string, poolAddress: string, poolVersion: number) => () => {
      // e.stopPropagation();
      setState({
        farmerName: farmerName,
        poolAddress: poolAddress,
        poolVersion
      });
      setOpenInvestment(true);
    };

  const closeInvestmentDialog = () => {
    setState({
      farmerName: "",
      poolAddress: "",
      poolVersion: 0
    });

    setOpenInvestment(false);
  };
  const [refresh, setRefresh] = React.useState(false);
  const refreshData = () => {
    setRefresh((old) => !old);
  };


  const StrategyCard = (leader: IFarmer, index: number) => {
    const APY = leader.apy
      ? new BigNumber(leader.apy).multipliedBy(100).toFixed(1) + "%"
      : "143%";
    return (
    
        <div key={leader.GUID} className="col-lg-4 col-md-6 mb-3">
          <PopularStrategy
            version={leader.pool_version}
            icon={<Image src={leader.picture} style={{ borderRadius: 0 }} />}
            contentTitle={
              leader.descriptionTitle ? leader.descriptionTitle : ""
            }
            title={leader.name}
            investers={<InvestorCount farmerId={leader.GUID} refresh={refresh} />}
            comingsoon={leader.status === "comingsoon"}
            twitter={leader.twitter ? leader.twitter : null}
            telegram={leader.telegram}
            strategyImage={leader.strategyImage}
            content={leader.description}
            apy={APY}
            
            totalValue={
              <PoolAmount refresh={refresh} poolAddress={leader.poolAddress} />
            }
            onCardClick={handleLeaderClick(leader.GUID)}
            onButtonClick={openInvestmentDialog(
              leader.name,
              leader.poolAddress,
              leader.pool_version
            )}
            showAllContent={openShowMoreLess}
            onShowMoreClick={()=> setShowMoreLess(true)}
            onShowLessClick={()=> setShowMoreLess(false)}
          />
        </div>
 
   
    );
  };

         {/* <div className="col-lg-4 col-md-6 mb-3">
          <PopularStrategy
            icon={<Image src={leader.picture} />}
            contentTitle={"New Strategy"}
            title={leader.name}
            // investers={5874}
            comingsoon={true}
            graph={<GraphIcon />}
            content={"Strategy coming soon"}
            apy="111%"
            totalValue={"1010 BUSD"}
            onCardClick={handleLeaderClick(leader.GUID)}
            onButtonClick={openInvestmentDialog(leader.name, leader.poolAddress)}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <PopularStrategy
            icon={<Image src={leader.picture} />}
            contentTitle={"New Strategy"}
            title={leader.name}
            // investers={5874}
            comingsoon={true}
            graph={<GraphIcon />}
            content={"Strategy coming soon"}
            apy="122%"
            totalValue={"2020 BUSD"}
            onCardClick={handleLeaderClick(leader.GUID)}
            onButtonClick={openInvestmentDialog(leader.name, leader.poolAddress)}
          />
        </div> */}

  if (!isReady) {
    return (
      <div style={{ minHeight: 400, background: "#fff" }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="row col-lg-12">
        {leaders.map((leader, index) => {
          return StrategyCard(leader, index);
        })}
        <div className="col-lg-4 col-md-6 mb-3">
          <ComingSoonFarmer timerDate={"June 2, 2021 11:00:00 UTC"} />
        </div>
        {openInvestment && (
          <InvestmentPopup
            poolVersion={state.poolVersion}
            onSuccess={refreshData}
            poolAddress={state.poolAddress}
            onClose={closeInvestmentDialog}
          />
        )}
      </div>
    </>
  );
};
