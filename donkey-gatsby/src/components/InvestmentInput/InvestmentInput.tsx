import BigNumber from "bignumber.js";
import styled from "styled-components";
import Cake from "../Icons/Cake";
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
const InvestmentRoot = styled.div({
  border: "1px solid #d9d9d9",
  borderRadius: "10px",
  display: "flex",
});

const InvestmentCurrencys = styled.div({
  fontWeight: "bold",
  padding: "0.5rem 0.8rem 0.5rem 0rem",
  whiteSpace: "nowrap",
});

const InvestmentInputElement = styled.input`
  border: none;
  height: 100%;
  width: 100%;
  font-weight: bold;
  padding: 0.5rem 0.1rem 0.5rem 0.5rem;
  border-radius: 10px;
  text-align: right;
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
const InvestmentCurrency = styled.div({
  fontWeight: "bold",
  padding: "0.5rem 0.8rem",
  whiteSpace: "nowrap",
});

const InvestmentPrecentage = styled.div`
  font-size: 10px;
  font-weight: 600;
  margin-right: 0.2rem;
  padding-top: 0.8rem;
  color: #a8a8a8;
`;
const Investmentbutton = styled.div`
  background-color: #fff9aa !important;
  border-radius: 10px !important;
  height: 35px;
  width: 74px;
  margin-top: 1rem;
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
  setValue,
  currencySymbol,
  disabled,
}: {
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
            <Cake />
          </InvestmentCurrency>
          <div className="w-100">
            <InvestmentInputElement
              type="number"
              placeholder="0.0"
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
          <p>~ ${new BigNumber(value || 0).multipliedBy(20.82).toFixed(2)}</p>
        </InvestmentPrecentage>
      </div>
    </>
  );
};
