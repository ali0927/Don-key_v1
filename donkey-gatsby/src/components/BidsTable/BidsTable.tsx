import clsx from "clsx";
import { ClaimPopup } from "components/ClaimPopup";
import { DetailsPopup } from "components/DetailsPopup";
import { TableRow } from "components/TableRow";
import { useWeb3Context } from "don-components";
import { shortenAddress } from "don-utils";
import { formatNum, isOneOf } from "helpers";
import { IAuction, IStoreState } from "interfaces";
import React, { useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { claimLoanThunk, revokeBidThunk } from "store/actions";
import { createSelectAuction } from "store/selectors";
import { createFindLendedLp } from "store/selectors/findLendedLp";

// const FindAuction = ({
//   address,
//   children,
// }: {
//   address: string;
//   children: (arg: { auction: IAuction }) => React.ReactElement;
// }) => {
//   const selectAuction = useMemo(() => {
//     return createSelectAuction();
//   }, []);

//   const auction = useSelector((state: IStoreState) =>
//     selectAuction(state, address)
//   );

//   if (auction) {
//     return children({ auction });
//   }
//   return null;
// };

const ClaimButton = ({ auctionAddress }: { auctionAddress: string }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <td>
      {isPopupOpen && (
        <ClaimPopup
          auctionAddress={auctionAddress}
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
      <button onClick={() => setIsPopupOpen(true)}>Claim</button>
    </td>
  );
};

const RevokeButton = ({ auctionAddress }: { auctionAddress: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { address, getConnectedWeb3 } = useWeb3Context();

  const claimLoan = async (auctionAddress: string) => {
    setIsLoading(true);
    dispatch(
      claimLoanThunk({
        auctionAddress,
        web3: getConnectedWeb3(),
        userAddress: address,
        onDone: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      })
    );
  };

  return (
    <td>
      <button disabled={isLoading} onClick={() => claimLoan(auctionAddress)}>
        {isLoading ? <Spinner size="sm" animation="border" /> : "Revoke"}
      </button>
    </td>
  );
};

export const FindStrategy = ({
  address,
  children,
}: {
  address: string;
  children: (arg: {
    lptoken: IAuction["supportedLps"][number];
  }) => React.ReactElement;
}) => {
  const findLp = useMemo(() => {
    return createFindLendedLp();
  }, []);

  const lptoken = useSelector((state: IStoreState) => findLp(state.auctions.auctionInfo, address));

  if (lptoken) {
    return children({ lptoken });
  }
  return <></>;
};

export const BidsTable = () => {
  const [openDetails, setOpenDetails] = useState(false);

  const bids = useSelector((state: IStoreState) => state.auctions.userBids);

  if (bids.status === "FETCH_SUCCESS" && bids.data.length > 0) {
    return (
      <div
        className="strip table_strip your_bids"
        style={{ paddingTop: "165px" }}
      >
        <div className="boxed">
          <h3>Your Bids</h3>
          <table>
            {openDetails && (
              <DetailsPopup
                open={openDetails}
                onClose={() => setOpenDetails(false)}
              />
            )}

            <thead>
              <TableRow>
                <th>#</th>
                <th>status</th>
                <th>wallet</th>
                <th>Strategy Name</th>
                <th>value</th>
                <th>borrow</th>
                <th>commission</th>
                <th>action</th>
              </TableRow>
            </thead>
            <tbody>
              {bids.data.map((bid, index) => {
                return (
                  <TableRow key={bid.lpAddress}>
                    <td>{index + 1}</td>
                    <td
                      data-title="status"
                      className={clsx("status", {
                        success: isOneOf(bid.status, ["claimed", "won"]),
                        pending: bid.status === "pending",
                        rejected: bid.status === "rejected",
                      })}
                    >
                      {isOneOf(bid.status, ["claimed", "won"]) && "Successful"}
                      {bid.status === "rejected" && "Rejected"}
                      {bid.status === "pending" && "Pending"}
                    </td>
                    <td data-title="wallet">{shortenAddress(bid.lpAddress)}</td>

                    <FindStrategy address={bid.lpAddress}>
                      {({ lptoken }) => {
                        return (
                          <>
                            <td data-title="strategy lp">
                              {lptoken.strategyName}{" "}
                            </td>
                            <td data-title="value">
                              {formatNum(bid.lendedAmount)} {lptoken.symbol}
                            </td>
                            <td data-title="borrow">
                              {formatNum(bid.borrowedAmount)} {lptoken.symbol}
                            </td>
                            <td data-title="commission">
                              {formatNum(bid.commission)} {lptoken.symbol}
                            </td>
                          </>
                        );
                      }}
                    </FindStrategy>

                    {isOneOf(bid.status, ["pending", "rejected"]) && (
                      <RevokeButton auctionAddress={bid.auctionAddress} />
                    )}
                    {bid.status === "won" && (
                      <ClaimButton auctionAddress={bid.auctionAddress} />
                    )}
                    {bid.status === "claimed" && (
                      <td>
                        <button disabled className="white">
                          Claimed{" "}
                        </button>
                      </td>
                    )}
                  </TableRow>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return null;
};
