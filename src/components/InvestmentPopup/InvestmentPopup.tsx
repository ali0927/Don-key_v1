import { BiInfoCircle } from "react-icons/bi";
import { CloseIcon } from "Pages/Onboarding/CloseIcon";
import { Modal, Spinner } from "react-bootstrap";
import "./InvestmentPopup.scss";
import { useState } from "react";
import { getWeb3 } from "helpers";
import Web3 from "web3";
import { useToggle } from "hooks";

const InvestmentInput = ({
  value,
  setValue,
  max,
}: {
  value: string;
  setValue: (val: string) => void;
  max: number;
}) => {
  return (
    <div>
      <div className="invest_input">
        <div className="invest_input_currency">WBNB</div>
        <div>
          <input
            type="number"
            placeholder="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="invest_input_elm"
          />
        </div>
      </div>
      <div className="invest_percent">
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
      </div>
    </div>
  );
};

export const InvestmentPopup = ({ balance, onClose }: {balance: string | number, onClose: () => void }) => {
  const [value, setValue] = useState("");
  const [isLoading, enable, disable] = useToggle();

  const handleInvest = async () => {
    if (isLoading) {
      return;
    }
    enable();
    try {
      const web3 = (await getWeb3()) as Web3;
      const poolAddress = "0x271a6e88a501c73f786df6cf78a14b69bde6ec1b";
      const accounts = await web3.eth.getAccounts();
      const abi = require('erc-20-abi');

      const BEP20ABI = (await import("../../JsonData/BEP20Token.json"));
      const WBNB = new web3.eth.Contract(abi, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");

      const currentAllowance = await WBNB.methods.allowance(accounts[0],poolAddress).call();

      const parsedPoolContract = (await import("../../JsonData/POOL.json"))
        .default;

      const amount = web3.utils.toWei(value);
      //@ts-ignore
      const pool = new web3.eth.Contract(parsedPoolContract.abi, poolAddress);
      await pool.methods.depositLiquidity(amount).send({ from: accounts[0] });
    } finally {
      disable();
    }
    onClose();
  };

  return (
    <Modal
      dialogClassName="invest_dialog"
      onHide={onClose}
      show
      style={{ border: 0 }}
      centered
    >
      <div className="container">
        <div className="row">
          <div className="col-5 invest_col">
            <h4>Invest</h4>
            <small className="text-muted">Summary</small>
            <p className="d-flex mt-2 text-muted justify-content-between">
              <span>USD Value</span>
              <span>$240</span>
            </p>
            <p className="d-flex text-muted justify-content-between">
              <span>GAS FEE</span>
              <span>$13</span>
            </p>
            <p className="d-flex justify-content-between">
              <span>TOTAL</span>
              <span>$254</span>
            </p>
            <p className="mb-0 mt-3 cursor-pointer">
              <small>
                Important <BiInfoCircle />{" "}
              </small>
            </p>
          </div>
          <div className="col invest_col">
            <div>
              <CloseIcon
                onClick={onClose}
                className="cursor-pointer invest_close"
              />
              <p className="text-right">
                <small>Balance: ${balance} WBNB</small>
              </p>
              <InvestmentInput
                value={value}
                setValue={setValue}
                max={1300000}
              />
            </div>
            <div className="row">
              <div className="col">
                <button disabled={!value} onClick={handleInvest} className="invest_btn">
                  {isLoading ? (
                    <Spinner animation="border" size={"sm"} color="#fff" />
                  ) : (
                    "Invest"
                  )}
                </button>
              </div>
              <div className="col">
                <button
                  onClick={onClose}
                  className="invest_btn invest_btn--outlined"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
