import BigNumber from "bignumber.js";
import { useMemo } from "react";
import styled from "styled-components";
BigNumber.config({ROUNDING_MODE: BigNumber.ROUND_FLOOR});
const InvestmentRoot = styled.div({
  border: "1px solid #d9d9d9",
  display: "flex",
  borderRadius: "3px",
});

const InvestmentCurrency = styled.div({
  fontWeight: "bold",
  padding: "0.5rem 0.8rem",
  borderRight: "1px solid #d9d9d9",
});

const InvestmentInputElement = styled.input`
  border: none;
  height: 100%;
  width: 100%;
  padding: 0.5rem 0.8rem;
  text-align: right;
  -moz-appearance:textfield;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }  
  &:focus {
    outline: none;
  }
`

const InvestmentPrecentage = styled.div`
   span {
     display: inline-block;
     cursor: pointer;
     font-size: 10px;
     font-weight: 300;
     &:not(:last-child){
       margin-right: 1.5rem;
     }
    }
`

export const InvestmentInput = ({
  value,
  setValue,
  max,
  disabled
}: {
  value: string;
  setValue: (val: string) => void;
  max: string;
  disabled?:boolean;
}) => {
  const maxNum = useMemo(() => {
    return new BigNumber(max);
  }, [max])
  return (
    <div className="w-100">
      <InvestmentRoot>
        <InvestmentCurrency>BUSD</InvestmentCurrency>
        <div className="w-100">
          <InvestmentInputElement
            type="number"
            placeholder="0"
            min={0}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)} />
        </div>
      </InvestmentRoot>
      <InvestmentPrecentage>
        {[0, 20, 50, 80, 100].map((val, index) => {
           const updatedVal = maxNum.multipliedBy(new BigNumber(val).dividedBy(new BigNumber(100))).toFixed(2);
          return (
            <span
              key={index}
              onClick={() => setValue(updatedVal)}
              style={{ opacity: val / 100 + 0.2 }}
            >
              {val}%
            </span>
          );
        })}
      </InvestmentPrecentage>


    </div>
  );
};
