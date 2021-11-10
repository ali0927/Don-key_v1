import { DonCommonmodal } from "components/DonModal";
import React, { useState } from "react";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { Spinner } from "react-bootstrap";
import { formatNum, getPoolContract, getPoolToken, toEther, toWei } from "helpers";
import { useWeb3Context } from "don-components";
import { useIsomorphicEffect, useStakingContract } from "hooks";
import BigNumber from "bignumber.js";
import clsx from "clsx";

const CancelButton = styled(ButtonWidget)`
  border-radius: 5px;
  :hover {
    background: #fff !important;
  }
`;

export const SendWithdrawalsDialog: React.FC<{
  open: boolean;
  pool_address: string;
  poolVersion: number;
  onClose: () => void;
}> = (props) => {
  const { open, pool_address, poolVersion, onClose } = props;

  const [loading, setLoading] = React.useState(false);

  const [new_pool, setnewPoolvalue] = useState("");
  const [withdrawValue, setwithDrawvalue] = useState("");
  const { getConnectedWeb3 } = useWeb3Context();

  const [poolState, setPoolState] = useState({
    poolValue: "0",
    withdrawLP: "0",
    greyWithdrawCount: "0",
    poolSymbol: "",
    totalLp: "0",
    rewardsinStaking: "0",
  });
  const { stakingContract } = useStakingContract();

  const fetchPoolState = async () => {
    const web3 = getConnectedWeb3();
    const pool = await getPoolContract(web3, pool_address, poolVersion);
    const prevPoolValue = await pool.methods.getTotalPoolValue().call();

    const greyWithdrawCount = await pool.methods
      .getGreyWithdrawalCount()
      .call();
    const token = await getPoolToken(web3, pool_address);

    const symbol = await token.methods.symbol().call();
    const decimals = await token.methods.decimals().call();
    const totalLp = await pool.methods.totalSupply().call();
    const rewardToken = await stakingContract.methods
      .getRewardTokenAmount()
      .call();
    const withdrawAmount = await pool.methods
      .getTotalGreyWithdrawalAmount()
      .call();
      console.log(withdrawAmount, totalLp);
    setPoolState({
      withdrawLP: withdrawAmount.LPAmount,
      totalLp,
      greyWithdrawCount: greyWithdrawCount,

      poolValue: toEther(prevPoolValue, decimals),
      poolSymbol: symbol,

      rewardsinStaking: toEther(rewardToken),
    });
  };
  const web3 = getConnectedWeb3();
  const handleUpdate = async () => {
    if(!withdrawValue || !new_pool){
      return ;
    }
    setLoading(true);
    try {
      const poolContract = await getPoolContract(
        web3,
        pool_address,
        poolVersion
      );
      const token = await getPoolToken(web3, pool_address);
      const decimals = await token.methods.decimals().call();
      const accounts = await web3.eth.getAccounts();
      await poolContract.methods
        .withdraw(toWei(withdrawValue, decimals), toWei(new_pool, decimals))
        .send({ from: accounts[0] });
    }catch(e){
      console.log(e);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useIsomorphicEffect(() => {
    fetchPoolState();
  }, []);
  const calculatedWithdraw =
    new_pool 
      ? new BigNumber(poolState.withdrawLP)
          .dividedBy(poolState.totalLp)
          .multipliedBy(new_pool)
      : new BigNumber(0);
  const fees =
    new_pool && withdrawValue
      ? new BigNumber(withdrawValue)
          .dividedBy(calculatedWithdraw)
          .minus(1)
          .multipliedBy(100)
      : new BigNumber(0);

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Send Withdrawals"
        variant="common"
        onClose={props.onClose}
        size="md"
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
              <th scope="row">Prev Pool Value (Excluding new Investments) </th>
              <td>
                {poolState.poolValue} {poolState.poolSymbol}
              </td>
            </tr>
            <tr>
              <th scope="row">Don Rewards in Staking </th>
              <td>{formatNum(poolState.rewardsinStaking)} $DON</td>
            </tr>

            <tr>
              <th scope="row">Predicted WithdrawAmount</th>
              <td>
                {new BigNumber(poolState.withdrawLP)
                  .dividedBy(poolState.totalLp)
                  .multipliedBy(poolState.poolValue)
                  .toFixed(2)}{" "}
                {poolState.poolSymbol}
              </td>
            </tr>
            <tr>
              <th scope="row">Number of Withdrawals</th>
              <td>{poolState.greyWithdrawCount}</td>
            </tr>

            {new_pool && withdrawValue && (
              <tr
                className={clsx({
                  "alert alert-danger": fees.gte(1) || fees.lte(-1),
                })}
              >
                <th scope="row">X % (Fees Incurred or Bonus Added)</th>
                <td>{fees.toFixed(4)} %</td>
              </tr>
            )}
            {fees.gte(1) && (
              <div className="alert alert-danger" role="alert">
                The Investors will Receive Bonus of {fees.toFixed(2)} %
              </div>
            )}
            {fees.lte(-1) && (
              <div className="alert alert-danger" role="alert">
                The Loss to Investors would be greater than 1% i.e{" "}
                {fees.abs().toFixed(2)} %
              </div>
            )}
          </tbody>
        </table>
        <div>
          <p>Latest Pool Value</p>
          <input
            type="text"
            value={new_pool}
            placeholder="Enter Pool Value"
            onChange={(e) => setnewPoolvalue(e.target.value)}
          />
        </div>
        <div>
          {calculatedWithdraw.gt(0) && <>Calculated Withdraw Amount: {calculatedWithdraw.toFixed(4)} {poolState.poolSymbol}</>}
          <p>Withdraw Value</p>
          <input
            type="text"
            value={withdrawValue}
            placeholder="Enter Withdraw Value"
            onChange={(e) => setwithDrawvalue(e.target.value)}
          />
        </div>

        <div className="row  mt-4 justify-content-center">
          <div className="col-lg-3" />
          <div className="col-lg-3 mb-2">
            <ButtonWidget
              varaint="contained"
              disabled={loading}
              height="41px"
              containedVariantColor="lightYellow"
              onClick={handleUpdate}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Send"}
            </ButtonWidget>
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
