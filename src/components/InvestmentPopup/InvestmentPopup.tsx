import { CloseIcon } from "Pages/Onboarding/CloseIcon";
import { Modal } from "react-bootstrap";
import "./InvestmentPopup.scss";

const InvestmentInput = () => {
  return (
    <div>
      <div className="invest_input">
        <div className="invest_input_currency">sUSD</div>
        <div>
          <input type="number" placeholder="0" className="invest_input_elm" />
        </div>
      </div>
      <div className="invest_percent">
        {[0, 20, 50, 80, 100].map((val) => {
          return <span style={{ opacity: val / 100 + 0.2 }}>{val}%</span>;
        })}
      </div>
    </div>
  );
};

export const InvestmentPopup = () => {
  return (
    <Modal dialogClassName="invest_dialog" show style={{ border: 0 }} centered>
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
          </div>
          <div className="col invest_col">
            <CloseIcon className="cursor-pointer invest_close" />
            <p className="text-right">
              <small>Balance: $1 300 000 - Get sUSD</small>
            </p>
            <InvestmentInput />
          </div>
        </div>
      </div>
    </Modal>
  );
};
