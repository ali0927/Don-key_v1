import { Loader } from "don-components";
import { IFarmer } from "interfaces";
import { useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";

const PoolAmount = ({ poolAddress }: { poolAddress: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState(0);

  useLayoutEffect(() => {}, []);
  if (!isReady) {
    return <>-</>;
  }
  return <>{poolAmount} BUSD</>;
};

export const LeaderBoardTable = ({
  farmers,
  isReady,
}: {
  farmers: IFarmer[];
  isReady?: boolean;
}) => {
  if (!isReady) {
    return (
      <div style={{ minHeight: 400, background: "#fff" }}>
        <Loader />
      </div>
    );
  }

  return (
    <Table responsive className="table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name of Farmer</th>
          <th>BUSD in Pool</th>
          <th>24 hours Profit</th>
          <th>7 days Profit</th>
          <th>Total Profit</th>
        </tr>
      </thead>
      <tbody>
        {" "}
        <>
          {farmers.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="nodata">{item.name}</td>
                <td>
                  <span>
                    {" "}
                    <PoolAmount poolAddress={item.poolAddress} />
                  </span>
                </td>
                <td>
                  <span className="fontlight">{item.profit24 || "-"}</span>
                </td>
                <td>{item.profit7 || "-"}</td>
                <td>{item.profitTotal || "-"}</td>
              </tr>
            );
          })}
        </>
      </tbody>
    </Table>
  );
};
