import BigNumber from "bignumber.js";
import Web3 from "web3";
import {
  calculateInitialInvestment,
  calculateWithdrawAmount,
} from "./contractHelpers";
export const getQueryParam = (name: string) => {
  if (typeof window === "undefined") {
    return "";
  }
  const search = window.location.search;
  const queryString = decodeURIComponent(search.slice(1, search.length));
  const queryObj: any = {};
  queryString.split("&").forEach((item) => {
    const items = item.split("=");
    queryObj[items[0]] = items[1];
  });

  return queryObj[name];
};

export const tuplify = <T extends any[]>(...args: T) => {
  return args;
};

export const getROI = async (web3: any, poolAddress: string) => {
  const investedAmountWithReward = new BigNumber(
    await calculateWithdrawAmount(web3, poolAddress)
  );
  const accounts = await web3.eth.getAccounts();
  const initialInvestment = new BigNumber(
    await calculateInitialInvestment(web3, poolAddress, accounts[0])
  );

  if (initialInvestment.isEqualTo(0)) {
    return "0";
  }
  return investedAmountWithReward
    .minus(initialInvestment)
    .multipliedBy(100)
    .dividedBy(initialInvestment)
    .toFixed(2);
};

export const getProfitLoss = async (web3: Web3, poolAddress: string) => {
  const investedAmount = await calculateWithdrawAmount(web3, poolAddress);
  const accounts = await web3.eth.getAccounts();
  const initialInvestment = await calculateInitialInvestment(
    web3,
    poolAddress,
    accounts[0]
  );

  const value = parseFloat(investedAmount) - parseFloat(initialInvestment);
  return value;
};



export const getShareUrl = (code: string) => {
  return process.env.GATSBY_SHARE_URL+ "/"  + code;
};

export const getReferralCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("referral");
    return code;
};

export const fixUrl = (url?: string) => {
  if (!url) {
    return url;
  }
  if (url.includes("http")) {
    return url;
  }
  return `https://${url}`;
};

export const formatNum = (num: string) => {
  const wrappedNum = new BigNumber(num);
  let digits = wrappedNum.gt(1) ? 2 : 6;
  if (process.env.GATSBY_APP_ENV === "development") {
    digits = 6;
  }
  const formatted = wrappedNum.toFixed(digits);

  return Number(formatted).toLocaleString("en-us", {
    minimumSignificantDigits: digits,
  });
};

export const nFormatter = (num: string) => {
  let value = parseFloat(num.replace(/,/g, ''));
  if (value > 0 && value < 1) {
    return value.toFixed(2);
  }
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(0) + "G";
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  if (value < 0) {
    return value.toFixed(2);
  }
  return value;
};
