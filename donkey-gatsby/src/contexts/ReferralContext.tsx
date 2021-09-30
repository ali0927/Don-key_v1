import { getReferralSystemContract, setReferralCode } from "helpers";
import { createContext, useContext, useState } from "react";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import { useIsomorphicEffect } from "hooks";
import React from "react";

const ReferralContext = createContext({
  hasSignedUp: false,
  code: "",
  referralCount: 0,
  checkSignUp: () => {},
});

const INITIAL_STATE = {
  hasSignedUp: false,
  code: "",
  referralCount: 0,
}

export const ReferralStateProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const { chainId, address, connected, getConnectedWeb3 } = useWeb3Context();

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

  const resetState = () => setState(INITIAL_STATE);


  // Removed Sign Message Functionality
  // useIsomorphicEffect(() => {
  //   if(connected){
  //     signUser(getConnectedWeb3());
  //   } else {
  //     localStorage.removeItem(AuthToken);
  //   }
  // }, [connected, address])
  useIsomorphicEffect(() => {
    if(chainId === BINANCE_CHAIN_ID){
      if (connected) {
        checkhasSignedUp();
      }
    }else {
      resetState()
    }
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("referral");
    if (code) {
      setReferralCode(code);
    }
  }, [chainId, connected, address]);

  return (
    <ReferralContext.Provider
      value={{ ...state, checkSignUp: checkhasSignedUp }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferralContext = () => useContext(ReferralContext);
