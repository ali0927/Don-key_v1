import { ClaimPopup } from "components/ClaimPopup";
import { DetailsPopup } from "components/DetailsPopup";
import { TableRow } from "components/TableRow";
import { IAuction, IStoreState } from "interfaces";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { createSelectAuction } from "store/selectors";
import { createFindLendedLp } from "store/selectors/findLendedLp";

const FindAuction = ({
  address,
  children,
}: {
  address: string;
  children: (arg: { auction: IAuction }) => React.ReactElement;
}) => {
  const selectAuction = useMemo(() => {
    return createSelectAuction();
  }, []);

  const auction = useSelector((state: IStoreState) =>
    selectAuction(state, address)
  );

  if (auction) {
    return children({ auction });
  }
  return null;
};

const FindStrategy = ({
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


  const lptoken = useSelector((state: IStoreState) => findLp(state, address));

  if (lptoken) {
    return children({ lptoken });
  }
  return <></>;
};

export const BidsTable = () => {
  const [openClaim, setOpenClaim] = useState(false);
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
            {openClaim && (
              <ClaimPopup
                open={openClaim}
                onClose={() => setOpenClaim(false)}
              />
            )}
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
                <th>sTableRowategy lp</th>
                <th>value</th>
                <th>borrow</th>
                <th>commission</th>
                <th>action</th>
              </TableRow>
            </thead>
            <tbody>
              {bids.data.map((bid, index) => {
                return (
                  <TableRow>
                    <td>{index + 1}</td>
                    <td data-title="status" className="status success">
                      {bid.status}
                    </td>
                    <td data-title="wallet">{bid.lpAddress}</td>
                    <td data-title="sTableRowategy lp">
                      <FindStrategy address={bid.auctionAddress}>
                        {({ lptoken }) => {
                          return <>{lptoken.strategyName}</>;
                        }}
                      </FindStrategy>
                    </td>
                    <td data-title="value">{bid.lendedAmount}</td>
                    <td data-title="borrow">{bid.borrowedAmount}</td>
                    <td data-title="commission">{bid.commissionPercent}%</td>
                    <td data-title="commission">{bid.commission}</td>
                    <td>
                      <button onClick={() => setOpenClaim(true)}>claim</button>
                    </td>
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
