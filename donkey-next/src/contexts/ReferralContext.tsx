import { getReferralSystemContract } from "helpers";
import { createContext, useContext, useEffect, useState } from "react";

import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import { connected } from "process";

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

  const { chainId, address } = useWeb3Context();

  const checkhasSignedUp = async () => {
    const web3 = getWeb3(BINANCE_CHAIN_ID);
    const referralContract = await getReferralSystemContract(web3);

    const userInfo = await referralContract.methods.userInfo(address).call();

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
    if (connected) {
      checkhasSignedUp();
    }
  }, [chainId, connected]);

  return (
    <ReferralContext.Provider
      value={{ ...state, checkSignUp: checkhasSignedUp }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferralContext = () => useContext(ReferralContext);
