import React, { useEffect, useMemo, useState } from "react";

import "./App.css";
import { useMoralis } from "react-moralis";
import { getAuctionContract } from "./Contracts";
import { BSC_TESTNET_CHAIN_ID, useWeb3Context } from "don-components";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import moment from "moment";
import {
  DefaultButton,
  DetailsList,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  Selection,
  TextField,
} from "@fluentui/react";
import produce from "immer";

type IBidder = {
  borrowAmount: string;
  bidderAddress: string;
  commission: string;
  lendedAmount: string;
  isWinner: boolean;
};

type IAuction = {
  auctionAddress: string;
  startTime: number;
  hasEnded: boolean;
  isAnnounced: boolean;
  endTime: number;
  bidders: IBidder[];
};

type IAppState = {
  auctions: IAuction[];
};
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const Auction = ({ auction: auct }: { auction: IAuction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBidders, setSelectedbidders] = useState<
    (IBidder & { borrowAmount: string })[]
  >([]);

  const { getConnectedWeb3 } = useWeb3Context();

  const updateSelectedItems = (items: IBidder[]) => {
    setSelectedbidders(items.map((bid) => ({ ...bid, borrowAmount: "" })));
  };

  const announceWinners = async () => {
    const AuctionContract = getAuctionContract(
      auct.auctionAddress,
      BSC_TESTNET_CHAIN_ID
    );
    if (!AuctionContract.initialized) {
      await AuctionContract.initialize();
    }
    if (!AuctionContract.connectedToWallet) {
      await AuctionContract.connectToWallet(getConnectedWeb3());
    }
    await AuctionContract.anounceWinners(
      selectedBidders.map((item) => item.bidderAddress),
      selectedBidders.map((item) => item.borrowAmount)
    );
  };
  const selection = useMemo(() => {
    return new Selection({
      onSelectionChanged: () => {
        updateSelectedItems(selection.getItems() as any[]);
      },
    });
  }, []);

  const handleBorrowChange = (index: number) => (e: any, newValue?: string) => {
    console.log(newValue);
    setSelectedbidders((old) =>
      produce(old, (draft) => {
        draft[index].borrowAmount = newValue || "";
      })
    );
  };
  const closeDialog = () => {
    setIsOpen(false);
  };
  const openDialog = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <hr />
      <h4>Auction : {auct.auctionAddress}</h4>
      <Dialog
        hidden={!isOpen}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Enter Borrow Amount",
        }}
        modalProps={modelProps}
        onDismiss={closeDialog}
      >
        {selectedBidders.map((bid, i) => {
          return (
            <div key={bid.bidderAddress}>
              Bidder: {bid.bidderAddress} <br />
              Borrow:{" "}
              <TextField
                value={bid.borrowAmount}
                onChange={handleBorrowChange(i)}
              />{" "}
              <br />
              Lended: {bid.lendedAmount} <br />
              Commission: {bid.commission} <br />
              <hr />
            </div>
          );
        })}
        <DialogFooter>
          <PrimaryButton onClick={announceWinners} text="Save" />
          <DefaultButton onClick={closeDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
      {auct.isAnnounced && (
        <PrimaryButton onClick={openDialog} text="Anounce Winners" />
      )}
      <p>
        StartTime : {moment.unix(auct.startTime).format("d/MM/YYYY")} <br />
        EndTime: {moment.unix(auct.endTime).format("d/MM/YYYY")} <br />
        WinnersAnounced: {auct.isAnnounced ? "Yes" : "No"} <br />
        HasEnded: {auct.hasEnded ? "Yes" : "no"} <br />
      </p>
      <h4>Bidders List</h4>
      <DetailsList
        selection={selection}
        items={auct.bidders}
        onActiveItemChanged={(item) => {}}
      />
      <hr />
    </div>
  );
};

function App() {
  const { Moralis, isInitialized } = useMoralis();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<IAppState>({
    auctions: [],
  });

  const { connectDapp, connected } = useWeb3Context();
  const fetchAuctions = async () => {
    setIsLoading(true);
    const initialState: IAppState = {
      auctions: [],
    };
    const Transactions = Moralis.Object.extend("BscTransactions");
    const query = new Moralis.Query(Transactions);
    const results = await query.find();
    const UserList = results.reduce((prev, item) => {
      const auction_address = item.get("to_address");
      const userAddress = item.get("from_address");
      const timestamp = item.get("block_timestamp");
      if (
        prev.find(
          (old) =>
            old.userAddress === userAddress &&
            old.auction_address === auction_address
        )
      ) {
        return prev;
      }
      return [...prev, { auction_address, userAddress, timestamp }];
    }, [] as { auction_address: string; userAddress: string; timestamp: string }[]);

    const prs = UserList.map(async (item) => {
      const AuctionContract = getAuctionContract(
        item.auction_address,
        BSC_TESTNET_CHAIN_ID
      );
      await AuctionContract.initialize();
      const startTime = await AuctionContract.getauctionStartTime();
      const endTime = await AuctionContract.getauctionEndTime();
      const hasEnded = moment().isAfter(moment.unix(endTime));
      const isAnnounced = await AuctionContract.isWinnerAnounced();
      let auction = initialState.auctions.find(
        (auct) => auct.auctionAddress === item.auction_address
      );
 
      if (!auction) {
        auction = {
          auctionAddress: item.auction_address,
          bidders: [],
          endTime,
          hasEnded,
          isAnnounced,
          startTime,
        };
        initialState.auctions.push(auction);
      }
      const userInfo = await AuctionContract.getUserInfo({
        userAddress: item.userAddress,
      });
      const isWinner = await AuctionContract.isWinner({
        userAddress: item.userAddress,
      });
      if (new BigNumber(userInfo.lendedAmount).gt(0)) {
        // is a Bidder
        const bidder: IBidder = {
          bidderAddress: item.userAddress,
          borrowAmount: Web3.utils.fromWei(userInfo.borrowedAmount, "ether"),
          commission: new BigNumber(userInfo.commissionInPer)
            .dividedBy(100)
            .toFixed(2),
          isWinner,
          lendedAmount: Web3.utils.fromWei(userInfo.lendedAmount, "ether"),
        };
        auction.bidders.push(bidder);
      }
    });
    await Promise.all(prs);
    setState(initialState);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isInitialized) {
      fetchAuctions();
    }
  }, [isInitialized]);

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <h3>Auctions List</h3>
          {!connected && (
            <PrimaryButton
              text="Primary"
              onClick={() => connectDapp("injected")}
            />
          )}
          {isLoading
            ? "Loading ...."
            : state.auctions.map((auct) => {
                return <Auction key={auct.auctionAddress} auction={auct} />;
              })}
        </div>
      </div>
    </div>
  );
}

export default App;
