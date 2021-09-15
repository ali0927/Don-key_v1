import { getReferralSystemContract } from "helpers";
import { createContext, useContext, useEffect, useState } from "react";

import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";

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

  const { getConnectedWeb3, chainId } = useWeb3Context();

  const checkhasSignedUp = async () => {
    const web3 = getConnectedWeb3();
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

  useEffect(() => {
    if (chainId === BINANCE_CHAIN_ID) {
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
