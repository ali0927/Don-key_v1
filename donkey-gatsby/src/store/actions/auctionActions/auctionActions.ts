import { gql } from "@apollo/client";
import { client } from "apolloClient";
import BigNumber from "bignumber.js";
import { getAuctionContract } from "Contracts";
import { BSC_TESTNET_CHAIN_ID, getWeb3 } from "don-components";
import {
  captureException,
  getPoolContract,
  getTokenPrice,
  getTokenSymbol,
  isOneOf,
  toEther,
} from "helpers";
import produce from "immer";
import {
  AppThunk,
  IAuction,
  IBid,
  IFarmerInter,
  ILoan,
  IPrevWinners,
  IStoreState,
  ISupportedLP,
} from "interfaces";
import Moralis from "moralis/types";
import {
  bidSelector,
  loanSelector,
  selectAuction,
} from "store/selectors";

import { action } from "typesafe-actions";
import Web3 from "web3";

export const fetchAuctionSuccess = (auctions: IAuction[]) =>
  action("FETCH_AUCTION_SUCCESS", { auctions });

export const fetchAuctions = () => {
  return action("FETCH_AUCTIONS");
};

export const fetchBalances = () => {
  return action("FETCH_BALANCES");
};

export const fetchBalanceSuccess = (auctions: IAuction[]) => {
  return action("FETCH_BALANCES_SUCCESS", { auctions });
};

const ALL_FARMERS_QUERY = gql`
  query allFarmerQuery {
    farmers(where: { status_in: ["active"] }) {
      name
      farmerImage {
        url
      }
      strategies {
        name
        token {
          image {
            url
          }
        }
      }
      poolAddress
      poolVersion
      network {
        name
        chainId
        symbol
      }
      last_cycle
    }
  }
`;

export const fetchAuctionsThunk =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(fetchAuctions());

    const auctionAddresses = [
      "0x1c30c0361caBe650D5674BF887c778ABF28A9Fbb",
      "0xEa19dADA1AA131B350d79b29f5C126972E818B47",
      "0xEeA3b3727908FfcedF0B5F420c4d42C5f46C9fa2",
      "0x8B60b8A3f57E2dC242Bc133eE694ACcD67427c3F",
    ];

    // To do Fetch All Pools addresses
    const result = await client.query({ query: ALL_FARMERS_QUERY });
    const farmers: IFarmerInter[] = result.data.farmers;

    const web3 = getWeb3(BSC_TESTNET_CHAIN_ID);
    const AuctionContracts = auctionAddresses.map((addr) => {
      return getAuctionContract(addr, BSC_TESTNET_CHAIN_ID);
    });

    const promises = AuctionContracts.map(async (contract) => {
      const auctionState: IAuction = {
        address: contract.address,
        endTime: 0,
        initialized: false,
        maxDebtMap: {},
        startTime: 0,
        supportedLps: [],
        tenure: 0,
      };

      try {
        const oldState = selectAuction(
          getState().auctions.auctionInfo,
          contract.address
        );
        if (oldState && oldState.initialized) {
          return oldState;
        }

        await contract.initialize();
        auctionState.initialized = true;
        auctionState.endTime = await contract.getauctionEndTime();
        auctionState.startTime = await contract.getauctionStartTime();
        auctionState.maxDebtMap = contract.getMaxDebtMap();
        auctionState.tenure = await contract.getLoanTenure();
        const filterFarmers: IFarmerInter[] = [];
        await Promise.all(
          farmers.map(async (farmer) => {
            const result = await contract.isWhiteListed(farmer.poolAddress);
            // console.log(result, "Whitleist")
            if (result) {
              filterFarmers.push(farmer);
            }
          })
        );

        if (filterFarmers.length > 0) {
          auctionState.supportedLps = await Promise.all(
            filterFarmers.map(async (farmer) => {
              const price = await getTokenPrice(web3, farmer.poolAddress);
              const symbol = await getTokenSymbol(web3, farmer.poolAddress);
              const minCommission = await contract.getFloorCommission(
                farmer.poolAddress
              );
              const supportedLp: ISupportedLP = {
                lpAddress: farmer.poolAddress,
                price,
                symbol,
                minCommission,
                strategyName: farmer.strategies[0].name,
                tokenImage: farmer.strategies[0].token.image.url,
                strategyImage: farmer.farmerImage.url,
              };
              return supportedLp;
            })
          );
        }
      } catch (e) {
        console.log(e, "Feth Auctions");
        return auctionState;
      }

      return auctionState;
    });
    const fetchedAuctions = await Promise.all(promises);

    // save auctions to store
    dispatch(fetchAuctionSuccess(fetchedAuctions));
  };

