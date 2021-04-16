import { useYFITokens } from "../YFITokensProvider";
import { CryptoCurrencyInput, DownArrow } from "don-components";
import { MTAIcon } from "./MTAIcon";
import { MUSDIcon } from "./MUSDIcon";

export const BalancerRemoveLiquidity = () => {

  
  const yfiTokens = useYFITokens();
  if(yfiTokens.length === 0){
    return <></>
  }
  return (
    <div>
      <CryptoCurrencyInput
        noDropdown
        label="Input (Estimate)"
        name={"0x003A"}
        currencies={yfiTokens}
        icon={<MTAIcon />}
        placeholder="Amount"
      />
      <div className={`arrow-wrapper `}>
        <DownArrow />
        <div className="arrow-max">Max</div>
      </div>
      <div className={`cryptoinput flex-column`}>
        <label className="cryptoinput__label">Output (Estimate)</label>
        <div className="cryptoinput__wrapper py-2">
          <div
            className="cryptoinput__selected"
          >
            <span className={`cryptoinput__icon`}>
              <MUSDIcon />
            </span>
            <span>mUSD</span>
          </div>
          <input
            className="cryptoinput__input "
            type="number"
            placeholder={"0"}
          />
        </div>
        <div className="cryptoinput__wrapper py-2">
          <div
            className="cryptoinput__selected"
          >
            <span className={`cryptoinput__icon`}>
              <MTAIcon />
            </span>
            <span>MTA</span>
          </div>
          <input
            className="cryptoinput__input "
            type="number"
            placeholder={"0"}
          />
        </div>
      </div>
      <div className="actionprop_info">
        <div className="">Weight</div>
        <div>
          <div>
            <span className="text-dark">20,00%</span> mUSD
          </div>
          <div>
            {" "}
            <span className="text-dark">00,00%</span> {"  "} MTA
          </div>
        </div>
      </div>
    </div>
  );
};
