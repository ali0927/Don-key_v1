import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "theme";
import { Footer } from "components/Footer";
import { NavBar } from "components/Navbar";
import { TiersSection } from "./TiersSection";
import { ShowMoreContent } from "components/ShowmoreContent";
import styled from "styled-components";
import { useState } from "react";
import { getDonPriceWeb3 } from "helpers";
import { getWeb3 } from "don-components";
import { DonStaking } from "./DonStaking";
import { LPStaking } from "./LPStaking";
import { StakePageBanner } from "./StakePageBanner";

export const Banner = styled.div`
  background: #fff037;
  display: flex;
  justify-content: center;
  .main {
    max-width: 1320px;
    color: #000000;
  }
`;

export const Paper = ({
  children,
  maxWidth = "90%",
  bgColor = "transparent",
  borderRadius = 120,
  classname,
  height,
}: {
  children: React.ReactNode;
  maxWidth?: number | string;
  bgColor?: string;
  borderRadius?: number;
  classname?: string;
  height?: number | string;
}) => {
  return (
    <div
      className={
        height ? `${classname} card w-100` : `${classname} card w-100 h-100`
      }
      style={{
        maxWidth,
        borderRadius,
        backgroundColor: bgColor,
        // maxHeight,
        border: "none",
        height: height ? "fit-content" : "",
        minHeight: "130px",
      }}
    >
      {children}
    </div>
  );
};

const Title = styled.p`
  font-weight: bold;
  font-size: 25px;
  line-height: 37px;
  color: #000000;
  span {
    font-size: 18px;
    line-height: 27px;
  }
  @media (max-width: 996px) {
    font-size: 18px;
    line-height: 27px;
    text-align: center;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: #9a8a7c;
  max-width: 299px;
  @media (max-width: 996px) {
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    max-width: 260px;
  }
`;

const TierCard = ({
  children,
  text1,
  text2,
}: {
  children: React.ReactNode;
  text1: string;
  text2: string;
}) => {
  return (
    <Paper
      maxWidth="1202px"
      bgColor="#FFFFFF"
      borderRadius={10}
      classname="p-2 pb-3 p-lg-4"
    >
      <div className="d-flex flex-column align-items-center align-items-lg-start">
        <Title className="m-0">
          {text1} <span>Staking</span>
        </Title>
        <Subtitle className="m-0">
          <span>{text2} </span>
        </Subtitle>
      </div>
      {children}
    </Paper>
  );
};

const StyledButton = styled.button<{
  bgColor: string;
  maxWidth: string;
  color: string;
  border: string;
  fontSize: string;
}>`
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  border-radius: 10px;
  background: ${(props) => props.bgColor};
  border: ${(props) => props.border};
  font-weight: 500;
  font-size: ${(props) => props.fontSize};
  line-height: 21px;
  height: fit-content;
  color: ${(props) => props.color};
  &:not(:disabled):hover {
    background: ${(props) =>
      props.bgColor === "transparent" ? "black" : "transparent"};
    color: ${(props) => (props.bgColor !== "transparent" ? "black" : "white")};
    outline: ${(props) =>
      props.bgColor !== "transparent" ? "0.5px solid black" : props.border};
  }
  &:disabled {
    opacity: 0.7;
  }
`;

