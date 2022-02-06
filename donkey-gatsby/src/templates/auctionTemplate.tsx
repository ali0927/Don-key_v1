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
import {
  fetchAuctionsThunk,
  fetchBalancesThunk,
  fetchBidsAndLoansThunk,
  fetchPreviousAuctionThunk,
  updateCurrentAuctionAction,
} from "store/actions";
import { IAuctionSuccessState, IStoreState } from "interfaces";
import { useWeb3Context } from "don-components";
import { isOneOf } from "helpers";
import { useMoralis } from "react-moralis";

export default function Auction() {
  const dispatch = useDispatch();
  const auctions = useSelector(
    (state: IStoreState) => state.auctions.auctionInfo
  );
  const prevAuction = useSelector((state: IStoreState) => state.auctions.prevAuctions);
  const {Moralis, isInitialized} = useMoralis();

  const { connected, address } = useWeb3Context();
  // const [selectedLp]

  useEffect(() => {
    if (auctions.status === "INITIAL" || auctions.status === "FETCH_FAILED") {
      dispatch(fetchAuctionsThunk());
    }

  }, [auctions.status]);

  useEffect(() => {
    if(prevAuction.status === "INITIAL" && isInitialized){
      dispatch(fetchPreviousAuctionThunk(Moralis,))
    }
  }, [prevAuction, isInitialized])

  useEffect(() => {
    if (connected && address && auctions.status === "FETCH_SUCCESS") {
      dispatch(
        fetchBalancesThunk(address, {
          onSuccess: async () => {
            dispatch(fetchBidsAndLoansThunk(address));
          },
        })
      );
    }
  }, [connected, address, auctions.status]);

  const currentAuction =
    (auctions as IAuctionSuccessState).currentAuction || null;
  const nextAuction = (auctions as IAuctionSuccessState).nextAuction || null;
  // const
  const isSuccessState = isOneOf(auctions.status, [
    "FETCH_SUCCESS",
    "FETCH_BALANCE_SUCCESS",
  ]);

  const updateCurrentAuction = () => {
    dispatch(updateCurrentAuctionAction());
  };

  const renderTimer = () => {
    if (isSuccessState && currentAuction) {
      return (
        <CountDown onEnd={updateCurrentAuction} date={currentAuction.endTime} />
      );
    }
    if (isSuccessState && !currentAuction && nextAuction) {
      return (
        <CountDown onEnd={updateCurrentAuction} date={nextAuction.startTime} />
      );
    }
  };

  const isPilotOver = !currentAuction && !nextAuction;

  return (
    <>
      <NavBar />
      <div className="auction_page">
        <div className="strip autcion_head">
          <div className="boxed">
            <div className="width-50 details_column">
              <h5>catch your luck by the tail</h5>
              {isPilotOver ? (
                <h3>PILOT DONE!</h3>
              ) : (
                <h3>next auction finishes in</h3>
              )}
              <p>
                {isPilotOver ? (
                  <>
                    Thank you for Participating in the wallet feel free to leave
                    your remarks here:
                  </>
                ) : (
                  <>
                    {" "}
                    Be part of Don-key's auction to win loan and some more 2-3
                    sentences explanation text to describe purpose of the page.
                  </>
                )}
              </p>
              {renderTimer()}
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
