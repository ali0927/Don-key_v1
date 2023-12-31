import { FindStrategy } from "components/BidsTable";
import { TableGroup } from "components/TableGroup";
import { shortenAddress } from "don-utils";
import { formatNum } from "helpers";
import { IStoreState } from "interfaces";
import { orderBy } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const PreviousAuctionsTable = () => {
  const prevAuctions = useSelector(
    (state: IStoreState) => state.auctions.prevAuctions
  );

  const hasPrevAuctions = !(
    prevAuctions.status !== "FETCH_SUCCESS" || prevAuctions.data.length === 0
  );
  const sortedAuctions = useMemo(() => {
    if(!hasPrevAuctions){
      return [];
    }
    return orderBy(
      prevAuctions.data,
      (item) => moment(item.announcementDate).unix(),
      ["desc"]
    );
  }, [prevAuctions.data, hasPrevAuctions]);

  if (!hasPrevAuctions) {
    return <div></div>;
  }

  return (
    <div className="strip table_strip previous_auctions">
      <div className="boxed" style={{ paddingTop: 130 }}>
        <h3>Previous Auctions</h3>
        <table className="previous_auctions_head">
          <thead>
            <tr>
              <th>#</th>
              <th>wallet</th>
              <th>strategy lp</th>
              <th>value</th>
              <th>borrow</th>
              <th>commission</th>
            </tr>
          </thead>
        </table>
        {sortedAuctions.map((item) => {
          return (
            <TableGroup
              date={moment(item.announcementDate).format("DD/MM/YYYY")}
            >
              {item.winners.map((winner, index) => {
                return (
                  <tr key={winner.userAddress}>
                    <td>{index + 1}</td>
                    <td data-title="wallet">
                      {shortenAddress(winner.userAddress)}
                    </td>
                    <FindStrategy
                      auctionAddress={winner.auctionAddress}
                      lpAddress={winner.lpToken}
                    >
                      {({ lptoken }) => {
                        return (
                          <>
                            <td data-title="strategy lp">
                              <>{lptoken.strategyName}</>
                            </td>
                            <td data-title="value">
                              {formatNum(winner.lendedAmount)} {lptoken.symbol}
                            </td>
                            <td data-title="borrow">
                              {formatNum(winner.borrowAmount)} {lptoken.symbol}
                            </td>
                          </>
                        );
                      }}
                    </FindStrategy>

                    <td data-title="commission">{winner.commissionpercent}%</td>
                  </tr>
                );
              })}
            </TableGroup>
          );
        })}
      </div>
    </div>
  );
};
