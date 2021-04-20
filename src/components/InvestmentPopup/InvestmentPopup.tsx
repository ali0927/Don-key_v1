import { BiInfoCircle } from "react-icons/bi";
import { FaCross } from "react-icons/fa";
import { Modal, Spinner } from "react-bootstrap";
import "./InvestmentPopup.scss";
import { useState } from "react";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { InvestmentInput } from "./InvestmentInput";

export const InvestmentPopup = ({
  balance,
  poolAddress,
  onClose,
  onSuccess,
  onFailure
}: {
  balance: string | number;
  poolAddress: string;
  onClose: () => void;
  onSuccess?: () => void;
  onFailure?: () => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, enable, disable] = useToggle();

  const [ {},executePost] = useAxios(
    { method: "POST", url: "/api/v2/investments" },
    { manual: true }
  );




  const handleInvest = async () => {
    if (isLoading) {
      return;
    }
    enable();
    try {
     
     await executePost({ data: { poolAddress } });
      if (onSuccess) {
        onSuccess();
      }

    }
    catch (err) {
      if (onFailure) {
        onFailure();
      }
    }
    finally {
      disable();
    }
    onClose();
  };

  const renderButtonText = () => {
    if (isLoading) {
      return <Spinner animation="border" size={"sm"} color="#fff" />;
    }

    return "Invest";
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
              <FaCross
                onClick={onClose}
                className="cursor-pointer invest_close"
              />
              <p className="text-right">
                <small>Balance: {balance} BUSD</small>
              </p>
              <InvestmentInput
                value={value}
                setValue={setValue}
                max={parseInt(balance as string)}
              />
            </div>
            <div className="row">
              <div className="col">
                <button
                  disabled={!value}
                  onClick={handleInvest}
                  className="invest_btn"
                >
                  {renderButtonText()}
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
