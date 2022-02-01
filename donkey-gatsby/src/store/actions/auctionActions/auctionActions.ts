import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { getAuctionContract } from "Contracts";
import { BSC_TESTNET_CHAIN_ID, getWeb3 } from "don-components";
import {
  getAmount,
  getPoolContract,
  getPoolToken,
  getTokenPrice,
  getTokenSymbol,
  toEther,
} from "helpers";
import produce from "immer";
import { AppThunk, IFarmer, IFarmerInter, IStoreState } from "interfaces";

import { IAuctionPageState } from "templates/auctionTemplate";
import { action } from "typesafe-actions";

const selectAuction = (state: IStoreState, address: string) => {
  const auctions = state.auctions;
  if (auctions.status === "FETCH_SUCCESS") {
    const auctionList = auctions.auctionState.auctions;
    return auctionList.find((item) => item.address === address);
  }
  return null;
};

export const fetchAuctionSuccess = (auctions: IAuctionPageState["auctions"]) =>
  action("FETCH_AUCTION_SUCCESS", { auctions });

export const fetchAuctions = () => {
  return action("FETCH_AUCTIONS");
};

export const fetchBalances = () => {
  return action("FETCH_BALANCES");
};

export const fetchBalanceSuccess = (
  auctions: IAuctionPageState["auctions"]
) => {
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
    const auctionAddresses = ["0x2030dbAE880163B92C5e946B3EC945F0113B0C79"];

    // To do Fetch All Pools addresses
    const result = await client.query({ query: ALL_FARMERS_QUERY });
    const farmers: IFarmerInter[] = result.data.farmers;

    const web3 = getWeb3(BSC_TESTNET_CHAIN_ID);
    const AuctionContracts = auctionAddresses.map((addr) => {
      return getAuctionContract(addr, BSC_TESTNET_CHAIN_ID);
    });

    const promises = AuctionContracts.map(async (contract) => {
      const auctionState: IAuctionPageState["auctions"][number] = {
        address: contract.address,
        endTime: 0,
        initialized: false,
        maxDebtMap: {},
        startTime: 0,
        supportedLps: [],
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
        console.log(auctionState, "Auction State");
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
  (userAddress: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(fetchBalances());

    const state = getState();
    const auctions = state.auctions;

    if (auctions.status === "FETCH_SUCCESS") {
      let fetchedAuctions = auctions.auctionState.auctions;
      const web3 = getWeb3(BSC_TESTNET_CHAIN_ID);
      const promises: Promise<any>[] = [];
      fetchedAuctions.forEach((item, index) => {
        const list = item.supportedLps.map(async (lp, lindex) => {
          const pool = await getPoolContract(web3, lp.lpAddress, 4);
          const withdrawAmount = await getAmount(web3, lp.lpAddress, userAddress, 4, 100);
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
    }
  };
