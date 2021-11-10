import { getReferralSystemContract, setReferralCode } from "helpers";
import { createContext, useContext, useReducer, useRef, useState } from "react";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import { useIsomorphicEffect } from "hooks";
import React from "react";
import produce from "immer";

const INITIAL_STATE: IReferralState = {
  hasSignedUp: false,
  referralCount: 0,
  myLinks: {
    byId: {},
    list: [],
  },
};

const ReferralContext = createContext<
  IReferralState & {
    checkSignUp: () => void;
    dispatch: React.Dispatch<IReferralActions>;
    getTierCommission: (tier: number) => number;
  }
>({
  ...INITIAL_STATE,
  checkSignUp: () => {},
  getTierCommission: () => 5,
  dispatch: (() => {}) as any,
});

type IReferralState = {
  hasSignedUp: boolean;
  referralCount: number;
  myLinks: {
    byId: {
      [poolAddress: string]: {
        image_id: string;
        code: string;
        url: string;
      };
    };
    list: string[];
  };
};

type InitializeAction = {
  type: "INITIALIZE";
  data: IReferralState;
};

type AddLink = {
  type: "ADD_LINK";
  data: {
    code: string;
    url: string;
    image_id: string;
    poolAddress: string;
  };
};

type SetSignUp = {
  type: "SET_SIGNUP";
  data: {
    value: boolean;
  };
};

type ChangeImage = {
  type: "CHANGE_IMAGE";
  data: {
    poolAddress: string;
    image_id: string;
  };
};

type IReferralActions = InitializeAction | AddLink | ChangeImage | SetSignUp;

const referralStateReducer = (
  state: IReferralState,
  action: IReferralActions
): IReferralState => {
  switch (action.type) {
    case "INITIALIZE": {
      return action.data;
    }
    case "SET_SIGNUP": {
      const { value } = action.data;

      return produce(state, (draft) => {
        draft.hasSignedUp = value;
      });
    }
    case "ADD_LINK": {
      const { code, poolAddress, url, image_id } = action.data;
      return produce(state, (draft) => {
        draft.myLinks.byId[poolAddress] = { code, url, image_id };
        draft.myLinks.list.push(poolAddress);
        draft.hasSignedUp = true;
      });
    }
    case "CHANGE_IMAGE": {
      const { poolAddress, image_id } = action.data;
      return produce(state, (draft) => {
        draft.myLinks.byId[poolAddress].image_id = image_id;
      });
    }
  }
  return state;
};

const checkSignedUpThunk = async (
  dispatch: React.Dispatch<IReferralActions>,
  address: string
) => {
  const web3 = getWeb3(BINANCE_CHAIN_ID);
  const referralContract = await getReferralSystemContract(web3);

  const referralCount = await referralContract.methods
    .getTotalReferralCount(address)
    .call();
  const linkCount = await referralContract.methods
    .referralLinkCount(address)
    .call();
  dispatch({
    type: "INITIALIZE",
    data: {
      ...INITIAL_STATE,
      hasSignedUp: linkCount > 0 ? true : false,
      referralCount: referralCount,
    },
  });
};

export const ReferralStateProvider: React.FC = ({ children }) => {
  const [state, dispatchSync] = useReducer(referralStateReducer, INITIAL_STATE);
  const tierMap = useRef<{ [x: number]: number }>({});
  const { chainId, address, connected } = useWeb3Context();

  const checkhasSignedUp = async () => {
    await checkSignedUpThunk(dispatchSync, address);
    const web3 = getWeb3(BINANCE_CHAIN_ID);
    const referralContract = await getReferralSystemContract(web3);
    for (let i = 0; i <= 5; i++) {
      const commission = await referralContract.methods.getTierDetail(i).call();
      tierMap.current[i] = commission / 100;
    }
  };

  useIsomorphicEffect(() => {
    if (chainId === BINANCE_CHAIN_ID) {
      if (connected) {
        checkhasSignedUp();
      }
    }
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("referral");
    if (code) {
      setReferralCode(code);
    }
  }, [chainId, connected, address]);

  const getTierCommission = (tier: number) => {
    return tierMap.current[tier] || 5;
  };

  return (
    <ReferralContext.Provider
      value={{
        ...state,
        checkSignUp: checkhasSignedUp,
        dispatch: dispatchSync,
        getTierCommission,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferralContext = () => useContext(ReferralContext);
