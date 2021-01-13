/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Panel from "../../../components/Panel/Panel";

const YearnPanel = ({ isOpen, onClose, toggleModal }) => {
  return (
    <Panel
      title={"yEarn finance"}
      icon={
        "https://cdn.cryptotips.eu/wp-content/uploads/2020/09/yearn-finance-review-230x230.png"
      }
      url="https://yearn.finance"
      isOpen={isOpen}
      onClose={onClose}
      desc={`Yearn Finance is a suite of products in Decentralized Finance (DeFi)
    that provides lending aggregation, yield generation, and insurance on
    the Ethereum blockchain. The protocol is maintained by various
    independent developers and is governed by YFI holders.`}
    >
      <h2>Staking pools</h2>
      <ul>
        <li>
          <div className="poolImage">
            <img
              src="https://yearn.finance/static/media/cDAIcUSDC-logo.6640e9ec.png"
              width="40"
            />
          </div>
          <div className="item-name">curve.fi/Compound LP</div>
          <div className="item-percent">APY: 14.61%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Deposit</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="https://yearn.finance/static/media/3Crv-logo.a29563db.png"
              width="40"
            />
          </div>
          <div className="item-name">curve.fi/3pool LP</div>
          <div className="item-percent">APY: 10.03%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Deposit</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="https://yearn.finance/static/media/musd3CRV-logo.88ee8341.png"
              width="40"
            />
          </div>
          <div className="item-name">curve.fi/mUSD LP</div>
          <div className="item-percent">APY: 5.56%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Deposit</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="https://yearn.finance/static/media/crvBUSD-logo.5008aa36.png"
              width="40"
            />
          </div>
          <div className="item-name">curve.fi/busd LP</div>
          <div className="item-percent">APY: 11.61%</div>
          <div onClick={toggleModal} className="btnControl actionBtn">
            <div className="b-btn">Deposit</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="https://yearn.finance/static/media/crvBTC-logo.8ffd61ac.png"
              width="40"
            />
          </div>
          <div className="item-name">curve.fi/sbtc LP</div>
          <div className="item-percent">APY: 1.94%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Deposit</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="data:image/png;base64,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"
              width="40"
            />
          </div>
          <div className="item-name">DAI</div>
          <div className="item-percent">APY: 12.61%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Deposit</div>
          </div>
        </li>
      </ul>
    </Panel>
  );
};

export default React.memo(YearnPanel);
