import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { getAuctionContract } from "Contracts";
import { BSC_TESTNET_CHAIN_ID, getWeb3 } from "don-components";
import {
  getAmount,
  getPoolContract,
  getTokenPrice,
  getTokenSymbol,
  toEther,
} from "helpers";
import produce from "immer";
import {
  AppThunk,
  IAuction,
  IBid,
  IFarmerInter,
  ILoan,
} from "interfaces";
import { selectAuction } from "store/selectors";

import { action } from "typesafe-actions";



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
    // TO DO Fetch Auctionaddresses from Strapi
    const auctionAddresses = [
      "0x6F5550Fa6a5d72DcE2fF71CA481B7479285C0cb0",
      "0x8729D613E76493Ff27735502B5E9e61f64146602",
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
        const oldState = selectAuction(getState(), contract.address);
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
        console.log(filterFarmers, "FilterFarmers");
        if (filterFarmers.length > 0) {
          auctionState.supportedLps = await Promise.all(
            filterFarmers.map(async (farmer) => {
              const price = await getTokenPrice(web3, farmer.poolAddress);
              const symbol = await getTokenSymbol(web3, farmer.poolAddress);
              const minCommission = await contract.getFloorCommission(
                farmer.poolAddress
              );
              return {
                lpAddress: farmer.poolAddress,
                price,
                symbol,
                minCommission,
                strategyName: farmer.strategies[0].name,
                tokenImage: farmer.strategies[0].token.image.url,
                strategyImage: farmer.farmerImage.url,
              } as typeof auctionState.supportedLps[0];
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
          const withdrawAmount = await getAmount(
            web3,
            lp.lpAddress,
            userAddress,
            4,
            100
          );
          const userBalance = await pool.methods.balanceOf(userAddress).call();

          fetchedAuctions = produce(fetchedAuctions, (draft) => {
            draft[index].supportedLps[lindex].balance = toEther(userBalance);
            draft[index].supportedLps[lindex].withdrawAmount = withdrawAmount;
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

export const fetchBidsThunk =
  (userAddress: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(fetchingBids());
    try {
      const auctions = getState().auctions.auctionInfo;
      const bids: IBid[] = [];
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
          };
          const auctionContract = getAuctionContract(
            item.address,
            BSC_TESTNET_CHAIN_ID
          );
          const info = await auctionContract.getUserInfo({ userAddress });
          const anounced = await auctionContract.isWinnerAnounced();
          const isWinner = await auctionContract.isWinner({ userAddress });
          const hasClaimed = info.borrowedTime !== 0;
          bid.status = getBidStatus(anounced, isWinner, hasClaimed);
          bid.borrowedAmount = info.borrowedAmount;
          bid.commission = info.commissionAmount;
          bid.commissionPercent = info.commissionInPer;
          bid.lendedAmount = info.lendedAmount;
          bid.lpAddress = info.lptoken;
          if (info.lendedAmount > 0) {
            bids.push(bid);
          }
        });
        await Promise.all(promises);
      }
      dispatch(fetchBidsSuccess(bids));
    } catch (e) {
      dispatch(fetchBidsFail());
    }
  };

export const updateCurrentAuctionAction = () => {
  return action("UPDATE_CURRENT_AUCTION");
};
