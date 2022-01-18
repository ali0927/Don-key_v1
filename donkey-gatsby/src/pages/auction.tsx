import { BidsTable } from "components/BidsTable";
import { CountDown } from "components/CountDown";
import { Footer } from "components/Footer";
import { LoansTable } from "components/LoansTable";
import { MakeABidForm } from "components/MakeABidForm";
import { NavBar } from "components/Navbar";
import React from "react";
import "./auction.css";

export default function Auction() {
  return (
    <>
      <NavBar />
      <div className="strip autcion_head">
        <div className="boxed">
          <div className="width-50 details_column">
            <h5>catch your luck by the tail</h5>
            <h3>next auction finishes in</h3>
            <p>
              Be part of Don-key's auction to win loan and some more 2-3
              sentences explanation text to describe purpose of the page.
            </p>
            <CountDown date={`2022-01-20T07:00:00`} />
          </div>
          <div className="width-50 bid_column">
            <MakeABidForm />
          </div>
        </div>
      </div>

      <BidsTable />
      <LoansTable />
      <Footer />
    </>
  );
}
