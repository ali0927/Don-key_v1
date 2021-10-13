import BigNumber from "bignumber.js";
import styled from "styled-components";

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
const InvestmentRoot = styled.div({
  border: "1px solid #d9d9d9",
  borderRadius: "10px",
  display: "flex",
});

const InvestmentCurrencys = styled.div`
  font-weight: bold;
  font-size:20px;
  background-color:#F9FAFB;
  border-radius:10px;
  height:60px;
  padding: 0.4rem 0.8rem 0.5rem 0rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  @media only screen and (max-width: 600px) {
    height:43px;
    padding: 0.65rem 0.8rem 0.5rem 0rem;
  }
  
`

const InvestmentInputElement = styled.input`
  border: none;
  background-color:#F9FAFB;
  height: 100%;
  width: 100%;
  font-weight: bold;
  padding: 0.5rem 0.02rem 0.5rem 0.5rem;
  font-size:20px;
  text-align: right;
  ::placeholder { 
  color: #070602;
  opacity: 1; 
}
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
  }
`;
const InvestmentCurrency = styled.div`
  font-weight: bold;
  background-color:#F9FAFB;
  border-radius:10px;
  height:60px;
  padding: 0.5rem 0.8rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    height:43px;
  }
  
  
`;

const InvestmentPrecentage = styled.div`
  font-size: 10px;
  font-weight: 600;
  padding-top: 15px;
  color: #a8a8a8;
  padding-bottom:12px;
  @media only screen and (max-width: 600px) {
    height:43px;
    padding-top: 7px;
  }
`;
const Investmentbutton = styled.div`
  background-color: #fff9aa !important;
  border-radius: 10px !important;
  height: 35px;
  width: 74px;
  p {
    font-size: 12px;
    font-weight: 600;
    color: #000000;
  }
`;
const Buttonsection = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: end;
`;

export const InvestmentInput = ({
  value,
  tokenPrice,
  setValue,
  currencySymbol,
  disabled,
  srcimg,
}: {
  srcimg:string;
  tokenPrice:string,
  value: string;
  setValue: (val: string) => void;
  max: string;
  currencySymbol: string;
  disabled?: boolean;
  hidePercent?: boolean;
}) => {
  return (
    <>
      <Buttonsection className="w-100 ">
        <Investmentbutton className="btn ">
          <p>MAX</p>
        </Investmentbutton>
      </Buttonsection>
      <div className="w-100">
        <InvestmentRoot>
          <InvestmentCurrency>
          <img style={{ width: 18 }} src={srcimg} alt="token" />{" "}
          </InvestmentCurrency>
          <div className="w-100">
            <InvestmentInputElement
              type="number"
              placeholder="0.000000"
              min={0}
              value={value}
              disabled={disabled}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <InvestmentCurrencys>
            {currencySymbol.toUpperCase()}
          </InvestmentCurrencys>
        </InvestmentRoot>

        <InvestmentPrecentage className="text-right ">
          <p>~ ${new BigNumber(value || 0).multipliedBy(tokenPrice).toFixed(2)}</p>
        </InvestmentPrecentage>
      </div>
    </>
  );
};
