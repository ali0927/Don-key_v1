import BigNumber from "bignumber.js";
import { ContainedButton, OutlinedButton } from "components/Button";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { ErrorSnackbar, ProgressSnackbar, SuccessSnackbar } from "components/Snackbars";
import { useWeb3 } from "don-components";
import { calculateWithdrawAmount, getBUSDBalance, getBUSDTokenContract, getPoolContract } from "helpers";
import { useAxios } from "hooks/useAxios";
import { useSnackbar } from "notistack";
import * as React from "react";
import Web3 from "web3";
import { IWithDrawPopupProps } from "./interfaces";

const waitFor = (input: number) => {
  return new Promise((res) => {
    setTimeout(res,input)
  })
}

const checkIfUserWithDrawlWorked = async(web3: Web3) => {
  const accounts = await web3.eth.getAccounts();  
  const initialUserBalance = await getBUSDBalance(web3,accounts[0]);

  return new Promise((res,rej) => {
    let retries = 3;
    async function  checkBalance() {
      const newBalance = await getBUSDBalance(web3,accounts[0]);
      const balanceisGreater = new BigNumber(newBalance).gt(initialUserBalance);
      retries--;
      if(balanceisGreater){
        res(newBalance);
      }
      if(retries === 0){
        if(!balanceisGreater){
          rej();
        }
      }
      await waitFor(10000);
      await checkBalance();
    }

    checkBalance();
   
  })

}


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
      } catch (err) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleWithDraw = async () => {
    let key: string | undefined = undefined;
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      const pool = await getPoolContract(web3, poolAddress);
      onClose();
      
      key = enqueueSnackbar("Withdrawal is in Progress", {
        content: (key, msg) => <ProgressSnackbar message={msg as string} />,
        persist: true,
      }) as string;
      await pool.methods.withdrawLiquidity().send({ from: accounts[0] });
      await checkIfUserWithDrawlWorked(web3);
      await executeDelete({
        data: {
          poolAddress: poolAddress,
        },
      });
      if (key) {
        closeSnackbar(key);
      }
      enqueueSnackbar("Withdrawal SuccessFull", {
        content: (key, msg) => <SuccessSnackbar message={msg as string} />,
        persist: false,
      }) as string;
      props.onSuccess();
    } catch (err) {
      if (key) {
        closeSnackbar(key);
      }
      enqueueSnackbar("Withdrawal Failed", {
        content: (key, msg) => <ErrorSnackbar message={msg as string} />,
        persist: false,
      }) as string;
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
