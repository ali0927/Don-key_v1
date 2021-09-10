import { getReferralSystemContract } from "helpers";
import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3 } from "don-components";
import { useWeb3Network } from "components/Web3NetworkDetector";
import { NetworksMap } from "components/NetworkProvider/NetworkProvider";

const ReferralContext = createContext({
  hasSignedUp: false,
  code: "",
  referralCount: 0,
  checkSignUp: () => {},
});

export const ReferralStateProvider: React.FC = ({ children }) => {
  const [state, setState] = useState({
    hasSignedUp: false,
    code: "",
    referralCount: 0,
  });

  const web3 = useWeb3();

  const checkhasSignedUp = async () => {
    const referralContract = await getReferralSystemContract(web3);
    const accounts = await web3.eth.getAccounts();
    const userInfo = await referralContract.methods
      .userInfo(accounts[0])
      .call();

    if (userInfo.exists) {
      setState({
        hasSignedUp: true,
        code: userInfo.referralCode,
        referralCount: userInfo.referralCount,
      });
    } else {
      setState({ hasSignedUp: false, code: "", referralCount: 0 });
    }
  };
  const { chainId } = useWeb3Network();
  useEffect(() => {
    if (chainId === NetworksMap.BSC) {
      checkhasSignedUp();
    }
  }, [chainId]);

  return (
    <ReferralContext.Provider
      value={{ ...state, checkSignUp: checkhasSignedUp }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferralContext = () => useContext(ReferralContext);
