import { BidsTable } from "components/BidsTable";
import { CountDown } from "components/CountDown";
import { Footer } from "components/Footer";
import { LoansTable } from "components/LoansTable";
import { PreviousAuctionsTable } from "components/PreviousAuctionsTable";
import { MakeABidForm } from "components/MakeABidForm";
import { NavBar } from "components/Navbar";
import React from "react";
import "./auction.css";






type IAuctionPageState = {
  auctions: {
    address: string
    startTime: number;
    endTime: number;
    supportedLps: {lpAddress: string; symbol: string; balance: string; price: string, strategyName: string}[];
  }[];
  // bids from the graph
  userBids: {
    auctionAddress: string;
    lpAddress: string;
    lendedAmount: string;
    borrowedAmount: string;
    // debtRatio: string;
    commission: string;
    commissionPercent: string;
    status: "rejected"  | "pending" | "won" | "claimed"
  }[];
  loans : {
    status: "unclaimed" | "unpaid" | "paid" | "recovered";
    lpAddress: string;
    lendedAmount: string;
    borrowedAmount: string;
    commission: string;
    commissionPercent: string;
    totalAmountTobePaid: string;
  }[]
}




export default function Auction() {

  


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
              <CountDown date={`2022-02-22T07:00:00`} />
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
