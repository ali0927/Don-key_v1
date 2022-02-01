import { BidsTable } from "components/BidsTable";
import { CountDown } from "components/CountDown";
import { Footer } from "components/Footer";
import { LoansTable } from "components/LoansTable";
import { PreviousAuctionsTable } from "components/PreviousAuctionsTable";
import { MakeABidForm } from "components/MakeABidForm";
import { NavBar } from "components/Navbar";
import React, { useEffect } from "react";
import "./auction.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuctionsThunk, fetchBalancesThunk } from "store/actions";
import { IAuctionSuccessState, IStoreState } from "interfaces";
import { useWeb3Context } from "don-components";

export type IAuctionPageState = {
  auctions: {
    address: string;
    startTime: number;
    endTime: number;
    initialized: boolean;
    maxDebtMap: {
      [TierNumber: number]: string;
    };
    supportedLps: {
      lpAddress: string;
      symbol: string;
      withdrawAmount?: string;
      balance?: string;
      price: string;
      strategyName: string;
      strategyImage: string;
      tokenImage: string;
      minCommission: number;
    }[];
  }[];
  // bids from the graph
  userBids?: {
    auctionAddress: string;
    lpAddress: string;
    lendedAmount: string;
    borrowedAmount: string;
    // debtRatio: string;
    commission: string;
    commissionPercent: string;
    status: "rejected" | "pending" | "won" | "claimed";
  }[];
  loans?: {
    status: "unclaimed" | "unpaid" | "paid" | "recovered";
    lpAddress: string;
    lendedAmount: string;
    borrowedAmount: string;
    commission: string;
    commissionPercent: string;
    totalAmountTobePaid: string;
  }[];
  endedAuctions?: {}[];
};

const isOneOf = <T extends string>(val: T, arr: T[]) => {
  return arr.includes(val);
};

export default function Auction() {
  const dispatch = useDispatch();
  const auctions = useSelector((state: IStoreState) => state.auctions);

  const { connected, address } = useWeb3Context();
  // const [selectedLp]

  useEffect(() => {
    if (auctions.status === "INITIAL" || auctions.status === "FETCH_FAILED") {
      dispatch(fetchAuctionsThunk());
    }
  }, [auctions.status]);

  useEffect(() => {
    if (connected && address && auctions.status === "FETCH_SUCCESS") {
      dispatch(fetchBalancesThunk(address));
    }
  }, [connected, address, auctions.status]);


  
  return (
    <>
      <NavBar />
      <div className="auction_page">
        <div className="strip autcion_head">
          <div className="boxed">
            <div className="width-50 details_column">
              <h5>catch your luck by the tail</h5>
              <h3>next auction finishes in</h3>
              <p>
                Be part of Don-key's auction to win loan and some more 2-3
                sentences explanation text to describe purpose of the page.
              </p>
              {isOneOf(auctions.status, [
                "FETCH_SUCCESS",
                "FETCH_BALANCE_SUCCESS",
              ]) && (
                <CountDown
                  date={
                    (auctions as IAuctionSuccessState).currentAuction.endTime
                  }
                />
              )}
            </div>
            <div className="width-50 bid_column">
              <MakeABidForm />
            </div>
          </div>
        </div>

        <BidsTable />
        <LoansTable />
        <PreviousAuctionsTable />
      </div>
      <Footer />
    </>
  );
}
