import { IStrapiToken } from "interfaces";
import styled from "styled-components";
import comingsoon from "images/comingsoonupdated.svg";
import crosschain from "images/CrossChain.png";
import BigNumber from "bignumber.js";
import { ArrowUpDOwn } from "icons";
import { useRouter } from "next/router";
import { useIsomorphicEffect } from "hooks";

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
    props.disabled
      ? `cursor: default;`
      : `cursor: pointer; &:hover {
    transform: translateY(-2px);
  }`}
  transition: transform 0.3s linear;
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

const SubText = styled.span({
  fontSize: 12,
  fontWeight: "bold",
  fontFamily: "Poppins",
});

export const TokenInfo = ({
  token: { image, symbol, status, maxApy, network, slug, boostApy },
}: {
  token: IStrapiToken;
}) => {
  const history = useRouter();
  const disabled = status === "commingsoon";

  let networkName = network.name;
  const words = networkName.split(" ");
  networkName = words[0];
  const url = `/dashboard/${network.slug}/${slug.toLowerCase()}`;
  useIsomorphicEffect(() => {
    history.prefetch(url);
  }, [])
  const NetworkElement = () => {
    if (network.type && network.type === "crosschain") {
      return (
        <div className="col-6 d-flex flex-column align-items-end justify-content-end">
          <SubText>Network</SubText>
          <Heading className="mb-0">{networkName}</Heading>
          <ArrowUpDOwnIcon />
          <Heading>{network.destination || ""}</Heading>
        </div>
      );
    }
    return (
      <div className="col-6 d-flex flex-column align-items-end justify-content-end">
        <SubText>Network</SubText>
        <Heading>{networkName}</Heading>
      </div>
    );
  };

  const RenderFooter = () => {
    if (boostApy) {
      return (
        <>
          <div className="col-5 d-flex flex-column  justify-content-end">
            <h5
              style={{
                fontSize: 18,
                fontWeight: 900,
                fontFamily: "Poppins",
                marginBottom: 12,
              }}
            >
              {maxApy}%
            </h5>
            <SubText>Up to APY</SubText>
          </div>
          <div className="col-7 d-flex flex-column align-items-end  justify-content-end">
            <DONApy>{new BigNumber(maxApy).plus(100).toFixed()}%</DONApy>
            <SubText>APY for DON stakers</SubText>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="col-12 d-flex flex-column align-items-end  justify-content-end">
          <DONApy>{maxApy}%</DONApy>
          <SubText>Up to APY</SubText>
        </div>
      </>
    );
  };

  return (
    <InfoWrapper
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          history.push(url);
        }
      }}
    >
      {disabled && (
        <img className="coming-soon" alt="coming" src={comingsoon} />
      )}
      {network.type && network.type === "crosschain" && (
        <CrossChainImage alt="crossChain" src={crosschain as any} />
      )}
      <div className="row">
        <div className="col-6 d-flex  flex-wrap">
          <div className="mr-2">
            <img style={{ width: 40 }} src={image.url} alt="token" />{" "}
          </div>

          <div className="d-flex flex-column">
            <SubText>Deposit with</SubText>
            <Heading>{symbol.toUpperCase()}</Heading>
          </div>
        </div>
        {NetworkElement()}

        <div className="col-6 d-flex align-items-center justify-content-end"></div>
      </div>
      <div className="row">{RenderFooter()}</div>
    </InfoWrapper>
  );
};