export const fetchBalancesThunk =
  (userAddress: string, extra: { onSuccess?: () => void } = {}): AppThunk =>
  async (dispatch, getState) => {
    dispatch(fetchBalances());

    const state = getState();
    const auctions = state.auctions.auctionInfo;

    if (auctions.status === "FETCH_SUCCESS") {
      let fetchedAuctions = auctions.auctionState;
      const web3 = getWeb3(BSC_TESTNET_CHAIN_ID);
      const promises: Promise<any>[] = [];
      fetchedAuctions.forEach((item, index) => {
        const list = item.supportedLps.map(async (lp, lindex) => {
          const pool = await getPoolContract(web3, lp.lpAddress, 4);
          const withdrawAmount = await pool.methods
            .getUserInvestedAmount(userAddress)
            .call();
          const userBalance = await pool.methods.balanceOf(userAddress).call();
          const lockedLp = await pool.methods
            .lockedLPAmount(userAddress)
            .call();
          fetchedAuctions = produce(fetchedAuctions, (draft) => {
            draft[index].supportedLps[lindex].balance = toEther(userBalance);
            draft[index].supportedLps[lindex].withdrawAmount = toEther(
              new BigNumber(1)
                .minus(new BigNumber(lockedLp).dividedBy(userBalance))
                .multipliedBy(withdrawAmount)
                .toFixed(0)
            );
            draft[index].supportedLps[lindex].lockedLp = toEther(lockedLp);
          });
        });
        promises.push(...list);
      });
      await Promise.all(promises);

      dispatch(fetchBalanceSuccess(fetchedAuctions));
      extra.onSuccess && extra.onSuccess();
    }
  };

export const fetchingBids = () => action("FETCHING_BIDS");

export const fetchBidsSuccess = (bids: IBid[]) =>
  action("FETCH_BIDS_SUCCESS", { bids });

export const fetchBidsFail = () => action("FETCH_BIDS_FAIL");

export const fetchingLoans = () => action("FETCHING_LOANS");

export const fetchLoansSuccess = (loans: ILoan[]) =>
  action("FETCH_LOANS_SUCCESS", { loans });

export const fetchLoansFail = () => action("FETCH_LOANS_FAIL");

const getBidStatus = (
  anounced: boolean,
  isWinner: boolean,
  hasClaimed: boolean
): IBid["status"] => {
  if (!anounced) {
    return "pending";
  }
  if (!isWinner) {
    return "rejected";
  }
  if (!hasClaimed) {
    return "won";
  }
  return "claimed";
};

const getLoanStatus = (
  loanSettled: boolean,
  forceRecovered: boolean
): ILoan["status"] => {
  if (loanSettled && forceRecovered) {
    return "recovered";
  }
  return !loanSettled ? "unpaid" : "paid";
};

