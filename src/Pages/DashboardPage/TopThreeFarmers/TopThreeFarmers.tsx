import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import { GraphIcon } from "icons";
import * as React from "react";
import { ITopThreeFarmerProps } from "./interfaces";
import styled from "styled-components";
import { IFarmer } from "interfaces";
import { Loader } from "don-components";
import { useHistory } from "react-router";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { PoolAmount } from "components/PoolAmount";
import BigNumber from "bignumber.js";


const Image = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 5px;
`

export const TopThreeFarmers: React.FC<ITopThreeFarmerProps> = (props) => {
  const { isReady } = props;

  const leaders = props.leaders;
  const [openInvestment, setOpenInvestment] = React.useState(false);
  const [state, setState] = React.useState({
    farmerName: "",
    poolAddress: "",
  });

  const history = useHistory();

  const handleLeaderClick = (id: string) => () => {
    history.push(`/dashboard/farmer/${id}`);
  };

  const openInvestmentDialog = (farmerName: string, poolAddress: string)  => () => {
    // e.stopPropagation();
    setState({
      farmerName: farmerName,
      poolAddress: poolAddress,
    });
    setOpenInvestment(true);
  };

  const closeInvestmentDialog = () => {
    setState({
      farmerName: "",
      poolAddress: "",
    });
    
    setOpenInvestment(false);
  };
  
  const StrategyCard = (leader: IFarmer) => {
    const APY = leader.apy ? new BigNumber(leader.apy).multipliedBy(100).toFixed(1) + "%": "143%";
    return (
      <>
        <div className="col-lg-4 col-md-6 mb-3">
          <PopularStrategy
            icon={<Image src={leader.picture} />}
            contentTitle={leader.descriptionTitle ? leader.descriptionTitle : ""}
            title={leader.name}
            investers={leader.investors}
            comingsoon={leader.status === "comingsoon"}
            graph={<GraphIcon />}
            content={leader.description}
            apy={APY}
            totalValue={ <PoolAmount poolAddress={leader.poolAddress} />}
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
        </div>
      </>
    );
  };

  if (!isReady) {
    return (
      <div style={{ minHeight: 400, background: "#fff" }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
   
        {leaders.map((leader, index) => {
          return <div className="row col-lg-12" key={index}>{StrategyCard(leader)}</div>;
        })}


      {openInvestment && (
        <InvestmentPopup
          poolAddress={state.poolAddress}
          onClose={closeInvestmentDialog}
        />
      )}
    </>
  );
};
