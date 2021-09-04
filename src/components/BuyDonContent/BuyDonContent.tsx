import { ButtonWidget as Button } from "components/Button";
import styled from "styled-components";

const StyledP = styled.p`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #070602;
`;

const ButtonWidget = styled(Button)`
border-radius: 10px;
font-size: 14px;
font-weight: 500;
`;

export const BuyDonContent = () => {
  return (
    <div style={{ marginTop: -30, padding: "30px 0 10px" }}>
      <div className="d-flex justify-content-center">
        {/* <div style={{ width: 100 }}>
          <img
            src="/assets/images/token.png"
            className="d-inline-block"
            alt="Don Token Logo"
          />
        </div> */}
      </div>
      <StyledP>
        In order to use Don-key DAPP you need to hold at least 100 $DON tokens in your wallet
      </StyledP>
      <div className="d-flex align-items-center mt-5">
        <ButtonWidget
          onClick={() => {
            window.open(
              "https://app.uniswap.org/#/swap?inputCurrency=0x217ddead61a42369a266f1fb754eb5d3ebadc88a&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&use=V2",
              "_blank"
            );
          }}
          varaint="contained"
          height="40px"
          className="py-2 mr-3"
          containedVariantColor="lightYellow"
        >
          Buy ERC20 DON
        </ButtonWidget>
        <ButtonWidget
          height="40px"
          onClick={() => {
            window.open(
              "https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255",
              "_blank"
            );
          }}
          varaint="contained"
          className="py-2 mr-3"
          containedVariantColor="lightYellow"
        >
          Buy BEP 20 DON
        </ButtonWidget>
      </div>
    </div>
  );
};