export const Button = ({
  bgColor = "linear-gradient(0deg, #FFF037, #FFF037), #B4B4B4",
  maxWidth,
  className,
  color = "#000000",
  border = "none",
  fontSize = "14px",
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
  maxWidth?: string;
  className?: string;
  border?: string;
  fontSize?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <StyledButton
      bgColor={bgColor}
      maxWidth={maxWidth ? maxWidth : "188px"}
      className={className}
      color={color}
      border={border}
      onClick={onClick}
      fontSize={fontSize}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const Section = styled.section`
  background: #f3f3f3;
  font-family: "Poppins", sans-serif;
  .rotate {
    transform: rotate(180deg) !important;
  }
  overflow: hidden;
  .icon {
    transform: rotateX(180deg);
  }
`;

const TierDetail = styled.div`
  font-size: 14px;
  line-height: 25px;
  color: #222222;
  background: #fff037;
  border-radius: 0px;
  padding: 54px 41px 55px 38px;
  .tiername {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 37px;
    color: #000000;
  }
  @media (min-width: 996px) {
    padding: 21px 50px 23px;
    background: #fff9e5;
    max-width: 655px;
    border-radius: 10px;
  }
`;

export const Card = styled.div`
  .cursor-pointer {
    cursor: pointer;
  }

  .rotate {
    transform: rotateX(0deg);
  }
  p {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #9a8a7c;
    @media (max-width: 1150px) {
      font-size: 12px;
    }
    @media (max-width: 996px) {
      font-size: 12px;
      line-height: 18px;
      font-weight: 500;
    }
  }
  h6 {
    font-weight: 500;
    font-size: 8px;
    line-height: 10px;
    color: #9a8a7c;
    max-width: 39px;
    @media (max-width: 768px) {
      line-height: 7px;
    }
  }
  h2 {
    margin: 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 70px;
    color: #000000;
    @media (max-width: 1150px) {
      line-height: 40px;
    }

    @media (max-width: 996px) {
      font-size: 20px;
      line-height: 30px;
    }
  }
  .available-col {
    ${theme.mediaQueries.md.up} {
      max-width: 15%;
    }
  }
  .rewards {
    @media (max-width: 996px) {
      font-size: 10px;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }
  }
  .lptoken {
    font-size: 25px;
    line-height: 37px;
    font-weight: 800;
    color: #000000;
    @media (max-width: 1150px) {
      font-size: 22px;
    }
  }
  .money {
    font-weight: 800;
    font-size: 30px;
    line-height: 45px;
    color: #fac200;
    max-width: 218px;
    @media (max-width: 1150px) {
      font-size: 25px;
    }
    @media (max-width: 996px) {
      font-size: 18px;
      line-height: 33px;
    }
    @media (max-width: 768px) {
      line-height: 16px;
    }
  }
  .tvl {
    font-weight: bold;
    font-size: 38px;
    line-height: 60px;
    color: #000000;
    margin: 0;
    @media (max-width: 1150px) {
      font-size: 22px;
      line-height: 40px;
    }
    @media (max-width: 996px) {
      font-size: 22px;
      line-height: 33px;
    }
  }
  @media (max-width: 996px) {
    text-align: center;
    .col-5 {
      background: #fdfafa;
      min-height: 141px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 300px) {
    .col-5 {
      height: 190px;
    }
  }
`;

export const ImageWrapper = styled.div`
  @media (max-width: 996px) {
    width: 20px;
    height: 27.13px;
  }
`;

const StakePage = () => {
  const [donPrice, setDonPrice] = useState<string | null>(null);
  const web3 = getWeb3(56);

  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);

  React.useEffect(() => {
    getDonPriceWeb3(web3).then(setDonPrice);
  }, []);

  return (
    <Section>
      <NavBar variant="loggedin" />
      <StakePageBanner
        title="Staking"
        description="Stake $DON token and LP tokens to gain access to higher tiers, extra APY and LP APY rewards."
      />
      <div className=" d-flex justify-content-center px-3 mt-n5">
        {/* <TierCard text1="DON" text2="Rewards harvest upon deposit and withdraw">
          <DonStaking donPrice={donPrice} />
        </TierCard> */}
      </div>

      <div className=" d-flex justify-content-center px-3 mt-4">
        <TierCard
          text1="Liquidity Pool"
          text2="Stake DON LP token and gain DON rewards. Stake BSC LP tokens and gain DON rewards plus access to tiers"
        >

          <LPStaking type="binancenew" />
          <LPStaking type="ethereumnew" />
          <LPStaking type="ethereum" />
          <LPStaking type="binance" />
        </TierCard>
      </div>
      <div className="py-lg-5 d-flex justify-content-center">
        <Paper
          bgColor={isDesktop ? "#FFF9E5" : "#f3f3f3"}
          borderRadius={isDesktop ? 10 : 0}
          classname="p-0 mt-3 mx-0 mx-lg-3 overflow-hidden"
          maxWidth={isDesktop ? "1201px" : "100%"}
        >
          <div className="px-lg-0 pb-5 pb-lg-0">
            <TierDetail className="mb-n5 mb-lg-auto m-0">
              <h1 className="tiername">TIER</h1>
              Our Tier System unlocks utility on Don-key’s copy-farming
              platform. Each level unlocks an additional level of benefits and
              profitability, rewarding holders of $DON as much as possible.
              <br />
              <ShowMoreContent
                content={`At the moment our tiers provide extra APY in the form of $DON tokens, while base profits are given in the farmed coin. In the future the tiers will unlock more utilities such as: referral rewards, generative NFT rewards, exclusive farming opportunities, autonomous strategy building, and more.`}
                length={isDesktop ? 500 : 100}
              />
            </TierDetail>
            <TiersSection staking={true} />
          </div>
        </Paper>
      </div>
      <Footer />
    </Section>
  );
};

export default StakePage;
