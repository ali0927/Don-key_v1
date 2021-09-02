import { IStrapiToken } from "interfaces";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import comingsoon from "images/comingsoonupdated.svg";
import crosschain from "images/CrossChain.png";
import BigNumber from "bignumber.js";
import { gql, useQuery } from "@apollo/client";
import { ArrowUpDOwn } from "icons";
import { useMemo } from "react";

const InfoWrapper = styled.div`
  min-height: 226px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  position: relative;
  z-index: 10;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 27px;
  padding-bottom: 25px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  ${(props: { disabled?: boolean }) =>
    props.disabled ? `cursor: default;` : `cursor: pointer; &:hover {
    transform: translateY(-2px);
  }`}
  transition: transform 0.3s linear;
  
`;

const GreenText = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: #31c77f;
  margin-bottom: 0;
`;

const GreyText = styled.p`
  font-weight: 300;
  font-size: 12px;
  color: #b0b7c3;
  margin-bottom: 0.5rem;
`;

const DONApy = styled.h6`
  color: #ffc406;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 0;
`;

const Heading = styled.h5`
  font-size: 18px;
  font-weight: 900; 
  font-family: Poppins;
`;

const CrossChainImage = styled.img`
  position: absolute;
  top: -13px;
  right: 3%;
`;

const ArrowUpDOwnIcon = styled(ArrowUpDOwn)`
   width: 45%;
   text-align: center;
   margin-top: 5px;
   margin-bottom: 5px;
`;

const SubText = styled.span({ fontSize: 12, fontWeight: "bold", fontFamily: 'Poppins' });

export const TokenInfo = ({
  token: { image, symbol, status, maxApy, RiskStrategy,network },
}: {
  token: IStrapiToken;
}) => {
  const history = useHistory();
  const disabled = status === "commingsoon";

  let networkName = network.name;
  const words = networkName.split(" ")
  networkName = words[0];


  const NetworkElement = () => {
    if(network.type && network.type === "crosschain"){
      return   <div className="col-6 d-flex flex-column align-items-end justify-content-end">
                   <SubText>Network</SubText>
                   <Heading className="mb-0">{networkName}</Heading>
                      <ArrowUpDOwnIcon/>
                  <Heading>{network.destination || ""}</Heading>
               </div>
    }
    return  <div className="col-6 d-flex flex-column align-items-end justify-content-end">
                 <SubText>Network</SubText>
                 <Heading>{networkName}</Heading>
           </div>
  }

  return (
    <InfoWrapper
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          history.push("/dashboard/" + symbol.toLowerCase());
        }
      }}
    >
      {disabled && (
        <img className="coming-soon" alt="coming" src={comingsoon} />
      )}
      {(network.type && network.type === "crosschain") && (
        <CrossChainImage  alt="crossChain" src={crosschain} />
      )}
      <div className="row">
      
             <div className="col-6 d-flex  flex-wrap">
                  <div className="mr-2">
                      <img style={{ width: 40 }} src={image.url} alt="token" />{" "}
                  </div>
         
                  <div>
                     <SubText>Deposit with</SubText>
                     <Heading>{symbol.toUpperCase()}</Heading>
                  </div>
             </div>
             {NetworkElement()}
       
        <div className="col-6 d-flex align-items-center justify-content-end"></div>
      </div>
      <div className="row">
      <div className="col-5 d-flex flex-column  justify-content-end">
          <h5 style={{ fontSize: 18, fontWeight: 900, fontFamily: 'Poppins'  }}>{maxApy}%</h5>
          <SubText>Upto APY</SubText>
        </div>
        <div className="col-7 d-flex flex-column align-items-end  justify-content-end">
          <DONApy>{new BigNumber(maxApy).plus(100).toFixed()}%</DONApy>
          <SubText>APY for DON stakers</SubText>
        </div>
      
      </div>
    </InfoWrapper>
  );
};
