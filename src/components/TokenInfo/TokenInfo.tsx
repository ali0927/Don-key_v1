import { IStrapiToken } from "interfaces";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import comingsoon from "images/comingsoonupdated.svg";
import BigNumber from "bignumber.js";
import { gql, useQuery } from "@apollo/client";

const InfoWrapper = styled.div`
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
`

const TokenInfoQuery = gql`
  query tokenInfo($symbol: String!) {
    tokens(where: { symbol_eq: $symbol }) {
      network {
        name
      }
    }
  }
`;

const SubText = styled.span({ fontSize: 12, fontWeight: "bold", fontFamily: 'Poppins' });

export const TokenInfo = ({
  token: { image, symbol, status, maxApy, RiskStrategy },
}: {
  token: IStrapiToken;
}) => {
  const history = useHistory();
  const disabled = status === "commingsoon";
  const { data } = useQuery(TokenInfoQuery, {
    variables: {
      symbol: symbol.toLowerCase(),
    },
  })
  let networkName = data ? data.tokens[0].network.name : "";
  const words = networkName.split(" ")
  networkName = words[0]

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
      <div className="row">
      
             <div className="col-6 d-flex align-items-center flex-wrap">
                  <div className="mr-2">
                      <img style={{ width: 40 }} src={image.url} alt="token" />{" "}
                  </div>
         
                  <div>
                     <SubText>Deposit with</SubText>
                     <Heading>{symbol.toUpperCase()}</Heading>
                  </div>
             </div>
             <div className="col-6 d-flex flex-column align-items-end justify-content-end">
                    <SubText>Network</SubText>
                    <Heading>{networkName}</Heading>
             </div>
       
        <div className="col-6 d-flex align-items-center justify-content-end"></div>
      </div>
      <div className="row mt-5">
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
