import { useWeb3Context } from "don-components";
import { shortenAddress } from "don-utils";


export const useWalletAddress = ({ short = false }) => {
    const { address } = useWeb3Context();
    const walletAddress = address
      ? address
      : "0x1341133ba79815e04e008f7635212bf086e821301";
    return short ? shortenAddress(walletAddress) : walletAddress;
  };