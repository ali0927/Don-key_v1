import styled from "styled-components";

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
}: {
  value: string;
  setValue: (val: string) => void;
  max: number;
}) => {
  return (
    <div className="w-100">
      <InvestmentRoot>
        <InvestmentCurrency>BUSD</InvestmentCurrency>
        <div className="w-100">
          <InvestmentInputElement
            type="number"
            placeholder="0"
            value={value}
            onChange={(e) => setValue(e.target.value)} />
        </div>
      </InvestmentRoot>
      <InvestmentPrecentage>
        {[0, 20, 50, 80, 100].map((val) => {
          return (
            <span
              onClick={() => setValue(((val / 100) * max).toFixed(2))}
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