const fetchBidsAndLoans = async (state: IStoreState, userAddress: string) => {
  const auctions = state.auctions.auctionInfo;
  const bids: IBid[] = [];
  const loans: ILoan[] = [];
  if (
    auctions.status === "FETCH_BALANCE_SUCCESS" ||
    auctions.status === "FETCH_SUCCESS"
  ) {
    const auctionData = auctions.auctionState;

    const promises = auctionData.map(async (item) => {
      const bid: IBid = {
        status: "pending",
        auctionAddress: item.address,
        borrowedAmount: "0",
        commission: "0",
        commissionPercent: "0",
        lendedAmount: "0",
        lpAddress: "",
        participationTime: "0",
      };
      const auctionContract = getAuctionContract(
        item.address,
        BSC_TESTNET_CHAIN_ID
      );

      const info = await auctionContract.getUserInfo({ userAddress });
      const anounced = await auctionContract.isWinnerAnounced();
      const isWinner = await auctionContract.isWinner({ userAddress });
      const hasClaimed = !new BigNumber(info.borrowedTime).isEqualTo(0);
      bid.status = getBidStatus(anounced, isWinner, hasClaimed);
      bid.borrowedAmount = isOneOf(bid.status, ["claimed", "won"])
        ? toEther(info.borrowedAmount)
        : toEther(info.estimatedBorrowedAmount);
      const commissionBn = new BigNumber(info.commissionInPer).dividedBy(100);
      bid.commission = commissionBn
        .dividedBy(100)
        .multipliedBy(bid.borrowedAmount)
        .toFixed(2);
      bid.commissionPercent = commissionBn.toFixed(2);
      bid.lendedAmount = toEther(info.lendedAmount);
      bid.lpAddress = info.lptoken;
      bid.participationTime = info.participationTime;
      if (new BigNumber(info.lendedAmount).gt(0)) {
        bids.push(bid);
      }
      if (bid.status === "claimed") {
        const forceRecovery = await auctionContract.forceRecovery({
          userAddress,
        });

        const repaymentAmount = await auctionContract.estimatedRepaymentAmount({
          userAddress,
        });

        const loan: ILoan = {
          borrowedAmount: toEther(info.borrowedAmount),
          commission: toEther(info.commissionAmount),
          commissionPercent: commissionBn.toFixed(2),
          lendedAmount: toEther(info.lendedAmount),
          lpAddress: info.lptoken,
          status: getLoanStatus(info.loanSettled, forceRecovery),
          totalAmountTobePaid: toEther(repaymentAmount),
          settlementTime: info.settlementTime,
        };
        loans.push(loan);
      }
    });

    await Promise.all(promises);
  }
  return { bids, loans };
};

export const fetchBidsAndLoansThunk =
  (userAddress: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(fetchingBids());
    dispatch(fetchingLoans());
    try {
      const { bids, loans } = await fetchBidsAndLoans(getState(), userAddress);
      dispatch(fetchBidsSuccess(bids));
      dispatch(fetchLoansSuccess(loans));
    } catch (e) {
      dispatch(fetchBidsFail());
      dispatch(fetchBidsFail());
    }
  };

export const claimLoanThunk =
  ({
    web3,
    auctionAddress,
    userAddress,
    onDone,
    onError,
  }: {
    web3: Web3;
    auctionAddress: string;
    userAddress: string;
    onDone?: () => void;
    onError?: () => void;
  }): AppThunk =>
  async (dispatch, getState) => {
    try {
      const auctionContract = getAuctionContract(
        auctionAddress,
        BSC_TESTNET_CHAIN_ID
      );
      if (!auctionContract.connectedToWallet) {
        await auctionContract.connectToWallet(web3);
      }
      await auctionContract.borrow({ userAddress });
      const { bids, loans } = await fetchBidsAndLoans(getState(), userAddress);
      dispatch(fetchBidsSuccess(bids));
      dispatch(fetchLoansSuccess(loans));
      onDone && onDone();
    } catch (e) {
      captureException(e, "Error Claim Loan");
      onError && onError();
    }
  };

