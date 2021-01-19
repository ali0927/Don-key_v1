/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Panel from "../../../components/Panel/Panel";

const CompPanel = ({ isOpen,onClose, toggleModal }) => {
  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      title="Compound finance"
      desc="Compound Finance is a sector-leading lending protocol enabling users
      to lend and borrow popular cryptocurrencies like Ether, Dai and
      Tether. Compound leverages audited smart contracts responsible for
      the storage, management, and facilitation of all pooled capital.
      Users connect to Compound through web3 wallets like MetaMask with
      all positions being tracked using interest-earning tokens called
      cTokens."
      icon={
        "https://pbs.twimg.com/profile_images/1154294327931068416/kKm_IHGE_400x400.png"
      }
      toggleModal={toggleModal}
      url="https://compound.finance/"
    >
      <h2>Liquidity pools</h2>
      <ul>
        <li>
          <div className="poolImage">
            <img
              src="https://app.compound.finance/images/asset_BAT.svg"
              width="40"
            />
          </div>
          <div className="item-name">BAT</div>
          <div className="item-percent"></div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Supply 3.5%</div>
          </div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl left actionBtn"
          >
            <div className="b-btn">Borrow 5.5%</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="https://app.compound.finance/images/asset_COMP.svg"
              width="40"
            />
          </div>
          <div className="item-name">Compound</div>
          <div className="item-percent">APY: 10.03%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Supply 3.5%</div>
          </div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl left actionBtn"
          >
            <div className="b-btn">Borrow 5.5%</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="https://app.compound.finance/images/asset_DAI.svg"
              width="40"
            />
          </div>
          <div className="item-name">DAI</div>
          <div className="item-percent">APY: 5.56%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Supply 3.5%</div>
          </div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl left actionBtn"
          >
            <div className="b-btn">Borrow 5.5%</div>
          </div>
        </li>
        <li>
          <div className="poolImage">
            <img
              src="https://app.compound.finance/images/asset_UNI.svg"
              width="40"
            />
          </div>
          <div className="item-name">UNI</div>
          <div className="item-percent">APY: 11.61%</div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl actionBtn"
          >
            <div className="b-btn">Supply 3.5%</div>
          </div>
          <div
            onClick={() => {
              toggleModal();
            }}
            className="btnControl left actionBtn"
          >
            <div className="b-btn">Borrow 5.5%</div>
          </div>
        </li>
      </ul>
    </Panel>
  );
};


export default React.memo(CompPanel);