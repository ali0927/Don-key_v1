import { ContainedButton, OutlinedButton } from "components/Button";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { useWeb3 } from "don-components";
import { calculateWithdrawAmount, getPoolContract } from "helpers";
import { useAxios } from "hooks/useAxios";
import * as React from "react";
import { IWithDrawPopupProps } from "./interfaces";

export const WithDrawPopup: React.FC<IWithDrawPopupProps> = (props) => {
  const { open, poolAddress, onClose } = props;

  const [{}, executeDelete] = useAxios(
    { method: "DELETE", url: "/api/v2/investments" },
    { manual: true }
  );

  const web3 = useWeb3();
  const [withdrawalValue, setWithdrawalValue] = React.useState("-");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const amount = await calculateWithdrawAmount(web3, poolAddress);
        setWithdrawalValue(amount);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { showFailure, showProgress, showSuccess } =
    useTransactionNotification();
  const handleWithDraw = async () => {
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();

      const pool = await getPoolContract(web3, poolAddress);
      onClose();

      showProgress("Withdrawal is in Progress");
      await pool.methods.withdrawLiquidity().send({ from: accounts[0] });

      await executeDelete({
        data: {
          poolAddress: poolAddress,
        },
      });

      showSuccess("Withdrawal Successfull");

      props.onSuccess();
    } catch (err) {
      showFailure("Withdrawal Failed");
      props.onError(err);
    }
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Withdraw"
        variant="common"
        size="xs"
        onClose={props.onClose}
      >
        <div className="mt-3">
          Are you sure you want to withdraw {withdrawalValue} BUSD ?
        </div>
        <div className="d-flex mt-5">
          <ContainedButton
            className="mr-3"
            disabled={loading}
            onClick={handleWithDraw}
          >
            {loading && <DonKeySpinner />}
            {!loading && <>Withdraw</>}
          </ContainedButton>
          <OutlinedButton onClick={() => props.onClose()}>
            Cancel
          </OutlinedButton>
        </div>
      </DonCommonmodal>
    </>
  );
};
