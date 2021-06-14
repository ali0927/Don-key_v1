import { ErrorSnackbar } from "components/Snackbars";
import { useWeb3 } from "don-components";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export const Web3NetworkDetector = () => {
  const [network, setNetwork] = useState<number | null>(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const web3 = useWeb3();
  useEffect(() => {
    if (network) {
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, [network]);

  useEffect(() => {
    async function apiCall() {
      let network = await web3.eth.net.getId();
      setNetwork(network);
      if (network !== 56) {
        setWrongNetwork(true);
        enqueueSnackbar(
          "Wrong Network. You must be on Binance Smart Chain to continue. Please select the appropriate network via Metamask",
          {
            content: (key, msg) => <ErrorSnackbar message={msg as string} />,
            autoHideDuration: 10000,
            persist: false,
          }
        );
      }
    }
    apiCall();
  }, []);
  return <></>;
};
