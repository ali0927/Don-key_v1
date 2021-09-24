import BigNumber from "bignumber.js";
import { captureException, getPoolToken, toEther } from "helpers";
import Web3 from "web3";
import {
  calculateInitialInvestment,
  calculateWithdrawAmount,
  getTokenPrice,
  getTotalPoolValue,
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

export const getPoolValue = async (web3: Web3, poolAddress: string) => {
  try {
    const amount = await getTotalPoolValue(web3, poolAddress);
    const token = await getPoolToken(web3, poolAddress);
    const decimals = await token.methods.decimals().call();
    const bn = new BigNumber(toEther(amount, decimals)).toFixed(2);
    return bn.toString();
  } catch (e) {
    captureException(e, "getPoolValue: " + poolAddress);
    return "0";
  }
};

export const getPoolValueInUSD = async (web3: Web3, poolAddress: string) => {
  const totalPoolValue = await getPoolValue(web3, poolAddress);
  const tokenPrice = await getTokenPrice(web3, poolAddress);

  return new BigNumber(totalPoolValue).multipliedBy(tokenPrice).toString();
};
const REFERRAL_CODE = "REFERRAL_CODE";

export const setReferralCode = (code: string) => {
  localStorage.setItem(REFERRAL_CODE, code);
};

export const getShareUrl = (code: string) => {
  return window.location.origin+ "/share/" + code;
};

export const getReferralCode = () => {
  return localStorage.getItem(REFERRAL_CODE);
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