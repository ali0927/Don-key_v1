import { BiInfoCircle } from "react-icons/bi";
import { CloseIcon } from "Pages/Onboarding/CloseIcon";
import { Modal } from "react-bootstrap";
import "./InvestmentPopup.scss";
import { useState } from "react";

const InvestmentInput = ({ max }: { max: number }) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="invest_input">
        <div className="invest_input_currency">sUSD</div>
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

export const InvestmentPopup = ({onClose}: {onClose: () => void}) => {
  return (
    <Modal dialogClassName="invest_dialog" onHide={onClose} show style={{ border: 0 }} centered>
      <div className="container">
        <div className="row">
          <div className="col-5 invest_col">
            <h4>Invest</h4>
            <small className="text-muted">Summary</small>
            <p className="d-flex mt-2 text-muted justify-content-between">
              <span>USD</span>
              <span>$120 000,00</span>
            </p>
            <p className="d-flex text-muted justify-content-between">
              <span>GAS FEE</span>
              <span>$1230,00</span>
            </p>
            <p className="d-flex justify-content-between">
              <span>TOTAL</span>
              <span>$121 300,00</span>
            </p>
            <p className="mb-0 mt-3 cursor-pointer">
              <small>
                Important <BiInfoCircle />{" "}
              </small>
            </p>
          </div>
          <div className="col invest_col">
            <div>
              <CloseIcon onClick={onClose} className="cursor-pointer invest_close" />
              <p className="text-right">
                <small>Balance: $1 300 000 - Get sUSD</small>
              </p>
              <InvestmentInput max={1300000} />
            </div>
            <div className="row">
              <div className="col">
                <button onClick={onClose} className="invest_btn">Invest</button>
              </div>
              <div className="col">
                <button onClick={onClose} className="invest_btn invest_btn--outlined">
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