export const payLoanThunk =
  ({
    web3,
    lpAddress,
    userAddress,
    onDone,
    onError,
  }: {
    web3: Web3;
    lpAddress: string;
    userAddress: string;
    onDone?: () => void;
    onError?: () => void;
  }): AppThunk =>
  async (dispatch, getState) => {
    try {
      const loan = loanSelector(getState().auctions.loans, lpAddress);
      const bid = bidSelector(getState().auctions.userBids, lpAddress);
      console.log(bid, "bid");
      const auctionContract = getAuctionContract(
        bid?.auctionAddress as string,
        BSC_TESTNET_CHAIN_ID
      );
      if (!auctionContract.connectedToWallet) {
        await auctionContract.connectToWallet(web3);
      }
      console.log("Reached");
      await auctionContract.repayLoan({
        userAddress,
        web3,

        amount: loan?.totalAmountTobePaid as string,
      });

      const { bids, loans } = await fetchBidsAndLoans(getState(), userAddress);
      dispatch(fetchBidsSuccess(bids));
      dispatch(fetchLoansSuccess(loans));
      onDone && onDone();
    } catch (e) {
      captureException(e, "Error Pay Loan");
      onError && onError();
    }
  };

export const bidRevokedAction = (auctionAddress: string) =>
  action("BID_REVOKED", { auctionAddress });

export const revokeBidThunk =
  ({
    web3,
    userAddress,
    auctionAddress,
    onDone,
    onError,
  }: {
    web3: Web3;
    auctionAddress: string;
    userAddress: string;
    onDone?: () => void;
    onError?: () => void;
  }): AppThunk =>
  async (dispatch) => {
    try {
      const auctionContract = getAuctionContract(
        auctionAddress,
        BSC_TESTNET_CHAIN_ID
      );
      if (!auctionContract.connectedToWallet) {
        await auctionContract.connectToWallet(web3);
      }
      await auctionContract.revokeBid({ userAddress });
      dispatch(bidRevokedAction(auctionAddress));
      onDone && onDone();
    } catch (e) {
      onError && onError();
    }
  };

export const updateCurrentAuctionAction = () => {
  return action("UPDATE_CURRENT_AUCTION");
};

export const fetchPrevAuctionAction = () => action("FETCH_PREV_AUCTION");

export const fetchPrevAuctionSuccess = (prevAuctions: IPrevWinners[]) =>
  action("FETCH_PREV_AUCTION_SUCCESS", { prevAuctions });

export const fetchPrevAuctionFail = () => action("FETCH_PREV_AUCTION_FAIL");

export const fetchPreviousAuctionThunk =
  (Moralis: Moralis): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchPrevAuctionAction());
      const MoralisDBS = [
        "auctionwinnertwo",
        "auctionwinnnerthree",
        "auctionwinnerfour",
        "auctionwinnerfive",
      ];
      const prevAuctions: IPrevWinners[] = [];
      const pms = MoralisDBS.map(async (dbname) => {
        const Winner = Moralis.Object.extend(dbname);
        const query = new Moralis.Query(Winner);
        const results = await query.find();
        const winner: IPrevWinners = {
          auctionAddress: results[0].get("auctionAddress"),
          announcementDate: results[0].get("block_timestamp"),
          winners: [],
        };
        const promises = results.map(async (item) => {
          const userAddress = item.get("user");
          const auction = item.get("auctionAddress");
          console.log(auction, "Address");
          const auctionContract = getAuctionContract(
            auction,
            BSC_TESTNET_CHAIN_ID
          );
          if (!auctionContract.initialized) {
            await auctionContract.initialize();
          }
          const borrowAmount = toEther(item.get("allocatedAmount"));
          const info = await auctionContract.getUserInfo({ userAddress });
          winner.auctionAddress;
          winner.winners.push({
            borrowAmount,
            commissionpercent: new BigNumber(info.commissionInPer)
              .dividedBy(100)
              .toFixed(2),
            userAddress: userAddress,
            lpToken: info.lptoken,
            lendedAmount: toEther(info.lendedAmount),
          });
        });

        await Promise.all(promises);
        prevAuctions.push(winner);
      });
      await Promise.all(pms);

      dispatch(fetchPrevAuctionSuccess(prevAuctions));
    } catch (e) {
      captureException(e, "Fail Prev Fetch");
      dispatch(fetchPrevAuctionFail());
    }
  };
