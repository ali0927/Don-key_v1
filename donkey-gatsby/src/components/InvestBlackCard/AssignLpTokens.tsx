import { DonCommonmodal } from "components/DonModal";
import React, { useState } from "react";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { Spinner } from "react-bootstrap";
import {
  captureException,
  getPoolContract,
  getPoolToken,
  toEther,
  toWei,
} from "helpers";
import { useWeb3Context } from "don-components";
import BigNumber from "bignumber.js";
import { useIsomorphicEffect } from "hooks";
import clsx from "clsx";

const CancelButton = styled(ButtonWidget)`
  border-radius: 5px;
  :hover {
    background: #fff !important;
  }
`;

export const AssignLpTokens: React.FC<{
  open: boolean;
  pool_address: string;
  poolVersion: number;
  onClose: () => void;
}> = (props) => {
  const { open, pool_address, poolVersion, onClose } = props;

  const [loading, setLoading] = React.useState(false);

  const [pool_value, setPoolvalue] = useState("");

  const [new_pool, setnewPoolvalue] = useState("");
  const { getConnectedWeb3 } = useWeb3Context();
  const [poolState, setPoolState] = useState({
    poolValue: "0",
    greyAmount: "0",
    extraTokens: "0",
    investmentTaken: false,
    greyInvestorCount: "0",
    poolSymbol: "",
    paused: false,
  });

  const fetchPoolState = async () => {
    const web3 = getConnectedWeb3();
    const pool = await getPoolContract(web3, pool_address, poolVersion);
    const prevPoolValue = await pool.methods.getTotalPoolValue().call();
    const greyInvestorCount = await pool.methods.getGreyInvestorCount().call();
    const greyInvestedAmount = await pool.methods
      .getTotalGreyInvestAmount()
      .call();
    const token = await getPoolToken(web3, pool_address);
    const AvailableTokens = await token.methods.balanceOf(pool_address).call();
    const extraTokens = new BigNumber(AvailableTokens).minus(
      greyInvestedAmount.amountInToken
    );

    const symbol = await token.methods.symbol().call();
    const decimals = await token.methods.decimals().call();
    const paused = await pool.methods.paused().call();
    setPoolState({
      extraTokens: extraTokens.gt(0)
        ? toEther(extraTokens.toFixed(0), decimals)
        : "0",
      investmentTaken: new BigNumber(AvailableTokens).lt(greyInvestedAmount.amountInToken),
      greyAmount: toEther(greyInvestedAmount.amountInToken, decimals),
      greyInvestorCount: greyInvestorCount,
      poolValue: toEther(prevPoolValue, decimals),
      poolSymbol: symbol,
      paused
    });
  };

  useIsomorphicEffect(() => {
    fetchPoolState();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const web3 = getConnectedWeb3();
      const pool = await getPoolContract(web3, pool_address, poolVersion);
      const accounts = await web3.eth.getAccounts();
      const token = await getPoolToken(web3, pool_address);
      const decimals = await token.methods.decimals().call();
      if (poolVersion === 3) {
        await pool.methods
          .invested(toWei(pool_value, decimals), toWei(new_pool, decimals))
          .send({ from: accounts[0] });
      } else {
        await pool.methods
          .assignLp(toWei(pool_value, decimals), toWei(new_pool, decimals))
          .send({ from: accounts[0] });
      }
    } catch (e) {
      captureException(e, "Assign Lp Tokens");
    } finally {
      setLoading(false);
      onClose();
    }
  };
  const fees =
    pool_value && new_pool
      ? new BigNumber(new BigNumber(new_pool).minus(pool_value))
          .dividedBy(poolState.greyAmount)
          .minus(1)
          .multipliedBy(100)
      : new BigNumber(0);

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Assign Lp Tokens"
        variant="common"
        onClose={props.onClose}
        size="sm"
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Prev Pool Value </th>
              <td>
                {poolState.poolValue} {poolState.poolSymbol}
              </td>
            </tr>
            <tr>
              <th scope="row">Investment Taken </th>
              <td>
               {poolState.investmentTaken ? "YES": "NO"}
              </td>
            </tr>
            <tr>
              <th scope="row">Pool Paused</th>
              <td>
               {poolState.paused ? "YES": "NO"}
              </td>
            </tr>
            <tr>
              <th scope="row">New Investments</th>
              <td>
                {poolState.greyAmount} {poolState.poolSymbol}
              </td>
            </tr>
            <tr>
              <th scope="row">Number of Investments</th>
              <td>{poolState.greyInvestorCount}</td>
            </tr>
            <tr>
              <th scope="row">Extra Tokens</th>
              <td>
                {poolState.extraTokens} {poolState.poolSymbol}
              </td>
            </tr>

            {pool_value && new_pool && (
              <tr className={clsx({"alert alert-danger": fees.gte(1) || fees.lte(-1)})}>
                <th scope="row">X % (Fees Incurred or Bonus Added)</th>
                <td>{fees.toFixed(4)} %</td>
              </tr>
            )}
          </tbody>
        </table>
        {fees.gte(1) && (
          <div className="alert alert-danger" role="alert">
            The Investors will Receive Bonus of {fees.toFixed(2)} %
          </div>
        )}
        {fees.lte(-1) && (
          <div className="alert alert-danger" role="alert">
            The Loss to Investors would be greater than 1% i.e {fees.abs().toFixed(2)} %
          </div>
        )}

        <div>
          <p>Previous Pool Value</p>
          <input
            type="text"
            value={pool_value}
            placeholder="Enter Pool Value"
            onChange={(e) => setPoolvalue(e.target.value)}
          />
        </div>
        <div>
          <p>New Pool Value</p>
          <input
            type="text"
            value={new_pool}
            placeholder="Enter Pool Value"
            onChange={(e) => setnewPoolvalue(e.target.value)}
          />
        </div>

        <div className="row  mt-4 justify-content-center">
          <div className="col-lg-3" />
          <div className="col-lg-3 mb-2">
            {poolState.investmentTaken && (
              <ButtonWidget
                varaint="contained"
                disabled={loading}
                height="41px"
                containedVariantColor="lightYellow"
                onClick={handleUpdate}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Assign"}
              </ButtonWidget>
            )}
          </div>

          <div className="col-lg-3 mb-2">
            <CancelButton
              varaint="outlined"
              height="41px"
              onClick={props.onClose}
            >
              Cancel
            </CancelButton>
          </div>
          <div className="col-lg-3" />
        </div>
      </DonCommonmodal>
    </>
  );
};
